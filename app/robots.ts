import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pccraft.kr';

  const disallowParams = [
    '/api/',
    '/mypage',
    '/*?*', // 모든 불필요한 쿼리 파라미터(?preset=, ?tab=, ?search= 등) 크롤링 차단하여 중복 색인 방지
    '/*?preset=*',
    '/*?tab=*',
    '/*?category=*',
    '/*?mall=*',
    '/*?q=*',
    '/*?search=*',
  ];

  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowParams,
      },
      {
        userAgent: 'Yeti', // 네이버 검색 로봇
        allow: '/',
        disallow: disallowParams,
      },
      {
        userAgent: 'Daumoa', // 다음/카카오 검색 로봇
        allow: '/',
        disallow: disallowParams,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowParams,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
