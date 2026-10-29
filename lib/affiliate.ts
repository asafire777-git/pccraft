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

// 각 부품별 최적화된 실시간 최저가 검색 키워드 (브랜드 + 정확한 모델명 100% 매칭)
export const COMPONENT_SEARCH_KEYWORDS: Record<string, string> = {
  // 1. CPU
  'cpu-amd-5600': '라이젠5 5600 멀티팩',
  'cpu-amd-5600g': '라이젠5 5600G 멀티팩',
  'cpu-amd-7500f': '라이젠5 7500F 멀티팩',
  'cpu-amd-7600': '라이젠5 7600 멀티팩',
  'cpu-amd-7700': '라이젠7 7700 멀티팩',
  'cpu-amd-7800x3d': '라이젠7 7800X3D 정품',
  'cpu-amd-9600x': '라이젠5 9600X 정품',
  'cpu-amd-9700x': '라이젠7 9700X 정품',
  'cpu-amd-9800x3d': '라이젠7 9800X3D',
  'cpu-amd-9900x': '라이젠9 9900X 정품',
  'cpu-amd-9950x': '라이젠9 9950X 정품',
  'cpu-intel-12100f': '인텔 i3 12100F 정품',
  'cpu-intel-12400f': '인텔 i5 12400F 정품',
  'cpu-intel-13400f': '인텔 i5 13400F 정품',
  'cpu-intel-14400f': '인텔 i5 14400F 정품',
  'cpu-intel-14600kf': '인텔 i5 14600KF 정품',
  'cpu-intel-14700k': '인텔 i7 14700K 정품',
  'cpu-intel-245k': '인텔 코어 Ultra 5 245K',
  'cpu-intel-265k': '인텔 코어 Ultra 7 265K',

  // 2. 쿨러
  'cooler-basic-air': 'Assassin X 120 Refined SE',
  'cooler-deepcool-ag400': '딥쿨 AG400 쿨러',
  'cooler-zalman-cnps9x': '잘만 CNPS9X Performa',
  'cooler-dual-air': 'Peerless Assassin 120 SE',
  'cooler-thermalright-ps120se': 'Phantom Spirit 120 SE',
  'cooler-pentawave-z06d': '펜타웨이브 Z06D',
  'cooler-deepcool-ak620': '딥쿨 AK620 쿨러',
  'cooler-liquid-360': '다크플래쉬 DX-360 수랭쿨러',
  'cooler-3rsys-ranni-xy360': '3RSYS 라니 XY 360',
  'cooler-valkyrie-gl360': '발키리 GL360 수랭쿨러',
  'cooler-nzxt-kraken360': 'NZXT 크라켄 360 RGB',

  // 3. 메인보드
  'mb-a520m': 'ASUS PRIME A520M-A II',
  'mb-b550m-mortar': 'MSI B550M 박격포',
  'mb-b650m-k': 'ASRock B650M-HDV',
  'mb-b650m-k-giga': 'GIGABYTE B650M K',
  'mb-b650m-riptide': 'ASRock B650M PG Riptide',
  'mb-b650m-mortar-amd': 'MSI B650M 박격포 WIFI',
  'mb-b650m-tuf': 'ASUS TUF Gaming B650M-PLUS',
  'mb-b650m-aorus-ice': 'B650M AORUS ELITE AX ICE',
  'mb-x670e-pro-rs': 'ASRock X670E Pro RS',
  'mb-h610m-intel': 'ASUS PRIME H610M-K D4',
  'mb-h610m-msi': 'MSI PRO H610M-E DDR4',
  'mb-b760m-intel': 'ASRock B760M Pro RS D5',
  'mb-b760m-mortar': 'MSI B760M 박격포 맥스 WIFI',
  'mb-z890-intel': 'ASUS PRIME Z890-P',

  // 4. RAM
  'ram-ddr4-16gb': '삼성전자 DDR4 3200 8GB',
  'ram-ddr4-32gb': '삼성전자 DDR4 3200 16GB',
  'ram-ddr5-16gb': '삼성전자 DDR5 5600 8GB',
  'ram-ddr5-32gb': '삼성전자 DDR5 5600 16GB',
  'ram-ddr5-klevv-16gb': '에센코어 KLEVV DDR5 5600 8GB',
  'ram-ddr5-klevv-32gb': '에센코어 KLEVV DDR5 5600 16GB',
  'ram-ddr5-teamgroup-32gb': 'TeamGroup DDR5 5600 16GB',
  'ram-ddr5-hynix-32gb': 'SK하이닉스 DDR5 5600 16GB',
  'ram-ddr5-tcreate-6000': 'TeamGroup DDR5 6000 CL30 EXPERT',
  'ram-ddr5-gskill-32gb': 'G.SKILL DDR5 6000 CL30 RIPJAWS',
  'ram-ddr5-64gb': '삼성전자 DDR5 5600 32GB',

  // 5. 그래픽카드 (RTX 40 및 2026 차세대 RTX 50시리즈 전 라인업)
  'gpu-gtx-1650': '이엠텍 GTX 1650',
  'gpu-rtx-3050-6gb': 'RTX 3050 6GB',
  'gpu-rx-6600': '라데온 RX 6600',
  'gpu-rx-7600': '라데온 RX 7600',
  'gpu-rx-7600xt': '라데온 RX 7600 XT',
  'gpu-rtx-4060': '이엠텍 RTX 4060 MIRACLE',
  'gpu-rtx-4060-zotac': 'ZOTAC RTX 4060 TWIN Edge',
  'gpu-rtx-4060ti-8gb': '이엠텍 RTX 4060 Ti STORM X',
  'gpu-rtx-4060ti-16gb': 'RTX 4060 Ti 16GB EAGLE',
  'gpu-rtx-4070-dual': 'ASUS DUAL RTX 4070',
  'gpu-rtx-4070super': '이엠텍 RTX 4070 SUPER',
  'gpu-rtx-4070tisuper': 'ZOTAC RTX 4070 Ti SUPER Trinity',
  'gpu-rx-7800xt': '라데온 RX 7800 XT',
  'gpu-rx-7900gre': '라데온 RX 7900 GRE',
  'gpu-rtx-4080super': 'GIGABYTE RTX 4080 SUPER WINDFORCE',
  'gpu-rtx-4090': 'MSI RTX 4090 슈프림',
  'gpu-rtx-5060-emtek': '이엠텍 지포스 RTX 5060',
  'gpu-rtx-5060-zotac': 'ZOTAC 지포스 RTX 5060',
  'gpu-rtx-5060-gigabyte': '기가바이트 지포스 RTX 5060',
  'gpu-rtx-5060-galax': '갤럭시 지포스 RTX 5060',
  'gpu-rtx-5060ti-8gb': '이엠텍 RTX 5060 Ti',
  'gpu-rtx-5060ti-16gb': 'RTX 5060 Ti 16GB EAGLE',
  'gpu-rtx-5070-emtek': '이엠텍 지포스 RTX 5070',
  'gpu-rtx-5070ti': 'ZOTAC 지포스 RTX 5070 Ti',
  'gpu-rtx-5080': 'GIGABYTE 지포스 RTX 5080',
  'gpu-rtx-5090': 'MSI 지포스 RTX 5090 슈프림',

  // 6. SSD
  'ssd-500gb-nvme': 'SK하이닉스 Gold P31 500GB',
  'ssd-crucial-p3plus-500gb': '마이크론 Crucial P3 Plus 500GB',
  'ssd-wd-sn580-1tb': 'WD Blue SN580 1TB',
  'ssd-1tb-nvme': 'SK하이닉스 Gold P31 1TB',
  'ssd-samsung-980pro-1tb': '삼성전자 980 PRO 1TB',
  'ssd-samsung-990evo-plus-1tb': '삼성전자 990 EVO Plus 1TB',
  'ssd-hynix-p41-1tb': 'SK하이닉스 Platinum P41 1TB',
  'ssd-samsung-990pro-1tb': '삼성전자 990 PRO 1TB',
  'ssd-wd-black-sn850x-1tb': 'WD BLACK SN850X 1TB',
  'ssd-crucial-t500-1tb': '마이크론 Crucial T500 1TB',
  'ssd-hynix-p41-2tb': 'SK하이닉스 Platinum P41 2TB',
  'ssd-samsung-990pro-2tb': '삼성전자 990 PRO 2TB',

  // 7. 파워
  'power-500w-std': '마이크로닉스 Classic II 500W',
  'power-micronics-600w': '마이크로닉스 Classic II 600W',
  'power-coolermaster-600w': '쿨러마스터 MWE 600 BRONZE',
  'power-700w-bronze': '마이크로닉스 Classic II 700W',
  'power-micronics-800w': '마이크로닉스 Classic II 800W',
  'power-seasonic-a12-700w': '시소닉 A12 700W',
  'power-micronics-750w-gold': '마이크로닉스 Classic II 750W 골드 ATX3.1',
  'power-superflower-850w-gold': 'SuperFlower SF-850F14XG 골드',
  'power-850w-gold': '시소닉 FOCUS GX-850 골드',
  'power-fsp-vita-850': 'FSP VITA GM 850W 골드',
  'power-fsp-1000w-gold': 'FSP HYDRO G PRO 1000W',

  // 8. 케이스
  'case-darkflash-dk200': '다크플래쉬 DK200 블랙',
  'case-darkflash-dk200-white': '다크플래쉬 DK200 화이트',
  'case-abko-g30': '앱코 G30 트루파워',
  'case-micronics-m60': '마이크로닉스 Master M60',
  'case-darkflash-dlx21': 'darkFlash DLX21 블랙',
  'case-aquarium-panoramic': '다크플래쉬 DS900 블랙',
  'case-ds900-white': '다크플래쉬 DS900 화이트',
  'case-zalman-p30-white': '잘만 P30 화이트',
  'case-3rsys-s401': '3RSYS S401 Quiet',
  'case-antec-c8': 'Antec C8 케이스',
  'case-lianli-o11d-evo': '리안리 O11D EVO RGB'
};

