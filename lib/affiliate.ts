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
export const OFFICIAL_MONITOR_LINK = `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent('게이밍모니터')}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
export const OFFICIAL_GEAR_LINK = `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent('게이밍키보드마우스')}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
export const OFFICIAL_HARDWARE_FESTA_LINK = `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent('조립컴퓨터부품')}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;

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

  // 그래픽카드 (2026 최신 라인업 및 검증된 가성비 라인업)
  'gpu-gtx-1650': 'GTX 1650 그래픽카드',
  'gpu-rtx-4060': 'RTX 4060 그래픽카드',
  'gpu-rtx-5060': 'RTX 5060 그래픽카드',
  'gpu-rtx-5070': 'RTX 5070 그래픽카드',
  'gpu-rtx-5080': 'RTX 5080 그래픽카드',
  'gpu-rtx-4070super': 'RTX 5070 그래픽카드',
  'gpu-rtx-4080super': 'RTX 5080 그래픽카드',

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

// 완본체 게이밍 PC 실시간 검색 키워드 매핑 (2026 최신 사양 반영)
export const PREBUILT_SEARCH_KEYWORDS: Record<string, string> = {
  'casual-esports': '라이젠 5600 조립PC',
  'mainstream-gaming': '라이젠 7500F RTX 5060 조립PC',
  'high-end-aaa': '7800X3D RTX 5070 조립PC',
  'creator-flagship': 'RTX 5080 게이밍 조립PC'
};

/**
 * 부품 ID 및 모델명을 기반으로 쿠팡 공식 파트너스 최저가 검색 리스트로 자동 직행
 * - 1순위: 관리자 지정 특정 단축링크(CUSTOM_AFFILIATE_LINKS)
 * - 2순위: 실시간 최저가 검증 키워드(COMPONENT_SEARCH_KEYWORDS) - 쿠팡 알고리즘 오작동(구형/중고 노출) 원천 차단
 * - 3순위: 전달된 상세 상품명 또는 기본 키워드
 * - link.coupang.com/re/AFFSRP 경유로 lptag=AF5322745 수익 쿠키 100% 자동 장착
 */
export function getCoupangProductUrl(componentId: string, fallbackName?: string): string {
  if (CUSTOM_AFFILIATE_LINKS[componentId]) {
    return CUSTOM_AFFILIATE_LINKS[componentId];
  }
  // 유통사 세부 스펙명(30자 이상) 검색 시 중고/구형 상품으로 매칭되는 것을 방지하고 실시간 로켓배송 새제품으로 직행
  const keyword = COMPONENT_SEARCH_KEYWORDS[componentId] || fallbackName || '컴퓨터 부품';
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(keyword)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
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
 * 키워드 기반 범용 검색 URL (대표님 파트너스 트래킹 공식 게이트웨이)
 * - 사용자가 5070, RTX 4060 등 무엇을 검색하든 lptag=AF5322745 코드가 100% 심어진 상태로 쿠팡 검색창 직행
 */
export function getCoupangSearchUrl(keyword?: string): string {
  const query = keyword?.trim() || '조립컴퓨터 부품';
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(query)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}

/**
 * 전 부품 일괄 담기 / 핫딜 직행 (대표님 파트너스 공식 링크)
 */
export function getCoupangBulkCartUrl(): string {
  // 대표님 전용 파트너스 컴퓨터 부품 공식 단축링크
  return OFFICIAL_COMPONENTS_LINK;
}

// -------------------------------------------------------------
// 네이버 쇼핑 & 네이버 브랜드커넥트 연동 게이트웨이
// -------------------------------------------------------------

// 네이버 브랜드커넥트 또는 개별 단축 제휴 링크가 있을 경우 등록
export const CUSTOM_NAVER_AFFILIATE_LINKS: Record<string, string> = {
  // 대표님이 네이버 브랜드커넥트에서 생성한 코드가 생기면 여기에 ID별로 입력 시 즉시 최우선 적용
};

/**
 * 네이버 쇼핑 실시간 최저가 검색 URL 생성기
 * - 브랜드커넥트 링크 등록 시 해당 링크 최우선 반영
 */
export function getNaverShoppingUrl(keyword: string, componentId?: string): string {
  if (componentId && CUSTOM_NAVER_AFFILIATE_LINKS[componentId]) {
    return CUSTOM_NAVER_AFFILIATE_LINKS[componentId];
  }
  const cleanKeyword = keyword.trim() || '컴퓨터 부품';
  return `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(cleanKeyword)}`;
}

// -------------------------------------------------------------
// 링크프라이스(LinkPrice) & 오픈마켓 (11번가 / G마켓) 연동 게이트웨이
// -------------------------------------------------------------

// 대표님 링크프라이스 공식 어필리에이트 사이트 코드 (PC-Craft 채널: A100708723)
export const LINKPRICE_AFFILIATE_ID = process.env.NEXT_PUBLIC_LINKPRICE_A_ID || 'A100708723';

// G마켓 특정 상품 고유 코드(goodscode) 수동 매핑 사전 (등록 시 검색결과 대신 100% 해당 상품 상세페이지로 직행)
export const CUSTOM_GMARKET_GOODS_CODES: Record<string, string> = {
  // 대표님이 특정 상품 직행 코드를 확보하시면 여기에 등록 시 즉시 적용 (예: 'cpu-amd-5600': '2483861841')
};

/**
 * 오픈마켓 (G마켓, 11번가 등) 실시간 최저가 직행 URL 생성기
 * - G마켓의 경우 링크프라이스 공식 딥링크 규격(l=9999&l_cd1=3&l_cd2=0&tu=...)을 적용하여
 *   메인 페이지로 튕기지 않고 정확한 브랜드/모델명 검색 결과 또는 해당 상품 상세페이지로 100% 직행합니다.
 * - 링크프라이스 공식 트래킹 코드(A100708723)가 100% 장착되어 수익 추적을 유지합니다.
 */
export function getOpenMarketProductUrl(
  componentId: string,
  fallbackName?: string,
  mall: 'gmarket' | '11st' = 'gmarket'
): string {
  // 1. 특정 상품 goodscode가 등록되어 있는 경우 상품 상세 페이지로 우선 직행
  if (mall === 'gmarket' && CUSTOM_GMARKET_GOODS_CODES[componentId]) {
    const itemUrl = `https://item.gmarket.co.kr/Item?goodscode=${CUSTOM_GMARKET_GOODS_CODES[componentId]}`;
    if (LINKPRICE_AFFILIATE_ID) {
      return `https://click.linkprice.com/click.php?m=gmarket&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(itemUrl)}`;
    }
    return itemUrl;
  }

  // 2. 정확한 브랜드 + 최적화 키워드 우선 적용 (품절 및 긴 유통사명으로 인한 검색 0건 방지)
  const keyword = COMPONENT_SEARCH_KEYWORDS[componentId] || fallbackName || '컴퓨터 부품';

  let targetUrl = `https://browse.gmarket.co.kr/search?keyword=${encodeURIComponent(keyword)}`;
  const merchant = mall === '11st' ? '11st' : 'gmarket';

  if (mall === '11st') {
    targetUrl = `https://search.11st.co.kr/Search.tmall?kwd=${encodeURIComponent(keyword)}`;
  }

  // 링크프라이스 공식 트래킹 게이트웨이로 래핑
  if (LINKPRICE_AFFILIATE_ID) {
    if (merchant === 'gmarket') {
      // G마켓 전용 정밀 딥링크 규격 (l=9999, l_cd1=3, l_cd2=0, tu=인코딩URL)
      return `https://click.linkprice.com/click.php?m=gmarket&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
    }
    return `https://click.linkprice.com/click.php?m=${merchant}&a=${LINKPRICE_AFFILIATE_ID}&l=0000&url=${encodeURIComponent(targetUrl)}`;
  }

  return targetUrl;
}

