import { NextRequest, NextResponse } from 'next/server';
import { getPriceReports, addPriceReport } from '@/lib/price-feedback';

export async function GET() {
  const reports = getPriceReports();
  return NextResponse.json({ success: true, reports });
}

function sanitizeText(str: string, maxLength: number): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // HTML 태그/XSS 주입 차단
    .trim()
    .slice(0, maxLength);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { componentId, componentName, reportedPrice, reportedStore, tipText, nickname } = body;

    if (!componentName || !reportedPrice || !reportedStore) {
      return NextResponse.json({ success: false, error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const priceNum = Number(reportedPrice);
    if (isNaN(priceNum) || priceNum < 1000 || priceNum > 100000000) {
      return NextResponse.json({ success: false, error: '유효한 가격을 입력해주세요.' }, { status: 400 });
    }

    const cleanName = sanitizeText(componentName, 80);
    const cleanStore = sanitizeText(reportedStore, 40);
    const cleanTip = sanitizeText(tipText || '', 300);
    const cleanNickname = sanitizeText(nickname || '익명 게이머', 20) || '익명 게이머';
    const cleanCompId = sanitizeText(componentId || 'custom', 50) || 'custom';

    const saved = addPriceReport({
      componentId: cleanCompId,
      componentName: cleanName,
      reportedPrice: priceNum,
      reportedStore: cleanStore,
      tipText: cleanTip,
      nickname: cleanNickname
    });

    return NextResponse.json({ success: true, report: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: '제보 등록 실패' }, { status: 500 });
  }
}