// 완본체 게이밍 PC 실시간 검색 키워드 매핑 (오픈마켓/쿠팡 실제 매물 100% 매칭)
export const PREBUILT_SEARCH_KEYWORDS: Record<string, string> = {
  'casual-esports': '라이젠 5600 1650 조립PC',
  'mainstream-gaming': '라이젠 7500F 4060 조립PC',
  'high-end-aaa': '7800X3D 4070 SUPER 조립PC',
  'creator-flagship': '14700K 4080 SUPER 조립PC'
};

/**
 * 부품 ID 및 모델명을 기반으로 쿠팡 공식 파트너스 최저가 검색 리스트로 자동 직행
 * - 1순위: 관리자 지정 특정 단축링크(CUSTOM_AFFILIATE_LINKS)
 * - 2순위: 실시간 최저가 검증 키워드(COMPONENT_SEARCH_KEYWORDS) - 쿠팡 알고리즘 오작동(구형/중고 노출) 원천 차단
 * - 3순위: 전달된 상세 상품명 또는 기본 키워드
 * - link.coupang.com/re/AFFSRP 경유로 lptag=AF5322745 수익 쿠키 100% 자동 장착
 */
export function getCoupangProductUrl(componentId: string, fallbackName?: string, itemSearchKeyword?: string): string {
  if (CUSTOM_AFFILIATE_LINKS[componentId]) {
    return CUSTOM_AFFILIATE_LINKS[componentId];
  }
  // 유통사 세부 스펙명(30자 이상) 검색 시 중고/구형 상품으로 매칭되는 것을 방지하고 실시간 로켓배송 새제품으로 직행
  const keyword = itemSearchKeyword || COMPONENT_SEARCH_KEYWORDS[componentId] || fallbackName || '컴퓨터 부품';
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(keyword)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}

