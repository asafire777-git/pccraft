import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PC-Craft 관리자 전용 대시보드 (비공개)',
  description: '최고 관리자 전용 폐쇄형 시스템 대시보드입니다.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'none',
      'max-snippet': -1,
    },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
