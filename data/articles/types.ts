export type ArticleCategory = 
  | 'GPU'
  | 'CPU'
  | '조립가이드'
  | '호환성'
  | '파워서플라이'
  | '메모리/저장장치'
  | '모니터'
  | '견적추천'
  | '쇼핑몰핫딜';

export interface TocItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  categoryLabel: string;
  author: string;
  authorRole: string;
  publishedAt: string; // YYYY-MM-DD
  updatedAt: string; // YYYY-MM-DD
  readTimeMinutes: number;
  viewCount: number;
  featured?: boolean;
  coverImage?: string;
  tags: string[];
  summary: string;
  tableOfContents: TocItem[];
  content: string;
  relatedPresetId?: string;
  relatedArticleSlugs?: string[];
  keyTakeaways: string[];
}
