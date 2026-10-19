import { NextResponse } from 'next/server';
import { getAnalyticsStats } from '@/lib/analytics';
import { auth } from '@/auth';
import { isAdmin } from '@/lib/admin';

export async function GET() {
  try {
    const session = await auth().catch(() => null);

    // 관리자 계정인지 검증
    if (!isAdmin(session?.user)) {
      return NextResponse.json({ error: '관리자 권한이 필요합니다.' }, { status: 403 });
    }

    const stats = getAnalyticsStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics stats' }, { status: 500 });
  }
}
