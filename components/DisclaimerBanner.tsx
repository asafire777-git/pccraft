import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <aside aria-label="법적 고지" className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs px-4 py-3 rounded-xl mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-sm backdrop-blur transition-colors">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          공정거래위원회 제휴마케팅 표준 지침 준수 고지
        </span>
      </div>
      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px] sm:text-xs">
        본 사이트는 쿠팡 파트너스 및 각 오픈마켓의 활동 일환으로 링크를 통한 구매 발생 시 소정의 수수료를 제공받을 수 있으며, 이는 구매 가격에 영향을 주지 않습니다.
      </p>
    </aside>
  );
}
