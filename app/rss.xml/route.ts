import { NextRequest, NextResponse } from 'next/server';
import { GAME_PRESETS } from '@/data/presets';

export async function GET(request: NextRequest) {
  // 네이버 서치어드바이저 도메인 일치 규격:
  // 사용자가 pccraft.kr 또는 www.pccraft.kr 중 어떤 도메인으로 등록했든
  // 요청이 들어온 도메인을 기반으로 모든 URL(channel link, item link, guid, atom:link)을 100% 일치시킵니다.
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || 'pccraft.kr';
  const cleanHost = host.split(':')[0];
  const baseUrl = `https://${cleanHost}`;

  const siteName = 'PC-Craft (피씨크래프트)';
  const siteDescription = '스마트 컴퓨터 부품 및 2026 차세대 게이밍 맞춤 견적 큐레이션 플랫폼';

  const items = [
    {
      title: '2026 데스크톱 PC 하드웨어 호환성 및 사양 가이드',
      link: `${baseUrl}/guide`,
      guid: `${baseUrl}/guide`,
      description: `
        <p><strong>2026 데스크톱 조립 PC 하드웨어 호환성 및 주요 사양 가이드입니다.</strong></p>
        <p>AMD 라이젠(AM5) 및 인텔(LGA1700) 소켓 규격 호환성, 차세대 DDR5 고클럭 메모리 세팅법, 최신 지포스 RTX 50 시리즈 권장 정격 파워 서플라이 용량 계산법을 상세히 안내합니다.</p>
        <p><a href="${baseUrl}/guide">사양 가이드 전문 보기</a></p>
      `.trim(),
      category: '하드웨어/가이드',
      pubDate: new Date('2026-10-10T00:00:00Z').toUTCString(),
    },
    {
      title: 'PC-Craft 서비스 소개 및 정품 최저가 큐레이션 원칙',
      link: `${baseUrl}/about`,
      guid: `${baseUrl}/about`,
      description: `
        <p><strong>PC-Craft(피씨크래프트) 서비스 철학과 정품 최저가 큐레이션 원칙입니다.</strong></p>
        <p>소비자가 단종/중고/허위 매물 없이 실제 즉시 구매 가능한 오픈마켓 정품 재고와 실시간 시세를 투명하게 비교하고 안전하게 구매할 수 있도록 돕는 스마트 플랫폼입니다.</p>
        <p><a href="${baseUrl}/about">서비스 소개 전문 보기</a></p>
      `.trim(),
      category: '서비스소개',
      pubDate: new Date('2026-10-10T00:00:00Z').toUTCString(),
    },
    ...GAME_PRESETS.map((preset) => ({
      title: `[맞춤 견적] ${preset.title} - ${preset.performanceDescription}`,
      link: `${baseUrl}/?preset=${preset.id}`,
      guid: `${baseUrl}/?preset=${preset.id}`,
      description: `
        <p><strong>${preset.title} (${preset.badge})</strong></p>
        <p>🎯 주요 대상 게임: ${preset.targetGames.join(', ')}</p>
        <p>💰 권장 예산대: ${preset.budgetRange}</p>
        <p>⚡ 주요 사양 요약: ${preset.recommendedPrebuilt.specsSummary}</p>
        <p>🔍 성능 분석: ${preset.aiAnalysis.resolution}</p>
        <p><img src="${preset.recommendedPrebuilt.imageUrl}" alt="${preset.title}" style="max-width:100%; height:auto;" /></p>
        <p><a href="${baseUrl}/?preset=${preset.id}">견적 구성 및 실시간 부품 시세 확인하기</a></p>
      `.trim(),
      category: '컴퓨터견적',
      pubDate: new Date('2026-10-13T09:00:00Z').toUTCString(),
    })),
  ];

  const now = new Date().toUTCString();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteName}]]></title>
    <link>${baseUrl}</link>
    <description><![CDATA[${siteDescription}]]></description>
    <language>ko-KR</language>
    <pubDate>${now}</pubDate>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <category><![CDATA[${item.category}]]></category>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.guid}</guid>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
