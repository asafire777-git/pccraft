/**
 * 사이트 운영 모드 전역 설정
 * - ADSENSE_REVIEW_MODE = true:
 *   구글 애드센스 심사 기간 중 과도한 외부 제휴 배너(쿠팡 기획전, 멀티 플랫폼 프로모션 그리드 등)를 일시 숨김 처리하고,
 *   순수 정보성 콘텐츠(/lab, /picks, /guide, 메인 가이드/FAQ) 비중을 극대화하여 승인률을 높입니다.
 * - 애드센스 승인 완료 후 false로 전환하면 모든 제휴 기획전 배너가 즉시 복원됩니다.
 */
export const ADSENSE_REVIEW_MODE = true;
