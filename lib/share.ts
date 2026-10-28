import { ComponentItem, COMPONENTS_DATA } from '@/data/components';
import { GAME_PRESETS, GamePreset } from '@/data/presets';

/**
 * 선택된 부품 목록 및 프리셋 정보를 압축하여 공유 가능한 URL 쿼리 파라미터 문자열로 생성
 * 예: ?preset=qhd-high&c=cpu:cpu-amd-7500f,gpu:gpu-rtx-4070-super,...
 */
export function encodeQuoteToShareUrl(
  selectedComponents: Record<string, ComponentItem | null | undefined>,
  presetId?: string
): string {
  if (typeof window === 'undefined') return '';

  const params = new URLSearchParams();
  if (presetId) {
    params.set('preset', presetId);
  }

  // 부품 ID들을 'cpu:id,gpu:id' 형태로 컴팩트하게 직렬화
  const componentPairs = (Object.entries(selectedComponents) as [string, ComponentItem | null | undefined][])
    .filter((entry): entry is [string, ComponentItem] => Boolean(entry[1]?.id))
    .map(([cat, item]) => `${cat}:${item.id}`)
    .join(',');

  if (componentPairs) {
    params.set('c', componentPairs);
  }

  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}?${params.toString()}`;
}

/**
 * 공유 URL의 쿼리 스트링(Search Params)으로부터 견적 복원
 */
export function decodeQuoteFromParams(
  searchParams: URLSearchParams
): {
  preset?: GamePreset;
  components?: Record<string, ComponentItem>;
} | null {
  const presetId = searchParams.get('preset');
  const compParam = searchParams.get('c');

  if (!presetId && !compParam) {
    return null;
  }

  let matchedPreset: GamePreset | undefined = undefined;
  if (presetId) {
    matchedPreset = GAME_PRESETS.find((p) => p.id === presetId);
  }

  const restoredComponents: Record<string, ComponentItem> = {};

  // 1. 프리셋 기본 부품으로 먼저 채우기 (있을 경우)
  if (matchedPreset) {
    Object.entries(matchedPreset.defaultComponentIds).forEach(([catKey, id]) => {
      const found = COMPONENTS_DATA[catKey]?.find((item) => item.id === id);
      if (found) {
        restoredComponents[catKey] = found;
      }
    });
  }

  // 2. 사용자가 커스텀하게 변경한 부품 ID가 쿼리 파라미터에 있으면 덮어쓰기
  if (compParam) {
    const pairs = compParam.split(',');
    pairs.forEach((pair) => {
      const [category, id] = pair.split(':');
      if (category && id && COMPONENTS_DATA[category]) {
        const found = COMPONENTS_DATA[category]?.find((item) => item.id === id);
        if (found) {
          restoredComponents[category] = found;
        }
      }
    });
  }

  return {
    preset: matchedPreset,
    components: Object.keys(restoredComponents).length > 0 ? restoredComponents : undefined
  };
}