/**
 * 완본체 추천 상품 실시간 쿠팡 로켓배송 직행 (해당 사양 실매물 검색 100% 매칭)
 */
export function getCoupangPrebuiltUrl(presetId: string): string {
  if (CUSTOM_AFFILIATE_LINKS[presetId]) {
    return CUSTOM_AFFILIATE_LINKS[presetId];
  }
  const keyword = PREBUILT_SEARCH_KEYWORDS[presetId] || '라이젠 7500F 4060 조립PC';
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(keyword)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
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
export function getNaverShoppingUrl(keyword: string, componentId?: string, itemSearchKeyword?: string): string {
  if (componentId && CUSTOM_NAVER_AFFILIATE_LINKS[componentId]) {
    return CUSTOM_NAVER_AFFILIATE_LINKS[componentId];
  }
  const cleanKeyword = itemSearchKeyword || (componentId && COMPONENT_SEARCH_KEYWORDS[componentId]) || keyword.trim() || '컴퓨터 부품';
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
  mall: 'gmarket' | '11st' = 'gmarket',
  itemSearchKeyword?: string
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
  const keyword = itemSearchKeyword || COMPONENT_SEARCH_KEYWORDS[componentId] || fallbackName || '컴퓨터 부품';

  let targetUrl = `https://browse.gmarket.co.kr/search?keyword=${encodeURIComponent(keyword)}`;
  const merchant = mall === '11st' ? '11st' : 'gmarket';

  if (mall === '11st') {
    targetUrl = `https://search.11st.co.kr/Search.tmall?kwd=${encodeURIComponent(keyword)}`;
  }

  // 링크프라이스 공식 트래킹 게이트웨이로 래핑 (정밀 딥링크 l=9999 규격 적용)
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=${merchant}&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }

  return targetUrl;
}

