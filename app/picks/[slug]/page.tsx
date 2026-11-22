import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { getPickBySlug, getAllPicks } from '@/data/picks';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  Flame,
  ChevronRight
} from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const picks = getAllPicks();
  return picks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getPickBySlug(slug);

  if (!item) {
    return { title: '제품을 찾을 수 없습니다 | PC-Craft' };
  }

  return {
    title: `${item.title} | PC-Craft 테크&라이프 픽`,
    description: item.subtitle,
    keywords: [...item.tags, 'PC-Craft', '테크픽', '애드픽'],
    alternates: {
      canonical: `https://pccraft.kr/picks/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} - 정밀 분석 리포트`,
      description: item.subtitle,
      url: `https://pccraft.kr/picks/${item.slug}`,
      images: [{ url: 'https://pccraft.kr/og-image.jpg', width: 1200, height: 630 }],
    },
  };
}

export default async function PickDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getPickBySlug(slug);

  if (!item) {
    notFound();
  }

  // 본문 마크다운 간단 줄바꿈 파싱
  const paragraphs = item.content.split('\n\n');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 빵부스러기 */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-cyan-600 transition-colors">홈</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/picks" className="hover:text-cyan-600 transition-colors">테크&amp;라이프 픽</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[200px] sm:max-w-xs">
            {item.title}
          </span>
        </nav>

        <DisclaimerBanner />

        {/* 기사 헤더 영역 */}
        <header className="space-y-4 pt-2 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40">
              {item.categoryLabel}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              {item.affiliatePlatform}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {item.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            {item.subtitle}
          </p>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
            <div className="flex items-center gap-3">
              <span>작성: {item.author}</span>
              <span>•</span>
              <span>발행: {item.publishedAt}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {item.readTimeMinutes}분 소요
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>검증 리포트</span>
            </div>
          </div>
        </header>

        {/* 1. 3줄 핵심 요약 박스 */}
        <section className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/70 to-blue-50/40 dark:from-cyan-950/30 dark:to-slate-900/40 border border-cyan-200/80 dark:border-cyan-800/40 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base mb-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span>3줄 핵심 요약</span>
          </div>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {item.summary.map((line, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-cyan-500 font-black text-base leading-none">•</span>
                <span className="leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 2. 상단 퀵 구매 & 특가 CTA 박스 */}
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-500/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" /> 추천 상품 실시간 최저가
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {item.price}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {item.affiliatePlatform} 기준 · 할인 쿠폰 및 환율에 따라 변동 가능
            </p>
          </div>

          <a
            href={item.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all active:scale-95 shrink-0"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>최저가 보러가기 (공식 제휴)</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        {/* 3. 장점 & 구매 전 체크포인트 (Pros & Cons) 비교 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 특장점 */}
          <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-3">
              <Check className="w-4 h-4" />
              <span>주요 특장점 및 장점</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {item.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 구매 전 체크 */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>구매 전 필수 확인사항 (체크포인트)</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {item.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">!</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. 이런 분께 추천합니다 */}
        <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-500" />
            <span>이런 분께 추천합니다</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.recommendFor.map((rec, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 5. 본문 상세 리뷰 */}
        <article className="prose prose-slate dark:prose-invert max-w-none pt-4 space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base">
          {paragraphs.map((p, i) => {
            const trimmed = p.trim();
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('---')) {
              return <hr key={i} className="my-8 border-slate-200 dark:border-slate-800" />;
            }
            return (
              <p key={i} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </article>

        {/* 6. 하단 최종 CTA 배너 */}
        <section className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 text-white shadow-2xl text-center space-y-4 border border-cyan-500/30">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 inline-block">
            {item.categoryLabel}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-cyan-200 max-w-xl mx-auto">
            110,000RPM 고속 모터와 2억 음이온 헤어케어의 만남! 지금 공식 제휴 링크에서 특가 혜택을 확인해 보세요.
          </p>

          <div className="pt-2">
            <a
              href={item.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-xl transition-all active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>애드픽 최저가 바로가기 ({item.price})</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[11px] text-slate-400 pt-3">
            ※ 이 글에는 제휴 링크가 포함되어 있으며, 링크를 통한 구매 시 작성자에게 수수료가 지급될 수 있습니다.
          </p>
        </section>

        {/* 목록으로 복귀 버튼 */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <Link
            href="/picks"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-cyan-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>테크&amp;라이프 픽 목록으로</span>
          </Link>
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-cyan-600 font-semibold"
          >
            맞춤 견적기 바로가기 →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
