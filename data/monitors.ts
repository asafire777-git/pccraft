export interface MonitorItem {
  id: string;
  name: string;
  brand: string;
  screenSize: string; // '24인치', '27인치', '32인치'
  resolution: 'FHD' | 'QHD' | '4K UHD';
  refreshRate: string; // '180Hz', '165Hz', '144Hz', '100Hz'
  panelType: string; // 'Fast IPS', 'Nano IPS', 'IPS' 등
  price: number;
  matchTier: 'fhd_entry' | 'fhd_gaming' | 'qhd_gaming' | '4k_gaming';
  reason: string;
  searchKeyword: string;
  features: string[];
}

export const MONITORS_DATA: MonitorItem[] = [
  // 1. FHD 가성비 게이밍 (RTX 4060, RTX 4060 Ti, RX 7600 매칭)
  {
    id: 'mon-lg-24gs60f',
    name: 'LG전자 울트라기어 24GS60F 게이밍',
    brand: 'LG전자',
    screenSize: '24인치 (60.4cm)',
    resolution: 'FHD',
    refreshRate: '180Hz',
    panelType: 'Fast IPS',
    price: 179000,
    matchTier: 'fhd_gaming',
    reason: 'RTX 4060 프레임을 잔상 없이 100% 흡수하는 국민 FPS/롤/배그 최강 모니터',
    searchKeyword: 'LG 울트라기어 24GS60F',
    features: ['180Hz 초고주사율', 'Fast IPS 1ms(GtG)', 'HDR10', 'NVIDIA G-Sync 호환']
  },
  {
    id: 'mon-samsung-g3',
    name: '삼성전자 오디세이 G3 S24AG320',
    brand: '삼성전자',
    screenSize: '24인치 (60.4cm)',
    resolution: 'FHD',
    refreshRate: '165Hz',
    panelType: 'Fast VA',
    price: 159000,
    matchTier: 'fhd_gaming',
    reason: '피벗(세로회전)/엘리베이션 스탠드 기본 탑재, 가성비 165Hz 게이밍',
    searchKeyword: '삼성 오디세이 G3 S24AG320',
    features: ['165Hz 고주사율', '1ms 응답속도', '피벗·높낮이 조절 스탠드', 'FreeSync Premium']
  },
  {
    id: 'mon-lg-27gs60f',
    name: 'LG전자 울트라기어 27GS60F 게이밍',
    brand: 'LG전자',
    screenSize: '27인치 (68.5cm)',
    resolution: 'FHD',
    refreshRate: '180Hz',
    panelType: 'IPS',
    price: 239000,
    matchTier: 'fhd_gaming',
    reason: '시원한 27인치 대화면에 180Hz 고주사율 IPS 탑재',
    searchKeyword: 'LG 울트라기어 27GS60F',
    features: ['27인치 대화면', '180Hz 주사율', 'IPS 광시야각', '1ms MBR']
  },

  // 2. QHD 고주사율 게이밍 (RTX 4070 SUPER, RTX 4070 Ti, RX 7800 XT 매칭)
  {
    id: 'mon-lg-27gp850',
    name: 'LG전자 울트라기어 27GP850 / 27GS85Q 나노IPS',
    brand: 'LG전자',
    screenSize: '27인치 (68.5cm)',
    resolution: 'QHD',
    refreshRate: '180Hz',
    panelType: 'Nano IPS',
    price: 399000,
    matchTier: 'qhd_gaming',
    reason: 'RTX 4070 SUPER의 진가를 발휘하는 명실상부 대한민국 QHD 모니터 1위',
    searchKeyword: 'LG 울트라기어 27GP850',
    features: ['QHD 고해상도(2560x1440)', 'LG Nano IPS 1ms', '180Hz(OC)', 'DCI-P3 98% 색역']
  },
  {
    id: 'mon-samsung-g5-g50d',
    name: '삼성전자 오디세이 G5 G50D S27DG500',
    brand: '삼성전자',
    screenSize: '27인치 (68.5cm)',
    resolution: 'QHD',
    refreshRate: '180Hz',
    panelType: 'Fast IPS',
    price: 279000,
    matchTier: 'qhd_gaming',
    reason: '20만원대 후반에 완성된 QHD Fast IPS 180Hz 압도적 가성비',
    searchKeyword: '삼성 오디세이 G5 S27DG500',
    features: ['QHD 2560x1440', 'Fast IPS 180Hz', '피벗·엘리베이션 스탠드', 'HDR400']
  },
  {
    id: 'mon-philips-27m1n5500',
    name: '필립스 에반니아 27M1N5500ZA QHD 나노IPS',
    brand: '필립스',
    screenSize: '27인치 (68.5cm)',
    resolution: 'QHD',
    refreshRate: '170Hz',
    panelType: 'Nano IPS',
    price: 339000,
    matchTier: 'qhd_gaming',
    reason: 'LG 나노IPS 패널 탑재 + 내장 스피커 완비로 콘솔/PC 동시 활용 최적',
    searchKeyword: '필립스 27M1N5500ZA',
    features: ['LG Nano IPS 패널', '170Hz 주사율', '5W x 2 내장스피커', 'DCI-P3 98%']
  },

  // 3. 4K UHD 하이엔드 게이밍 (RTX 4080 SUPER, RTX 4090 매칭)
  {
    id: 'mon-lg-32gr93u',
    name: 'LG전자 울트라기어 32GR93U 4K UHD 144Hz',
    brand: 'LG전자',
    screenSize: '32인치 (80cm)',
    resolution: '4K UHD',
    refreshRate: '144Hz',
    panelType: 'Fast IPS',
    price: 789000,
    matchTier: '4k_gaming',
    reason: 'RTX 4080 SUPER 종결 매칭! 32인치 4K 고밀도 화질과 144Hz 부드러움의 정점',
    searchKeyword: 'LG 울트라기어 32GR93U',
    features: ['4K UHD(3840x2160)', 'IPS 1ms(GtG)', '144Hz 주사율', 'VESA DisplayHDR 400']
  },
  {
    id: 'mon-samsung-g7-g70b',
    name: '삼성전자 오디세이 G7 S32BG700 4K UHD 144Hz 스마트',
    brand: '삼성전자',
    screenSize: '32인치 (80cm)',
    resolution: '4K UHD',
    refreshRate: '144Hz',
    panelType: 'IPS',
    price: 699000,
    matchTier: '4k_gaming',
    reason: 'PC 없이 넷플릭스·유튜브 시청 가능한 스마트 게이밍 모니터',
    searchKeyword: '삼성 오디세이 G7 S32BG700',
    features: ['4K UHD 144Hz', 'IPS 패널', '스마트 허브 OTT 내장', '코어싱크 라이팅']
  },

  // 4. FHD 사무 / 캐주얼 / 내장그래픽 매칭
  {
    id: 'mon-samsung-f24t350',
    name: '삼성전자 F24T350 베젤리스 IPS',
    brand: '삼성전자',
    screenSize: '24인치 (60.4cm)',
    resolution: 'FHD',
    refreshRate: '75Hz',
    panelType: 'IPS',
    price: 129000,
    matchTier: 'fhd_entry',
    reason: '사무용/가정용 및 롤/유튜브 머신에 딱 맞는 슬림 베젤 가성비 모니터',
    searchKeyword: '삼성전자 F24T350',
    features: ['3면 슬림 베젤', '광시야각 IPS', '시력보호 플리커프리', 'FreeSync']
  },
  {
    id: 'mon-lg-27mr400',
    name: 'LG전자 27MR400 IPS 100Hz',
    brand: 'LG전자',
    screenSize: '27인치 (68.5cm)',
    resolution: 'FHD',
    refreshRate: '100Hz',
    panelType: 'IPS',
    price: 154000,
    matchTier: 'fhd_entry',
    reason: '100Hz 주사율로 한층 부드러운 스크롤링과 27인치 넉넉한 화면',
    searchKeyword: 'LG전자 27MR400',
    features: ['27인치 IPS', '100Hz 주사율', '리더모드·플리커세이프', '틸트 스탠드']
  }
];

