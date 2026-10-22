/**
 * 관리자 권한 및 계정 식별 유틸리티
 */

export const ADMIN_IDENTIFIERS = [
  'asafire777@gmail.com',
  'asafire777',
];

export function isAdmin(user?: { email?: string | null; name?: string | null } | null): boolean {
  if (!user) return false;
  const email = (user.email || '').toLowerCase().trim();

  // 닉네임 기반 판별은 악의적 유저가 소셜 프로필명을 변경해 우회할 위험이 있으므로,
  // 반드시 검증된 관리자 이메일 일치 여부로만 엄격하게 식별합니다.
  return ADMIN_IDENTIFIERS.some((adminEmail) => email === adminEmail.toLowerCase().trim());
}
