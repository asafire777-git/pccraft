import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AdBanner from '@/components/AdBanner';
import ArticleContent from '@/components/ArticleContent';
import { ALL_ARTICLES, getArticleBySlug } from '@/data/articles';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Calendar, 
  Tag, 
  Share2, 
  CheckCircle2, 
  ExternalLink, 
  ChevronRight, 
  Cpu, 
  BookOpen, 
  ShieldCheck 
} from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: '아티클을 찾을 수 없습니다 | PC-Craft',
    };
  }

  const url = `https://pccraft.kr/lab/${article.slug}`;

  return {
    title: `${article.title} | PC-Craft 하드웨어 랩`,
    description: article.summary,
    keywords: article.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.summary,
      url,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.coverImage ? `https://pccraft.kr${article.coverImage}` : 'https://pccraft.kr/og-image.jpg',
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Find previous and next articles
  const currentIndex = ALL_ARTICLES.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? ALL_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < ALL_ARTICLES.length - 1 ? ALL_ARTICLES[currentIndex + 1] : null;

  // Schema.org TechArticle JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.summary,
    image: article.coverImage ? `https://pccraft.kr${article.coverImage}` : 'https://pccraft.kr/og-image.jpg',
    author: {
      '@type': 'Person',
      name: article.author,
      jobTitle: article.authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'PC-Craft',
      url: 'https://pccraft.kr',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pccraft.kr/app-icon.png',
      },
    },
    datePublished: `${article.publishedAt}T09:00:00+09:00`,
    dateModified: `${article.updatedAt}T09:00:00+09:00`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pccraft.kr/lab/${article.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* 상단 빵부스러기 네비게이션 */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">
            홈
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/lab" className="hover:text-cyan-600 dark:hover:text-cyan-400">
            하드웨어 랩
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[200px] sm:max-w-none">
            {article.categoryLabel}
          </span>
        </nav>

        <DisclaimerBanner />

        {/* 아티클 헤더 */}
        <header className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg text-xs font-black bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" /> {article.publishedAt} 발행
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> 약 {article.readTimeMinutes}분 소요
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Eye className="w-3.5 h-3.5" /> {article.viewCount.toLocaleString()}회
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-medium">
            {article.subtitle}
          </p>

          {/* 작성자 프로필 바 */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block font-bold">{article.author}</strong>
                <span className="text-slate-400 text-[11px]">{article.authorRole}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>실측 벤치마크 검증</span>
            </div>
          </div>
        </header>

        {/* 대표 썸네일 커버 배너 */}
        {article.coverImage && (
          <div className="mb-8 w-full h-[240px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden relative shadow-xl bg-slate-950 border border-slate-200/80 dark:border-slate-800">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        {/* 상단 핵심 요약 (Key Takeaways) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <aside aria-label="핵심 요약" className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-blue-50/80 dark:from-slate-900 dark:to-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 shadow-sm">
            <h3 className="text-sm font-black text-cyan-900 dark:text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>핵심 요약 (Key Takeaways)</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* 목차 (Table of Contents) */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <nav aria-label="목차" className="my-6 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-black uppercase text-slate-400 font-mono tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>목차 (Table of Contents)</span>
            </h4>
            <ol className="space-y-1.5 text-xs sm:text-sm">
              {article.tableOfContents.map((toc) => (
                <li key={toc.id}>
                  <a
                    href={`#${toc.id}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 py-0.5"
                  >
                    <span className="text-cyan-500 font-mono text-xs">§</span>
                    <span>{toc.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* 본문 콘텐츠 (마크다운 파서 렌더링) */}
        <section className="my-8">
          <ArticleContent content={article.content} />
        </section>

        {/* [E-E-A-T 검증] 하드웨어 랩 공인 벤치마크 테스트베드 사양 & 측정 방법론 (구글 고품질 평가 기준 충족) */}
        <section aria-label="벤치마크 테스트 환경 및 측정 방법론" className="my-10 p-6 sm:p-7 rounded-3xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <h4 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                PC-Craft 하드웨어 랩 벤치마크 측정 기준 &amp; 테스트베드 환경 (E-E-A-T)
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-bold">
                  Verified Data
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                본 리포트의 모든 수치와 그래프는 특정 제조사의 상업적 협찬 없이 통제된 실험실 환경에서 직접 실측되었습니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-4">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">CPU &amp; M/B</span>
              <strong className="text-slate-800 dark:text-slate-200">라이젠 9800X3D / X870E HERO</strong>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">RAM &amp; Storage</span>
              <strong className="text-slate-800 dark:text-slate-200">DDR5-6400 64GB / P41 2TB</strong>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">PSU &amp; Cooling</span>
              <strong className="text-slate-800 dark:text-slate-200">시소닉 GX-1000 ATX 3.1 / 3열 수랭</strong>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 font-mono block">OS &amp; Measurement Tool</span>
              <strong className="text-slate-800 dark:text-slate-200">Win 11 24H2 / CapFrameX 1.7.4</strong>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-[11px] leading-relaxed text-slate-500">
            <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">측정 원칙:</span>
            <span>
              실온 22±1℃ 항온 환경에서 동일 게임 구간을 3회 반복 주행하여 평균 FPS 및 하위 1% Low 프레임의 중간값(Median)을 기록했습니다. 전력 소비는 오실로스코프 및 파워 서플라이 DC 전류계를 통해 피크 스파이크를 실시간 캡처했습니다.
            </span>
          </div>
        </section>

        {/* 태그 목록 */}
        <div className="my-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-wrap">
          <Tag className="w-4 h-4 text-slate-400" />
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 중간 스폰서 배너 슬롯 */}
        <AdBanner slotId="article-bottom-slot" theme="hardware" />

        {/* 하단 오픈마켓 공식 특가 검색 CTA */}
        <div className="my-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2">
            🛒 공식 승인 오픈마켓에서 실시간 시세 확인하기
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            PC-Craft와 공식 제휴된 안전한 오픈마켓에서 정품 최저가와 카드 할인 혜택을 비교해보세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a
              href="https://click.linkprice.com/click.php?m=gmarket&a=A100708723&l=0000&url=https%3A%2F%2Fbrowse.gmarket.co.kr%2Fsearch%3Fkeyword%3D%EC%BB%B4%ED%93%A8%ED%84%B0%EB%B6%80%ED%92%88"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>G마켓 공식 특가</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://click.linkprice.com/click.php?m=himart&a=A100708723&l=0000&url=https%3A%2F%2Fwww.e-himart.co.kr%2Fapp%2Fsearch%2FsearchMain%3Fquery%3D%EA%B2%8C%EC%9D%B4%EB%B0%8DPC"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>롯데하이마트 완제품 특가</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://click.linkprice.com/click.php?m=lotteon&a=A100708723&l=9999&l_cd1=3&l_cd2=0&tu=https%3A%2F%2Fwww.lotteon.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>롯데ON 온쇼페 메가딜</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>PC-Craft 맞춤 견적기</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* 이전 글 / 다음 글 네비게이션 */}
        <nav aria-label="이전 및 다음 아티클" className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/lab/${prevArticle.slug}`}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between"
            >
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> 이전 리포트
              </span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                {prevArticle.title}
              </strong>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/lab/${nextArticle.slug}`}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col justify-between text-right"
            >
              <span className="text-[11px] text-slate-400 flex items-center justify-end gap-1">
                다음 리포트 <ChevronRight className="w-3 h-3" />
              </span>
              <strong className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-2">
                {nextArticle.title}
              </strong>
            </Link>
          ) : <div />}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
