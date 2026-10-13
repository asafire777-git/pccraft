import { NextResponse } from 'next/server';
import { GAME_PRESETS } from '@/data/presets';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pccraft.kr';
  const siteName = 'PC-Craft (피씨크래프트)';
  const siteDescription = '스마트 컴퓨터 부품 & 게이밍 맞춤 견적 큐레이션 플랫폼';

  const items = [
    {
      title: '2026 데스크톱 PC 하드웨어 호환성 & 사양 가이드',
      link: `${baseUrl}/guide`,
      description: 'CPU와 메인보드 소켓 규격(AM5, LGA1700), DDR5 메모리 호환성, 그래픽카드 권장 파워 서플라이 계산법 가이드',
      pubDate: new Date('2026-10-10').toUTCString(),
    },
    {
      title: 'PC-Craft 서비스 소개 & 제휴 운영 원칙',
      link: `${baseUrl}/about`,
      description: 'PC-Craft의 설립 목적, 실시간 최저가 수집 철학 및 공정거래위원회 지침 준수 투명성 정책 안내',
      pubDate: new Date('2026-10-10').toUTCString(),
    },
    ...GAME_PRESETS.map((preset) => ({
      title: `[맞춤 견적] ${preset.title} - ${preset.performanceDescription}`,
      link: `${baseUrl}`,
      description: `추천 게임: ${preset.targetGames.join(', ')} | 예산대: ${preset.budgetRange}`,
      pubDate: new Date().toUTCString(),
    })),
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
