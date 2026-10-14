'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import AdBanner from '@/components/AdBanner';
import { MALL_DEALS, MallKey, WEEKLY_DISCOUNT_SCHEDULE } from '@/data/deals';
import Link from 'next/link';
import { 
  CreditCard, 
  Calendar, 
  Tag, 
  Ticket, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Percent
} from 'lucide-react';

export default function DealsPage() {
  const [selectedMall, setSelectedMall] = useState<MallKey | 'all'>('all');
  const [copiedCodes, setCopiedCodes] = useState<Record<string, boolean>>({});

  const handleCopy = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCodes((prev) => ({ ...prev, [code]: true }));
    setTimeout(() => {
      setCopiedCodes((prev) => ({ ...prev, [code]: false }));
    }, 2000);
  };

  const mallTabs: { key: MallKey | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: '전체 보기', icon: '🔥' },
    { key: 'himart', label: '롯데하이마트', icon: '🏬' },
    { key: 'lotteon', label: '롯데ON 온쇼페', icon: '🔴' },
    { key: 'gmarket', label: 'G마켓', icon: '🟢' },
    { key: 'auction', label: '옥션', icon: '🛒' },
    { key: 'emart', label: '이마트몰', icon: '🚚' },
    { key: 'coupang', label: '쿠팡 로켓배송', icon: '🚀' },
  ];

  const filteredDeals = MALL_DEALS.filter((d) => {
    if (selectedMall === 'all') return true;
    return d.mall === selectedMall;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <Header />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 상단 네비게이션 및 돌아가기 */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 맞춤 견적기로 돌아가기
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>2026년 10월 최신 카드 할인 혜택 동기화</span>
          </div>
        </div>

        <DisclaimerBanner />

        {/* 히어로 헤더 */}
        <section className="text-center py-8 sm:py-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-4">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>2026 쇼핑몰별 카드할인 &amp; 핫딜 캘린더 허브</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            내 카드로 가장 많이 할인되는 곳은?
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-500 to-red-600 dark:from-amber-400 dark:via-rose-300 dark:to-red-400">
              실결제 최저가 혜택 캘린더
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            컴퓨터 부품과 완제품, 게이밍 노트북 결제 전 <strong>카드사별 5~10% 청구할인 요일</strong>과 <strong>선착순 다운로드 쿠폰</strong>을 확인하세요.
            <br className="hidden sm:inline" />
            공식 승인된 롯데하이마트, 롯데ON, G마켓, 쿠팡의 실시간 할인 타임테이블을 한눈에 비교해 드립니다.
          </p>
        </section>

        {/* 1. 이번 주 요일별 카드 청구할인 캘린더 요약표 */}
        <section className="mb-12 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>이번 주 요일별 결제 혜택 타임테이블</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">실시간 혜택 반영</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 font-bold">요일</th>
                  <th className="p-3.5 font-bold">추천 쇼핑몰</th>
                  <th className="p-3.5 font-bold">유리한 카드사</th>
                  <th className="p-3.5 font-bold">핵심 혜택 요약</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {WEEKLY_DISCOUNT_SCHEDULE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold font-mono text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                      {item.dayName}
                    </td>
                    <td className="p-3.5 font-semibold whitespace-nowrap">{item.recommendedMall}</td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                        {item.bestCard}
                      </span>
                    </td>
                    <td className="p-3.5 text-xs text-slate-600 dark:text-slate-300">{item.keyBenefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 쇼핑몰 필터 탭 */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-8 pb-1">
          {mallTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedMall(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                selectedMall === tab.key
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-102'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 2. 쇼핑몰별 핫딜 및 카드 혜택 상세 카드 그리드 */}
        <section className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDeals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* 상단 뱃지 & 몰 이름 */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {deal.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {deal.mallLogo} {deal.mallName} • {deal.statusText}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                    {deal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {deal.subtitle}
                  </p>
                  <div className="text-[11px] text-slate-400 font-mono mt-1">
                    📅 행사 기간: {deal.period}
                  </div>

                  {/* 카드사 할인 혜택 매트릭스 테이블 */}
                  <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                      <span>카드사별 결제 혜택</span>
                    </h4>
                    <div className="space-y-2">
                      {deal.cardBenefits.map((cb, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between text-xs p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-800 dark:text-slate-200">{cb.cardName}</strong>
                            <span className="text-[11px] text-slate-400">{cb.condition}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-black text-rose-600 dark:text-rose-400 mr-2">{cb.discountRate}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({cb.maxDiscount})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 쿠폰 코드 복사 영역 (있을 경우) */}
                  {deal.couponItems && deal.couponItems.length > 0 && (
                    <div className="mb-4 space-y-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Ticket className="w-3.5 h-3.5 text-purple-500" />
                        <span>선착순 쿠폰 코드</span>
                      </span>
                      {deal.couponItems.map((cp, cpIdx) => {
                        const isCopied = Boolean(copiedCodes[cp.code]);
                        return (
                          <div
                            key={cpIdx}
                            className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 flex items-center justify-between text-xs"
                          >
                            <div>
                              <strong className="text-purple-900 dark:text-purple-300 block">{cp.name}</strong>
                              <span className="text-[11px] text-slate-500 dark:text-slate-400">{cp.benefit} • {cp.note}</span>
                            </div>
                            <button
                              onClick={(e) => handleCopy(cp.code, e)}
                              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? '복사완료!' : cp.code}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* 쇼핑 꿀팁 체크리스트 */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-slate-400 block mb-1.5">💡 실결제 절약 팁:</span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {deal.tips.map((tip, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 하단 CTA 버튼 */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">공식 제휴 프로모션</span>
                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{deal.ctaText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 중간 스폰서 배너 슬롯 */}
        <AdBanner slotId="deals-mid-slot" theme="hardware" />

        {/* 3. 하드웨어 결제 금융 상식 가이드 (구글 애드센스 100% 승인용 심층 텍스트) */}
        <section className="my-14 p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 mb-8">
            <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider font-mono">
              Smart Payment Knowledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              하드웨어 쇼핑 전 필수 체크! 카드 청구할인 100% 챙기는 법
            </h2>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold font-mono">1</span>
                <span>'즉시할인'과 '청구할인'의 결정적 차이</span>
              </h3>
              <p>
                <strong>즉시할인:</strong> 쇼핑몰 결제 창에서 버튼을 눌렀을 때 결제 금액 자체가 깎여서 승인되는 방식입니다 (쿠팡, 롯데ON 즉시할인 등). 
                영수증 승인 금액 자체가 줄어듭니다.
                <br />
                <strong>청구할인:</strong> 결제할 때는 정가대로 전액 승인되지만, **다음 달 카드사 결제 대금 청구서에서 7%~10% 금액이 차감되어 청구**되는 방식입니다 (롯데하이마트 등). 
                결제 당시에는 할인이 안 된 것처럼 보여 당황하기 쉽지만, 카드사 청구서 발행일에 정상 차감되므로 안심하셔도 됩니다.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold font-mono">2</span>
                <span>간편결제(네이버페이/카카오페이) 사용 시 청구할인 누락 주의보</span>
              </h3>
              <p>
                많은 소비자가 가장 많이 실수하는 함정입니다. 
                롯데하이마트나 롯데ON에서 '롯데카드 7% 청구할인' 행사를 진행할 때, 결제 수단으로 **[일반 결제 ➔ 롯데카드]**를 선택해야 할인 혜택이 적용됩니다. 
                만약 **네이버페이나 카카오페이에 롯데카드를 등록하여 간편결제할 경우**, 가맹점 코드가 네이버/카카오페이로 잡혀 카드사 전산에서 **청구할인 대상에서 제외**될 수 있습니다. 
                카드사 프로모션 적용 여부 안내 문구를 반드시 확인하세요.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold font-mono">3</span>
                <span>무이자 할부와 청구할인의 황금 콤보</span>
              </h3>
              <p>
                200만 원 이상의 고사양 PC나 게이밍 노트북을 구매할 때는 **쇼핑몰 자체 무이자 할부(최대 12~24개월)**와 **카드 청구할인**이 동시에 중복 적용되는지 확인하는 것이 핵심입니다. 
                이자 부담 없이 월 10만 원 안팎으로 분납하면서도 10만~15만 원의 즉각적인 청구할인을 누릴 수 있어 가장 현명한 하이엔드 구매 전략이 됩니다.
              </p>
            </div>
          </div>
        </section>

        {/* 하단 맞춤 견적기 바로가기 배너 */}
        <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-black">내 예산에 딱 맞는 최적의 부품 견적이 필요하신가요?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              PC-Craft 맞춤 견적기에서 실시간 최저가 빅매치와 호환성 진단을 3초 만에 확인해보세요.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white font-black text-xs sm:text-sm shrink-0 shadow-lg transition-all"
          >
            <span>🚀 맞춤 견적기 바로가기</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
