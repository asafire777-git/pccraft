'use client';

import React, { useState, useEffect } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { X, Bookmark, Trash2, Download, Copy, Check, Clock, Cpu, Sparkles, FolderHeart } from 'lucide-react';

export interface SavedQuote {
  id: string;
  name: string;
  presetTitle: string;
  totalPrice: number;
  savedAt: string; // YYYY-MM-DD HH:mm
  components: Record<string, ComponentItem>;
}

interface QuoteStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentComponents: Record<string, ComponentItem>;
  currentPreset: GamePreset;
  totalPrice: number;
  onLoadQuote: (components: Record<string, ComponentItem>, presetTitle?: string) => void;
}

const STORAGE_KEY = 'pccraft_saved_quotes_v1';

export default function QuoteStorageModal({
  isOpen,
  onClose,
  currentComponents,
  currentPreset,
  totalPrice,
  onLoadQuote
}: QuoteStorageModalProps) {
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [quoteName, setQuoteName] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 로컬스토리지에서 기존 저장된 견적 불러오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSavedQuotes(JSON.parse(stored));
        }
      } catch (e) {
        console.error('Failed to load quotes from localStorage', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 현재 견적 저장하기
  const handleSaveCurrentQuote = () => {
    const name = quoteName.trim() || `${currentPreset.title} 맞춤 견적 (${new Date().toLocaleDateString()})`;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newQuote: SavedQuote = {
      id: 'quote_' + Date.now(),
      name,
      presetTitle: currentPreset.title,
      totalPrice,
      savedAt: dateStr,
      components: { ...currentComponents }
    };

    const updated = [newQuote, ...savedQuotes].slice(0, 10); // 최대 10개까지 보관
    setSavedQuotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setQuoteName('');
    showToast('현재 견적이 보관함에 성공적으로 저장되었습니다!');
  };

  // 견적 불러오기
  const handleLoad = (quote: SavedQuote) => {
    onLoadQuote(quote.components, quote.presetTitle);
    showToast(`'${quote.name}' 견적을 불러왔습니다!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  // 견적 삭제하기
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
    showToast('견적이 삭제되었습니다.');
  };

  // 견적서 텍스트 복사 (커뮤니티 공유용)
  const handleCopyQuoteText = () => {
    const lines = [
      `[PC-Craft 2026 실시간 PC 맞춤 견적서]`,
      `■ 견적명: ${currentPreset.title}`,
      `■ 총 견적가: ${totalPrice.toLocaleString()}원`,
      `----------------------------------------`
    ];

    const categoryNames: Record<string, string> = {
      cpu: 'CPU',
      cooler: '쿨러',
      motherboard: '메인보드',
      ram: '메모리(RAM)',
      gpu: '그래픽카드',
      ssd: 'SSD',
      power: '파워서플라이',
      case: '케이스'
    };

    Object.entries(currentComponents).forEach(([key, item]) => {
      if (item) {
        lines.push(`• ${categoryNames[key] || key}: ${item.name} (${item.price.toLocaleString()}원)`);
      }
    });

    lines.push(`----------------------------------------`);
    lines.push(`실시간 호환성 & 최저가 확인: https://pccraft.kr`);

    navigator.clipboard.writeText(lines.join('\n'));
    setCopySuccess(true);
    showToast('커뮤니티 공유용 텍스트 견적서가 복사되었습니다!');
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative text-slate-900 dark:text-white max-h-[90vh] flex flex-col">
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl cursor-pointer transition-colors"
          title="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-5 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-sm">
            <FolderHeart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black tracking-tight">내 견적 보관함 (My Quotes)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              비회원도 브라우저에 영구 보관되며 언제든 다시 불러올 수 있습니다.
            </p>
          </div>
        </div>

        {/* 토스트 알림 */}
        {toastMessage && (
          <div className="mb-4 py-2 px-3 rounded-xl bg-cyan-500 text-white text-xs font-bold text-center animate-in fade-in duration-200">
            {toastMessage}
          </div>
        )}

        {/* 현재 견적 저장 폼 */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-5 shrink-0">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">현재 작성 중인 견적</span>
            <span className="font-mono font-extrabold text-cyan-600 dark:text-cyan-400">
              {totalPrice.toLocaleString()}원
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={quoteName}
              onChange={(e) => setQuoteName(e.target.value)}
              placeholder="견적 별칭 (예: 배그 풀옵션, 120만원대 세팅)"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSaveCurrentQuote}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shrink-0 shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>저장하기</span>
            </button>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>총 {Object.keys(currentComponents).length}개 부품 포함됨</span>
            <button
              onClick={handleCopyQuoteText}
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              {copySuccess ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copySuccess ? '복사완료!' : '텍스트 견적서 복사'}</span>
            </button>
          </div>
        </div>

        {/* 저장된 견적 목록 (스크롤 영역) */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span>보관된 견적 목록 ({savedQuotes.length})</span>
            {savedQuotes.length > 0 && <span className="text-[10px] text-slate-500">클릭 시 즉시 불러오기</span>}
          </div>

          {savedQuotes.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <FolderHeart className="w-8 h-8 mx-auto mb-2 opacity-30" />
              보관된 견적이 아직 없습니다.
              <br />
              상단의 [저장하기] 버튼을 눌러 첫 번째 견적을 보관해보세요!
            </div>
          ) : (
            savedQuotes.map((quote) => (
              <div
                key={quote.id}
                onClick={() => handleLoad(quote)}
                className="group p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all cursor-pointer shadow-sm flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                      {quote.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {quote.presetTitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {quote.totalPrice.toLocaleString()}원
                    </span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {quote.savedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => handleDelete(quote.id, e)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                    title="견적 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 푸터 안내 */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center shrink-0">
          💡 저장된 견적은 현재 기기에 안전하게 보관되며 브라우저를 닫아도 유지됩니다.
        </div>
      </div>
    </div>
  );
}
