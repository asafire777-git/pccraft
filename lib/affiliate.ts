/**
 * 쿠팡 파트너스 공식 딥링크 및 키워드 자동 추적 생성 유틸리티
 * - 파트너스 ID: AF5322745
 * - 서브아이디: pccraft
 */

export const COUPANG_PARTNER_ID = 'AF5322745';
export const COUPANG_SUB_ID = 'pccraft';

/**
 * 부품명 또는 키워드를 기반으로 대표님의 수익 추적 파라미터가 포함된 쿠팡 최저가 검색 딥링크 생성
 */
export function getCoupangSearchUrl(keyword: string): string {
  const encodedKeyword = encodeURIComponent(keyword.trim());
  return `https://www.coupang.com/np/search?component=&q=${encodedKeyword}&channel=user&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}

/**
 * 전 부품 일괄 담기용 쿠팡 장바구니/추천 게이밍 PC 핫딜 딥링크 생성
 */
export function getCoupangBulkCartUrl(): string {
  const defaultSearch = encodeURIComponent('조립컴퓨터 부품');
  return `https://www.coupang.com/np/search?component=&q=${defaultSearch}&channel=user&lptag=${COUPANG_PARTNER_ID}&subid=${COUPANG_SUB_ID}`;
}
