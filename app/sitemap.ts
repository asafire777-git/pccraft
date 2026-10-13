import { MetadataRoute } from 'next';
import { ALL_ARTICLES } from '@/data/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pccraft.kr';

  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/laptop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 하드웨어 랩 10대 심층 분석 리포트 동적 색인 추가
  const articleRoutes: MetadataRoute.Sitemap = ALL_ARTICLES.map((article) => ({
    url: `${baseUrl}/lab/${article.slug}`,
    lastModified: new Date(`${article.updatedAt}T09:00:00Z`),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...baseRoutes, ...articleRoutes];
}