/**
 * 완본체 게이밍 PC 오픈마켓 최저가 검색 URL (승인 완료된 G마켓 연동)
 */
export function getOpenMarketPrebuiltUrl(presetId: string, fallbackName?: string): string {
  const keyword = fallbackName || PREBUILT_SEARCH_KEYWORDS[presetId] || '게이밍 조립PC';
  const targetUrl = `https://browse.gmarket.co.kr/search?keyword=${encodeURIComponent(keyword)}`;

  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=gmarket&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }

  return targetUrl;
}

/**
 * 다채널 오픈마켓 (G마켓 / SSG / 알리익스프레스 / 11번가) 프로모션 기획전 직행 URL 생성기
 * - G마켓의 경우 딥링크 파라미터(tu)를 적용하여 메인이 아닌 해당 기획전 검색 페이지로 정확히 직행
 * - 링크프라이스 공식 제휴 코드(A100708723)가 자동 장착되어 수익 추적 100% 보장
 */
export function getPromoGatewayUrl(
  platform: 'gmarket' | 'ssg' | 'aliexpress' | '11st' | 'coupang',
  rawUrl?: string,
  fallbackKeyword?: string
): string {
  if (platform === 'coupang') {
    return rawUrl || OFFICIAL_PREBUILT_LINK;
  }

  const keyword = fallbackKeyword || '조립컴퓨터 부품';
  let targetUrl = rawUrl;

  if (!targetUrl) {
    if (platform === 'gmarket') {
      targetUrl = `https://browse.gmarket.co.kr/search?keyword=${encodeURIComponent(keyword)}`;
    } else if (platform === 'ssg') {
      targetUrl = `https://www.ssg.com/search.ssg?target=all&query=${encodeURIComponent(keyword)}`;
    } else if (platform === 'aliexpress') {
      targetUrl = `https://ko.aliexpress.com/wholesale?SearchText=${encodeURIComponent(keyword)}`;
    } else if (platform === '11st') {
      targetUrl = `https://search.11st.co.kr/Search.tmall?kwd=${encodeURIComponent(keyword)}`;
    }
  }

  const merchantMap: Record<string, string> = {
    gmarket: 'gmarket',
    ssg: 'ssg',
    aliexpress: 'aliexpress',
    '11st': '11st'
  };

  const merchant = merchantMap[platform] || 'gmarket';

  if (LINKPRICE_AFFILIATE_ID && targetUrl) {
    if (merchant === 'gmarket') {
      return `https://click.linkprice.com/click.php?m=gmarket&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
    }
    return `https://click.linkprice.com/click.php?m=${merchant}&a=${LINKPRICE_AFFILIATE_ID}&l=0000&url=${encodeURIComponent(targetUrl)}`;
  }

  return targetUrl || '#';
}

/**
 * 롯데하이마트 (himart) 공식 제휴 실시간 검색 URL
 * - 링크프라이스 공식 머천트 himart 게이트웨이 경유 (최대 1.26% 수익 환급)
 */
export function getHimartSearchUrl(keyword: string): string {
  const targetUrl = `https://www.e-himart.co.kr/app/search/searchMain?query=${encodeURIComponent(keyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=himart&a=${LINKPRICE_AFFILIATE_ID}&l=0000&url=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * 롯데ON (lotteon) 공식 제휴 실시간 검색 URL
 * - 링크프라이스 공식 머천트 lotteon 딥링크 규격 (최대 1.40% 수익 환급)
 */
export function getLotteonSearchUrl(keyword: string): string {
  const targetUrl = `https://www.lotteon.com/search/search/search.ecn?render=page&platform=pc&q=${encodeURIComponent(keyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=lotteon&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * G마켓 (gmarket) 공식 제휴 실시간 검색 URL
 */
export function getGmarketSearchUrl(keyword: string): string {
  const targetUrl = `https://browse.gmarket.co.kr/search?keyword=${encodeURIComponent(keyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=gmarket&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * 11번가 (11st) 공식 제휴 실시간 검색 URL
 * - 링크프라이스 공식 머천트 11st 게이트웨이 경유 (A100708723)
 */
export function get11stSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim() || '조립컴퓨터';
  const targetUrl = `https://search.11st.co.kr/Search.tmall?kwd=${encodeURIComponent(cleanKeyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=11st&a=${LINKPRICE_AFFILIATE_ID}&l=0000&url=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * 쿠팡 파트너스 공식 실시간 검색 URL
 */
export function getCoupangSearchDirectUrl(keyword: string): string {
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(keyword)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}






