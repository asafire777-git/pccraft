import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '실시간 가성비 & 게이밍 노트북 추천 큐레이션 | PC-Craft',
  description: '쿠팡 로켓배송, 11번가, G마켓 등 주요 오픈마켓 실시간 특가 노트북 비교. 사무용 경량 노트북부터 RTX 4060/4070 탑재 고성능 게이밍 노트북까지 최적의 가성비 제품을 선별 추천합니다.',
  keywords: ['가성비노트북', '게이밍노트북', '노트북추천', 'RTX4060노트북', '대학생노트북', '로켓배송노트북', 'PC-Craft'],
  alternates: {
    canonical: 'https://pccraft.kr/laptop',
  },
  openGraph: {
    title: '실시간 가성비 & 게이밍 노트북 추천 큐레이션 | PC-Craft',
    description: '오픈마켓 실시간 특가 노트북 비교 및 추천',
    url: 'https://pccraft.kr/laptop',
    images: [{ url: 'https://pccraft.kr/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function LaptopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
