'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { getCoupangProductUrl, getCoupangSearchUrl, getNaverShoppingUrl, getOpenMarketProductUrl, getOpenMarketPrebuiltUrl } from '@/lib/affiliate';
import { Zap, Truck, ShieldCheck, Coins, ExternalLink, ChevronDown, ChevronUp, Trophy, Check, ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';

interface PriceBattleProps {
  currentPreset: GamePreset;
  selectedComponents: Record<string, ComponentItem>;
  totalPrice: number;
}

export default function PriceBattle({ currentPreset, selectedComponents, totalPrice }: PriceBattleProps) {
  const [showPartsDetail, setShowPartsDetail] = useState(false);

  // 쿠팡 체감 혜택 계산 (카드 즉시할인 약 4% 추정)
  const coupangCardDiscount = Math.round(totalPrice * 0.04);
  const coupangEffectivePrice = totalPrice - coupangCardDiscount;

  // 11번가·G마켓 오픈마켓 체감 혜택 계산 (공식총판 카드사/쿠폰할인 약 6% 추정)
  const openMarketDiscount = Math.round(totalPrice * 0.06);
  const openMarketEffectivePrice = totalPrice - openMarketDiscount;

  // 네이버 쇼핑 체감 혜택 계산 (네이버페이 멤버십 포인트 약 5% 적립 추정)
  const naverPointCashback = Math.round(totalPrice * 0.05);
  const naverEffectivePrice = totalPrice - naverPointCashback;

  // 핵심 3대 부품 추출 (CPU, 그래픽카드, SSD)
  const keyCategories = [
    { key: 'cpu', label: 'CPU (프로세서)' },
    { key: 'gpu', label: '그래픽카드 (VGA)' },
    { key: 'ssd', label: 'SSD (초고속 스토리지)' }
  ];

  return (
    <section className="my-12 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* 배경 은은한 그라데이션 장식 */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 섹션 헤더 */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500/10 via-orange-500/10 to-emerald-500/10 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          실시간 멀티 플랫폼 최저가 빅매치
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          쿠팡 로켓 <span className="text-rose-500">VS</span> 오픈마켓 특가 <span className="text-orange-500">VS</span> 네이버 쇼핑
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          어디서 사는 게 진짜 이득일까? <strong>로켓 빠른배송, 오픈마켓 공식총판 카드할인, 네이버페이 적립금</strong>까지 투명하게 종합 비교해 드립니다.
        </p>
      </div>

      {/* 3대 플랫폼 종합 비교 카드 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 relative z-10">
        {/* 1. 쿠팡 로켓배송 카드 */}
        <div className="rounded-2xl border-2 border-rose-500/30 dark:border-rose-500/40 bg-gradient-to-b from-rose-50/50 via-white to-rose-50/30 dark:from-rose-950/20 dark:via-slate-900 dark:to-rose-950/10 p-5 flex flex-col justify-between shadow-lg relative group hover:border-rose-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 빠른배송 1위
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-rose-500/30">
                🚀
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  쿠팡 로켓배송
                </h3>
                <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                  와우회원 익일/새벽 도착
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="my-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-rose-200/60 dark:border-rose-900/40">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>견적 합계가</span>
                <span className="font-mono line-through">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-rose-600 dark:text-rose-400 mt-1">
                <span>카드사 즉시할인 (추정)</span>
                <span className="font-mono font-bold">-{coupangCardDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-rose-100 dark:border-rose-900/30">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">최종 체감가</span>
                <span className="text-lg sm:text-xl font-black font-mono text-rose-600 dark:text-rose-400">
                  약 {coupangEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>내일 아침 문 앞 도착:</strong> 주말 조립 즉시 게임 가능</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>전 부품 무료배송:</strong> 개별 배송비 0원 묶음 수령</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>30일 무료 반품:</strong> 부품 불량 시 안심 맞교환</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={getCoupangSearchUrl(currentPreset.title)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>쿠팡 로켓 실시간 조회</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. 11번가·G마켓 오픈마켓 특가 카드 */}
        <div className="rounded-2xl border-2 border-orange-500/30 dark:border-orange-500/40 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 dark:from-orange-950/20 dark:via-slate-900 dark:to-orange-950/10 p-5 flex flex-col justify-between shadow-lg relative group hover:border-orange-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 총판특가 1위
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-orange-500/30">
                🛒
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  11번가 · G마켓 특가
                </h3>
                <span className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold">
                  공식 수입사 직영 &amp; 쿠폰가
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="my-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-orange-200/60 dark:border-orange-900/40">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>정상 기준가</span>
                <span className="font-mono line-through">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-orange-600 dark:text-orange-400 mt-1">
                <span>공식총판 쿠폰/카드할인 (추정)</span>
                <span className="font-mono font-bold">-{openMarketDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-orange-100 dark:border-orange-900/30">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">최대 할인 체감가</span>
                <span className="text-lg sm:text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                  약 {openMarketEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>공식 총판 100% 정품:</strong> 이엠텍·대원CTS·제이씨현 직영</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>카드사 중복 할인:</strong> 십일절 &amp; 빅스마일데이 극강 가성비</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>단일 고가 부품 유리:</strong> GPU·CPU 단품 구매 시 최저가</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={getOpenMarketPrebuiltUrl(currentPreset.id, currentPreset.title)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>오픈마켓 실시간 특가 확인</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. 네이버 쇼핑 카드 */}
        <div className="rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-500/40 bg-gradient-to-b from-emerald-50/50 via-white to-emerald-50/30 dark:from-emerald-950/20 dark:via-slate-900 dark:to-emerald-950/10 p-5 flex flex-col justify-between shadow-lg relative group hover:border-emerald-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 포인트 적립 1위
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/30">
                N
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  네이버 쇼핑
                </h3>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  스마트스토어 &amp; 가격비교
                </span>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="my-3 p-3.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
                <span>네이버 최저가 기준</span>
                <span className="font-mono">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                <span>멤버십 포인트 적립 (추정)</span>
                <span className="font-mono font-bold">+{naverPointCashback.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/30">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">포인트 환산 실체감가</span>
                <span className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  약 {naverEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>네이버페이 최대 5% 적립:</strong> 다른 쇼핑 및 현금처럼 재사용</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>전체 시장 시세 탐색:</strong> 국내 입점몰 전반의 시세 앵커링</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>일반 택배 배송:</strong> 평균 1~3일 소요 (상점별 개별 배송비)</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <a
              href={getNaverShoppingUrl(currentPreset.title)}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>네이버 쇼핑 기준가 조회</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 스마트 AI 구매 가이드 판정 */}
      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>PC-Craft 스마트 구매 결정 가이드 요약</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-rose-600 dark:text-rose-400 block mb-1">
              🚀 쿠팡 로켓배송을 추천하는 분
            </strong>
            “기다리기 싫고 내일 당장 조립하고 싶다”, “부품 초기 불량 시 번거로운 실랑이 없이 묻지마 맞교환/환불을 원한다면 쿠팡이 압도적으로 유리합니다.”
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-orange-600 dark:text-orange-400 block mb-1">
              🛒 오픈마켓 특가를 추천하는 분
            </strong>
            “그래픽카드나 CPU 단일 부품을 공식 총판 카드할인과 쿠폰을 최대한 먹여 실결제 최저가로 구매하고 싶다면 11번가·G마켓이 가장 유리합니다.”
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
              🟢 네이버 쇼핑을 추천하는 분
            </strong>
            “배송이 2~3일 걸려도 괜찮고, 네이버플러스 멤버십을 쓰고 있어 수만 원 상당의 네이버페이 적립금을 챙기고 싶다면 네이버가 더 유리합니다.”
          </div>
        </div>
      </div>

      {/* 핵심 3대 부품 1:1 비교 토글 아코디언 */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
        <button
          onClick={() => setShowPartsDetail(!showPartsDetail)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
        >
          <span className="flex items-center gap-1.5">
            🔍 주요 핵심 부품(CPU·GPU·SSD) 3대 플랫폼 최저가 바로가기
          </span>
          {showPartsDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPartsDetail && (
          <div className="mt-4 space-y-3 animate-in fade-in duration-200">
            {keyCategories.map(({ key, label }) => {
              const comp = selectedComponents[key];
              if (!comp) return null;

              const coupangUrl = getCoupangProductUrl(comp.id, comp.name);
              const openMarketUrl = getOpenMarketProductUrl(comp.id, comp.name, '11st');
              const naverUrl = getNaverShoppingUrl(comp.name, comp.id);

              return (
                <div
                  key={key}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">{label}</span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate block">
                      {comp.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      정가 기준 {comp.price.toLocaleString()}원
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <a
                      href={coupangUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="쿠팡 로켓배송 최저가 확인"
                    >
                      <span>🚀 쿠팡 로켓</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={openMarketUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/60 dark:hover:bg-orange-900/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="11번가·G마켓 오픈마켓 특가 확인"
                    >
                      <span>🛒 오픈마켓 특가</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={naverUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="네이버 쇼핑 기준 시세 확인"
                    >
                      <span>🟢 네이버 시세</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 제휴 및 경제적 대가 안내 */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 text-center leading-relaxed">
        ※ 본 플랫폼 최저가 비교는 실시간 시장 시세 및 쿠팡 파트너스·링크프라이스(오픈마켓)·네이버 쇼핑 데이터를 기반으로 제공되며, 제휴 링크를 통해 구매 시 일정액의 수수료를 제공받을 수 있습니다.
      </div>
    </section>
  );
}
