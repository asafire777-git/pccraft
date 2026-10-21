import { NextRequest, NextResponse } from 'next/server';
import { getPriceReports, addPriceReport } from '@/lib/price-feedback';

export async function GET() {
  const reports = getPriceReports();
  return NextResponse.json({ success: true, reports });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { componentId, componentName, reportedPrice, reportedStore, tipText, nickname } = body;

    if (!componentName || !reportedPrice || !reportedStore) {
      return NextResponse.json({ success: false, error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const saved = addPriceReport({
      componentId: componentId || 'custom',
      componentName,
      reportedPrice: Number(reportedPrice),
      reportedStore,
      tipText: tipText || '',
      nickname: nickname || '익명 게이머'
    });

    return NextResponse.json({ success: true, report: saved });
  } catch (error) {
    return NextResponse.json({ success: false, error: '제보 등록 실패' }, { status: 500 });
  }
}
