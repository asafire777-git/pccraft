import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '실시간 하드웨어 특가 & 완본체 PC 핫딜 모아보기 | PC-Craft',
  description: '11번가 슈팅배송, 쿠팡 로켓배송, G마켓 등 주요 이커머스에서 실시간으로 할인 중인 가성비 게이밍 완본체 및 주요 PC 핵심 부품(CPU, 그래픽카드, SSD) 특가 정보를 한눈에 비교 확인하세요.',
  keywords: ['하드웨어특가', '컴퓨터핫딜', '완본체할인', '게이밍PC특가', '슈팅배송', '로켓배송', 'PC-Craft'],
  alternates: {
    canonical: 'https://pccraft.kr/deals',
  },
  openGraph: {
    title: '실시간 하드웨어 특가 & 완본체 PC 핫딜 모아보기 | PC-Craft',
    description: '실시간 오픈마켓 PC 하드웨어 및 게이밍 완본체 특가 큐레이션',
    url: 'https://pccraft.kr/deals',
    images: [{ url: 'https://pccraft.kr/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
