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
import { article13 } from './article13';
import { article14 } from './article14';
import { article15 } from './article15';
import { article16 } from './article16';
import { article17 } from './article17';
import { article18 } from './article18';
import { article19 } from './article19';
import { article20 } from './article20';
import { article21 } from './article21';
import { article22 } from './article22';
import { article23 } from './article23';
import { article24 } from './article24';
import { article25 } from './article25';
import { article26 } from './article26';

export * from './types';

function getTodayKST(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

const RAW_ARTICLES: Article[] = [
  article26,
  article25,
  article24,
  article23,
  article22,
  article21,
  article20,
  article19,
  article18,
  article17,
  article16,
  article15,
  article14,
  article13,
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

// 예약 발행 지원: publishedAt이 한국 시간(KST) 오늘 날짜 이하인 글만 자동 노출 (최신 발행순)
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
