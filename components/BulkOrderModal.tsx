'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { getCoupangProductUrl, getCoupangPrebuiltUrl } from '@/lib/affiliate';
import { X, ShoppingCart, ExternalLink, CheckCircle2, Copy, Check, Truck, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface BulkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponents: Record<string, ComponentItem>;
  currentPreset: GamePreset;
  totalPrice: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  cpu: 'CPU',
  cooler: '쿨러',
  motherboard: '메인보드',
  ram: '메모리(RAM)',
  gpu: '그래픽카드',
  ssd: 'SSD',
  power: '파워서플라이',
  case: '케이스'
};

export default function BulkOrderModal({
  isOpen,
  onClose,
  selectedComponents,
  currentPreset,
  totalPrice
}: BulkOrderModalProps) {
  const [copyDone, setCopyDone] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const componentsList = Object.entries(selectedComponents)
    .filter(([_, item]) => Boolean(item))
    .map(([key, item]) => ({
      key,
      label: CATEGORY_LABELS[key] || key,
      item
    }));

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = componentsList.length;

  const handleItemClick = (id: string, url: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: true }));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyText = () => {
    const lines = [
      `[PC-Craft] ${currentPreset.title} 부품 일괄 구매 주문서`,
      `총 합계: ${totalPrice.toLocaleString()}원 (로켓배송 무료)`,
      `----------------------------------------`
    ];

    componentsList.forEach(({ label, item }) => {
      lines.push(`• [${label}] ${item.name} - ${item.price.toLocaleString()}원`);
    });

    lines.push(`----------------------------------------`);
    lines.push(`실시간 최저가 확인: https://pccraft.kr`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopyDone(true);
    setTimeout(() => setCopyDone(false), 2500);
  };

  const prebuiltUrl = getCoupangPrebuiltUrl(currentPreset.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-slate-900 dark:text-white max-h-[92vh] flex flex-col">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl cursor-pointer transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-sm">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              견적 부품 구매 가이드
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              쿠팡 보안 규정상 부품별로 하나씩 장바구니에 담으시거나, 동급 완본체 PC로 한 번에 구매하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* 쿠팡 보안 정책 안내 배너 */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-900 dark:text-amber-300 text-xs flex items-start gap-2 mb-4 shrink-0">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="leading-relaxed">
            <strong>쿠팡 장바구니 담기 안내:</strong> 외부 웹사이트에서 고객님의 쿠팡 장바구니에 부품을 강제로 자동 추가하는 것은 개인정보 보호상 차단되어 있습니다. 아래 목록에서 부품별 <strong>[담기]</strong>를 누르시면 탭이 1개씩 열려 손쉽게 장바구니에 모으실 수 있습니다.
          </div>
        </div>

        {/* 담기 진행률 & 총 견적액 바 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4 mb-4 shrink-0">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold block">
              부품 총 견적가 (8종 합산)
            </span>
            <div className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              {totalPrice.toLocaleString()} <span className="text-sm font-sans font-normal">원</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              장바구니 담기 현황: <strong className="text-cyan-600 dark:text-cyan-400">{checkedCount}</strong> / {totalCount}개
            </span>
            <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-cyan-500 transition-all duration-300"
                style={{ width: `${(checkedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 8종 부품 순차 담기 리스트 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-4 divide-y divide-slate-100 dark:divide-slate-800">
          {componentsList.map(({ label, item }) => {
            const partUrl = getCoupangProductUrl(item.id, item.name, item.searchKeyword);
            const isChecked = Boolean(checkedItems[item.id]);

            return (
              <div
                key={item.id}
                className={`pt-2.5 pb-1 flex items-center justify-between gap-3 text-xs transition-colors rounded-xl px-2 ${
                  isChecked ? 'bg-emerald-50/60 dark:bg-emerald-950/20' : ''
                }`}
              >
                <div className="min-w-0 flex items-center gap-2.5">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isChecked
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isChecked ? <Check className="w-3 h-3" /> : label.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-semibold block">{label}</span>
                    <span className="truncate font-semibold text-slate-800 dark:text-slate-200 block">
                      {item.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {item.price.toLocaleString()}원
                  </span>
                  <button
                    onClick={() => handleItemClick(item.id, partUrl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
                      isChecked
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-95'
                    }`}
                  >
                    <span>{isChecked ? '확인완료' : '쿠팡 담기'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 조립이 귀찮은 소비자를 위한 완본체 원클릭 구매 배너 & 텍스트 복사 */}
        <div className="space-y-2 shrink-0 pt-3 border-t border-slate-200 dark:border-slate-800">
          {/* 완본체 추천 */}
          <a
            href={prebuiltUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <div className="text-left">
                <span className="block font-black text-sm">개별 조립이 귀찮으신가요?</span>
                <span className="text-[11px] text-cyan-100 opacity-90">동급 완본체 조립PC 원클릭 로켓배송 바로구매</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-bold bg-white/20 px-3 py-1.5 rounded-xl">
              <span>완본체 보기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* 견적서 텍스트 복사 */}
          <button
            onClick={handleCopyText}
            className="w-full py-2 px-4 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copyDone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copyDone ? '주문서 복사 완료!' : '부품 주문서 텍스트 복사 (상담 및 타 쇼핑몰 주문용)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
