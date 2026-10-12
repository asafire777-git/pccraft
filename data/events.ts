import { 
  OFFICIAL_PREBUILT_LINK, 
  OFFICIAL_COMPONENTS_LINK,
  OFFICIAL_MONITOR_LINK,
  OFFICIAL_GEAR_LINK
} from '@/lib/affiliate';

export interface PromoEvent {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountRate?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  affiliateUrl: string; // 쿠팡 파트너스 기획전 링크 (https://partners.coupang.com/#affiliate/ws/events 에서 발급)
  themeColor: 'cyan' | 'purple' | 'amber' | 'emerald' | 'blue';
  tag: string;
  highlightText?: string;
  imageUrl?: string; // 실제 배너사 제공 이미지 또는 로컬 최적화 배너 SVG
  imageAlt?: string;
}

/**
 * 쿠팡 파트너스 기간 한정 프로모션 & 기획전 데이터베이스
 * - startDate ~ endDate 기간 내에만 사이트에 자동 노출됩니다.
 * - 종료일이 지나면 별도 작업 없이 자동으로 내려갑니다.
 * - https://partners.coupang.com/#affiliate/ws/events 에서 마음에 드는 기획전 링크를 복사하여 affiliateUrl에 넣으시면 됩니다.
 * - 실제 배너사(쿠팡)가 제공하는 배너 이미지 URL이 있을 경우 imageUrl에 직접 교체해 넣으실 수 있습니다.
 */
export const PROMO_EVENTS: PromoEvent[] = [
  {
    id: 'event-pc-gaming-2026',
    title: '2026 상반기 게이밍 조립 PC & 모니터 빅세일',
    subtitle: '로켓배송 인기 완본체 PC & 주요 게이밍 부품 카드사 즉시할인 혜택',
    badge: '쿠팡 로켓 기획전',
    discountRate: '최대 15% 즉시할인',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_PREBUILT_LINK,
    themeColor: 'cyan',
    tag: '로켓와우 특별전',
    highlightText: '선착순 쿠폰 & 카드 무이자 할부',
    imageUrl: '/banners/banner-gaming-pc.jpg',
    imageAlt: '2026 게이밍 조립 PC 빅세일 기획전'
  },
  {
    id: 'event-hardware-parts-festa',
    title: 'PC 주요 부품 (CPU·그래픽카드·SSD) 최저가 대전',
    subtitle: '라이젠 7500F / RTX 40 시리즈 / 고속 NVMe SSD 실시간 로켓배송 특가',
    badge: '하드웨어 특가전',
    discountRate: '로켓배송 무료반품',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_COMPONENTS_LINK,
    themeColor: 'purple',
    tag: '조립PC 부품전',
    highlightText: '내일 아침 문 앞 도착',
    imageUrl: '/banners/banner-hardware.jpg',
    imageAlt: 'PC 핵심 부품 최저가 기획전'
  },
  {
    id: 'event-custom-setup-week',
    title: '가성비 데스크탑 & e스포츠 완제품 PC 기획전',
    subtitle: '리그오브레전드 / 발로란트 / 배그 권장사양 조립PC 특가전',
    badge: '인기 브랜드전',
    discountRate: '완제품 특가',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_PREBUILT_LINK,
    themeColor: 'emerald',
    tag: '완본체 추천',
    highlightText: 'A/S 1년 무상보증',
    imageUrl: '/banners/banner-prebuilt.jpg',
    imageAlt: '가성비 데스크탑 완본체 기획전'
  },
  {
    id: 'event-gaming-monitors',
    title: 'QHD 144Hz~240Hz 고주사율 게이밍 모니터 대전',
    subtitle: 'LG 울트라기어 & 삼성 오디세이 IPS 게이밍 모니터 카드 즉시할인',
    badge: '모니터 기획전',
    discountRate: '최대 20% 할인',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_MONITOR_LINK,
    themeColor: 'blue',
    tag: '고주사율 특별전',
    highlightText: '무결점 보증 & 로켓배송',
    imageUrl: '/banners/banner-monitor.jpg',
    imageAlt: '고주사율 게이밍 모니터 기획전'
  },
  {
    id: 'event-gaming-gear-festa',
    title: '로지텍 G & 레이저 게이밍 기어 페스티벌',
    subtitle: '초경량 무선 게이밍 마우스 & RGB 기계식 키보드 와우회원 핫딜',
    badge: '게이밍 기어전',
    discountRate: '와우 즉시할인',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_GEAR_LINK,
    themeColor: 'amber',
    tag: '주변기기 특가',
    highlightText: '프로게이머 실사용 센서',
    imageUrl: '/banners/banner-gear.jpg',
    imageAlt: '게이밍 기어 키보드 마우스 기획전'
  }
];

/**
 * 오늘 날짜 기준 유효한 활성 이벤트만 필터링하여 반환
 */
export function getActivePromoEvents(): PromoEvent[] {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return PROMO_EVENTS.filter((event) => {
    return todayStr >= event.startDate && todayStr <= event.endDate;
  });
}

/**
 * 남은 일수(D-Day) 계산 함수
 */
export function getEventRemainingDays(endDateStr: string): string {
  const today = new Date();
  const end = new Date(endDateStr);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return '오늘 마감';
  if (diffDays <= 7) return `마감 D-${diffDays}`;
  return `D-${diffDays}`;
}
