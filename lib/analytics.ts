import fs from 'fs';
import path from 'path';

export interface AnalyticsEvent {
  id: string;
  action: string;
  params: Record<string, unknown>;
  userEmail?: string;
  userName?: string;
  ip?: string;
  timestamp: string;
}

export interface AnalyticsStats {
  totalPageViews: number;
  todayPageViews: number;
  totalAffiliateClicks: number;
  clicksByPlatform: Record<string, number>;
  topClickedProducts: Array<{
    name: string;
    platform: string;
    category?: string;
    count: number;
    lastClicked: string;
  }>;
  topPresets: Array<{
    presetId: string;
    title: string;
    count: number;
  }>;
  totalQuoteCaptures: number;
  recentActivities: AnalyticsEvent[];
}

const DB_FILE = path.join(process.cwd(), 'data', 'analytics-db.json');

// 파일 읽기
function readEvents(): AnalyticsEvent[] {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 파일 쓰기 (최대 3000개 최신 기록 보존)
function writeEvents(events: AnalyticsEvent[]) {
  try {
    const dir = path.dirname(DB_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const trimmed = events.slice(-3000);
    fs.writeFileSync(DB_FILE, JSON.stringify(trimmed, null, 2), 'utf-8');
  } catch (err) {
    console.error('Analytics write error:', err);
  }
}

// 이벤트 기록 함수
export function recordEvent(eventData: Omit<AnalyticsEvent, 'id'>) {
  const events = readEvents();
  const newEvent: AnalyticsEvent = {
    ...eventData,
    id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  };
  events.push(newEvent);
  writeEvents(events);
  return newEvent;
}

// 통계 데이터 계산 함수
export function getAnalyticsStats(): AnalyticsStats {
  const events = readEvents();

  const todayStr = new Date().toISOString().split('T')[0];
  let totalPageViews = 0;
  let todayPageViews = 0;
  let totalAffiliateClicks = 0;
  let totalQuoteCaptures = 0;

  const clicksByPlatform: Record<string, number> = {
    coupang: 0,
    '11st': 0,
    gmarket: 0,
    naver: 0,
  };

  const productClickMap: Record<string, { name: string; platform: string; category?: string; count: number; lastClicked: string }> = {};
  const presetMap: Record<string, { presetId: string; title: string; count: number }> = {};

  for (const ev of events) {
    const isToday = ev.timestamp.startsWith(todayStr);

    if (ev.action === 'page_view') {
      totalPageViews++;
      if (isToday) todayPageViews++;
    } else if (ev.action === 'affiliate_click') {
      totalAffiliateClicks++;
      const platform = String(ev.params?.platform || 'coupang');
      clicksByPlatform[platform] = (clicksByPlatform[platform] || 0) + 1;

      const itemName = String(ev.params?.item_name || ev.params?.name || '기본 상품');
      const category = ev.params?.category ? String(ev.params?.category) : undefined;
      const key = `${itemName}_${platform}`;

      if (!productClickMap[key]) {
        productClickMap[key] = {
          name: itemName,
          platform,
          category,
          count: 0,
          lastClicked: ev.timestamp,
        };
      }
      productClickMap[key].count++;
      productClickMap[key].lastClicked = ev.timestamp;
    } else if (ev.action === 'preset_select') {
      const presetId = String(ev.params?.preset_id || 'unknown');
      const title = String(ev.params?.preset_title || ev.params?.title || presetId);
      if (!presetMap[presetId]) {
        presetMap[presetId] = { presetId, title, count: 0 };
      }
      presetMap[presetId].count++;
    } else if (ev.action === 'quote_capture') {
      totalQuoteCaptures++;
    }
  }

  // 상위 클릭 상품 정렬
  const topClickedProducts = Object.values(productClickMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // 상위 프리셋 정렬
  const topPresets = Object.values(presetMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // 최근 활동 내역 (최신순 50개)
  const recentActivities = [...events].reverse().slice(0, 50);

  return {
    totalPageViews,
    todayPageViews,
    totalAffiliateClicks,
    clicksByPlatform,
    topClickedProducts,
    topPresets,
    totalQuoteCaptures,
    recentActivities,
  };
}
