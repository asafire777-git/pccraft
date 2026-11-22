export type PickCategory =
  | '스마트가전'
  | '데스크셋업'
  | '모바일/음향'
  | '라이프테크'
  | '게이밍기어';

export interface PickSpecItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface PickGalleryImage {
  url: string;
  caption: string;
}

export interface PickItem {
  slug: string;
  title: string;
  subtitle: string;
  category: PickCategory;
  categoryLabel: string;
  author: string;
  publishedAt: string; // YYYY-MM-DD
  readTimeMinutes: number;
  tags: string[];
  thumbnailKeywords: string[];
  summary: string[]; // 3줄 핵심 요약
  affiliateUrl: string;
  affiliatePlatform: string;
  price: string;
  originalPrice?: string;
  thumbnailImage: string; // 대표 썸네일
  galleryImages: PickGalleryImage[]; // 본문/갤러리 이미지 모음
  specs: PickSpecItem[]; // 실측 스펙 테이블
  pros: string[]; // 특장점 요약
  cons: string[]; // 아쉬운 점 / 구매 전 체크
  recommendFor: string[]; // 이런 분께 추천
  content: string; // 마크다운 본문
}
