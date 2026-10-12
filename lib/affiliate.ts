/**
 * 쿠팡 파트너스 연동 및 실시간 하드웨어 최저가 검색 게이트웨이
 * - 파트너스 ID: AF5322745
 * - 서브아이디: pccraft
 * 
 * 1) 기본 동작: 각 부품 및 완본체의 실제 모델명으로 쿠팡 '로켓배송 최저가 실시간 검색 리스트'로 100% 자동 직행
 * 2) 수동 오버라이드 지원: 대표님이 쿠팡 파트너스에서 생성한 특정 단축링크가 있을 경우 CUSTOM_AFFILIATE_LINKS에 등록 시 즉시 적용
 */

export const COUPANG_PARTNER_ID = 'AF5322745';
export const COUPANG_SUB_ID = 'pccraft';

// 대표님의 공식 검증된 쿠팡 파트너스 간편 링크 (24시간 수익 추적 + lptag 공식 승인)
export const OFFICIAL_PREBUILT_LINK = 'https://link.coupang.com/a/hMDhTKsW5I'; // 게이밍 조립PC 검색결과
export const OFFICIAL_COMPONENTS_LINK = 'https://link.coupang.com/a/hMDkzpg8om'; // 컴퓨터 부품 검색결과

// 특정 부품에 대해 대표님이 직접 생성한 공식 단축링크가 있을 경우 여기에 입력
export const CUSTOM_AFFILIATE_LINKS: Record<string, string> = {
  // 개별 부품별 링크 등록 시 즉시 최우선 적용
};

// 각 부품별 최적화된 로켓배송 실시간 최저가 검색 키워드
export const COMPONENT_SEARCH_KEYWORDS: Record<string, string> = {
  // CPU
  'cpu-amd-5600': '라이젠5 5600',
  'cpu-amd-7500f': '라이젠5 7500F',
  'cpu-intel-14400f': '인텔 i5 14400F',
  'cpu-amd-7800x3d': '라이젠7 7800X3D',

  // 쿨러
  'cooler-basic-air': 'Assassin X 120 쿨러',
  'cooler-dual-air': 'Peerless Assassin 120 쿨러',
  'cooler-liquid-360': '3열 수랭쿨러 360',

  // 메인보드
  'mb-a520m': 'A520M 메인보드',
  'mb-b650m-k': 'B650M 메인보드',
  'mb-b760m-intel': 'B760M 메인보드',

  // RAM
  'ram-ddr4-16gb': 'DDR4 16GB 데스크탑 램',
  'ram-ddr5-32gb': 'DDR5 32GB 데스크탑 램',

  // 그래픽카드
  'gpu-gtx-1650': 'GTX 1650 그래픽카드',
  'gpu-rtx-4060': 'RTX 4060 그래픽카드',
  'gpu-rtx-4070super': 'RTX 4070 SUPER 그래픽카드',
  'gpu-rtx-4080super': 'RTX 4080 SUPER 그래픽카드',

  // SSD
  'ssd-500gb-nvme': '500GB M.2 NVMe SSD',
  'ssd-1tb-nvme': '1TB M.2 NVMe SSD',

  // 파워
  'power-500w-std': '500W 컴퓨터 파워서플라이',
  'power-700w-bronze': '700W 컴퓨터 파워서플라이',
  'power-850w-gold': '850W 골드 컴퓨터 파워',

  // 케이스
  'case-darkflash-dk200': '다크플래쉬 DK200 케이스',
  'case-aquarium-panoramic': '어항 PC 케이스'
};

// 완본체 게이밍 PC 실시간 검색 키워드 매핑
export const PREBUILT_SEARCH_KEYWORDS: Record<string, string> = {
  'casual-esports': '라이젠 5600 조립PC',
  'mainstream-gaming': '라이젠 7500F RTX 4060 조립PC',
  'high-end-aaa': '7800X3D RTX 4070 SUPER 조립PC',
  'creator-flagship': 'RTX 4080 SUPER 게이밍 조립PC'
};

/**
 * 부품 ID를 기반으로 쿠팡 실시간 로켓배송 최저가 검색 리스트로 자동 직행
 */
export function getCoupangProductUrl(componentId: string, fallbackName?: string): string {
  if (CUSTOM_AFFILIATE_LINKS[componentId]) {
    return CUSTOM_AFFILIATE_LINKS[componentId];
  }
  const keyword = COMPONENT_SEARCH_KEYWORDS[componentId] || fallbackName || '컴퓨터 부품';
  return `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(keyword)}&filter=rocket_delivery%3Atrue`;
}

/**
 * 완본체 추천 상품 실시간 쿠팡 로켓배송 직행 (대표님 파트너스 공식 링크)
 */
export function getCoupangPrebuiltUrl(presetId: string): string {
  if (CUSTOM_AFFILIATE_LINKS[presetId]) {
    return CUSTOM_AFFILIATE_LINKS[presetId];
  }
  // 대표님 전용 파트너스 게이밍 조립PC 공식 단축링크
  return OFFICIAL_PREBUILT_LINK;
}

/**
 * 키워드 기반 범용 검색 URL
 */
export function getCoupangSearchUrl(keyword?: string): string {
  const query = keyword || '조립컴퓨터 부품';
  return `https://www.coupang.com/np/search?component=&q=${encodeURIComponent(query)}&filter=rocket_delivery%3Atrue`;
}

/**
 * 전 부품 일괄 담기 / 핫딜 직행 (대표님 파트너스 공식 링크)
 */
export function getCoupangBulkCartUrl(): string {
  // 대표님 전용 파트너스 컴퓨터 부품 공식 단축링크
  return OFFICIAL_COMPONENTS_LINK;
}
