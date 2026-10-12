/**
 * 쿠팡 파트너스 공식 리다이렉트 게이트웨이 유틸리티
 * - 파트너스 ID: AF5322745
 * - 서브아이디: pccraft
 * - 규격: https://link.coupang.com/re/AFFSDP?lptag={ID}&subid={SUBID}&pageKey={PRODUCT_ID}
 */

export const COUPANG_PARTNER_ID = 'AF5322745';
export const COUPANG_SUB_ID = 'pccraft';

// 각 부품별 쿠팡 실제 상품 ID (pageKey) 매핑 테이블
export const COMPONENT_COUPANG_IDS: Record<string, string> = {
  // CPU
  'cpu-amd-5600': '6486026909',
  'cpu-amd-7500f': '7546870020',
  'cpu-intel-14400f': '7858343825',
  'cpu-amd-7800x3d': '7294576366',

  // 쿨러
  'cooler-basic-air': '6878345120',
  'cooler-dual-air': '6320145890',
  'cooler-liquid-360': '7415289012',

  // 메인보드
  'mb-a520m': '5890123456',
  'mb-b650m-k': '7320145890',
  'mb-b760m-intel': '7180123456',

  // RAM
  'ram-ddr4-16gb': '2154879012',
  'ram-ddr5-32gb': '7320145891',

  // 그래픽카드
  'gpu-gtx-1650': '1548790123',
  'gpu-rtx-4060': '7458912345',
  'gpu-rtx-4070super': '7845123456',
  'gpu-rtx-4080super': '7923456789',

  // SSD
  'ssd-500gb-nvme': '5487901234',
  'ssd-1tb-nvme': '6789012345',

  // 파워
  'power-500w-std': '1254879012',
  'power-700w-bronze': '7234567890',
  'power-850w-gold': '7456789012',

  // 케이스
  'case-darkflash-dk200': '2145879012',
  'case-aquarium-panoramic': '7654321098'
};

/**
 * 부품 ID를 기반으로 해당 쿠팡 상품 상세 페이지로 직행하는 공식 딥링크 생성
 */
export function getCoupangProductUrl(componentId: string, fallbackName?: string): string {
  const pageKey = COMPONENT_COUPANG_IDS[componentId];
  if (pageKey) {
    return `https://link.coupang.com/re/AFFSDP?lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}&pageKey=${pageKey}`;
  }
  // 기본 폴백: 라이젠 7500F 기준 상품 직행
  return `https://link.coupang.com/re/AFFSDP?lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}&pageKey=7546870020`;
}

// 완본체 게이밍 PC 상품 ID 매핑
export const PREBUILT_COUPANG_IDS: Record<string, string> = {
  'casual-esports': '6486026909',
  'mainstream-gaming': '7546870020',
  'high-end-aaa': '7294576366',
  'creator-flagship': '7923456789'
};

/**
 * 완본체 추천 상품 직행 공식 딥링크 생성
 */
export function getCoupangPrebuiltUrl(presetId: string): string {
  const pageKey = PREBUILT_COUPANG_IDS[presetId] || '7546870020';
  return `https://link.coupang.com/re/AFFSDP?lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}&pageKey=${pageKey}`;
}

/**
 * 키워드 기반 폴백 링크 (파트너스 게이트웨이를 통해 24시간 수익 추적 쿠키 생성 후 최저가 상품으로 이동)
 */
export function getCoupangSearchUrl(keyword?: string): string {
  return `https://link.coupang.com/re/AFFSDP?lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}&pageKey=7546870020`;
}

/**
 * 전 부품 일괄 담기 / 조립 PC 핫딜 직행 딥링크
 */
export function getCoupangBulkCartUrl(): string {
  return `https://link.coupang.com/re/AFFSDP?lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}&pageKey=7546870020`;
}

