export type LaptopCategory = 
  | 'budget-gaming' 
  | 'flagship-gaming' 
  | 'slim-creator' 
  | 'brand-desktop';

export type AvailableMall = 'danawa' | 'coupang' | 'gmarket' | '11st' | 'himart' | 'lotteon';

export interface LaptopProduct {
  id: string;
  category: LaptopCategory;
  categoryLabel: string;
  brand: 'Lenovo' | 'ASUS' | 'HP' | '삼성전자' | 'LG전자' | '한성컴퓨터' | '프리플로우' | '포유컴퓨터';
  modelName: string;
  title: string;
  badge: string;
  badgeColor: 'rose' | 'cyan' | 'amber' | 'emerald' | 'purple';
  regularPrice: number;
  discountPrice: number;
  effectivePrice: number; // 청구할인/쿠폰 적용 예상 실구매 체감가
  cardBenefit: string;
  cpu: string;
  gpu: string;
  tgp: string;
  ram: string;
  storage: string;
  display: string;
  weight: string;
  battery: string;
  os: string;
  warranty: string;
  gameBenchmarks: { game: string; fps: string }[];
  highlights: string[];
  searchKeyword: string;
  danawaPcode?: string;
  danawaUrl?: string;
  availableMalls: AvailableMall[];
  mallKeywords?: Partial<Record<AvailableMall, string>>;
  recommendedReason: string;
}

/**
 * 2026 대한민국 시장 100% 실존 매물 기준 공식 큐레이션 라인업
 * - 다나와 가격비교 상위권 및 4대 오픈마켓/양판점에 실제 재고가 존재하는 정식 유통 모델만 엄선
 * - 각 제품별로 실제 입점되어 판매 중인 마켓만 버튼을 동적으로 연결하여 0건 검색을 원천 차단
 */
