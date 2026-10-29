export type LaptopCategory = 
  | 'budget-gaming' 
  | 'flagship-gaming' 
  | 'slim-creator' 
  | 'brand-desktop';

export interface LaptopProduct {
  id: string;
  category: LaptopCategory;
  categoryLabel: string;
  brand: 'Lenovo' | 'ASUS' | 'HP' | '삼성전자' | 'LG전자' | '한성컴퓨터';
  modelName: string;
  title: string;
  badge: string;
  badgeColor: 'rose' | 'cyan' | 'amber' | 'emerald' | 'purple';
  regularPrice: number;
  discountPrice: number;
  effectivePrice: number; // 청구할인/쿠폰 적용 예상 체감가
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
  recommendedReason: string;
}

export const CURATED_LAPTOPS: LaptopProduct[] = [
  // 1. 레노버 리전 Pro 5i 16 (플래그십 종결 게이밍)
  {
    id: 'legion-pro-5i-16',
    category: 'flagship-gaming',
    categoryLabel: '플래그십 게이밍',
    brand: 'Lenovo',
    modelName: 'Legion Pro 5i 16IRX9',
    title: '레노버 리전 Pro 5i 16 (i9-14900HX + RTX 4070)',
    badge: '👑 게이밍 노트북 판매 1위',
    badgeColor: 'rose',
    regularPrice: 2490000,
    discountPrice: 2240000,
    effectivePrice: 2083000,
    cardBenefit: '롯데/현대카드 7% 청구할인 적용 시',
    cpu: '인텔 14세대 코어 i9-14900HX (24C / 32T)',
    gpu: 'GeForce RTX 4070 Laptop (8GB GDDR6)',
    tgp: '최대 TGP 140W (풀파워 다이내믹 부스트)',
    ram: '32GB DDR5-5600 (16GB x 2 듀얼채널)',
    storage: '1TB M.2 NVMe PCIe 4.0 SSD (확장 슬롯 1개)',
    display: '16인치 WQXGA (2560x1600) 240Hz 500nits 100% sRGB G-Sync',
    weight: '2.5kg',
    battery: '80Wh (300W 초고속 충전기)',
    os: 'Windows 11 Home 정품 탑재',
    warranty: '2년 프리미엄 케어 & ADP(우발적 손상 보장) 포함',
    gameBenchmarks: [
      { game: '배틀그라운드 QHD 울트라', fps: '평균 185 FPS' },
      { game: '사이버펑크 2077 QHD DLSS 3', fps: '평균 88 FPS' },
      { game: '발로란트 240Hz 풀옵션', fps: '평균 340 FPS' }
    ],
    highlights: [
      '데스크톱급 24코어 i9 CPU와 140W 풀파워 RTX 4070 탑재',
      '콜드프론트 5.0 증기챔버 쿨링으로 쓰로틀링 완벽 억제',
      '2년 동안 소비자 과실 파손까지 무상 수리해 주는 ADP 케어 기본 제공'
    ],
    searchKeyword: '레노버 리전 Pro 5i',
    recommendedReason: '스팀 대작 게임 풀옵션과 4K 영상 편집을 완벽하게 소화하는 명실상부한 2026 게이밍 노트북 원탑 챔피언입니다.'
  },

  // 2. ASUS ROG 제피러스 G16 OLED (초경량 프리미엄 크리에이터)
  {
    id: 'rog-zephyrus-g16-oled',
    category: 'slim-creator',
    categoryLabel: '초경량 프리미엄',
    brand: 'ASUS',
    modelName: 'ROG Zephyrus G16 GU605MI',
    title: 'ASUS ROG 제피러스 G16 OLED (Ultra 9 + RTX 4070)',
    badge: '✨ 1.85kg 초슬림 OLED',
    badgeColor: 'purple',
    regularPrice: 2990000,
    discountPrice: 2750000,
    effectivePrice: 2557500,
    cardBenefit: '하이마트 롯데카드 7% 청구할인 시',
    cpu: '인텔 코어 Ultra 9 185H (16C / 22T + AI NPU)',
    gpu: 'GeForce RTX 4070 Laptop (8GB GDDR6)',
    tgp: 'TGP 105W (MUX 스위치 & 어드밴스드 옵티머스)',
    ram: '32GB LPDDR5X-7467 온보드',
    storage: '1TB M.2 NVMe PCIe 4.0 SSD',
    display: '16인치 2.5K (2560x1600) OLED 240Hz 0.2ms 500nits DCI-P3 100%',
    weight: '1.85kg (알루미늄 CNC 통가공 섀시)',
    battery: '90Wh (100W PD 고속 충전 지원)',
    os: 'Windows 11 Home 탑재',
    warranty: '1년 퍼펙트 워런티 (침수/낙하 보상)',
    gameBenchmarks: [
      { game: '검은 신화: 오공 2.5K TSR', fps: '평균 78 FPS' },
      { game: '오버워치 2 240Hz OLED', fps: '평균 240 FPS' },
      { game: '로스트아크 QHD 최상옵', fps: '평균 155 FPS' }
    ],
    highlights: [
      '1.85kg 초경량 두께 1.49cm에 RTX 4070과 90Wh 배터리 집약',
      '0.2ms 응답속도의 압도적 ROG Nebula OLED 패널 탑재',
      '통알루미늄 절삭 바디의 맥북급 마감과 6스피커 서브우퍼 사운드'
    ],
    searchKeyword: 'ASUS ROG 제피러스 G16',
    recommendedReason: '매일 백팩에 넣고 출퇴근/등하교하며 고사양 게임과 전문 그래픽·영상 편집을 병행하는 직장인·대학생에게 최적입니다.'
  },

  // 3. HP 오멘 16 (QHD 가성비 밸런스)
  {
    id: 'hp-omen-16',
    category: 'flagship-gaming',
    categoryLabel: 'QHD 밸런스형',
    brand: 'HP',
    modelName: 'OMEN 16-xf0052AX',
    title: 'HP 오멘 16 (라이젠 7 7840HS + RTX 4060)',
    badge: '🔥 QHD 가성비 종결',
    badgeColor: 'amber',
    regularPrice: 1790000,
    discountPrice: 1590000,
    effectivePrice: 1478700,
    cardBenefit: '롯데ON 온쇼페 쿠폰 & 카드할인 시',
    cpu: 'AMD 라이젠 7 7840HS (8C / 16T Zen 4)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: 'TGP 140W 풀파워',
    ram: '16GB DDR5-5600 (32GB 확장 가능)',
    storage: '512GB M.2 NVMe SSD (M.2 추가 슬롯 지원)',
    display: '16.1인치 QHD (2560x1440) 240Hz 300nits 100% sRGB',
    weight: '2.37kg',
    battery: '83Wh 대용량 배터리',
    os: 'FreeDOS (윈도우 미포함, 설치 간편)',
    warranty: '1년 HP 공식 서비스센터 방문/출장 보증',
    gameBenchmarks: [
      { game: '배틀그라운드 국민옵션', fps: '평균 165 FPS' },
      { game: '디아블로 4 QHD 높음', fps: '평균 110 FPS' },
      { game: 'FC 온라인 240Hz 풀옵', fps: '평균 240 FPS' }
    ],
    highlights: [
      '라이젠 7의 뛰어난 배터리 전성비와 140W TGP 풀파워 쿨링',
      '깔끔한 블랙 무광 디자인으로 카페나 강의실에서도 부담 제로',
      'HP OMEN Gaming Hub를 통한 원클릭 언더볼팅 및 팬 속도 제어'
    ],
    searchKeyword: 'HP 오멘 16 RTX4060',
    recommendedReason: '140만 원대 실구매가로 240Hz QHD 패널과 RTX 4060의 풀파워 성능을 모두 챙길 수 있는 가성비 모범생입니다.'
  },

  // 4. HP 빅터스 16 (100만원대 국민 입문형)
  {
    id: 'hp-victus-16',
    category: 'budget-gaming',
    categoryLabel: '국민 가성비',
    brand: 'HP',
    modelName: 'Victus 16-s1054AX',
    title: 'HP 빅터스 16 (라이젠 5 8645HS + RTX 4050)',
    badge: '⚡ 100만원대 압도적 가성비',
    badgeColor: 'emerald',
    regularPrice: 1290000,
    discountPrice: 1140000,
    effectivePrice: 1060200,
    cardBenefit: '쿠팡 와우 / 하이마트 특가 적용 시',
    cpu: 'AMD 라이젠 5 8645HS (6C / 12T 5.0GHz)',
    gpu: 'GeForce RTX 4050 Laptop (6GB GDDR6)',
    tgp: 'TGP 120W',
    ram: '16GB DDR5-5600 듀얼채널',
    storage: '512GB M.2 NVMe SSD',
    display: '16.1인치 FHD (1920x1080) 144Hz IPS 디스플레이',
    weight: '2.3kg',
    battery: '70Wh',
    os: 'Windows 11 Home 탑재 또는 FreeDOS',
    warranty: '1년 HP 공식 전국망 A/S',
    gameBenchmarks: [
      { game: '리그 오브 레전드 풀옵션', fps: '평균 260 FPS' },
      { game: '발로란트 144Hz 방어', fps: '평균 220 FPS' },
      { game: '오버워치 2 높음', fps: '평균 150 FPS' }
    ],
    highlights: [
      '최신 라이젠 8000번대 호크포인트 CPU 탑재',
      '120W TGP의 넉넉한 쿨링으로 롤·발로란트·오버워치 완벽 방어',
      '100만 원 초반대에서 가장 신뢰받는 국민 입문형 게이밍 랩탑'
    ],
    searchKeyword: 'HP 빅터스 16 RTX4050',
    recommendedReason: '부담 없는 가격에 대화면 16.1인치로 대학 과제부터 인기 e스포츠 게임까지 쾌적하게 즐길 수 있는 최고의 가성비 모델입니다.'
  },

  // 5. 레노버 LOQ 15 (120만원대 실구매 RTX 4060)
  {
    id: 'lenovo-loq-15',
    category: 'budget-gaming',
    categoryLabel: '120만원대 RTX 4060',
    brand: 'Lenovo',
    modelName: 'Lenovo LOQ 15IRX9',
    title: '레노버 LOQ 15 (i5-13450HX + RTX 4060)',
    badge: '🎯 120만 원대 RTX 4060 탑재',
    badgeColor: 'cyan',
    regularPrice: 1390000,
    discountPrice: 1240000,
    effectivePrice: 1153200,
    cardBenefit: '롯데ON 온쇼페 / G마켓 쿠폰 적용 시',
    cpu: '인텔 코어 i5-13450HX (10C / 16T)',
    gpu: 'GeForce RTX 4060 Laptop (8GB GDDR6)',
    tgp: 'TGP 115W',
    ram: '16GB DDR5-4800 (확장 가능)',
    storage: '512GB M.2 NVMe SSD',
    display: '15.6인치 FHD (1920x1080) 144Hz G-Sync 300nits',
    weight: '2.38kg',
    battery: '60Wh',
    os: 'FreeDOS',
    warranty: '1년 레노버 무상 보증 & 출장 지원',
    gameBenchmarks: [
      { game: '배틀그라운드 FHD 국민옵션', fps: '평균 155 FPS' },
      { game: '팰월드 높음 옵션', fps: '평균 85 FPS' },
      { game: '로스트아크 카제로스', fps: '평균 115 FPS' }
    ],
    highlights: [
      '110만~120만 원대 가격대에 8GB VRAM의 RTX 4060 탑재',
      'HX 시리즈 고성능 프로세서로 멀티태스킹 최적화',
      'G-Sync 지원으로 화면 찢어짐(티어링) 제로'
    ],
    searchKeyword: '레노버 LOQ 15 RTX4060',
    recommendedReason: '100만 원대 초반에서 VRAM 8GB의 RTX 4060 그래픽을 온전히 손에 넣을 수 있는 실속파 게이머의 최종 병기입니다.'
  },

  // 6. 삼성전자 오디세이 게이밍 데스크톱 (대기업 정품 완본체)
  {
    id: 'samsung-odyssey-desktop',
    category: 'brand-desktop',
    categoryLabel: '대기업 완본체',
    brand: '삼성전자',
    modelName: '오디세이 DM500TDA-A78A',
    title: '삼성전자 오디세이 데스크톱 (i7-14700 + RTX 4060 Ti)',
    badge: '🏢 전국 삼성 서비스센터 1년 무상 출장',
    badgeColor: 'cyan',
    regularPrice: 2190000,
    discountPrice: 1990000,
    effectivePrice: 1850700,
    cardBenefit: '하이마트 롯데카드 7% 청구할인 적용 시',
    cpu: '인텔 14세대 코어 i7-14700 (20C / 28T)',
    gpu: 'GeForce RTX 4060 Ti 8GB',
    tgp: '정격 600W 브론즈 파워 탑재',
    ram: '16GB DDR5-5600',
    storage: '1TB M.2 NVMe SSD',
    display: '데스크톱 완본체 (모니터 별매)',
    weight: '본체 무게 약 8.5kg',
    battery: 'AC 220V 전원',
    os: 'Windows 11 Home 정품 기본 탑재',
    warranty: '1년 전국 삼성전자 공식 무상 출장 A/S',
    gameBenchmarks: [
      { game: '배틀그라운드 QHD 144Hz', fps: '평균 175 FPS' },
      { game: '디아블로 4 QHD 풀옵션', fps: '평균 130 FPS' },
      { game: '로스트아크 풀옵션', fps: '평균 140 FPS' }
    ],
    highlights: [
      '고장 시 기사님이 집으로 찾아오는 전국 삼성전자 1년 무상 방문 A/S',
      '윈도우 11 Home 정품과 복구 솔루션 탑재로 포맷도 원클릭',
      '소음 억제 챔버 설계로 정숙한 도서관급 서재 게이밍 환경'
    ],
    searchKeyword: '삼성 오디세이 데스크탑 i7',
    recommendedReason: '부모님, 학생 선물용이나 컴퓨터 조립·A/S를 직접 처리하기 번거로운 사용자에게 가장 신뢰받는 대기업 브랜드 PC입니다.'
  },

  // 7. LG전자 울트라기어 게이밍 데스크톱 (대기업 QHD 하이엔드)
  {
    id: 'lg-ultragear-desktop',
    category: 'brand-desktop',
    categoryLabel: '대기업 완본체',
    brand: 'LG전자',
    modelName: '울트라기어 24DT90P-GA76K',
    title: 'LG전자 울트라기어 데스크톱 (i7-14700F + RTX 4070 SUPER)',
    badge: '🖥️ LG 공식 프리미엄 보증',
    badgeColor: 'rose',
    regularPrice: 2590000,
    discountPrice: 2390000,
    effectivePrice: 2222700,
    cardBenefit: '롯데ON 온쇼페 / 하이마트 제휴할인 시',
    cpu: '인텔 14세대 코어 i7-14700F (20C / 28T)',
    gpu: 'GeForce RTX 4070 SUPER 12GB',
    tgp: '정격 750W 80PLUS 골드 파워 탑재',
    ram: '32GB DDR5-5600 듀얼채널',
    storage: '1TB M.2 NVMe PCIe 4.0 SSD',
    display: '데스크톱 본체 (LG 울트라기어 모니터 매칭 최적)',
    weight: '약 9.2kg',
    battery: 'AC 220V',
    os: 'Windows 11 Home 정품 탑재',
    warranty: '1년 전국 LG전자 공식 방문 수리 보증',
    gameBenchmarks: [
      { game: '사이버펑크 2077 QHD 패스트레이싱', fps: '평균 75 FPS' },
      { game: '검은 신화: 오공 QHD 울트라', fps: '평균 98 FPS' },
      { game: '배틀그라운드 QHD 240Hz 방어', fps: '평균 240 FPS' }
    ],
    highlights: [
      'RTX 4070 SUPER 12GB 탑재로 4K 스팀 게임 완벽 소화',
      '정품 윈도우 11 및 32GB 넉넉한 듀얼 채널 DDR5 메모리',
      '전국 LG전자 서비스센터의 완벽한 기술 지원과 무상 출장 점검'
    ],
    searchKeyword: 'LG 울트라기어 데스크탑',
    recommendedReason: '조립 스트레스 없이 최고급 대기업 A/S와 QHD 240Hz 종결급 스펙을 한 번에 누릴 수 있는 프리미엄 완본체입니다.'
  },

  // 8. 한성컴퓨터 보스몬스터 (3D V-Cache 탑재 조립 전문 완제)
  {
    id: 'hansung-bossmonster-7800x3d',
    category: 'flagship-gaming',
    categoryLabel: '전문 완본체',
    brand: '한성컴퓨터',
    modelName: '보스몬스터 TFG AX7847T',
    title: '한성컴퓨터 보스몬스터 (라이젠 7800X3D + RTX 4070 Ti SUPER)',
    badge: '👑 게이밍 CPU 0티어 탑재',
    badgeColor: 'amber',
    regularPrice: 2450000,
    discountPrice: 2280000,
    effectivePrice: 2166000,
    cardBenefit: 'G마켓 빅스마일데이 / 하이마트 특가 시',
    cpu: 'AMD 라이젠 7 7800X3D (8C / 16T 96MB 캐시)',
    gpu: 'GeForce RTX 4070 Ti SUPER 16GB',
    tgp: '정격 850W 80PLUS 골드 풀모듈러 ATX 3.1',
    ram: '32GB DDR5-6000 CL30 튜닝 메모리',
    storage: '1TB 고속 PCIe 4.0 NVMe SSD',
    display: '미들타워 파노라마 어항 케이스 본체',
    weight: '약 11kg',
    battery: 'AC 220V',
    os: 'Windows 11 Home 탑재 옵션',
    warranty: '1년 전국 출장 방문 A/S 무상 보증',
    gameBenchmarks: [
      { game: '배틀그라운드 240Hz 칼방어', fps: '평균 295 FPS' },
      { game: '몬스터헌터 와일즈 4K 상옵', fps: '평균 88 FPS' },
      { game: '로스트아크 카제로스 레이드', fps: '평균 210 FPS' }
    ],
    highlights: [
      '현존 최강의 1% Low 방어력을 자랑하는 7800X3D 프로세서',
      '16GB VRAM의 4070 Ti SUPER로 4K 스팀 대작 완벽 정복',
      '전문 엔지니어 조립 검수 및 1년 무상 출장 방문 서비스 포함'
    ],
    searchKeyword: '한성 보스몬스터 7800X3D',
    recommendedReason: '부품 하나하나가 하이엔드 사제 부품으로 구성된 최고 사양을 합리적인 완본체 패키지로 만나볼 수 있는 하드코어 게이머의 선택입니다.'
  }
];
