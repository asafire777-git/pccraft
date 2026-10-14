'use client';

import React from 'react';
import Link from 'next/link';
import { ALL_ARTICLES } from '@/data/articles';
import { BookOpen, Clock, Eye, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HardwareLabShowcase() {
  // 메인에 노출할 대표 핵심 4대 리포트 선정 (GPU 계급도, CPU 9800X3D 실측, ATX 3.1 파워 계산, 조립 vs 완본체 비용분석)
  const featuredArticles = [
    ALL_ARTICLES.find((a) => a.slug === '2026-gpu-hierarchy-blackwell-rtx50-vs-rtx40'),
    ALL_ARTICLES.find((a) => a.slug === '2026-cpu-gaming-hierarchy-zen5-vs-arrow-lake'),
    ALL_ARTICLES.find((a) => a.slug === 'psu-atx31-pcie51-calculation-guide'),
    ALL_ARTICLES.find((a) => a.slug === 'diy-pc-vs-prebuilt-cost-benefit-2026')
  ].filter(Boolean);

  return (
    <section aria-label="하드웨어 랩 심층 분석 리포트" className="my-14">
      {/* 섹션 상단 헤더 영역 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800/40 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>PC-Craft Hardware Research Lab • 심층 리포트</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            🔬 2026 하드웨어 실측 벤치마크 &amp; 전문 리포트
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            단순 스펙 나열이 아닌, <strong>실측 게이밍 프레임 벤치마크</strong>와 <strong>오픈마켓 실결제 체감가</strong>를 바탕으로 철저히 검증된 고밀도 테크 분석 기사입니다.
          </p>
        </div>

        <Link
          href="/lab"
          className="mt-4 md:mt-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <span>리포트 10선 전체보기</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4대 핵심 칼럼 카드 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {featuredArticles.map((article, idx) => {
          if (!article) return null;
          return (
            <article
              key={article.slug}
              className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-cyan-500/50"
            >
              <div>
                {/* 썸네일 커버 이미지 */}
                {article.coverImage && (
                  <Link
                    href={`/lab/${article.slug}`}
                    className="block w-full h-[170px] rounded-2xl overflow-hidden relative mb-4 bg-slate-950 border border-slate-200/80 dark:border-slate-800"
                  >
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/85 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[11px] font-bold text-white border border-slate-700/70">
                      {article.categoryLabel}
                    </div>
                    <div className="absolute top-2.5 right-2.5 bg-cyan-600/90 text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                      FOCUS #{idx + 1}
                    </div>
                  </Link>
                )}

                {/* 메타 정보 (읽는 시간, 조회수, 날짜) */}
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-600 dark:text-cyan-400" /> {article.readTimeMinutes}분 완독
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-slate-400" /> {article.viewCount.toLocaleString()}회
                  </span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>

                {/* 타이틀 */}
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2 mb-2">
                  <Link href={`/lab/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* 요약 */}
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {article.summary}
                </p>

                {/* 핵심 테이크어웨이 (1개 하이라이트) */}
                {article.keyTakeaways && article.keyTakeaways[0] && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5 leading-relaxed mb-4">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2"><strong>핵심:</strong> {article.keyTakeaways[0]}</span>
                  </div>
                )}
              </div>

              {/* 하단 작성자 & 읽기 버튼 */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  분석: {article.author}
                </span>
                <Link
                  href={`/lab/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:underline"
                >
                  <span>칼럼 전문</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* 하단 에디터 팩트체크 보증 띠 */}
      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 border border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            PC-Craft 하드웨어 랩은 특정 제조사의 유료 협찬 없이, <strong>실측 데이터와 독립된 하드웨어 테스트베드</strong>를 바탕으로 작성됩니다.
          </span>
        </div>
        <Link
          href="/guide"
          className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline shrink-0"
        >
          2026 부품 호환성 가이드 읽기 →
        </Link>
      </div>
    </section>
  );
}
