import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isAdmin } from '@/lib/admin';
import { PickItem } from '@/data/picks/types';
import fs from 'fs';
import path from 'path';

const customPicksFilePath = path.join(process.cwd(), 'data', 'picks', 'custom-picks.json');
const GITHUB_REPO = process.env.GITHUB_REPO || 'asafire777-git/pccraft';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_FILE_PATH = 'data/picks/custom-picks.json';

function readCustomPicks(): PickItem[] {
  try {
    if (fs.existsSync(customPicksFilePath)) {
      const data = fs.readFileSync(customPicksFilePath, 'utf-8');
      return JSON.parse(data) || [];
    }
  } catch (e) {
    console.error('Error reading custom picks:', e);
  }
  return [];
}

async function readCustomPicksFromGitHub(): Promise<{ items: PickItem[]; sha?: string } | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}?ref=${encodeURIComponent(GITHUB_BRANCH)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'User-Agent': 'PC-Craft-CMS',
        },
        cache: 'no-store',
      }
    );
    if (res.status === 404) {
      return { items: [], sha: undefined };
    }
    if (!res.ok) return null;

    const data = await res.json();
    const decoded = Buffer.from(String(data.content || '').replace(/\n/g, ''), 'base64').toString('utf-8');
    return { items: JSON.parse(decoded) || [], sha: data.sha };
  } catch (e) {
    console.error('GitHub read error:', e);
    return null;
  }
}

async function saveCustomPicks(
  picks: PickItem[],
  commitMessage: string
): Promise<{ ok: boolean; mode: 'local' | 'github' | 'readonly'; error?: string }> {
  const jsonText = JSON.stringify(picks, null, 2);

  // 1. Vercel 환경이거나 GITHUB_TOKEN이 설정된 프로덕션에서는 GitHub Contents API로 영구 커밋
  const token = process.env.GITHUB_TOKEN;
  if (token && process.env.VERCEL) {
    try {
      const existing = await readCustomPicksFromGitHub();
      const putRes = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE_PATH}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'PC-Craft-CMS',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(jsonText, 'utf-8').toString('base64'),
            branch: GITHUB_BRANCH,
            ...(existing?.sha ? { sha: existing.sha } : {}),
          }),
        }
      );

      if (!putRes.ok) {
        const errText = await putRes.text();
        return { ok: false, mode: 'github', error: `GitHub 커밋 실패 (${putRes.status}): ${errText.slice(0, 180)}` };
      }
      return { ok: true, mode: 'github' };
    } catch (e: unknown) {
      return { ok: false, mode: 'github', error: e instanceof Error ? e.message : String(e) };
    }
  }

  // 2. Vercel 환경인데 GITHUB_TOKEN이 없는 경우 (읽기 전용 파일시스템 안내)
  if (process.env.VERCEL) {
    return {
      ok: false,
      mode: 'readonly',
      error:
        'Vercel 서버는 읽기 전용 환경입니다. Vercel 환경변수에 GITHUB_TOKEN을 등록하면 원클릭 자동 발행(자동 커밋·배포)이 작동하며, 지금은 아래 [JSON 복사] 버튼으로 데이터를 복사해 활용할 수 있습니다.',
    };
  }

  // 3. 로컬 개발 환경: 파일 직접 저장
  try {
    fs.writeFileSync(customPicksFilePath, jsonText, 'utf-8');
    return { ok: true, mode: 'local' };
  } catch (e: unknown) {
    console.error('Error saving custom picks:', e);
    return { ok: false, mode: 'local', error: e instanceof Error ? e.message : String(e) };
  }
}

// 1. GET: 관리자용 픽 목록 조회
export async function GET() {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  if (process.env.VERCEL && process.env.GITHUB_TOKEN) {
    const gh = await readCustomPicksFromGitHub();
    if (gh) {
      return NextResponse.json({ success: true, count: gh.items.length, items: gh.items, mode: 'github' });
    }
  }

  const items = readCustomPicks();
  return NextResponse.json({
    success: true,
    count: items.length,
    items,
    mode: process.env.VERCEL ? 'readonly' : 'local',
  });
}

// 2. POST: 신규 픽 발행 등록
export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  try {
    const body: PickItem = await req.json();

    if (!body.slug || !body.title || !body.affiliateUrl) {
      return NextResponse.json({ error: 'slug, title, affiliateUrl은 필수 입력 항목입니다.' }, { status: 400 });
    }

    const ghData = process.env.VERCEL && process.env.GITHUB_TOKEN ? await readCustomPicksFromGitHub() : null;
    const currentPicks = ghData ? ghData.items : readCustomPicks();

    // 중복 slug 체크
    const existingIndex = currentPicks.findIndex((p) => p.slug === body.slug);
    if (existingIndex >= 0) {
      currentPicks[existingIndex] = body;
    } else {
      currentPicks.unshift(body);
    }

    const result = await saveCustomPicks(currentPicks, `chore(picks): publish ${body.slug}`);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || '파일 저장 중 오류가 발생했습니다.', mode: result.mode },
        { status: result.mode === 'readonly' ? 501 : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mode: result.mode,
      message:
        result.mode === 'github'
          ? 'GitHub에 자동 커밋되었습니다! 약 1분 뒤 라이브 사이트에 자동 반영됩니다.'
          : '테크픽 컬럼이 성공적으로 발행되었습니다!',
      item: body,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: '처리 중 오류: ' + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
}

// 3. DELETE: 특정 픽 삭제
export async function DELETE(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'slug 파라미터가 필요합니다.' }, { status: 400 });
    }

    const ghData = process.env.VERCEL && process.env.GITHUB_TOKEN ? await readCustomPicksFromGitHub() : null;
    const currentPicks = ghData ? ghData.items : readCustomPicks();
    const updated = currentPicks.filter((p) => p.slug !== slug);

    const result = await saveCustomPicks(updated, `chore(picks): delete ${slug}`);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error || '삭제 중 오류가 발생했습니다.', mode: result.mode },
        { status: result.mode === 'readonly' ? 501 : 500 }
      );
    }

    return NextResponse.json({
      success: true,
      mode: result.mode,
      message: `${slug} 항목이 삭제되었습니다.`,
    });
  } catch (err: unknown) {
    return NextResponse.json({ error: '처리 중 오류: ' + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
}
