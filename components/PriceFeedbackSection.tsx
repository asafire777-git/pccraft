'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquarePlus, Megaphone, CheckCircle2, Store, Tag, Sparkles, Send } from 'lucide-react';
import { ComponentItem } from '@/data/components';

interface PriceFeedbackSectionProps {
  selectedComponents: Record<string, ComponentItem>;
}

interface PriceReport {
  id: string;
  componentId: string;
  componentName: string;
  reportedPrice: number;
  reportedStore: string;
  tipText?: string;
  nickname: string;
  createdAt: string;
}

export default function PriceFeedbackSection({ selectedComponents }: PriceFeedbackSectionProps) {
  const [reports, setReports] = useState<PriceReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 폼 입력 상태
  const [selectedCompKey, setSelectedCompKey] = useState<string>('cpu');
  const [reportedStore, setReportedStore] = useState('쿠팡');
  const [reportedPrice, setReportedPrice] = useState('');
  const [tipText, setTipText] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/price-feedback');
      const data = await res.json();
      if (data.success && data.reports) {
        setReports(data.reports);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentItem = selectedComponents[selectedCompKey];
    if (!currentItem || !reportedPrice) {
      alert('부품과 실구매 제보 가격을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/price-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          componentId: currentItem.id,
          componentName: currentItem.name,
          reportedPrice: Number(reportedPrice.replace(/[^0-9]/g, '')),
          reportedStore,
          tipText,
          nickname: nickname.trim() || '익명 게이머'
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setReportedPrice('');
        setTipText('');
        fetchReports();
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
        }, 2000);
      }
    } catch {
      alert('제보 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm transition-colors mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
              <Megaphone className="w-4 h-4" />
            </span>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              실시간 특가 & 최저가 구매 꿀팁 제보
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            소비자 집단지성으로 완성되는 공간! 내가 발견한 쇼핑몰 쿠폰/카드 할인 혜택이나 특가를 공유해주세요.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:opacity-90 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          <span>{showForm ? '닫기' : '더 저렴한 곳 제보하기'}</span>
        </button>
      </div>

      {/* 제보 작성 폼 토글 */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>최저가 제보 등록</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">제보할 부품 선택</label>
              <select
                value={selectedCompKey}
                onChange={(e) => setSelectedCompKey(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                {Object.entries(selectedComponents).map(([catKey, item]) => (
                  <option key={catKey} value={catKey}>
                    [{item?.categoryName || catKey}] {item?.name?.slice(0, 25)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">발견한 쇼핑몰</label>
              <select
                value={reportedStore}
                onChange={(e) => setReportedStore(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="쿠팡">쿠팡 로켓 / 와우회원가</option>
                <option value="11번가">11번가 / 슈팅배송</option>
                <option value="G마켓">G마켓 / 옥션 빅스마일</option>
                <option value="다나와">다나와 현금몰 / 카드몰</option>
                <option value="알리익스프레스">알리 직구 / 광군제</option>
                <option value="기타">기타 전문몰</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">구매/체감 가격 (원)</label>
              <input
                type="number"
                placeholder="예: 185000"
                value={reportedPrice}
                onChange={(e) => setReportedPrice(e.target.value)}
                required
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-slate-500 mb-1">할인 팁 / 쿠폰 경로 (선택)</label>
              <input
                type="text"
                placeholder="예: 현대카드 7% 청구할인 적용 시 체감가입니다."
                value={tipText}
                onChange={(e) => setTipText(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">닉네임</label>
              <input
                type="text"
                placeholder="익명 게이머"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={10}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {submitSuccess ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> 소중한 특가 제보가 등록되었습니다!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                ※ 허위 광고나 스팸 링크는 자동 필터링됩니다.
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Send className="w-3 h-3" />
              <span>{isSubmitting ? '등록중...' : '제보 등록'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 실시간 유저 제보 리스트 */}
      <div className="mt-4 space-y-2.5">
        {isLoading ? (
          <div className="text-center py-6 text-xs text-slate-400">특가 제보 불러오는 중...</div>
        ) : reports.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">등록된 특가 제보가 없습니다. 첫 제보자가 되어보세요!</div>
        ) : (
          reports.slice(0, 5).map((r) => (
            <div
              key={r.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                  {r.reportedStore}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white truncate">
                      {r.componentName}
                    </span>
                    <span className="font-mono font-black text-rose-600 dark:text-rose-400">
                      {r.reportedPrice.toLocaleString()}원
                    </span>
                  </div>
                  {r.tipText && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      💬 {r.tipText}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-400 shrink-0 justify-end">
                <span>{r.nickname}</span>
                <span>•</span>
                <span>{r.createdAt}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
