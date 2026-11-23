import { Article, ArticleCategory } from './types';
import { article1 } from './article1';
import { article2 } from './article2';
import { article3 } from './article3';
import { article4 } from './article4';
import { article5 } from './article5';
import { article6 } from './article6';
import { article7 } from './article7';
import { article8 } from './article8';
import { article9 } from './article9';
import { article10 } from './article10';
import { article11 } from './article11';
import { article12 } from './article12';

export * from './types';

function getTodayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

const RAW_ARTICLES: Article[] = [
  article12,
  article11,
  article1,
  article2,
  article3,
  article4,
  article5,
  article6,
  article7,
  article8,
  article9,
  article10,
];

// 예약 발행 지원: publishedAt이 한국 시간(KST) 오늘 날짜 이하인 글만 자동 노출
export const ALL_ARTICLES: Article[] = RAW_ARTICLES.filter(
  (a) => a.publishedAt <= getTodayKST()
);

export function getArticleBySlug(slug: string): Article | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory | 'all'): Article[] {
  if (category === 'all') return ALL_ARTICLES;
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export function getFeaturedArticles(): Article[] {
  return ALL_ARTICLES.filter((a) => a.featured);
}
