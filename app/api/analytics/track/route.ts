import { NextRequest, NextResponse } from 'next/server';
import { recordEvent } from '@/lib/analytics';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, params, timestamp } = body;

    if (!action) {
      return NextResponse.json({ error: 'Missing action' }, { status: 400 });
    }

    // 세션 정보 확인 (로그인 사용자 행동 분석용)
    const session = await auth().catch(() => null);

    recordEvent({
      action,
      params: params || {},
      userEmail: session?.user?.email || undefined,
      userName: session?.user?.name || undefined,
      ip: req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || undefined,
      timestamp: timestamp || new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'Failed to record event' }, { status: 500 });
  }
}
