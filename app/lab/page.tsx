import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AdBanner from '@/components/AdBanner';
import { ALL_ARTICLES, ArticleCategory } from '@/data/articles';
import Link from 'next/link';
import { BookOpen, Clock, Eye, Sparkles, Tag, ArrowRight, ShieldCheck, Cpu, HardDrive, Zap, Monitor, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '하드웨어 랩 (Hardware Lab) - 2026 벤치마크 & 조립 심층 가이드 | PC-Craft',
  description: '2026년 10월 최신 데이터 기반 그래픽카드 계급도, 라이젠 9800X3D vs 인텔 Ultra 200S 벤치마크, ATX 3.1 파워 계산법, 직접 조립 vs 완본체 실구매가 비교 등 10대 전문 하드웨어 심층 리포트를 확인하세요.',
  keywords: ['하드웨어 랩', '컴퓨터 조립 가이드', '2026 그래픽카드 계급도', '라이젠 9800X3D', 'PC 부품 벤치마크', 'PC-Craft'],
  openGraph: {
    title: 'PC-Craft 하드웨어 랩 | 2026 하드웨어 벤치마크 & 심층 분석 가이드',
    description: '최신 하드웨어 실측 데이터와 오픈마켓 실구매가 기반의 10대 전문 리포트',
    url: 'https://pccraft.kr/lab',
    images: [{ url: 'https://pccraft.kr/og-image.jpg', width: 1200, height: 630 }]
  }
};

export default function LabIndexPage() {
  const featured = ALL_ARTICLES.find((a) => a.featured) || ALL_ARTICLES[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* 상단 빵부스러기 및 견적기 바로가기 */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>2026년 10월 최신 데이터 검증 완료</span>
          </div>
        </div>

        <DisclaimerBanner />

        {/* 히어로 헤더 */}
        <section className="text-center py-8 sm:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40 text-cyan-800 dark:text-cyan-300 text-xs font-semibold mb-4">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            <span>PC-Craft Hardware Research Lab</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            하드웨어 랩 &amp; 전문 리포트
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            단순 스펙 나열이 아닌, <strong>2026년 10월 실측 벤치마크</strong>와 <strong>오픈마켓 실결제 데이터</strong>를 기반으로 분석한 10대 핵심 하드웨어 칼럼입니다.
          </p>
        </section>

        {/* 1. 에디터스 픽 (Featured Card) */}
        {featured && (
          <section className="mb-12">
            <div className="p-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 shadow-xl">
              <div className="rounded-[22px] bg-white dark:bg-slate-900 p-6 sm:p-8 flex flex-col lg:flex-row gap-6 items-center">
                {featured.coverImage && (
                  <div className="w-full lg:w-1/2 h-[220px] sm:h-[260px] rounded-2xl overflow-hidden relative shadow-md bg-slate-950 shrink-0">
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-3 left-3 bg-cyan-600 text-white text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>에디터 추천 1위</span>
                    </div>
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
                        {featured.categoryLabel}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {featured.readTimeMinutes}분 소요
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                        <Eye className="w-3.5 h-3.5" /> {featured.viewCount.toLocaleString()}회 조회
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                      <Link href={`/lab/${featured.slug}`} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                      {featured.subtitle}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">작성: {featured.author}</span>
                    <Link
                      href={`/lab/${featured.slug}`}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <span>리포트 전문 읽기</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. 전체 아티클 10선 그리드 */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>📚 2026 하드웨어 심층 분석 리포트 (총 {ALL_ARTICLES.length}편)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              전체 3,000자 ~ 6,000자 이상 고밀도 검증 데이터
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_ARTICLES.map((art, idx) => (
              <article
                key={art.slug}
                className="group flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-cyan-500/50"
              >
                <div>
                  {/* 카드 상단 이미지 */}
                  {art.coverImage && (
                    <Link href={`/lab/${art.slug}`} className="block w-full h-[160px] rounded-xl overflow-hidden relative mb-4 bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2 py-0.5 rounded-lg text-[11px] font-bold text-white border border-slate-700/70">
                        {art.categoryLabel}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-slate-900/90 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-md">
                        #{idx + 1}
                      </div>
                    </Link>
                  )}

                  {/* 메타 정보 */}
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {art.readTimeMinutes}분
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {art.viewCount.toLocaleString()}회
                    </span>
                    <span>•</span>
                    <span>{art.publishedAt}</span>
                  </div>

                  {/* 제목 & 서브타이틀 */}
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                    <Link href={`/lab/${art.slug}`}>{art.title}</Link>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {art.subtitle}
                  </p>

                  {/* 태그 목록 */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {art.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 카드 하단 액션 */}
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{art.author}</span>
                  <Link
                    href={`/lab/${art.slug}`}
                    className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:underline"
                  >
                    <span>상세 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 중간 스폰서 배너 */}
        <AdBanner slotId="lab-infeed-ad-1" theme="hardware" />

        {/* 하단 견적 바로가기 배너 */}
        <section className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">나만의 최적 게이밍 PC 견적, 지금 바로 맞춰보세요</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              하드웨어 랩의 분석 데이터를 100% 반영한 스마트 호환성 검증과 실시간 최저가 빅매치
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-black text-xs sm:text-sm shrink-0 shadow-lg transition-all"
          >
            <span>🚀 맞춤 견적기 바로가기</span>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
