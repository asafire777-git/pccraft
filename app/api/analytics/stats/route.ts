import { NextResponse } from 'next/server';
import { getAnalyticsStats } from '@/lib/analytics';
import { getGa4AnalyticsStats } from '@/lib/ga4';
import { auth } from '@/auth';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  try {
    const session = await auth().catch(() => null);

    // 관리자 계정인지 검증
    if (!isAdmin(session?.user)) {
      return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
    }

    // 1순위: Google Analytics 4 Data API 실시간 연동
    try {
      const ga4Stats = await getGa4AnalyticsStats();
      if (ga4Stats) {
        return NextResponse.json(ga4Stats);
      }
    } catch (ga4Error) {
      console.error('GA4 Data API fetch failed, falling back to local stats:', ga4Error);
    }

    // 2순위: 로컬 개발 환경 폴백
    const stats = getAnalyticsStats();
    return NextResponse.json({ ...stats, dataSource: 'local' });
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}
