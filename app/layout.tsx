import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://pccraft.kr'),
  title: 'PC-Craft | 스마트 게이밍 컴퓨터 조립 견적 & 완본체 최저가 큐레이션 (pccraft.kr)',
  description:
    '게임별(롤, 배틀그라운드, 발로란트, 스팀 AAA대작) 맞춤 컴퓨터 사양 추천, 하드웨어 호환성 및 실시간 소비전력 검증, 부품별 최저가 및 브랜드 완본체 비교 쇼핑 가이드',
  keywords: [
    'pccraft',
    'pccraft.kr',
    '조립컴퓨터',
    '게이밍PC',
    '컴퓨터견적',
    'PC견적',
    '배그견적',
    '롤컴퓨터',
    'RTX4060',
    '7500F',
    '7800X3D',
    '완본체PC',
    '쿠팡컴퓨터최저가'
  ],
  alternates: {
    canonical: 'https://pccraft.kr',
  },
  openGraph: {
    title: 'PC-Craft | 스마트 게이밍 컴퓨터 조립 견적 & 최저가 큐레이션',
    description: '원하는 게임만 고르면 하드웨어 호환성 검증과 실시간 최저가가 완성됩니다.',
    url: 'https://pccraft.kr',
    type: 'website',
    locale: 'ko_KR',
    siteName: 'PC-Craft'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
