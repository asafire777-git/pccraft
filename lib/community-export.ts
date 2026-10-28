import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { encodeQuoteToShareUrl } from '@/lib/share';

interface ExportQuoteOptions {
  selectedComponents: Record<string, ComponentItem | null>;
  currentPreset?: GamePreset | null;
  totalPrice: number;
  includeWindows?: boolean;
}

const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: 'cpu', label: 'CPU' },
  { key: 'cooler', label: '쿨러' },
  { key: 'motherboard', label: '메인보드' },
  { key: 'ram', label: '메모리' },
  { key: 'gpu', label: '그래픽카드' },
  { key: 'ssd', label: 'SSD' },
  { key: 'power', label: '파워서플라이' },
  { key: 'case', label: '케이스' },
];

export function generateCommunityText({
  selectedComponents,
  currentPreset,
  totalPrice,
  includeWindows = false,
}: ExportQuoteOptions): string {
  const WINDOWS_PRICE = 179000;
  const effectiveTotal = totalPrice + (includeWindows ? WINDOWS_PRICE : 0);
  const shareUrl = encodeQuoteToShareUrl(selectedComponents, currentPreset?.id);

  const presetTitle = currentPreset?.title || '나만의 커스텀 조립 PC';
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  let text = `[PC-Craft 실시간 검증 견적서 | ${today}]\n`;
  text += `■ 용도/견적명: ${presetTitle}\n`;
  text += `--------------------------------------------------\n`;

  CATEGORY_ORDER.forEach(({ key, label }) => {
    const item = selectedComponents[key];
    if (item) {
      text += `• ${label.padEnd(8)}: ${item.name} (${item.price.toLocaleString()}원)\n`;
    }
  });

  if (includeWindows) {
    text += `• 운영체제  : Microsoft Windows 11 Home FPP 처음사용자용 (${WINDOWS_PRICE.toLocaleString()}원)\n`;
  }

  text += `--------------------------------------------------\n`;
  text += `★ 부품 실시간 최저가 합계: ${effectiveTotal.toLocaleString()}원\n\n`;
  text += `❓ 질문 내용:\n`;
  text += `현재 위 견적으로 맞추려고 하는데 부품 호환성이나 밸런스(이륙 가능 여부) 괜찮은지 고수님들의 조언 부탁드립니다!\n\n`;
  text += `👉 견적 상세 및 실시간 부품 호환성 검증 링크:\n${shareUrl}\n`;
  text += `[출처: PC-Craft 실시간 PC 견적 & 이륙 판독기]`;

  return text;
}

export const COMMUNITY_DESTINATIONS = [
  {
    name: '퀘이사존 (PC 견적 게시판)',
    url: 'https://quasarzone.com/bbs/qb_pc_builder',
    badge: '하드웨어 1위 커뮤니티',
    color: 'orange',
  },
  {
    name: '디시인사이드 (컴퓨터본체 갤러리)',
    url: 'https://gall.dcinside.com/board/lists/?id=pridepc_new4',
    badge: '실시간 피드백 최다',
    color: 'blue',
  },
  {
    name: '쿨엔조이 (PC 견적 상담실)',
    url: 'https://coolenjoy.net/bbs/estimate',
    badge: '오버클럭/하이엔드 전문',
    color: 'sky',
  },
  {
    name: '에펨코리아 (컴퓨터/IT 게시판)',
    url: 'https://www.fmkorea.com/com',
    badge: '2030 게이머 종합',
    color: 'indigo',
  },
];
