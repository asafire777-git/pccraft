import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import { getAllPicks } from '@/data/picks';
import Link from 'next/link';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  ShoppingBag,
  ArrowLeft,
  Flame,
  Check
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '테크 & 라이프 픽 (Tech Pick) - AI 큐레이션 스마트 가전 & 라이프스타일 | PC-Craft',
  description: 'PC-Craft가 엄선한 스마트 가전, 데스크셋업, 일상 테크 제품 추천 컬럼! 110,000RPM 고속 헤어드라이어부터 데스크테리어 필수템까지 실구매 관점 장단점 정밀 분석과 실시간 최저가를 만나보세요.',
  keywords: ['테크픽', '스마트가전추천', '헤어드라이어추천', '데스크셋업', '알리익스프레스핫딜', '애드픽', 'PC-Craft'],
  alternates: {
    canonical: 'https://pccraft.kr/picks',
  },
  openGraph: {
    title: 'PC-Craft 테크 & 라이프 픽 | 스마트 가전 & 테크 라이프스타일 큐레이션',
    description: '스펙 분석부터 구매 전 체크포인트까지, 똑똑한 소비자를 위한 AI 에디터의 정밀 리뷰',
    url: 'https://pccraft.kr/picks',
    images: [{ url: '/images/picks/doko-hair-dryer/thumb.jpg', width: 800, height: 800 }],
  },
};

function cleanText(text: string): string {
  return text.replace(/\*\*/g, '').replace(/__+/g, '').trim();
}

export default function PicksIndexPage() {
  const picks = getAllPicks();
  const featured = picks[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 네비게이션 & 견적기 복귀 링크 */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>2026 에디터 검증 큐레이션</span>
          </div>
        </div>

        <DisclaimerBanner />

        {/* 히어로 헤더 */}
        <section className="text-center py-8 sm:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>PC-Craft Tech &amp; Life Picks</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            테크 &amp; 라이프 픽
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            컴퓨터를 넘어 <strong>스마트 가전, 데스크셋업, 일상 테크 라이프스타일</strong>까지!<br className="hidden sm:inline" />
            실제 판매 페이지의 <strong>실측 스펙, 전원 규격, 옵션 비교</strong>를 바탕으로 신뢰할 수 있는 정보를 제공합니다.
          </p>
        </section>

        {/* 1. 에디터스 메인 추천 (Featured Card) */}
        {featured && (
          <section className="mb-10">
            <div className="relative rounded-3xl p-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-amber-500 shadow-xl overflow-hidden">
              <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center">
                {/* 좌측: 로컬 실사 이미지 썸네일 & 뱃지 */}
                <div className="w-full lg:w-5/12 aspect-[4/3] sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden relative shadow-md bg-slate-950 shrink-0 border border-slate-200 dark:border-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.thumbnailImage}
                    alt={featured.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                      <Flame className="w-3 h-3 fill-slate-950" /> 에디터 PICK
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                      {featured.categoryLabel}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/85 backdrop-blur-md text-white flex items-center justify-between border border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block">실시간 제휴 특가</span>
                      <span className="text-xl font-black text-amber-400">{featured.price}</span>
                    </div>
                    <span className="text-[11px] text-cyan-300 font-bold px-2 py-1 rounded bg-white/10">
                      본체 390g 초경량
                    </span>
                  </div>
                </div>

                {/* 우측: 요약 & 본문 진입 */}
                <div className="w-full lg:w-7/12 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <span>{featured.publishedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {featured.readTimeMinutes}분 소요
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        실측 스펙 검증
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                      <Link href={`/picks/${featured.slug}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        {cleanText(featured.title)}
                      </Link>
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                      {cleanText(featured.subtitle)}
                    </p>

                    {/* 3줄 요약 박스 */}
                    <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm space-y-2">
                      <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>3줄 핵심 요약</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                        {featured.summary.map((sum, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-500 font-bold">•</span>
                            <span>{cleanText(sum)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 하단 액션 버튼 */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/picks/${featured.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <span>컬럼 상세 &amp; 갤러리 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href={featured.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>알리 공식 특가 바로가기</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. 전체 큐레이션 리스트 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-500" />
              <span>최신 큐레이션 컬럼 ({picks.length})</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              실구매 분석 &amp; 공식 제휴 링크 연동
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {picks.map((item) => (
              <article
                key={item.slug}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* 카드 썸네일 이미지 */}
                  <div className="aspect-[16/10] overflow-hidden bg-slate-950 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.thumbnailImage} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-xs text-slate-400 mb-2">
                      {item.publishedAt}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      <Link href={`/picks/${item.slug}`}>
                        {cleanText(item.title)}
                      </Link>
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">
                      {cleanText(item.subtitle)}
                    </p>

                    {/* 태그 모음 */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          #{cleanText(tag)}
                        </span>
                      ))}
                    </div>

                    {/* 핵심 스펙 */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        <span>{cleanText(item.pros[0])}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">특가 기준</span>
                    <span className="text-base font-black text-amber-600 dark:text-amber-400">{item.price}</span>
                  </div>
                  <Link
                    href={`/picks/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <span>자세히 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 3. 공정거래위원회 표준 문구 안내 박스 */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
          <p>
            ℹ️ <strong>공정거래위원회 제휴 마케팅 안내</strong>: PC-Craft 테크&amp;라이프 픽 컬럼에 기재된 링크를 통해 제품을 구매하실 경우, 제휴 파트너사(애드픽, 알리익스프레스 등)로부터 일정액의 수수료를 제공받을 수 있으며 이는 사이트의 무료 운영 및 품질 개선에 큰 힘이 됩니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
