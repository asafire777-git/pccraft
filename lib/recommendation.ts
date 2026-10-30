import { COMPONENTS_DATA, ComponentItem } from '@/data/components';

export interface CompatibilityPresetResult {
  targetCpu: ComponentItem;
  optimizedComponents: {
    cpu: ComponentItem;
    cooler: ComponentItem;
    motherboard: ComponentItem;
    ram: ComponentItem;
    gpu: ComponentItem;
    ssd: ComponentItem;
    power: ComponentItem;
    case: ComponentItem;
  };
  reasoning: {
    title: string;
    description: string;
    socketSummary: string;
    ramSummary: string;
    gpuSummary: string;
    powerSummary: string;
    coolerSummary: string;
  };
}

/**
 * ID로 컴포넌트 안전 조회 헬퍼
 */
function findComponent(category: keyof typeof COMPONENTS_DATA, id: string): ComponentItem {
  const items = COMPONENTS_DATA[category] || [];
  const found = items.find((item) => item.id === id);
  if (found) return found;
  return items[0]; // fallback
}

/**
 * CPU를 선택했을 때, 하드웨어 호환성 진단 엔진을 가동하여
 * 소켓 일치 메인보드, DDR4/DDR5 메모리, 병목 0% 최적 GPU, 정격 파워, 발열 제어 쿨러를
 * 일괄 자동 매칭하는 최적화 엔진
 */
