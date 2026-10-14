'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { 
  getCoupangProductUrl, 
  getCoupangSearchUrl, 
  getNaverShoppingUrl, 
  getOpenMarketProductUrl, 
  getOpenMarketPrebuiltUrl,
  get11stSearchUrl 
} from '@/lib/affiliate';
import { Zap, Truck, ShieldCheck, Coins, ExternalLink, ChevronDown, ChevronUp, Trophy, Check, ArrowRight, Sparkles, ShoppingBag, Calendar, Info } from 'lucide-react';

interface PriceBattleProps {
  currentPreset: GamePreset;
  selectedComponents: Record<string, ComponentItem>;
  totalPrice: number;
}

export default function PriceBattle({ currentPreset, selectedComponents, totalPrice }: PriceBattleProps) {
  const [showPartsDetail, setShowPartsDetail] = useState(false);

  // 선택된 부품들의 최근 시세 갱신 기준 일자 확인
  const updateDates = Object.values(selectedComponents)
    .map((c) => c.lastUpdated)
    .filter(Boolean);
  const latestUpdateDate = updateDates.length > 0 ? updateDates[0] : '2026-10-12 09:00';

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

      {/* 섹션 헤더 (날짜 및 투명한 시세 기준 표기) */}
      <div className="text-center max-w-2xl mx-auto mb-8 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>시세 기준: {latestUpdateDate} (정기 수집 데이터)</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold">
            <Info className="w-3.5 h-3.5 text-amber-500" />
            <span>프로모션 할인율 기반 추정 체감가</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          쿠팡 로켓 <span className="text-rose-500">VS</span> 오픈마켓(G마켓·11st) <span className="text-orange-500">VS</span> 네이버 쇼핑
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
          정기 수집된 부품 기준 시세를 바탕으로 <strong>로켓 빠른배송, G마켓·11번가 공식총판 카드할인, 네이버페이 적립금</strong> 혜택을 투명하게 비교합니다.<br className="hidden sm:inline" />
          <span className="text-slate-500 dark:text-slate-400"> (실시간 최종 가격과 재고는 각 판매처 바로가기를 통해 직접 실시간 연동 확인하실 수 있습니다)</span>
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
                <span>견적 합계 기준가</span>
                <span className="font-mono line-through">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-rose-600 dark:text-rose-400 mt-1">
                <span>카드사 즉시할인 (예상 -4%)</span>
                <span className="font-mono font-bold">-{coupangCardDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-rose-100 dark:border-rose-900/30">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">예상 체감 혜택가</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">* 프로모션 추정치</span>
                </div>
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
              <span>쿠팡 실시간 판매가 확인</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2. G마켓 · 11번가 오픈마켓 공식 특가 카드 (링크프라이스 승인 연동) */}
        <div className="rounded-2xl border-2 border-orange-500/30 dark:border-orange-500/40 bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 dark:from-orange-950/20 dark:via-slate-900 dark:to-orange-950/10 p-5 flex flex-col justify-between shadow-lg relative group hover:border-orange-500 transition-colors">
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500 text-white text-[11px] font-extrabold shadow-sm">
              <Trophy className="w-3 h-3" /> 오픈마켓 총판특가
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-orange-500/30">
                🛒
              </div>
              <div>
                <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                  G마켓 · 11번가 특가
                </h3>
                <span className="text-[11px] text-orange-600 dark:text-orange-400 font-semibold">
                  공식 총판 직영 · 11st 슈팅배송 &amp; 빅딜
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
                <span>오픈마켓 쿠폰/카드할인 (예상 -6%)</span>
                <span className="font-mono font-bold">-{openMarketDiscount.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-orange-100 dark:border-orange-900/30">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">예상 체감 혜택가</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">* 프로모션 추정치</span>
                </div>
                <span className="text-lg sm:text-xl font-black font-mono text-orange-600 dark:text-orange-400">
                  약 {openMarketEffectivePrice.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* 핵심 혜택 리스트 */}
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>공식 총판 100% 정품:</strong> 이엠텍·대원CTS·제이씨현</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>11번가 슈팅배송 &amp; G마켓 빅딜:</strong> 익일 도착 &amp; SK pay/카드 할인</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                <span><strong>고가 부품 단품 유리:</strong> GPU·CPU 단품 구매 시 최저가</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={getOpenMarketPrebuiltUrl(currentPreset.id, currentPreset.title)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer text-center"
              >
                <span>🛒 G마켓 특가</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <a
                href={get11stSearchUrl(currentPreset.title)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-red-500/20 active:scale-95 transition-all cursor-pointer text-center"
              >
                <span>⚡ 11번가 슈팅</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
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
                <span>네이버 기준 시세</span>
                <span className="font-mono">{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between items-center text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                <span>멤버십 포인트 적립 (예상 +5%)</span>
                <span className="font-mono font-bold">+{naverPointCashback.toLocaleString()}P</span>
              </div>
              <div className="flex justify-between items-end mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-900/30">
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">포인트 환산 체감가</span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">* 멤버십 기준</span>
                </div>
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
              <span>네이버 쇼핑 실시간 시세 조회</span>
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
              🛒 G마켓 · 11번가 특가를 추천하는 분
            </strong>
            “그래픽카드나 CPU 단일 부품을 G마켓·11번가 공식 총판 즉시할인과 슈팅배송, 십일절/빅스마일데이 쿠폰을 최대한 먹여 실결제 최저가로 구매하고 싶다면 가장 유리합니다.”
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
              🟢 네이버 쇼핑을 추천하는 분
            </strong>
            “배송이 2~3일 걸려도 괜찮고, 네이버플러스 멤버십을 쓰고 있어 수만 원 상당의 네이버페이 적립금을 챙기고 싶다면 네이버가 더 유리합니다.”
          </div>
        </div>
      </div>

      {/* 투명한 시세 수집 및 실시간 연동 소비자 안내 (허위 LIVE 표기 배제) */}
      <div className="mt-6 p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1.5">
          <Info className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <span>시세 산정 기준 및 실시간 판매가 연동 안내</span>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
          • 본 비교표의 부품 기준 시세는 <strong>{latestUpdateDate}</strong> 정기 데이터 기준이며, 각 플랫폼의 체감가는 카드사 즉시할인·쿠폰·포인트 적립률을 반영한 <strong>통계적 추정 가격</strong>입니다.<br />
          • PC 하드웨어 특성상 시세와 재고가 수시로 변동되므로 <strong>인위적인 허위 LIVE 표기를 배제</strong>하고 정확한 수집 시점을 투명하게 공개합니다.<br />
          • 실시간 현재 판매 가격과 로켓배송 가능 여부는 각 카드의 <strong>[실시간 확인] 바로가기 버튼</strong>을 클릭하여 공식 쇼핑몰 페이지에서 즉시 실시간 검증하실 수 있습니다.
        </p>
      </div>

      {/* 핵심 3대 부품 1:1 비교 토글 아코디언 */}
      <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-5">
        <button
          onClick={() => setShowPartsDetail(!showPartsDetail)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer py-1"
        >
          <span className="flex items-center gap-1.5">
            🔍 주요 핵심 부품(CPU·GPU·SSD) 4대 플랫폼(쿠팡·G마켓·11번가·네이버) 실시간 판매가 확인 바로가기
          </span>
          {showPartsDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showPartsDetail && (
          <div className="mt-4 space-y-3 animate-in fade-in duration-200">
            {keyCategories.map(({ key, label }) => {
              const comp = selectedComponents[key];
              if (!comp) return null;

              const coupangUrl = getCoupangProductUrl(comp.id, comp.name);
              const gmarketUrl = getOpenMarketProductUrl(comp.id, comp.name, 'gmarket');
              const elevenstUrl = getOpenMarketProductUrl(comp.id, comp.name, '11st');
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
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        기준 시세 {comp.price.toLocaleString()}원
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        (수집일자: {comp.lastUpdated || latestUpdateDate})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <a
                      href={coupangUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="쿠팡 로켓배송 실시간 가격 확인"
                    >
                      <span>🚀 쿠팡 실시간</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={gmarketUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="G마켓 공식 총판 실시간 특가 확인"
                    >
                      <span>🛒 G마켓</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={elevenstUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="11번가 슈팅배송 실시간 특가 확인"
                    >
                      <span>⚡ 11번가</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <a
                      href={naverUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/60 dark:hover:bg-teal-900/60 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                      title="네이버 쇼핑 실시간 시세 확인"
                    >
                      <span>🟢 네이버</span>
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
        ※ 본 플랫폼 최저가 비교는 {latestUpdateDate} 정기 수집된 시장 기준 시세 및 각 제휴 플랫폼(쿠팡, G마켓 공식 제휴, 네이버)의 예상 프로모션 할인율을 바탕으로 산출되었습니다. 허위 LIVE 표기를 하지 않으며, 정확한 실시간 재고와 변동 가격은 각 판매처 바로가기를 통해 실시간 확인하실 수 있습니다.
      </div>
    </section>
  );
}