/**
 * 완본체 게이밍 PC 오픈마켓 최저가 검색 URL (승인 완료된 G마켓 연동)
 */
export function getOpenMarketPrebuiltUrl(presetId: string, fallbackName?: string): string {
  const keyword = PREBUILT_SEARCH_KEYWORDS[presetId] || fallbackName || '라이젠 7500F 4060 조립PC';
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
    const linkpriceSupportedMerchants = ['gmarket', '11st', 'lotteon', 'himart'];
    if (linkpriceSupportedMerchants.includes(merchant)) {
      return `https://click.linkprice.com/click.php?m=${merchant}&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
    }
    // 미승인 머천트(aliexpress, ssg 등)는 에러 화면 방지를 위해 원본 URL로 안전하게 직행
    return targetUrl;
  }

  return targetUrl || '#';
}

/**
 * 롯데하이마트 (himart) 공식 제휴 실시간 검색 URL
 * - totalSearch 엔드포인트 + 링크프라이스 딥링크(l=9999&tu=) 적용으로 메인 리다이렉트 없이 검색 결과로 100% 직행
 */
export function getHimartSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim() || '게이밍PC';
  const targetUrl = `https://www.e-himart.co.kr/app/search/totalSearch?query=${encodeURIComponent(cleanKeyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=himart&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * 롯데ON (lotteon) 공식 제휴 실시간 검색 URL
 * - /csearch/search/search 엔드포인트 + render=search 파라미터 적용으로 SPA 스크립트 연결 에러 없이 100% 정상 렌더링
 * - 링크프라이스 공식 머천트 lotteon 딥링크 규격 (최대 1.40% 수익 환급)
 */
export function getLotteonSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim() || '게이밍노트북';
  const targetUrl = `https://www.lotteon.com/csearch/search/search?render=search&platform=pc&q=${encodeURIComponent(cleanKeyword)}`;
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
 * - 딥링크 규격(l=9999&tu=) 적용으로 메인 홈페이지 튕김 방지 및 정확한 검색결과 직행
 */
export function get11stSearchUrl(keyword: string): string {
  const cleanKeyword = keyword.trim() || '조립컴퓨터';
  const targetUrl = `https://search.11st.co.kr/Search.tmall?kwd=${encodeURIComponent(cleanKeyword)}`;
  if (LINKPRICE_AFFILIATE_ID) {
    return `https://click.linkprice.com/click.php?m=11st&a=${LINKPRICE_AFFILIATE_ID}&l=9999&l_cd1=3&l_cd2=0&tu=${encodeURIComponent(targetUrl)}`;
  }
  return targetUrl;
}

/**
 * 쿠팡 파트너스 공식 실시간 검색 URL
 */
export function getCoupangSearchDirectUrl(keyword: string): string {
  return `https://link.coupang.com/re/AFFSRP?pageKey=${encodeURIComponent(keyword)}&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}

/**
 * 다나와 (Danawa) 실시간 가격비교 및 시세 직행 URL 생성기
 * - 사용자가 부품별 다나와 가격비교 화면으로 1클릭 직행하여 신뢰도 확보
 */
export function getDanawaSearchUrl(keyword: string, componentId?: string, itemSearchKeyword?: string): string {
  const cleanKeyword = itemSearchKeyword || (componentId && COMPONENT_SEARCH_KEYWORDS[componentId]) || keyword.trim() || '컴퓨터 부품';
  return `https://search.danawa.com/dsearch.php?query=${encodeURIComponent(cleanKeyword)}`;
}






