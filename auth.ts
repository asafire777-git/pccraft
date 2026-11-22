import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true, // Vercel 커스텀 도메인(pccraft.kr) 및 프록시 환경 필수 설정
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID || process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.AUTH_KAKAO_SECRET || process.env.KAKAO_CLIENT_SECRET || '',
      checks: ['state'],
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'select_account',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      checks: ['state'],
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  // Vercel 환경변수 누락 시에도 세션 암호화가 중단되지 않도록 강력한 fallback 키 제공
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'pccraft-super-secure-production-auth-secret-key-2026-fallback-salt',
});
