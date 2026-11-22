import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isAdmin } from '@/lib/admin';
import { PickItem } from '@/data/picks/types';
import fs from 'fs';
import path from 'path';

const customPicksFilePath = path.join(process.cwd(), 'data', 'picks', 'custom-picks.json');

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

function saveCustomPicks(picks: PickItem[]) {
  try {
    fs.writeFileSync(customPicksFilePath, JSON.stringify(picks, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error saving custom picks:', e);
    return false;
  }
}

// 1. GET: 관리자용 픽 목록 조회
export async function GET() {
  const session = await auth();
  if (!isAdmin(session?.user)) {
    return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
  }

  const items = readCustomPicks();
  return NextResponse.json({ success: true, count: items.length, items });
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

    const currentPicks = readCustomPicks();
    // 중복 slug 체크
    const existingIndex = currentPicks.findIndex((p) => p.slug === body.slug);
    if (existingIndex >= 0) {
      // 기존 글 업데이트
      currentPicks[existingIndex] = body;
    } else {
      // 새 글 추가 (맨 앞)
      currentPicks.unshift(body);
    }

    const saved = saveCustomPicks(currentPicks);
    if (!saved) {
      return NextResponse.json({ error: '파일 저장 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: '테크픽 컬럼이 성공적으로 발행되었습니다!',
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

    const currentPicks = readCustomPicks();
    const updated = currentPicks.filter((p) => p.slug !== slug);

    saveCustomPicks(updated);
    return NextResponse.json({ success: true, message: `${slug} 항목이 삭제되었습니다.` });
  } catch (err: unknown) {
    return NextResponse.json({ error: '처리 중 오류: ' + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
}
