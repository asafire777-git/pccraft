import React from 'react';
import { CompatibilityReport } from '@/lib/compatibility';
import { CheckCircle2, AlertTriangle, XCircle, Zap, Cpu } from 'lucide-react';

interface CompatibilityBadgeProps {
  report: CompatibilityReport;
}

export default function CompatibilityBadge({ report }: CompatibilityBadgeProps) {
  const hasErrors = report.issues.some((i) => i.type === 'error');
  const hasWarnings = report.issues.some((i) => i.type === 'warning');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8 shadow-sm transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {hasErrors ? (
            <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
              <XCircle className="w-6 h-6" />
            </div>
          ) : hasWarnings ? (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          )}

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              실시간 하드웨어 호환성 진단
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  hasErrors
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
                    : hasWarnings
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                }`}
              >
                {hasErrors ? '호환성 오류 감지' : hasWarnings ? '주의 필요' : '100% 호환 안전'}
              </span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              CPU-메인보드 소켓, 메모리 세대 규격, 파워서플라이 피크 전력을 실시간으로 교차 검증합니다.
            </p>
          </div>
        </div>

        {/* 전력 소비 위젯 */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/80 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-mono">예상 소비전력</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                약 {report.estimatedWattage} W
              </span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-mono">권장 정격파워</span>
              <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300">
                {report.recommendedWattage} W 이상
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 진단 항목 목록 */}
      <div className="mt-3.5 space-y-2">
        {report.issues.map((issue, idx) => (
          <div
            key={idx}
            className={`text-xs p-3 rounded-xl border flex items-start gap-2.5 ${
              issue.type === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
                : issue.type === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
                : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200/80 dark:border-slate-800/60 text-slate-700 dark:text-slate-300'
            }`}
          >
            {issue.type === 'error' ? (
              <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
            ) : issue.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <strong className="font-semibold block">{issue.title}</strong>
              <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">{issue.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