export function getRecommendedMonitors(gpuName?: string) {
  const name = (gpuName || '').toLowerCase();

  // 4K UHD 티어 (RTX 4080, RTX 4090, 5080 등)
  if (name.includes('4080') || name.includes('4090') || name.includes('7900 xtx')) {
    return {
      tierKey: '4k_gaming',
      tierLabel: '4K UHD (3840×2160) 144Hz 종결 매칭',
      tierDesc: '선택하신 초고사양 그래픽카드의 한계 성능을 남김없이 뿜어낼 32인치 4K UHD 고주사율 게이밍 모니터입니다.',
      monitors: MONITORS_DATA.filter((m) => m.matchTier === '4k_gaming')
    };
  }

  // QHD 티어 (RTX 4070, 4070 SUPER, 4070 Ti, RX 7800 XT 등)
  if (name.includes('4070') || name.includes('7800 xt') || name.includes('7700 xt')) {
    return {
      tierKey: 'qhd_gaming',
      tierLabel: 'QHD (2560×1440) 180Hz 나노IPS 골든 밸런스',
      tierDesc: 'RTX 4070 SUPER 급 사양에 가장 완벽한 해상도 밸런스입니다. FHD 대비 1.77배 넓고 선명한 시야를 제공합니다.',
      monitors: MONITORS_DATA.filter((m) => m.matchTier === 'qhd_gaming')
    };
  }

  // FHD 게이밍 티어 (RTX 4060, 4060 Ti, 3060, RX 7600, RX 6600 등)
  if (name.includes('4060') || name.includes('3060') || name.includes('7600') || name.includes('6600')) {
    return {
      tierKey: 'fhd_gaming',
      tierLabel: 'FHD (1920×1080) 165~180Hz Fast-IPS 고주사율',
      tierDesc: 'RTX 4060의 프레임 성능을 풀옵션 144~180fps로 100% 매끄럽게 받아낼 수 있는 e스포츠 게이밍 모니터입니다.',
      monitors: MONITORS_DATA.filter((m) => m.matchTier === 'fhd_gaming')
    };
  }

  // 사무용 / 내장그래픽
  return {
    tierKey: 'fhd_entry',
    tierLabel: 'FHD 실속형 75~100Hz 시력보호 IPS',
    tierDesc: '문서작업, 웹서핑, 유튜브 4K 영상 감상 및 캐주얼 게임에 최적화된 편안한 광시야각 모니터입니다.',
    monitors: MONITORS_DATA.filter((m) => m.matchTier === 'fhd_entry')
  };
}
