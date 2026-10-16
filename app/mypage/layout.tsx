import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 - 저장된 견적함 | PC-Craft',
  description: 'PC-Craft에서 저장한 나만의 컴퓨터 조립 견적을 확인하고 관리하세요.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
