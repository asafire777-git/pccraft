import crypto from 'crypto';
import type { AnalyticsStats } from './analytics';

let cachedToken: { token: string; expiresAt: number } | null = null;

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) {
    return cachedToken.token;
  }

  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GA4_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) {
    throw new Error('Missing GA4_CLIENT_EMAIL or GA4_PRIVATE_KEY');
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    })
  );

  const unsignedJwt = `${header}.${payload}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedJwt);
  const signature = base64url(signer.sign(privateKey));
  const assertion = `${unsignedJwt}.${signature}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
    cache: 'no-store',
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    throw new Error(`GA4 OAuth token error (${tokenRes.status}): ${errText}`);
  }

  const tokenJson = (await tokenRes.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: tokenJson.access_token,
    expiresAt: now + (tokenJson.expires_in || 3600),
  };

  return cachedToken.token;
}

interface Ga4Row {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
}

interface Ga4ReportResponse {
  rows?: Ga4Row[];
}

async function runGa4Report(
  propertyId: string,
  accessToken: string,
  body: Record<string, unknown>,
  realtime = false
): Promise<Ga4ReportResponse> {
  const endpoint = realtime
    ? `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`
    : `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GA4 API error (${res.status}): ${errText}`);
  }

  return (await res.json()) as Ga4ReportResponse;
}

export async function getGa4AnalyticsStats(): Promise<AnalyticsStats | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!propertyId || !process.env.GA4_CLIENT_EMAIL || !process.env.GA4_PRIVATE_KEY) {
    return null;
  }

  const accessToken = await getAccessToken();

  const [todayRes, totalRes, realtimeRes, eventsRes, topPagesRes] = await Promise.all([
    // 1. 오늘 페이지뷰 & 활성 사용자
    runGa4Report(propertyId, accessToken, {
      dateRanges: [{ startDate: 'today', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    }),
    // 2. 최근 30일 누적 페이지뷰 & 방문자 수
    runGa4Report(propertyId, accessToken, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'activeUsers' }],
    }),
    // 3. 실시간 접속자 수 (최근 30분)
    runGa4Report(
      propertyId,
      accessToken,
      {
        metrics: [{ name: 'activeUsers' }],
      },
      true
    ).catch(() => ({ rows: [] })),
    // 4. 최근 30일 주요 이벤트별 집계
    runGa4Report(propertyId, accessToken, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      limit: 50,
    }),
    // 5. 최근 30일 인기 페이지 TOP 15
    runGa4Report(propertyId, accessToken, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 15,
    }),
  ]);

  const todayPageViews = Number(todayRes.rows?.[0]?.metricValues?.[0]?.value || 0);
  const totalPageViews = Number(totalRes.rows?.[0]?.metricValues?.[0]?.value || 0);
  const totalUsers = Number(totalRes.rows?.[0]?.metricValues?.[1]?.value || 0);
  const activeUsers = Number(realtimeRes.rows?.[0]?.metricValues?.[0]?.value || 0);

  // 이벤트 집계 파싱
  const eventMap: Record<string, number> = {};
  for (const row of eventsRes.rows || []) {
    const name = row.dimensionValues?.[0]?.value || '';
    const count = Number(row.metricValues?.[0]?.value || 0);
    if (name) eventMap[name] = count;
  }

  const affiliateClicks =
    (eventMap['affiliate_click'] || 0) +
    (eventMap['danawa_click'] || 0) +
    (eventMap['outbound_click'] || 0);

  const totalQuoteCaptures =
    (eventMap['quote_capture'] || 0) +
    (eventMap['quote_share'] || 0) +
    (eventMap['takeoff_audit'] || 0);

  const clicksByPlatform: Record<string, number> = {
    coupang: eventMap['affiliate_click'] || 0,
    '11st': 0,
    gmarket: 0,
    danawa: eventMap['danawa_click'] || 0,
  };

  // 인기 페이지 목록을 topClickedProducts 형식에 매핑해 대시보드에서 즉시 확인 가능하게 표시
  const nowLabel = new Date().toLocaleDateString('ko-KR');
  const topClickedProducts = (topPagesRes.rows || []).map((row) => {
    const pagePath = row.dimensionValues?.[0]?.value || '/';
    const pageTitle = row.dimensionValues?.[1]?.value || pagePath;
    const pv = Number(row.metricValues?.[0]?.value || 0);
    return {
      name: pageTitle.replace(' | PC-Craft', '').slice(0, 60),
      platform: pagePath,
      category: '페이지뷰',
      count: pv,
      lastClicked: nowLabel,
    };
  });

  // 주요 이벤트 요약을 topPresets에 매핑
  const topPresets = Object.entries(eventMap)
    .filter(([name]) => !['first_visit', 'session_start'].includes(name))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({
      presetId: name,
      title: name,
      count,
    }));

  // 최근 활동 요약
  const recentActivities = (topPagesRes.rows || []).slice(0, 10).map((row, idx) => ({
    id: `ga4-page-${idx}`,
    action: 'page_view',
    params: {
      pagePath: row.dimensionValues?.[0]?.value || '/',
      pageTitle: row.dimensionValues?.[1]?.value || '',
      views30d: Number(row.metricValues?.[0]?.value || 0),
    },
    userName: 'GA4 30일 집계',
    timestamp: new Date().toISOString(),
  }));

  return {
    totalPageViews,
    todayPageViews,
    activeUsers,
    totalUsers,
    dataSource: 'ga4',
    totalAffiliateClicks: affiliateClicks,
    clicksByPlatform,
    topClickedProducts,
    topPresets,
    totalQuoteCaptures,
    recentActivities,
  };
}
