import { 
  OFFICIAL_PREBUILT_LINK, 
  OFFICIAL_COMPONENTS_LINK,
  OFFICIAL_MONITOR_LINK,
  OFFICIAL_GEAR_LINK,
  getPromoGatewayUrl
} from '@/lib/affiliate';

export type PlatformType = 'coupang' | 'gmarket' | 'ssg' | 'aliexpress' | '11st';

export interface PromoEvent {
  id: string;
  platform: PlatformType;
  platformName: string;
  title: string;
  subtitle: string;
  badge: string;
  discountRate?: string;
  couponText?: string;
  promoCode?: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  affiliateUrl: string;
  themeColor: 'cyan' | 'purple' | 'amber' | 'emerald' | 'blue' | 'rose' | 'red';
  tag: string;
  highlightText?: string;
  imageUrl?: string;
  imageAlt?: string;
}

/**
 * 전 플랫폼(쿠팡, G마켓, 알리익스프레스, SSG닷컴) 실시간 프로모션 & 쿠폰 기획전 데이터베이스
 * - startDate ~ endDate 기간 내에만 사이트에 자동 노출됩니다.
 * - 종료일이 지나면 사람의 개입 없이 100% 자동으로 내려갑니다.
 * - 각 플랫폼의 제휴 트래킹 링크(링크프라이스, 쿠팡 파트너스)가 탑재되어 있어 전환 시 수익이 자동 귀속됩니다.
 */
export const PROMO_EVENTS: PromoEvent[] = [
  // 1. [G마켓] 2026 디지털 가전 빅세일
  {
    id: 'event-gmarket-bigsale',
    platform: 'gmarket',
    platformName: 'G마켓',
    title: 'G마켓 디지털 가전 빅세일 & PC 주요 부품 페스타',
    subtitle: '조립PC 부품·게이밍 모니터 최대 15% 중복할인 쿠폰 & 카드사 7% 즉시할인',
    badge: 'G마켓 빅세일',
    discountRate: '최대 15% 중복쿠폰',
    couponText: '디지털 15% 중복쿠폰 발급중',
    promoCode: 'GMKT-PC15',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: getPromoGatewayUrl('gmarket', undefined, '게이밍 조립PC 컴퓨터부품'),
    themeColor: 'emerald',
    tag: '스마일클럽 혜택',
    highlightText: '스마일카드 결제 시 추가 적립',
    imageUrl: '/banners/banner-hardware.jpg',
    imageAlt: 'G마켓 디지털 가전 빅세일 기획전'
  },

  // 2. [알리익스프레스] 초이스 데이 & CPU·고속 SSD 직구 특가
  {
    id: 'event-ali-choice-day',
    platform: 'aliexpress',
    platformName: '알리익스프레스',
    title: '알리 초이스 데이 & 라이젠 7500F·SSD 해외직구 페스타',
    subtitle: '관세 면제 범위 내 초특가 직구, 5일 무료배송 & $5~$25 특별 프로모션 코드 공개',
    badge: '알리 초이스데이',
    discountRate: '최대 $25 할인코드',
    couponText: '$5~$25 프로모션 코드 적용 가능',
    promoCode: 'CHOICE04',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: getPromoGatewayUrl('aliexpress', undefined, 'AMD Ryzen 7500F 5600 SSD'),
    themeColor: 'red',
    tag: '5일 무료배송',
    highlightText: '한국 전용 결제수단 즉시할인',
    imageUrl: '/banners/banner-gaming-pc.jpg',
    imageAlt: '알리익스프레스 초이스 데이 프로모션'
  },

  // 3. [쿠팡] 2026 게이밍 조립 PC & 로켓배송 빅세일
  {
    id: 'event-pc-gaming-2026',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '2026 게이밍 조립 PC & 고성능 완본체 로켓 빅세일',
    subtitle: '로켓배송 인기 완본체 PC & 주요 게이밍 부품 카드사 최대 15% 즉시할인',
    badge: '쿠팡 로켓 기획전',
    discountRate: '최대 15% 카드할인',
    couponText: '와우회원 쿠폰 즉시적용',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_PREBUILT_LINK,
    themeColor: 'cyan',
    tag: '로켓와우 특별전',
    highlightText: '내일 아침 7시 전 문 앞 도착',
    imageUrl: '/banners/banner-prebuilt.jpg',
    imageAlt: '2026 게이밍 조립 PC 빅세일 기획전'
  },

  // 4. [SSG닷컴] 신세계 e스포츠 게이밍 & 모니터 디지털 위크
  {
    id: 'event-ssg-digital-week',
    platform: 'ssg',
    platformName: 'SSG닷컴',
    title: 'SSG 신세계 디지털 위크 완본체 PC & 모니터 대전',
    subtitle: 'LG 울트라기어 & 삼성 오디세이 게이밍 모니터 행사카드 10% 청구할인',
    badge: 'SSG 쓱데이',
    discountRate: '카드 10% 청구할인',
    couponText: '신세계몰 디지털 쿠폰팩',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: getPromoGatewayUrl('ssg', undefined, '게이밍모니터 조립PC'),
    themeColor: 'amber',
    tag: '신세계포인트 적립',
    highlightText: '신세계 백화점몰 공식보증',
    imageUrl: '/banners/banner-monitor.jpg',
    imageAlt: 'SSG닷컴 신세계 디지털 위크 기획전'
  },

  // 5. [쿠팡] 로지텍 G & 레이저 게이밍 기어 페스티벌
  {
    id: 'event-gaming-gear-festa',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '로지텍 G & 레이저 게이밍 기어 페스티벌',
    subtitle: '프로게이머 실사용 초경량 무선 게이밍 마우스 & RGB 기계식 키보드 와우회원 핫딜',
    badge: '게이밍 기어전',
    discountRate: '와우 즉시할인',
    couponText: '와우회원 전용 특가',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_GEAR_LINK,
    themeColor: 'purple',
    tag: '주변기기 특가',
    highlightText: '프로게이머 실사용 센서',
    imageUrl: '/banners/banner-gear.jpg',
    imageAlt: '게이밍 기어 키보드 마우스 기획전'
  }
];

/**
 * 오늘 날짜 기준 유효한 활성 이벤트만 필터링하여 반환
 */
export function getActivePromoEvents(platformFilter?: PlatformType | 'all'): PromoEvent[] {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  return PROMO_EVENTS.filter((event) => {
    const isDateValid = todayStr >= event.startDate && todayStr <= event.endDate;
    if (!isDateValid) return false;
    if (!platformFilter || platformFilter === 'all') return true;
    return event.platform === platformFilter;
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
