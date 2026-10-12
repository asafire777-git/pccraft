import { ComponentItem } from '@/data/components';

export interface CompatibilityReport {
  isCompatible: boolean;
  estimatedWattage: number;
  recommendedWattage: number;
  issues: {
    type: 'error' | 'warning' | 'info';
    title: string;
    description: string;
  }[];
}

export function checkCompatibility(selectedComponents: {
  cpu?: ComponentItem;
  cooler?: ComponentItem;
  motherboard?: ComponentItem;
  ram?: ComponentItem;
  gpu?: ComponentItem;
  ssd?: ComponentItem;
  power?: ComponentItem;
  case?: ComponentItem;
}): CompatibilityReport {
  const issues: CompatibilityReport['issues'] = [];
  let isCompatible = true;

  const { cpu, motherboard, ram, gpu, power } = selectedComponents;

  // 1. 소켓 호환성 검사 (CPU <-> 메인보드)
  if (cpu && motherboard) {
    if (cpu.socket && motherboard.socket && cpu.socket !== motherboard.socket) {
      isCompatible = false;
      issues.push({
        type: 'error',
        title: 'CPU와 메인보드 소켓 불일치',
        description: `선택하신 CPU는 [${cpu.socket}] 소켓 규격이지만, 메인보드는 [${motherboard.socket}] 소켓입니다. 장착이 불가능하니 소켓이 일치하는 메인보드로 변경해주세요.`
      });
    }
  }

  // 2. RAM 규격 호환성 검사
  if (cpu && ram) {
    const isCpuDdr5Only = cpu.socket === 'AM5';
    const isRamDdr4 = ram.specs['규격']?.includes('DDR4');
    const isRamDdr5 = ram.specs['규격']?.includes('DDR5');

    if (isCpuDdr5Only && isRamDdr4) {
      isCompatible = false;
      issues.push({
        type: 'error',
        title: '메모리 규격 불일치 (DDR4 / DDR5)',
        description: `선택하신 라이젠 AM5 CPU는 차세대 DDR5 메모리만 지원합니다. DDR4 메모리는 장착할 수 없으니 DDR5로 교체하세요.`
      });
    }

    if (cpu.socket === 'AM4' && isRamDdr5) {
      isCompatible = false;
      issues.push({
        type: 'error',
        title: '메모리 규격 불일치 (DDR5 미지원)',
        description: `선택하신 AM4 CPU는 DDR4 규격 메인보드 및 메모리만 지원합니다. DDR4 메모리로 선택해주세요.`
      });
    }
  }

  // 3. 소비전력 계산 및 파워 용량 검사
  const cpuTdp = cpu?.tdp || 65;
  const gpuTdp = gpu?.tdp || 115;
  const systemBaseWatt = 80; // 메인보드, 팬, SSD 등 기본 소비 전력
  const estimatedWattage = cpuTdp + gpuTdp + systemBaseWatt;
  const recommendedWattage = Math.round((estimatedWattage * 1.4) / 50) * 50; // 40% 피크 안전 마진

  if (power && power.wattage) {
    if (power.wattage < estimatedWattage) {
      isCompatible = false;
      issues.push({
        type: 'error',
        title: '파워서플라이 용량 절대 부족',
        description: `시스템 예상 최대 전력(${estimatedWattage}W)보다 파워 정격용량(${power.wattage}W)이 낮습니다. 게임 구동 시 전원이 꺼질 수 있으므로 최소 ${recommendedWattage}W 이상을 권장합니다.`
      });
    } else if (power.wattage < recommendedWattage) {
      issues.push({
        type: 'warning',
        title: '파워 용량 마진 다소 부족',
        description: `현재 파워(${power.wattage}W)로도 작동은 가능하나, 피크 부하 및 향후 안정성을 위해 ${recommendedWattage}W 이상을 권장합니다.`
      });
    } else {
      issues.push({
        type: 'info',
        title: '파워 용량 매우 넉넉함',
        description: `시스템 예상 소비전력 대비 ${power.wattage}W 파워는 40% 이상의 안정적인 안전 여유율을 확보하고 있습니다.`
      });
    }
  }

  // 모든 검사가 에러 없이 통과되면
  if (issues.filter(i => i.type === 'error').length === 0) {
    issues.unshift({
      type: 'info',
      title: '하드웨어 호환성 이상 없음',
      description: '선택하신 모든 부품 간 규격 및 전력 호환성이 정상적으로 확인되었습니다.'
    });
  }

  return {
    isCompatible,
    estimatedWattage,
    recommendedWattage,
    issues
  };
}
