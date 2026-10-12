export interface GamePreset {
  id: string;
  title: string;
  badge: string;
  targetGames: string[];
  performanceDescription: string;
  budgetRange: string;
  iconName: string;
  defaultComponentIds: {
    cpu: string;
    cooler: string;
    motherboard: string;
    ram: string;
    gpu: string;
    ssd: string;
    power: string;
    case: string;
  };
  recommendedPrebuilt: {
    title: string;
    brand: string;
    price: number;
    affiliateUrl: string;
    imageUrl: string;
    pros: string[];
    specsSummary: string;
  };
  aiAnalysis: {
    resolution: string;
    averageFps: Record<string, string>;
    pros: string[];
    cons: string[];
    upgradeAdvice: string;
  };
}

export const GAME_PRESETS: GamePreset[] = [
  {
    id: 'casual-esports',
    title: '가성비 e스포츠 게이밍',
    badge: '입문/가성비 추천',
    targetGames: ['리그오브레전드', '발로란트', 'FC온라인(피파)', '메이플스토리', '서든어택'],
    performanceDescription: 'FHD 해상도에서 144Hz 고주사율 완벽 방어. 50~70만원대 알뜰 세팅',
    budgetRange: '약 55만 ~ 65만원',
    iconName: 'Gamepad2',
    defaultComponentIds: {
      cpu: 'cpu-amd-5600',
      cooler: 'cooler-basic-air',
      motherboard: 'mb-a520m',
      ram: 'ram-ddr4-16gb',
      gpu: 'gpu-gtx-1650',
      ssd: 'ssd-500gb-nvme',
      power: 'power-500w-std',
      case: 'case-darkflash-dk200'
    },
    recommendedPrebuilt: {
      title: '한성컴퓨터 Master T56 (라이젠 5600 + GTX 1650 완본체)',
      brand: '한성컴퓨터',
      price: 599000,
      affiliateUrl: 'https://link.coupang.com/a/sample_prebuilt_entry',
      imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500&auto=format&fit=crop&q=60',
      pros: ['1년 무상 출장 방문 AS', '윈도우 미포함 최저가 구성', '원클릭 즉시 배송'],
      specsSummary: '라이젠 5600 / GTX 1650 / 16GB DDR4 / 512GB NVMe / 500W'
    },
    aiAnalysis: {
      resolution: 'FHD (1920x1080) 최적화',
      averageFps: {
        '리그오브레전드 (최상옵)': '200+ FPS',
        '발로란트 (경쟁전)': '180+ FPS',
        'FC 온라인 (피파)': '120 FPS 방어',
        '오버워치 2 (중옵)': '100 FPS'
      },
      pros: ['전력 소모가 적어 전기세 부담 없음', '초보자도 무난하게 시작할 수 있는 저렴한 진입 장벽'],
      cons: ['스팀 AAA 대작(사이버펑크, 팰월드 등) 구동 시 옵션 타협 필요'],
      upgradeAdvice: '향후 배그나 고사양 게임으로 넘어가고 싶을 때 그래픽카드만 RTX 4060으로 교체하면 전원 교체 없이 즉시 업그레이드 가능합니다.'
    }
  },
  {
    id: 'mainstream-gaming',
    title: '국민 게이밍 & 배틀그라운드',
    badge: '가장 많은 선택 (BEST)',
    targetGames: ['배틀그라운드(국민옵션)', '오버워치2', '로스트아크', '디아블로4', '팰월드'],
    performanceDescription: 'FHD 풀옵션 & QHD 100Hz 진입. 최신 DDR5 플랫폼으로 차세대 호환성 확보',
    budgetRange: '약 110만 ~ 125만원',
    iconName: 'Flame',
    defaultComponentIds: {
      cpu: 'cpu-amd-7500f',
      cooler: 'cooler-basic-air',
      motherboard: 'mb-b650m-k',
      ram: 'ram-ddr5-32gb',
      gpu: 'gpu-rtx-4060',
      ssd: 'ssd-1tb-nvme',
      power: 'power-700w-bronze',
      case: 'case-darkflash-dk200'
    },
    recommendedPrebuilt: {
      title: '프리플로우 게이밍 PC (라이젠 7500F + RTX 4060 완제)',
      brand: '프리플로우',
      price: 1199000,
      affiliateUrl: 'https://link.coupang.com/a/sample_prebuilt_mainstream',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60',
      pros: ['선정리 완벽 마감', '정품 바이오스 세팅 및 번인 테스트 완료', '로켓설치 지원'],
      specsSummary: '라이젠 7500F / RTX 4060 8G / 32GB DDR5 / 1TB NVMe / 700W'
    },
    aiAnalysis: {
      resolution: 'FHD (1920x1080) 풀옵션 / QHD 타협 가능',
      averageFps: {
        '배틀그라운드 (국민 3트라)': '160~200 FPS',
        '오버워치 2 (최상옵)': '180+ FPS',
        '로스트아크 (카제로스 레이드)': '120+ FPS',
        '디아블로 4 (DLSS3 품질)': '140+ FPS'
      },
      pros: ['DLSS 3 프레임 생성 기술로 최신 게임 프레임 2배 상승', 'AM5 소켓 지원으로 2027년까지 CPU만 교체 가능'],
      cons: ['4K 해상도 모니터 유저에게는 VRAM(8GB) 대역폭 한계'],
      upgradeAdvice: '모니터를 QHD 144Hz로 변경할 예정이라면 그래픽카드를 RTX 4070 SUPER로 한 체급 올리는 것을 추천합니다.'
    }
  },
  {
    id: 'high-end-aaa',
    title: '스팀 AAA 대작 & QHD 종결',
    badge: '하드코어 게이머',
    targetGames: ['사이버펑크 2077', '검은신화: 오공', '몬스터헌터 와일즈', '엘든링', '호그와트 레거시'],
    performanceDescription: 'QHD 144Hz 풀옵션 & 레이트레이싱 완벽 지원. 현존 게이밍 최강 CPU 7800X3D',
    budgetRange: '약 210만 ~ 240만원',
    iconName: 'Zap',
    defaultComponentIds: {
      cpu: 'cpu-amd-7800x3d',
      cooler: 'cooler-dual-air',
      motherboard: 'mb-b650m-k',
      ram: 'ram-ddr5-32gb',
      gpu: 'gpu-rtx-4070super',
      ssd: 'ssd-1tb-nvme',
      power: 'power-700w-bronze',
      case: 'case-aquarium-panoramic'
    },
    recommendedPrebuilt: {
      title: '주연테크 게이밍 PC (7800X3D + RTX 4070 SUPER 파노라마 완본체)',
      brand: '주연테크',
      price: 2280000,
      affiliateUrl: 'https://link.coupang.com/a/sample_prebuilt_highend',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60',
      pros: ['파노라마 어항케이스 디자인 감성', '전 부품 3년 무상보증 패키지', '정품 윈도우 11 사전탑재'],
      specsSummary: '라이젠 7800X3D / RTX 4070 SUPER 12G / 32GB DDR5 / 1TB P41 / 750W'
    },
    aiAnalysis: {
      resolution: 'QHD (2560x1440) 풀옵션 종결 / 4K 엔트리',
      averageFps: {
        '사이버펑크 2077 (QHD RT울트라)': '110+ FPS (DLSS3)',
        '검은신화: 오공 (QHD 시네마틱)': '100+ FPS',
        '배틀그라운드 (QHD 올울트라)': '220+ FPS',
        '엘든링 (풀옵션)': '60 FPS 완전방어 (락 해제 시 120+)'
      },
      pros: ['3D V-Cache로 대규모 레이드 및 교전 시 최저 프레임 드랍이 전혀 없음', '어항케이스로 인테리어 효과 극대화'],
      cons: ['가격대가 200만원대로 초보자에겐 다소 높은 초기 예산'],
      upgradeAdvice: '파워를 넉넉하게 700~850W로 세팅해두었으므로 향후 차세대 RTX 50 시리즈 출시 시에도 파워 교체 없이 그래픽카드 직결이 가능합니다.'
    }
  },
  {
    id: 'creator-flagship',
    title: '크리에이터 & 4K 플래그십',
    badge: '전문가 / 4K 풀옵션',
    targetGames: ['4K UHD 전 게임', 'AI 스테이블디퓨전', '프리미어 4K 컷편집', '블렌더 3D 렌더링'],
    performanceDescription: '4K 모니터 풀옵션 + 영상편집/원컴 4K 방송을 위한 끝판왕 워크스테이션',
    budgetRange: '약 310만 ~ 350만원',
    iconName: 'Crown',
    defaultComponentIds: {
      cpu: 'cpu-intel-14400f',
      cooler: 'cooler-liquid-360',
      motherboard: 'mb-b760m-intel',
      ram: 'ram-ddr5-32gb',
      gpu: 'gpu-rtx-4080super',
      ssd: 'ssd-1tb-nvme',
      power: 'power-850w-gold',
      case: 'case-aquarium-panoramic'
    },
    recommendedPrebuilt: {
      title: 'ASUS ROG 게이밍 워크스테이션 (i7/i5 + RTX 4080 SUPER 완제)',
      brand: 'ASUS ROG',
      price: 3390000,
      affiliateUrl: 'https://link.coupang.com/a/sample_prebuilt_flagship',
      imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&auto=format&fit=crop&q=60',
      pros: ['ROG 플래그십 감성 튜닝', '골드 등급 파워와 3열 수랭 기본 적용', 'VIP 핫라인 케어'],
      specsSummary: '인텔 i5/i7 / RTX 4080 SUPER 16G / 32GB DDR5 / 1TB Gen4 / 850W Gold'
    },
    aiAnalysis: {
      resolution: '4K UHD (3840x2160) 및 듀얼/트리플 모니터',
      averageFps: {
        '사이버펑크 2077 (4K 풀옵션)': '90+ FPS',
        '검은신화: 오공 (4K 울트라)': '85+ FPS',
        '프리미어 프로 4K 타임라인': '무인코딩 실시간 렌더링',
        '스테이블 디퓨전 이미지 생성': '이미지 1장당 1.2초'
      },
      pros: ['16GB VRAM으로 4K 고화질 텍스처 및 로컬 LLM, 이미지 생성 AI 구동 최적', '10년 보증 골드 파워 탑재'],
      cons: ['시스템 무게와 부피가 크며 고전력 소비'],
      upgradeAdvice: '영상 작업을 장시간 한다면 RAM을 추후 64GB로 확장하면 더욱 쾌적해집니다.'
    }
  }
];
