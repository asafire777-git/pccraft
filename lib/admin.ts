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
  const name = (user.name || '').toLowerCase().trim();

  return (
    email === 'asafire777@gmail.com' ||
    email.includes('asafire777') ||
    name.includes('asafire777')
  );
}