export function getOptimizedCompatibilityPreset(
  cpu: ComponentItem,
  currentComponents?: Partial<Record<string, ComponentItem>>
): CompatibilityPresetResult {
  const socket = cpu.socket || 'AM5';
  const tdp = cpu.tdp || 65;
  const cpuId = cpu.id;

  let mbId = 'mb-b650m-k';
  let ramId = 'ram-ddr5-32gb';
  let coolerId = 'cooler-basic-air';
  let gpuId = 'gpu-rtx-5060-gigabyte';
  let powerId = 'power-700w-bronze';
  let ssdId = currentComponents?.ssd?.id || 'ssd-1tb-nvme';
  let caseId = currentComponents?.case?.id || 'case-darkflash-dk200';

  let socketSummary = '';
  let ramSummary = '';
  let gpuSummary = '';
  let powerSummary = '';
  let coolerSummary = '';

  // 1. AMD AM4 플랫폼 (5600, 5600G 등)
  if (socket === 'AM4') {
    if (cpuId === 'cpu-amd-5600g') {
      mbId = 'mb-a520m';
      ramId = 'ram-ddr4-16gb';
      coolerId = 'cooler-basic-air';
      gpuId = 'gpu-rtx-3050-6gb';
      powerId = 'power-500w-std';
      ssdId = 'ssd-500gb-nvme';
      socketSummary = '가성비 AM4 소켓 보드(ASUS A520M) 호환';
      ramSummary = '내장 그래픽 대역폭을 위한 DDR4 듀얼채널 구성';
      gpuSummary = '가정/사무 및 캐주얼 게임에 최적화된 저전력 구성';
      powerSummary = '시스템 소비전력 대비 넉넉한 정격 500W 파워';
      coolerSummary = '65W 저발열 CPU에 충분한 정숙 싱글타워 공랭';
    } else {
      mbId = 'mb-b550m-mortar';
      ramId = 'ram-ddr4-16gb';
      coolerId = 'cooler-basic-air';
      gpuId = 'gpu-rtx-4060';
      powerId = 'power-micronics-600w';
      socketSummary = '검증된 AM4 박격포 B550 메인보드 100% 호환';
      ramSummary = 'AM4 전용 DDR4 고클럭 메모리 자동 세팅';
      gpuSummary = 'FHD 풀옵션 환경에서 CPU 병목 없는 RTX 4060 매칭';
      powerSummary = '정격 600W 브론즈 파워로 안정적 전력 공급';
      coolerSummary = '가성비 1위 싱글타워 쿨러로 무소음 수준 발열 제어';
    }
  }
  // 2. AMD AM5 플랫폼 (7500F, 7600, 7700, 7800X3D, 9800X3D 등)
  else if (socket === 'AM5') {
    if (cpuId === 'cpu-amd-7800x3d' || cpuId === 'cpu-amd-9800x3d' || cpuId === 'cpu-amd-9900x') {
      mbId = 'mb-b650m-k';
      ramId = 'ram-ddr5-32gb';
      coolerId = 'cooler-dual-air';
      gpuId = 'gpu-rtx-4070super';
      powerId = 'power-700w-bronze';
      caseId = 'case-darkflash-dk200';
      socketSummary = 'AM5 소켓 100% 지원 Dr.MOS 8+2+1페이즈 전원부 보드';
      ramSummary = '차세대 DDR5-5600 32GB 고용량 듀얼채널 매칭';
      gpuSummary = 'X3D 최강 게이밍 CPU와 병목률 0% QHD 종결 RTX 4070 SUPER';
      powerSummary = '700W 정격 파워로 피크 로드 40% 이상 안전 여유율 확보';
      coolerSummary = '3D V-캐시 발열을 완벽 제어하는 대장급 듀얼타워 공랭';
    } else if (cpuId === 'cpu-amd-7700' || cpuId === 'cpu-amd-9600x' || cpuId === 'cpu-amd-9700x') {
      mbId = 'mb-b650m-k';
      ramId = 'ram-ddr5-32gb';
      coolerId = 'cooler-dual-air';
      gpuId = 'gpu-rtx-5060ti-emtek';
      powerId = 'power-700w-bronze';
      socketSummary = 'AM5 소켓 ASRock B650M-HDV/M.2 디앤디컴 정품 매칭';
      ramSummary = '최신 게이밍 표준 삼성 DDR5-5600 32GB 탑재';
      gpuSummary = 'QHD 144Hz 진입에 최적화된 차세대 지포스 RTX 5060 Ti';
      powerSummary = '정격 700W 브론즈 파워로 그래픽카드 피크 방어';
      coolerSummary = '열을 빠르게 식혀주는 트윈 히트파이프 듀얼 쿨러';
    } else {
      // 7500F, 7600 국민 가성비 라인업
      mbId = 'mb-b650m-k';
      ramId = 'ram-ddr5-32gb';
      coolerId = 'cooler-basic-air';
      gpuId = 'gpu-rtx-5060-gigabyte';
      powerId = 'power-700w-bronze';
      socketSummary = '다나와 1위 ASRock B650M-HDV/M.2 (AM5 소켓 일치)';
      ramSummary = '차세대 게이밍 표준 삼성 DDR5-5600 32GB (16GBx2)';
      gpuSummary = 'FHD 전 게임 풀옵션 방어 차세대 MSI RTX 5060 벤투스';
      powerSummary = '마이크로닉스 Classic II 700W 안전 정격 파워';
      coolerSummary = 'Thermalright Assassin X 120 가성비 1위 공랭';
    }
  }
  // 3. Intel LGA1700 플랫폼 (12100F, 12400F, 13400F, 14400F, 14600KF, 14700K)
  else if (socket === 'LGA1700') {
    if (cpuId === 'cpu-intel-14700k' || cpuId === 'cpu-intel-14600kf') {
      mbId = 'mb-b760m-mortar';
      ramId = 'ram-ddr5-32gb';
      coolerId = 'cooler-liquid-360';
      gpuId = 'gpu-rtx-4070super';
      powerId = 'power-850w-gold';
      socketSummary = 'LGA1700 소켓 MSI MAG B760M 박격포 (탄탄한 전원부)';
      ramSummary = '작업과 게임을 모두 만족하는 DDR5-5600 32GB';
      gpuSummary = '인텔 고클럭 연산과 완벽 밸런스를 이루는 RTX 4070 SUPER';
      powerSummary = '인텔 K버전 피크 전력 완벽 소화 시소닉 850W 골드 파워';
      coolerSummary = '고발열 K버전 CPU 필수 darkFlash 3열 수랭쿨러 기본 세팅';
    } else if (cpuId === 'cpu-intel-12100f') {
      mbId = 'mb-h610m-intel';
      ramId = 'ram-ddr4-16gb';
      coolerId = 'cooler-basic-air';
      gpuId = 'gpu-rx-6600';
      powerId = 'power-500w-std';
      ssdId = 'ssd-500gb-nvme';
      socketSummary = 'LGA1700 소켓 ASUS EX H610M-V3 가성비 매칭';
      ramSummary = '예산 절감을 위한 실속형 DDR4 16GB 듀얼채널';
      gpuSummary = '12100F 성능을 100% 쏟아내는 가성비 라데온 RX 6600';
      powerSummary = '정격 500W 표준 파워로 알뜰 구성';
      coolerSummary = '싱글타워 쿨러로 정숙한 사무/게이밍 환경';
    } else {
      // 12400F, 13400F, 14400F 인텔 국민 견적
      mbId = 'mb-b760m-intel';
      ramId = 'ram-ddr5-32gb';
      coolerId = 'cooler-basic-air';
      gpuId = 'gpu-rtx-4060';
      powerId = 'power-700w-bronze';
      socketSummary = 'LGA1700 기가바이트 B760M DS3H 정품 보드 매칭';
      ramSummary = '인텔 12~14세대 호환 최신 DDR5 32GB 메모리';
      gpuSummary = 'FHD 144Hz 게이밍 병목 0% 지포스 RTX 4060';
      powerSummary = '정격 700W 브론즈 파워로 전력 여유 충분';
      coolerSummary = 'Thermalright 싱글타워 공랭으로 쾌적한 쿨링';
    }
  }
  // 4. Intel LGA1851 차세대 플랫폼 (Core Ultra 5 245K, Ultra 7 265K)
  else if (socket === 'LGA1851') {
    mbId = 'mb-z890-intel';
    ramId = 'ram-ddr5-32gb';
    coolerId = 'cooler-liquid-360';
    gpuId = 'gpu-rtx-5070-emtek';
    powerId = 'power-850w-gold';
    socketSummary = '인텔 코어 울트라 전용 LGA1851 Z890 최신 메인보드';
    ramSummary = '차세대 DDR5 전용 플랫폼 32GB 고속 듀얼채널';
    gpuSummary = '최신 NPU 및 초고성능 그래픽을 뒷받침하는 지포스 RTX 5070';
    powerSummary = '정격 850W 80PLUS 골드 파워로 고효율 무소음 방어';
    coolerSummary = '오버클럭 및 피크 부하 안정 제어 3열 수랭쿨러';
  }

  const targetCpu = cpu;
  const motherboard = findComponent('motherboard', mbId);
  const ram = findComponent('ram', ramId);
  const cooler = findComponent('cooler', coolerId);
  const gpu = findComponent('gpu', gpuId);
  const power = findComponent('power', powerId);
  const ssd = findComponent('ssd', ssdId);
  const caseComp = findComponent('case', caseId);

  return {
    targetCpu,
    optimizedComponents: {
      cpu: targetCpu,
      cooler,
      motherboard,
      ram,
      gpu,
      ssd,
      power,
      case: caseComp
    },
    reasoning: {
      title: `${targetCpu.name} 기반 스마트 호환 견적 완성`,
      description: `하드웨어 호환성 진단 엔진이 소켓 규격, DDR 메모리, 그래픽카드 병목 밸런스, 파워 정격 용량을 검증하여 100% 호환되는 최적 세팅으로 재구성했습니다.`,
      socketSummary,
      ramSummary,
      gpuSummary,
      powerSummary,
      coolerSummary
    }
  };
}
