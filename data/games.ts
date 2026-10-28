export interface GameSeoData {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  genre: string;
  developer: string;
  heroImage: string;
  presetId: string; // connects to GAME_PRESETS
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  systemRequirements: {
    minimum: {
      cpu: string;
      ram: string;
      gpu: string;
      storage: string;
      targetFps: string;
    };
    recommended: {
      cpu: string;
      ram: string;
      gpu: string;
      storage: string;
      targetFps: string;
    };
    ultra144hz: {
      cpu: string;
      ram: string;
      gpu: string;
      storage: string;
      targetFps: string;
    };
  };
  fpsBenchmarks: {
    fhdMedium: string;
    fhdUltra: string;
    qhdHigh: string;
    uhd4k: string;
  };
  expertTips: string[];
  faq: Array<{ question: string; answer: string }>;
}

export const GAME_SEO_LIST: GameSeoData[] = [
  {
    slug: 'battleground',
    title: '배틀그라운드 (PUBG) 144Hz~240Hz 완벽 방어 2026 추천 견적',
    shortTitle: '배틀그라운드 (PUBG)',
    subtitle: '연막 교전과 대도시 낙하에서도 1% Low 최저 프레임을 방어하는 국민 세팅',
    genre: '배틀로얄 FPS',
    developer: 'KRAFTON',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    presetId: 'mainstream-gaming',
    metaTitle: '배그 144Hz 완벽 방어 추천 견적 & 부품 시세 2026 | PC-Craft',
    metaDescription: '2026년 배틀그라운드 국민 3트라 180~220 FPS 방어 견적! 라이젠 7500F + RTX 4060 실시간 최저가 및 오픈마켓 완본체 시세 비교.',
    keywords: ['배그 견적', '배틀그라운드 조립컴퓨터', '배그 144hz 컴퓨터', '배그 240hz 사양', '배그 가성비 견적', '라이젠 7500f 배그'],
    systemRequirements: {
      minimum: {
        cpu: 'Intel Core i5-4430 / AMD FX-6300',
        ram: '8GB RAM',
        gpu: 'NVIDIA GeForce GTX 960 2GB',
        storage: '40GB 여유 공간',
        targetFps: 'FHD 60 FPS (하옵)'
      },
      recommended: {
        cpu: 'AMD Ryzen 5 5600 / Intel i5-12400F',
        ram: '16GB DDR4 (듀얼채널)',
        gpu: 'NVIDIA GeForce RTX 4060 / GTX 1660 SUPER',
        storage: 'NVMe SSD 500GB 이상',
        targetFps: 'FHD 144 FPS 완벽 방어'
      },
      ultra144hz: {
        cpu: 'AMD Ryzen 7 7800X3D (3D V-캐시)',
        ram: '32GB DDR5-5600 / 6000',
        gpu: 'NVIDIA GeForce RTX 4070 SUPER / 5070',
        storage: 'Gen4 NVMe SSD 1TB',
        targetFps: 'QHD 144Hz~240Hz 올울트라'
      }
    },
    fpsBenchmarks: {
      fhdMedium: '240+ FPS',
      fhdUltra: '190~220 FPS (국민 3트라)',
      qhdHigh: '140~160 FPS',
      uhd4k: '85~100 FPS (DLSS 품질)'
    },
    expertTips: [
      '배그는 L3 캐시 용량에 프레임 방어율이 좌우되므로, 최저 프레임 떡상을 원하시면 라이젠 7500F 또는 7800X3D가 정답입니다.',
      '싱글 채널 램은 절대 금물입니다. 반드시 16GBx2 (32GB) 듀얼 채널로 구성해야 연막 속 난전 프레임 드랍이 사라집니다.',
      '그래픽카드는 FHD 해상도 기준 RTX 4060 또는 차세대 RTX 5060으로도 144Hz 방어가 여유롭습니다.'
    ],
    faq: [
      {
        question: '배그 144Hz 모니터를 쓰는데 100만 원 안팎으로 본체 구성이 가능한가요?',
        answer: '네! 라이젠 7500F + RTX 4060 조합이면 FHD 환경에서 국민옵션 기준 평균 180~220 FPS를 유지하여 144Hz 고주사율을 상시 100% 방어할 수 있습니다.'
      },
      {
        question: '램은 16GB로 충분한가요, 32GB가 필수인가요?',
        answer: '배그 자체는 16GB로도 구동되지만, 디스코드, 크롬, 카카오톡을 띄워놓고 장시간 플레이 시 메모리 점유율이 85%를 넘어가며 스터터링(버벅임)이 생깁니다. 32GB 구성을 강력 추천합니다.'
      }
    ]
  },
  {
    slug: 'lol-valorant',
    title: '리그 오브 레전드 & 발로란트 144Hz 완벽 방어 초가성비 추천 견적',
    shortTitle: '롤 & 발로란트 (LoL / Valorant)',
    subtitle: '50~70만 원대 알뜰 예산으로 한타 교전 144Hz 무난히 방어하는 학생/입문용 세팅',
    genre: 'e스포츠 MOBA & 전술 FPS',
    developer: 'Riot Games',
    heroImage: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1200&auto=format&fit=crop&q=80',
    presetId: 'casual-esports',
    metaTitle: '롤 발로란트 컴퓨터 추천 견적 144Hz 가성비 본체 | PC-Craft',
    metaDescription: '50만원대 롤 풀옵션, 발로란트 200 FPS 방어 가성비 조립컴퓨터 견적! 라이젠 5600 + GTX 1650 실시간 최저가.',
    keywords: ['롤 컴퓨터 견적', '발로란트 컴퓨터 견적', '롤 144hz 컴퓨터', '발로란트 200fps 본체', '50만원대 게이밍PC'],
    systemRequirements: {
      minimum: {
        cpu: 'Intel Core i3-540 / AMD A6-3620',
        ram: '4GB RAM',
        gpu: 'Intel HD Graphics 4000',
        storage: '20GB 여유 공간',
        targetFps: 'FHD 60 FPS'
      },
      recommended: {
        cpu: 'AMD Ryzen 5 5600 / Intel i3-12100F',
        ram: '16GB DDR4 (8GBx2)',
        gpu: 'GTX 1650 4GB / RX 6600',
        storage: 'NVMe SSD 500GB',
        targetFps: 'FHD 144Hz~200 FPS 완벽 방어'
      },
      ultra144hz: {
        cpu: 'AMD Ryzen 5 7500F',
        ram: '16GB~32GB DDR5',
        gpu: 'GeForce RTX 4060',
        storage: 'NVMe SSD 1TB',
        targetFps: 'FHD 240Hz~360Hz 경쟁전 방어'
      }
    },
    fpsBenchmarks: {
      fhdMedium: '240+ FPS',
      fhdUltra: '180~220 FPS (5대5 대규모 한타)',
      qhdHigh: '144+ FPS',
      uhd4k: '100+ FPS'
    },
    expertTips: [
      '롤과 발로란트는 그래픽카드보다 CPU의 단일 코어 성능(싱글 IPC)이 훨씬 중요합니다. 라이젠 5600 멀티팩 하나로 종결 가능합니다.',
      '외장 그래픽은 GTX 1650 또는 라데온 RX 6600 수준만 갖춰도 144Hz 게이밍 모니터 주사율을 차고 넘치게 뽑아냅니다.',
      '전력 소모가 매우 적어(약 180W 내외) 500W 정격 파워로도 발열과 전기세 걱정 없이 5년 이상 고장 없이 쓸 수 있습니다.'
    ],
    faq: [
      {
        question: '내장 그래픽(5600G)으로도 롤/발로란트가 되나요?',
        answer: '네, 5600G 내장그래픽으로도 FHD 60~80 FPS 플레이가 가능하지만, 144Hz 고주사율 게이밍 모니터의 부드러움을 100% 느끼시려면 저렴한 외장 그래픽(GTX 1650 등) 추가를 추천합니다.'
      }
    ]
  },
  {
    slug: 'lostark',
    title: '로스트아크 카제로스 레이드 144Hz QHD 풀옵션 종결 추천 견적',
    shortTitle: '로스트아크 (Lost Ark)',
    subtitle: '에키드나, 베히모스 등 대규모 16인 레이드 스킬 이펙트 속에서도 렉 없는 플레이',
    genre: '쿼터뷰 MMORPG',
    developer: 'Smilegate RPG',
    heroImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    presetId: 'mainstream-gaming',
    metaTitle: '로스트아크 조립컴퓨터 추천 견적 카제로스 레이드 QHD | PC-Craft',
    metaDescription: '2026 로아 카제로스 16인 레이드 QHD 풀옵션 140 FPS 종결 PC 견적! 라이젠 7500F / 7800X3D + RTX 4060 / 4070S.',
    keywords: ['로스트아크 견적', '로아 조립컴퓨터', '로아 카제로스 레이드 PC', '로아 QHD 컴퓨터', '로아 7800X3D'],
    systemRequirements: {
      minimum: {
        cpu: 'Intel Core i3 / AMD Ryzen 3',
        ram: '8GB RAM',
        gpu: 'NVIDIA GeForce GTX 760',
        storage: '80GB 여유 공간',
        targetFps: 'FHD 50 FPS'
      },
      recommended: {
        cpu: 'AMD Ryzen 5 7500F / Intel i5-13400F',
        ram: '32GB DDR5',
        gpu: 'NVIDIA GeForce RTX 4060 / 5060',
        storage: 'NVMe SSD 1TB',
        targetFps: 'FHD 풀옵 140+ FPS'
      },
      ultra144hz: {
        cpu: 'AMD Ryzen 7 7800X3D',
        ram: '32GB DDR5-6000 CL30',
        gpu: 'NVIDIA GeForce RTX 4070 SUPER / 5070',
        storage: 'SK하이닉스 P41 1TB',
        targetFps: 'QHD 144Hz 상시 고정'
      }
    },
    fpsBenchmarks: {
      fhdMedium: '180+ FPS',
      fhdUltra: '140~160 FPS',
      qhdHigh: '120~140 FPS',
      uhd4k: '75~90 FPS'
    },
    expertTips: [
      '로스트아크는 언리얼 엔진 3 기반으로, CPU의 단일 코어 성능과 대용량 3D 캐시(7800X3D)의 혜택을 전 게임 중 가장 크게 받습니다.',
      '대도시(베른, 볼다이크) 카오스게이트나 16인 레이드 진입 시 프레임 드랍을 막으려면 32GB RAM이 필수적입니다.'
    ],
    faq: [
      {
        question: '로아에서 CPU와 그래픽카드 중 무엇이 더 중요한가요?',
        answer: 'FHD 해상도에서는 CPU(특히 라이젠 X3D 계열)의 영향력이 60% 이상을 차지하며, QHD 이상 모니터에서는 RTX 4070 SUPER 이상의 그래픽카드 체급이 뒷받침되어야 144Hz 방어가 가능합니다.'
      }
    ]
  },
  {
    slug: 'monster-hunter-wilds',
    title: '몬스터 헌터 와일즈 (Monster Hunter Wilds) 권장사양 정복 추천 견적',
    shortTitle: '몬스터 헌터 와일즈',
    subtitle: '차세대 캡콤 RE 엔진 기반의 초대형 오픈월드 수렵을 위한 강력한 게이밍 머신',
    genre: '오픈월드 액션 RPG',
    developer: 'CAPCOM',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    presetId: 'high-end-aaa',
    metaTitle: '몬스터헌터 와일즈 권장사양 조립PC 추천 견적 2026 | PC-Craft',
    metaDescription: '몬헌 와일즈 QHD 풀옵션 100 FPS 이상 정복! 라이젠 7800X3D + RTX 4070 SUPER / 5070 최적화 견적 가이드.',
    keywords: ['몬헌 와일즈 사양', '몬스터헌터 와일즈 컴퓨터', '몬헌 와일즈 조립PC', '몬헌 와일즈 권장사양 견적'],
    systemRequirements: {
      minimum: {
        cpu: 'Intel Core i5-10600 / AMD Ryzen 5 3600',
        ram: '16GB RAM',
        gpu: 'NVIDIA GeForce GTX 1660 SUPER (6GB)',
        storage: '140GB SSD 여유 공간',
        targetFps: 'FHD 30 FPS (최하옵 + 업스케일러)'
      },
      recommended: {
        cpu: 'Intel Core i5-12400F / AMD Ryzen 5 7500F',
        ram: '32GB DDR5',
        gpu: 'NVIDIA GeForce RTX 4060 Ti / RTX 5060 Ti',
        storage: 'Gen4 NVMe SSD 1TB',
        targetFps: 'FHD 60~80 FPS (중상옵)'
      },
      ultra144hz: {
        cpu: 'AMD Ryzen 7 7800X3D / 9800X3D',
        ram: '32GB DDR5-6000',
        gpu: 'NVIDIA GeForce RTX 4070 SUPER / RTX 5070',
        storage: 'Gen4 NVMe SSD 1TB 이상',
        targetFps: 'QHD 100~120+ FPS (DLSS3 FG 활성화)'
      }
    },
    fpsBenchmarks: {
      fhdMedium: '130+ FPS (DLSS3)',
      fhdUltra: '110+ FPS',
      qhdHigh: '90~110 FPS',
      uhd4k: '60~75 FPS'
    },
    expertTips: [
      '몬헌 와일즈는 방대한 동적 생태계 렌더링으로 인해 역대 몬헌 시리즈 중 가장 높은 시스템 사양을 요구합니다.',
      '엔비디아 DLSS 3 프레임 생성(Frame Generation) 기술 지원이 필수적이므로 지포스 RTX 40/50 시리즈 구매를 강력 권장합니다.',
      '최소 140GB 이상의 초대용량 설치 공간이 필요하므로 SSD는 최소 1TB 이상으로 구성하세요.'
    ],
    faq: [
      {
        question: 'RTX 4060으로도 몬헌 와일즈 플레이가 가능한가요?',
        answer: 'FHD 해상도에서 중옵션 + DLSS 품질 모드를 적용하면 평균 60~75 FPS로 안정적인 사냥이 가능합니다. QHD 144Hz 모니터를 쓰신다면 RTX 4070 SUPER 이상을 추천합니다.'
      }
    ]
  },
  {
    slug: 'cyberpunk-2077',
    title: '사이버펑크 2077 풀 패스트레이싱 & 스팀 AAA 대작 종결 4K 추천 견적',
    shortTitle: '사이버펑크 2077',
    subtitle: '나이트 시티의 네온사인 광원 효과를 왜곡 없이 만끽하는 하이엔드 끝판왕',
    genre: '오픈월드 SF RPG',
    developer: 'CD PROJEKT RED',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    presetId: 'creator-flagship',
    metaTitle: '사이버펑크 2077 4K 풀옵션 추천 견적 패스트레이싱 | PC-Craft',
    metaDescription: '사펑 2077 패스 트레이싱 풀옵션 4K 85 FPS 종결 PC! i7-14700K / 7800X3D + RTX 4080 SUPER / 5080.',
    keywords: ['사이버펑크 견적', '사펑 4K 컴퓨터', 'RTX 4080 SUPER 사펑', '스팀 고사양 게임 본체', '패스트레이싱 견적'],
    systemRequirements: {
      minimum: {
        cpu: 'Intel Core i7-6700 / AMD Ryzen 5 1600',
        ram: '12GB RAM',
        gpu: 'GTX 1060 6GB',
        storage: '70GB SSD',
        targetFps: 'FHD 30 FPS'
      },
      recommended: {
        cpu: 'AMD Ryzen 7 7800X3D',
        ram: '32GB DDR5',
        gpu: 'RTX 4070 SUPER 12GB',
        storage: 'NVMe SSD 1TB',
        targetFps: 'QHD RT 울트라 100+ FPS'
      },
      ultra144hz: {
        cpu: 'Intel i7-14700K / AMD 7800X3D',
        ram: '32GB~64GB DDR5',
        gpu: 'GeForce RTX 4080 SUPER / RTX 5080 16GB',
        storage: 'Gen4 2TB NVMe SSD',
        targetFps: '4K 패스트레이싱 85+ FPS'
      }
    },
    fpsBenchmarks: {
      fhdMedium: '180+ FPS',
      fhdUltra: '140+ FPS',
      qhdHigh: '110+ FPS (RT 울트라)',
      uhd4k: '85+ FPS (DLSS3 + Frame Gen)'
    },
    expertTips: [
      '풀 패스 트레이싱(Full Path Tracing)을 켜려면 3세대 RT 코어와 4세대 텐서 코어가 탑재된 지포스 RTX 4070 SUPER 이상이 필수입니다.',
      '초고해상도 텍스처 로딩을 위해 VRAM 용량이 최소 12GB 이상인 그래픽카드를 선택하세요.'
    ],
    faq: [
      {
        question: '라데온 그래픽카드로도 사펑 레이트레이싱이 잘 돌아가나요?',
        answer: '순수 깡성능은 우수하지만, 사이버펑크의 레이트레이싱 및 패스트레이싱 환경에서는 엔비디아의 RT 코어와 DLSS3 기술이 압도적인 프레임을 보여줍니다.'
      }
    ]
  }
];
