/**
 * Google Analytics 4 (GA4) & 실시간 유저 행동 추적 유틸리티
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// 페이지뷰 추적
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag && GA_TRACKING_ID) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }

  // 내부 실시간 트래커에도 페이지뷰 전송
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'page_view',
        params: { url },
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
};

// 커스텀 이벤트 추적 (제휴 링크 클릭, 견적 캡처, 프리셋 변경, 로그인 사용자 활동)
export const trackEvent = (action: string, params: Record<string, unknown> = {}) => {
  // 1. Google Analytics 4 전송
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag && GA_TRACKING_ID) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', action, params);
  }

  // 2. 내부 실시간 분석 DB 전송 (관리자 대시보드 즉시 확인용)
  try {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action,
        params,
        timestamp: new Date().toISOString(),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
};

// 로그인 사용자 식별 추적
export const setAnalyticsUser = (user: { id?: string | null; email?: string | null; name?: string | null }) => {
  if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag && GA_TRACKING_ID) {
    if (user.email || user.id) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('set', 'user_properties', {
        user_identifier: user.email || user.name || user.id,
        user_name: user.name,
      });
    }
  }
};
