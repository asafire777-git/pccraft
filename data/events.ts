import { 
  OFFICIAL_PREBUILT_LINK, 
  OFFICIAL_COMPONENTS_LINK,
  OFFICIAL_MONITOR_LINK,
  OFFICIAL_GEAR_LINK,
  getPromoGatewayUrl
} from '@/lib/affiliate';

export type PlatformType = 'coupang' | 'gmarket' | 'lotteon' | 'ssg' | 'aliexpress' | '11st';

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
 * 전 플랫폼(쿠팡, G마켓, 롯데ON 등) 실시간 프로모션 & 쿠폰 기획전 데이터베이스
 * - 공식 승인된 머천트의 실제 진행 기획전만 엄선하여 노출합니다.
 * - startDate ~ endDate 기간 내에만 사이트에 자동 노출됩니다.
 * - 종료일이 지나면 사람의 개입 없이 100% 자동으로 내려갑니다.
 * - 각 플랫폼의 제휴 트래킹 링크(링크프라이스, 쿠팡 파트너스)가 탑재되어 있어 전환 시 수익이 자동 귀속됩니다.
 */
export const PROMO_EVENTS: PromoEvent[] = [
  // 1. [롯데ON] 30주년 온쇼페! (공식 승인 완료 머천트 실제 진행 기획전)
  {
    id: 'event-lotteon-30th',
    platform: 'lotteon',
    platformName: '롯데ON',
    title: '[롯데ON] 30주년 온쇼페! 디지털/가전 카테고리데이 & 메가딜',
    subtitle: '최대 30% 포인트백, 배민클럽 제휴할인 & 디지털가전 특별 기획전',
    badge: '30주년 온쇼페',
    discountRate: '최대 30% 혜택',
    couponText: '일 3회 순차오픈 & 결제할인',
    startDate: '2026-10-12',
    endDate: '2026-10-21',
    affiliateUrl: 'https://click.linkprice.com/click.php?m=lotteon&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fwww.lotteon.com%2Fdisplay%2Fshop%2FseltDpShop%2F53749%3Fch_no%3D100995%26ch_dtl_no%3D1075172',
    themeColor: 'red',
    tag: '온쇼페 특가',
    highlightText: '10/12 ~ 10/21 한정 기획전',
    imageUrl: '/banners/banner-lotteon-onshope.jpg',
    imageAlt: '롯데ON 30주년 온쇼페 디지털 가전 메가딜 기획전'
  },
  // 2. [쿠팡] 2026 게이밍 조립 PC & 로켓배송 실시간 기획전 (공식 승인 파트너스 링크)
  {
    id: 'event-pc-gaming-coupang',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '게이밍 조립 PC & 로켓배송 하드웨어 실시간 기획전',
    subtitle: '로켓배송 인기 완본체 PC & 주요 게이밍 부품 당일/익일 로켓배송 특가전',
    badge: '로켓배송 기획전',
    discountRate: '와우회원 즉시할인',
    couponText: '로켓와우 전용 배송 & 할인 혜택',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_PREBUILT_LINK,
    themeColor: 'cyan',
    tag: '로켓배송',
    highlightText: '내일 아침 7시 전 문 앞 도착',
    imageUrl: '/banners/banner-prebuilt.jpg',
    imageAlt: '2026 게이밍 조립 PC 빅세일 기획전'
  },

  // 3. [쿠팡] 로지텍 G & 레이저 게이밍 기어 페스티벌 (공식 승인 파트너스 링크)
  {
    id: 'event-gaming-gear-festa',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '로지텍 G & 레이저 게이밍 기어 페스티벌',
    subtitle: '프로게이머 실사용 초경량 무선 게이밍 마우스 & RGB 기계식 키보드 모음전',
    badge: '게이밍 기어전',
    discountRate: '주변기기 특가전',
    couponText: '카드사 및 와우 즉시할인 적용',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_GEAR_LINK,
    themeColor: 'purple',
    tag: '주변기기',
    highlightText: '인기 게이밍 기어 브랜드관',
    imageUrl: '/banners/banner-gear.jpg',
    imageAlt: '게이밍 기어 키보드 마우스 기획전'
  },

  // 4. [쿠팡] 조립 PC 주요 하드웨어 부품 특가전 (공식 승인 파트너스 링크)
  {
    id: 'event-hardware-components',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '조립 PC 주요 하드웨어 & 부품 로켓 특가전',
    subtitle: 'CPU, 메인보드, 그래픽카드, SSD 등 견적 필수 부품 공식 수입사 로켓배송',
    badge: '컴퓨터 부품관',
    discountRate: '실시간 로켓특가',
    couponText: '부품별 실시간 가격 비교',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_COMPONENTS_LINK,
    themeColor: 'blue',
    tag: '컴퓨터 부품',
    highlightText: '공식 정품 로켓배송',
    imageUrl: '/banners/banner-hardware.jpg',
    imageAlt: '조립 PC 부품 기획전'
  },

  // 5. [G마켓] PC 주요 부품 & 완본체 실시간 최저가 탐색전
  {
    id: 'event-gmarket-pc',
    platform: 'gmarket',
    platformName: 'G마켓',
    title: 'G마켓 조립 PC & 컴퓨터 주요 부품 실시간 특가전',
    subtitle: '라이젠, 지포스 그래픽카드, 고성능 SSD 등 오픈마켓 판매처별 실시간 최저가',
    badge: '오픈마켓 특가',
    discountRate: '판매자별 즉시할인',
    couponText: '쿠폰존에서 다운로드 쿠폰 확인 가능',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: getPromoGatewayUrl('gmarket', undefined, '게이밍 조립PC 컴퓨터부품'),
    themeColor: 'emerald',
    tag: '실시간 검색',
    highlightText: '오픈마켓 최저가 비교',
    imageUrl: '/banners/banner-gaming-pc.jpg',
    imageAlt: 'G마켓 PC 부품 특가'
  },

  // 6. [쿠팡] 삼성 오디세이 & LG 울트라기어 고주사율 게이밍 모니터 대전 (공식 승인 파트너스 링크)
  {
    id: 'event-gaming-monitor-festa',
    platform: 'coupang',
    platformName: '쿠팡',
    title: '삼성 오디세이 & LG 울트라기어 고주사율 게이밍 모니터 대전',
    subtitle: '4K OLED & QHD 240Hz 커브드 게이밍 모니터 불량화소 무결점 보증 로켓배송 특가',
    badge: '게이밍 모니터',
    discountRate: '와우회원 쿠폰할인',
    couponText: '카드사 즉시할인 & 무이자할부',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    affiliateUrl: OFFICIAL_MONITOR_LINK,
    themeColor: 'purple',
    tag: '디스플레이',
    highlightText: '로켓배송 무료설치',
    imageUrl: '/banners/banner-monitor.jpg',
    imageAlt: '삼성 LG 고주사율 게이밍 모니터 기획전'
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
 * - 특정 기간 한정 이벤트일 때만 실제 D-Day를 표시하고,
 * - 연중 상시 운영 기획전의 경우 '상시 진행' 또는 '진행중'으로 정직하게 표기합니다.
 */
export function getEventRemainingDays(endDateStr: string): string {
  const today = new Date();
  const end = new Date(endDateStr);
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return '오늘 마감';
  if (diffDays <= 14) return `마감 D-${diffDays}`;
  return '상시 진행';
}
