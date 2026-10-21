import React from 'react';
import { GamePreset } from '@/data/presets';
import { CheckCircle2, ShieldAlert, ExternalLink, Wrench, PackageCheck } from 'lucide-react';
import { getCoupangPrebuiltUrl, getOpenMarketPrebuiltUrl } from '@/lib/affiliate';

interface PrebuiltComparisonProps {
  currentPreset: GamePreset;
  customTotalPrice: number;
}

export default function PrebuiltComparison({
  currentPreset,
  customTotalPrice
}: PrebuiltComparisonProps) {
  const prebuilt = currentPreset.recommendedPrebuilt;
  const priceDiff = prebuilt.price - customTotalPrice;

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            ⚖️ 직접 조립 vs 추천 완본체(완제PC) 비교
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            직접 조립할 시간이나 기술이 없다면 동일 사양의 검증된 브랜드 완본체를 바로 구매할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 왼쪽: 직접 조립 PC 요약 카드 */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-sm transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20">
                <Wrench className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                직접 부품 구매 & 조립
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              나만의 커스텀 최저가 조립 PC
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              8개 부품을 각각 최저가 핫딜로 구매하여 최대의 가성비를 챙기는 방식
            </p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>중간 유통 마진 없이 부품 원가 기준 최저가 확보</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>원하는 제조사 브랜드 부품 100% 선택 가능</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-500">직접 조립 시간(약 1~2시간) 소요 및 초기 불량 개별 대응</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 dark:text-slate-500 block">부품 합산 총액</span>
              <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 font-mono">
                {customTotalPrice.toLocaleString()}원
              </span>
            </div>
            <span className="text-xs text-slate-500">
              가성비 최우선 선택지
            </span>
          </div>
        </div>

        {/* 오른쪽: 검증된 완본체 추천 카드 */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-2 border-emerald-500/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-md shadow-emerald-500/5 transition-colors">
          <div className="absolute -top-3 right-6 bg-emerald-600 text-white text-[11px] font-black px-3 py-0.5 rounded-full shadow">
            조립 번거로움 ZERO
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                <PackageCheck className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40">
                {prebuilt.brand} 완본체 추천
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              {prebuilt.title}
            </h4>
            <p className="text-xs text-emerald-700 dark:text-emerald-400/90 font-mono mt-1 font-semibold">
              {prebuilt.specsSummary}
            </p>

            <ul className="mt-5 space-y-2.5 text-xs text-slate-600 dark:text-slate-200">
              {prebuilt.pros.map((pro, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">완제품 특가</span>
                <span className={`text-[11px] font-medium ${priceDiff > 0 ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/40' : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40'}`}>
                  {priceDiff > 0
                    ? `부품가 대비 +${priceDiff.toLocaleString()}원 (공임·1년A/S 포함)`
                    : `기획전 특가 (직접조립 대비 ${Math.abs(priceDiff).toLocaleString()}원 절약)`}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {prebuilt.price.toLocaleString()}원
                </span>
                <span className="text-[11px] text-slate-400">VAT·조립완제품 포함</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
              <a
                href={getCoupangPrebuiltUrl(currentPreset.id)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                title="쿠팡 로켓 완본체 확인"
              >
                <span>🚀 쿠팡 로켓</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={getOpenMarketPrebuiltUrl(currentPreset.id, prebuilt.title)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                title="G마켓 공식 입점 완본체 특가 확인"
              >
                <span>🛒 G마켓 특가</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://search.danawa.com/dsearch.php?query=${encodeURIComponent(prebuilt.title.replace('추천 완본체 PC', '').replace(/\(|\)/g, ' ').trim())}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                title="다나와 실시간 완본체 시세 비교"
              >
                <span>📊 다나와 시세</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 px-4 py-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between flex-wrap gap-2">
        <span>💡 <strong>가격 차이 안내:</strong> 완본체(완제품) 가격은 순수 부품 원가 외에 <strong>전문 엔지니어 조립 공임 + 완벽 배선 정리 + 윈도우/바이오스 번인 테스트 + 1년 전국 무상 출장 A/S 패키지</strong>가 포함된 실구매가입니다.</span>
        <span className="text-[10px] text-slate-400">시세 기준: 2026년 10월 다나와/오픈마켓 실매물</span>
      </div>
    </section>
  );
}
