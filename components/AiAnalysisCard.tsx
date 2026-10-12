import React from 'react';
import { GamePreset } from '@/data/presets';
import { Sparkles, Gauge, ArrowUpCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface AiAnalysisCardProps {
  currentPreset: GamePreset;
}

export default function AiAnalysisCard({ currentPreset }: AiAnalysisCardProps) {
  const { aiAnalysis } = currentPreset;

  return (
    <article aria-label="AI 시스템 분석" className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 mb-12 shadow-sm transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            AI 벤치마크 & 전문가 시스템 정밀 분석
            <span className="text-[10px] bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 px-2 py-0.5 rounded-full font-mono font-semibold">
              SEO Optimized Analysis
            </span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            실제 하드웨어 실측 데이터와 병목 현상(Bottleneck) 시뮬레이션 기반 보고서입니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* 1. 게임별 예상 프레임 레이트 */}
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3 text-cyan-600 dark:text-cyan-400">
            <Gauge className="w-4 h-4" />
            <span className="text-xs font-bold uppercase font-mono">
              목표 해상도 & 평균 FPS
            </span>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 block mb-3 font-semibold">
            {aiAnalysis.resolution}
          </span>
          <div className="space-y-2">
            {Object.entries(aiAnalysis.averageFps).map(([game, fps]) => (
              <div
                key={game}
                className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200 dark:border-slate-800/50"
              >
                <span className="text-slate-700 dark:text-slate-300">{game}</span>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded">
                  {fps}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 장점 & 유의점 */}
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-xs font-bold uppercase font-mono">핵심 장점 (PROS)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 mb-4">
              {aiAnalysis.pros.map((p, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-500">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-1.5 text-rose-600 dark:text-rose-400">
              <ThumbsDown className="w-4 h-4" />
              <span className="text-xs font-bold uppercase font-mono">체크 포인트 (CONS)</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
              {aiAnalysis.cons.map((c, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-rose-500">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. 향후 업그레이드 확장성 가이드 */}
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-3 text-amber-600 dark:text-amber-400">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase font-mono">
              향후 업그레이드 로드맵
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {aiAnalysis.upgradeAdvice}
          </p>
          <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 text-[11px] text-amber-900 dark:text-amber-200/90 leading-relaxed">
            💡 <strong>에디터 추천 팁:</strong> 모니터 주사율(Hz)과 그래픽카드의 출력 단자(DP 1.4 / HDMI 2.1)가 일치하는지 구매 전 반드시 확인하세요.
          </div>
        </div>
      </div>
    </article>
  );
}