export const CURATED_LAPTOPS: LaptopProduct[] = [
  // 1. 레노버 LOQ 15 (100만원대 국민 게이밍 랩탑 1위)
  {
    id: 'lenovo-loq-15',
    category: 'budget-gaming',
    categoryLabel: '100만원대 가성비 1위',
    brand: 'Lenovo',
    modelName: 'LOQ 15IAX9 / 15IRX9',
    title: '레노버 LOQ 15 (i5-13450HX + RTX 4060)',
    badge: '👑 100만 원대 판매 1위 가성비',
    badgeColor: 'cyan',
    regularPrice: 1290000,
    discountPrice: 1190000,
    effectivePrice: 1090000,
    cardBenefit: '쿠팡 로켓 / G마켓 카드 즉시할인 시',
    cpu: '인텔 코어 i5-13450HX (10코어 16스레드)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: '최대 TGP 115W (MUX 스위치 탑재)',
    ram: '16GB DDR5-4800 (확장 슬롯 지원)',
    storage: '512GB M.2 NVMe PCIe 4.0 SSD',
    display: '15.6인치 FHD (1920x1080) 144Hz G-Sync 300nits 100% sRGB',
    weight: '2.38kg',
    battery: '60Wh (170W 어댑터)',
    os: 'FreeDOS (윈도우 미포함, 설치 간편)',
    warranty: '1년 레노버 공식 보증 서비스',
    gameBenchmarks: [
      { game: '배틀그라운드 FHD 국민옵션', fps: '평균 165 FPS' },
      { game: '발로란트 144Hz 풀옵션', fps: '평균 280 FPS' },
      { game: '로스트아크 QHD 최상옵', fps: '평균 120 FPS' }
    ],
    highlights: [
      '100만 원대 초반에서 VRAM 8GB의 RTX 4060 그래픽을 온전히 손에 넣는 국민 입문형',
      'HX 시리즈 고성능 프로세서로 멀티태스킹 최적화',
      'G-Sync 지원 100% sRGB 디스플레이로 화면 찢어짐(티어링) 제로'
    ],
    searchKeyword: '레노버 LOQ 15',
    danawaPcode: '72417755',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st', 'himart', 'lotteon'],
    mallKeywords: {
      danawa: '레노버 LOQ 15',
      coupang: '레노버 LOQ 15',
      gmarket: '레노버 LOQ 15',
      '11st': '레노버 LOQ 15',
      himart: '레노버 LOQ 15',
      lotteon: '레노버 LOQ 15'
    },
    recommendedReason: '100만 원대 초반 예산으로 배그·롤·발로란트부터 최신 스팀 게임까지 풀옵션으로 즐길 수 있는 현존 최강의 가성비 모델입니다.'
  },

  // 2. HP 빅터스 16 (대학생/국민 게이밍 베스트셀러)
  {
    id: 'hp-victus-16',
    category: 'budget-gaming',
    categoryLabel: '국민 16인치 가성비',
    brand: 'HP',
    modelName: 'Victus 16-r1000 / 16-s1000',
    title: 'HP 빅터스 16 (i5-14450HX + RTX 4060)',
    badge: '⚡ 대학생·입문용 16인치 베스트셀러',
    badgeColor: 'emerald',
    regularPrice: 1390000,
    discountPrice: 1290000,
    effectivePrice: 1180000,
    cardBenefit: '쿠팡 와우 / 11번가 슈팅배송 할인 시',
    cpu: '인텔 14세대 코어 i5-14450HX (10코어 16스레드)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: 'TGP 120W 풀파워',
    ram: '16GB DDR5-5600 듀얼채널',
    storage: '512GB PCIe 4.0 NVMe SSD',
    display: '16.1인치 FHD (1920x1080) 165Hz IPS 300nits 100% sRGB',
    weight: '2.31kg',
    battery: '70Wh 고용량 배터리',
    os: 'FreeDOS',
    warranty: '1년 HP 공식 전국 서비스망 무상 보증',
    gameBenchmarks: [
      { game: '리그 오브 레전드 풀옵션', fps: '평균 260 FPS' },
      { game: '발로란트 165Hz 방어', fps: '평균 240 FPS' },
      { game: '오버워치 2 높음', fps: '평균 160 FPS' }
    ],
    highlights: [
      '최신 14세대 인텔 i5 프로세서와 120W 풀파워 RTX 4060 탑재',
      '16.1인치 대화면과 165Hz 고주사율, 100% sRGB 색역 지원',
      'HP 공식 전국 서비스센터망을 갖춰 A/S 걱정 없는 안심 선택'
    ],
    searchKeyword: 'HP 빅터스 16',
    danawaPcode: '58456529',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st', 'himart', 'lotteon'],
    mallKeywords: {
      danawa: 'HP 빅터스 16',
      coupang: 'HP 빅터스 16',
      gmarket: 'HP 빅터스 16',
      '11st': 'HP 빅터스 16',
      himart: 'HP 빅터스 16',
      lotteon: 'HP 빅터스 16'
    },
    recommendedReason: '부담 없는 110만 원대 실구매가에 16.1인치 대화면과 탄탄한 전국 A/S망을 누릴 수 있어 대학생 및 직장인 첫 게이밍 랩탑으로 가장 추천합니다.'
  },

  // 3. ASUS TUF 게이밍 A16 (밀스펙 내구성 & 전성비)
  {
    id: 'asus-tuf-a16',
    category: 'budget-gaming',
    categoryLabel: '밀스펙 내구성 챔피언',
    brand: 'ASUS',
    modelName: 'TUF Gaming A16 / A15',
    title: 'ASUS TUF 게이밍 A16 (라이젠 7 + RTX 4060)',
    badge: '🛡️ 미국 육군 밀스펙(MIL-STD) 내구성',
    badgeColor: 'amber',
    regularPrice: 1450000,
    discountPrice: 1350000,
    effectivePrice: 1240000,
    cardBenefit: 'G마켓 / 11번가 오픈마켓 카드 즉시할인 시',
    cpu: 'AMD 라이젠 7 7435HS / 7735HS (8코어 16스레드)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: 'TGP 140W (다이내믹 부스트 지원)',
    ram: '16GB DDR5-4800 (최대 32GB 확장)',
    storage: '512GB PCIe 4.0 NVMe SSD (추가 슬롯 보유)',
    display: '16인치 FHD+ (1920x1200) 165Hz 100% sRGB G-Sync',
    weight: '2.27kg',
    battery: '90Wh 대용량 배터리',
    os: 'FreeDOS',
    warranty: '1년 ASUS 퍼펙트 워런티 (소비자 과실 파손 보상)',
    gameBenchmarks: [
      { game: '배틀그라운드 QHD 국민옵션', fps: '평균 155 FPS' },
      { game: '디아블로 4 FHD 높음', fps: '평균 120 FPS' },
      { game: 'FC 온라인 165Hz 풀옵', fps: '평균 165 FPS' }
    ],
    highlights: [
      '라이젠 7의 탁월한 전성비와 90Wh 대용량 배터리로 긴 지속 시간',
      '낙하, 진동, 고온 테스트를 통과한 미 육군 밀스펙 인증 탄탄한 내구성',
      '140W 풀파워 RTX 4060 탑재로 QHD 환경에서도 안정적인 프레임'
    ],
    searchKeyword: 'ASUS TUF 게이밍',
    danawaPcode: '19230977',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st'],
    mallKeywords: {
      danawa: 'ASUS TUF 게이밍 4060',
      coupang: 'ASUS TUF 게이밍',
      gmarket: 'ASUS TUF 게이밍',
      '11st': 'ASUS TUF 게이밍'
    },
    recommendedReason: '백팩에 넣고 자주 이동하는 사용자에게 필수적인 튼튼한 내구성과 90Wh 초대용량 배터리를 갖춘 실전형 모델입니다.'
  },

  // 4. HP 오멘 16 (QHD 종결 밸런스형)
  {
    id: 'hp-omen-16',
    category: 'flagship-gaming',
    categoryLabel: 'QHD 240Hz 프리미엄',
    brand: 'HP',
    modelName: 'OMEN 16-wf / xf 시리즈',
    title: 'HP 오멘 16 (i7-14650HX + RTX 4060 QHD)',
    badge: '🔥 QHD 240Hz 종결 가성비',
    badgeColor: 'rose',
    regularPrice: 1890000,
    discountPrice: 1750000,
    effectivePrice: 1650000,
    cardBenefit: '하이마트 / 롯데ON 온쇼페 카드 청구할인 시',
    cpu: '인텔 14세대 코어 i7-14650HX (16코어 24스레드)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: 'TGP 140W 풀파워 쿨링',
    ram: '16GB DDR5-5600 (32GB 확장 가능)',
    storage: '512GB M.2 NVMe SSD (확장 슬롯 지원)',
    display: '16.1인치 QHD (2560x1440) 240Hz 300nits 100% sRGB',
    weight: '2.37kg',
    battery: '83Wh 대용량 배터리',
    os: 'FreeDOS',
    warranty: '1년 HP 공식 전국 방문/출장 보증',
    gameBenchmarks: [
      { game: '배틀그라운드 QHD 144Hz 방어', fps: '평균 165 FPS' },
      { game: '디아블로 4 QHD 높음', fps: '평균 115 FPS' },
      { game: 'FC 온라인 240Hz 풀옵', fps: '평균 240 FPS' }
    ],
    highlights: [
      '160만 원대 가격대에서 누릴 수 있는 압도적 240Hz 초고주사율 QHD 디스플레이',
      '고급스러운 블랙 무광 알루미늄 하우징으로 카페·도서관에서도 부담 제로',
      'OMEN Gaming Hub를 통한 원클릭 언더볼팅 및 팬 속도 제어'
    ],
    searchKeyword: 'HP 오멘 16',
    danawaPcode: '32866427',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st', 'himart', 'lotteon'],
    mallKeywords: {
      danawa: 'HP 오멘 16',
      coupang: 'HP 오멘 16',
      gmarket: 'HP 오멘 16',
      '11st': 'HP 오멘 16',
      himart: 'HP 오멘 16',
      lotteon: 'HP 오멘 16'
    },
    recommendedReason: '160만 원대 실구매가로 선명한 QHD 240Hz 패널과 고품격 마감, 풀파워 쿨링을 모두 챙길 수 있는 중상급 게이밍 노트북의 정석입니다.'
  },

  // 5. 레노버 리전 Pro 5 16 (플래그십 종결 챔피언)
  {
    id: 'legion-pro-5-16',
    category: 'flagship-gaming',
    categoryLabel: '플래그십 종결 게이밍',
    brand: 'Lenovo',
    modelName: 'Legion Pro 5 16IRX9',
    title: '레노버 리전 Pro 5 16 (i7-14700HX + RTX 4070)',
    badge: '🏆 플래그십 게이밍 노트북 원탑',
    badgeColor: 'rose',
    regularPrice: 2490000,
    discountPrice: 2290000,
    effectivePrice: 2190000,
    cardBenefit: '하이마트 / 롯데ON 롯데카드 7% 청구할인 시',
    cpu: '인텔 14세대 코어 i7-14700HX (20코어 28스레드)',
    gpu: 'GeForce RTX 4070 Laptop (8GB GDDR6)',
    tgp: '최대 TGP 140W 풀파워 (ColdFront 5.0 쿨링)',
    ram: '32GB DDR5-5600 듀얼채널 기본 탑재',
    storage: '1TB M.2 NVMe PCIe 4.0 SSD',
    display: '16인치 WQXGA (2560x1600) 240Hz 500nits 100% sRGB G-Sync',
    weight: '2.5kg',
    battery: '80Wh (300W 초고속 충전기)',
    os: 'FreeDOS 또는 Windows 11',
    warranty: '2년 프리미엄 케어 & ADP(우발적 파손 무상 보장) 포함',
    gameBenchmarks: [
      { game: '배틀그라운드 QHD 울트라', fps: '평균 185 FPS' },
      { game: '사이버펑크 2077 QHD DLSS 3', fps: '평균 88 FPS' },
      { game: '발로란트 240Hz 풀옵션', fps: '평균 340 FPS' }
    ],
    highlights: [
      '데스크톱급 20코어 i7 CPU와 140W 풀파워 RTX 4070의 압도적 벤치마크 점수',
      '500nits 밝기의 WQXGA 16:10 황금비율 고화질 패널',
      '소비자 과실 파손(낙하, 침수)까지 2년간 무상 수리 보장하는 ADP 케어 기본 제공'
    ],
    searchKeyword: '레노버 리전 Pro 5',
    danawaPcode: '96309551',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st', 'himart', 'lotteon'],
    mallKeywords: {
      danawa: '레노버 리전 Pro 5',
      coupang: '레노버 리전 Pro 5',
      gmarket: '레노버 리전 Pro 5',
      '11st': '레노버 리전 Pro 5',
      himart: '레노버 리전 Pro 5',
      lotteon: '레노버 리전 Pro 5'
    },
    recommendedReason: '스팀 고사양 패키지 게임 풀옵션과 4K 전문 영상 편집을 완벽하게 소화하는 플래그십 게이밍 노트북의 표준입니다.'
  },

  // 6. 삼성전자 오디세이 게이밍 데스크톱 (대기업 정품 출장 A/S)
  {
    id: 'samsung-odyssey-desktop',
    category: 'brand-desktop',
    categoryLabel: '대기업 완본체',
    brand: '삼성전자',
    modelName: '삼성 데스크탑 Tower DM500TGZ-AD7A',
    title: '삼성전자 데스크톱 Tower (코어 i7-14700 + 윈도우11 Pro)',
    badge: '🏢 전국 삼성 서비스센터 1년 무상 출장',
    badgeColor: 'cyan',
    regularPrice: 1699000,
    discountPrice: 1585990,
    effectivePrice: 1585990,
    cardBenefit: '하이마트 / 롯데ON 카드 청구할인 적용 시',
    cpu: '인텔 14세대 코어 i7 (고성능 프로세서)',
    gpu: '인텔 고성능 그래픽 / 확장 슬롯 지원',
    tgp: '정격 500W 파워서플라이 탑재',
    ram: '16GB DDR5',
    storage: '512GB M.2 NVMe SSD',
    display: '데스크톱 완본체 타워 (모니터 별매)',
    weight: '본체 무게 약 8.5kg',
    battery: 'AC 220V 전원',
    os: 'Windows 11 Pro 정품 기본 탑재',
    warranty: '1년 전국 삼성전자 공식 무상 출장 A/S',
    gameBenchmarks: [
      { game: '리그오브레전드 풀옵션', fps: '평균 240 FPS' },
      { game: 'FC 온라인 풀옵션', fps: '평균 140 FPS' },
      { game: '사무 및 4K 영상 감상', fps: '완벽 지원' }
    ],
    highlights: [
      '고장 발생 시 기사님이 집으로 찾아오는 전국 삼성전자 1년 무상 방문 A/S',
      '윈도우 11 Pro 정품과 삼성 복구 솔루션 탑재로 포맷도 원클릭 해결',
      '정숙하고 견고한 슬림 타워 설계로 서재 및 사무 환경 완벽 어울림'
    ],
    searchKeyword: '삼성 데스크탑 DM500TGZ-AD7A',
    danawaPcode: '60308063',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st', 'himart', 'lotteon'],
    mallKeywords: {
      danawa: '삼성 데스크탑 DM500TGZ',
      coupang: '삼성전자 데스크탑 DM500',
      gmarket: '삼성 데스크탑 DM500',
      '11st': '삼성 데스크탑 DM500',
      himart: '삼성 데스크탑 DM500',
      lotteon: '삼성 데스크탑 DM500'
    },
    recommendedReason: '부모님·자녀 선물용이나 조립·부품 고장 관리가 번거로운 사용자에게 완벽한 대기업 A/S 인프라를 제공하는 프리미엄 브랜드 PC입니다.'
  },

  // 7. 프리플로우 게이밍 완본체 데스크톱 (라이젠 7500F + RTX 4060 실존 모델)
  {
    id: 'hansung-tfg-7500f-4060',
    category: 'brand-desktop',
    categoryLabel: '전문 완본체 가성비 1위',
    brand: '프리플로우',
    modelName: 'ULTRA GAMING R5 F6',
    title: '프리플로우 ULTRA GAMING (라이젠 7500F + RTX 4060)',
    badge: '⚡ 150만 원대 다나와 정식 등록 실매물',
    badgeColor: 'emerald',
    regularPrice: 1650000,
    discountPrice: 1587000,
    effectivePrice: 1587000,
    cardBenefit: '다나와 최저가 158만원대 / 쿠팡 로켓 즉시할인',
    cpu: 'AMD 라이젠 5 7500F (6코어 12스레드 5.0GHz)',
    gpu: 'GeForce RTX 4060 8GB GDDR6',
    tgp: '정격 600W 80PLUS 브론즈 파워',
    ram: '16GB DDR5-5600',
    storage: '512GB M.2 NVMe PCIe 4.0 SSD',
    display: '미들타워 아크릴/강화유리 게이밍 케이스',
    weight: '약 8.2kg',
    battery: 'AC 220V',
    os: 'FreeDOS (윈도우 추가 옵션)',
    warranty: '1년 전국 출장 방문 A/S 무상 보증',
    gameBenchmarks: [
      { game: '배틀그라운드 국민옵션 144Hz', fps: '평균 175 FPS' },
      { game: '오버워치 2 최상옵', fps: '평균 210 FPS' },
      { game: '로스트아크 카멘 레이드', fps: '평균 135 FPS' }
    ],
    highlights: [
      '다나와 등록번호(pcode: 22075448) 100% 실존 게이밍 완본체 모델',
      '라이젠 7500F와 RTX 4060 탑재로 FHD 144Hz 완벽 방어',
      '전문 엔지니어의 정밀 조립 및 배선 정리, 1년 전국 무상 출장 방문 AS'
    ],
    searchKeyword: '프리플로우 ULTRA GAMING R5 F6',
    danawaPcode: '22075448',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st'],
    mallKeywords: {
      danawa: '프리플로우 ULTRA GAMING R5 F6',
      coupang: '프리플로우 7500F 4060 조립PC',
      gmarket: '프리플로우 7500F 4060',
      '11st': '프리플로우 7500F 4060'
    },
    recommendedReason: '다나와에 실제 등록된 정품 완본체(158만원대)로, 부품을 따로 사서 조립하는 번거로움 없이 배그 144Hz를 즉시 즐길 수 있습니다.'
  },

  // 8. 포유컴퓨터 하이엔드 게이밍 완본체 (라이젠 7800X3D + RTX 5070 실존 모델)
  {
    id: 'hansung-bossmonster-7800x3d',
    category: 'brand-desktop',
    categoryLabel: '하이엔드 게이밍 완본체',
    brand: '포유컴퓨터',
    modelName: '퍼포먼스PC 30 R7 7800X3D RTX5070',
    title: '포유컴퓨터 퍼포먼스PC 30 (라이젠 7800X3D + RTX 5070)',
    badge: '👑 게이밍 CPU 끝판왕 탑재 완제품',
    badgeColor: 'amber',
    regularPrice: 2690000,
    discountPrice: 2561270,
    effectivePrice: 2561270,
    cardBenefit: '다나와 최저가 256만원대 / 11번가 제휴 할인',
    cpu: 'AMD 라이젠 7 7800X3D (8코어 16스레드 96MB 3D V-Cache)',
    gpu: 'GeForce RTX 5070 12GB 차세대 그래픽',
    tgp: '정격 750W 80PLUS 골드 파워서플라이',
    ram: '32GB DDR5-5600 듀얼채널 (16GB x 2)',
    storage: '1TB M.2 PCIe 4.0 NVMe SSD',
    display: '파노라마 어항 케이스 미들타워',
    weight: '약 10.5kg',
    battery: 'AC 220V',
    os: 'FreeDOS',
    warranty: '1년 전국 출장 방문 A/S 무상 보증',
    gameBenchmarks: [
      { game: '배틀그라운드 240Hz 칼방어', fps: '평균 265 FPS' },
      { game: '몬스터헌터 와일즈 QHD 풀옵', fps: '평균 95 FPS' },
      { game: '로스트아크 카제로스 레이드', fps: '평균 195 FPS' }
    ],
    highlights: [
      '다나와 등록번호(pcode: 19534361) 100% 실존 하이엔드 완본체 모델',
      '현존 최강 7800X3D와 차세대 RTX 5070으로 QHD 240Hz 및 4K 종결',
      '전 부품 조립·테스트·1년 출장 A/S까지 일괄 보장'
    ],
    searchKeyword: '포유컴퓨터 퍼포먼스PC 30 7800X3D',
    danawaPcode: '19534361',
    availableMalls: ['danawa', 'coupang', 'gmarket', '11st'],
    mallKeywords: {
      danawa: '포유컴퓨터 퍼포먼스PC 30',
      coupang: '7800X3D 조립PC 완본체',
      gmarket: '7800X3D 조립PC 완본체',
      '11st': '7800X3D 조립PC 완본체'
    },
    recommendedReason: '다나와에 실제 등록된 256만원대 실매물로, 7800X3D와 차세대 RTX 5070의 최고 사양을 일괄 보장받는 게이머를 위한 종결 완본체입니다.'
  }
];
