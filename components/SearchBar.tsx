'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Sparkles, ExternalLink, Cpu, Gamepad2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPONENTS_DATA, ComponentItem } from '@/data/components';
import { GAME_PRESETS, GamePreset } from '@/data/presets';
import { getCoupangProductUrl, getCoupangSearchUrl } from '@/lib/affiliate';

interface SearchBarProps {
  onSelectPreset?: (preset: GamePreset) => void;
  onSelectComponent?: (category: string, item: ComponentItem) => void;
}

const POPULAR_TAGS = [
  { label: 'RTX 4060', query: '4060' },
  { label: '라이젠 7500F', query: '7500F' },
  { label: '배틀그라운드 144Hz', query: '배틀그라운드' },
  { label: '롤·발로란트 가성비', query: '리그오브레전드' },
  { label: '스팀 QHD 종결', query: '7800X3D' },
  { label: 'DDR5 32GB', query: 'DDR5 32GB' },
  { label: '1TB NVMe SSD', query: '1TB' }
];

export default function SearchBar({ onSelectPreset, onSelectComponent }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색 결과 실시간 필터링
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { presets: [], components: [] };

    // 1. 프리셋 및 타겟 게임 검색
    const matchedPresets = GAME_PRESETS.filter((preset) => {
      return (
        preset.title.toLowerCase().includes(q) ||
        preset.badge.toLowerCase().includes(q) ||
        preset.performanceDescription.toLowerCase().includes(q) ||
        preset.targetGames.some((game) => game.toLowerCase().includes(q))
      );
    });

    // 2. 부품 라이브러리 검색
    const matchedComponents: ComponentItem[] = [];
    Object.values(COMPONENTS_DATA).forEach((items) => {
      items.forEach((item) => {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesCat = item.categoryName.toLowerCase().includes(q);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(q));
        const matchesSpecs = Object.values(item.specs).some((spec) =>
          spec.toLowerCase().includes(q)
        );

        if (matchesName || matchesBrand || matchesCat || matchesTags || matchesSpecs) {
          matchedComponents.push(item);
        }
      });
    });

    return {
      presets: matchedPresets.slice(0, 3),
      components: matchedComponents.slice(0, 6)
    };
  }, [query]);

  const hasResults = results.presets.length > 0 || results.components.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && query.trim()) {
      // 엔터 누를 시 쿠팡 실시간 로켓배송 최저가 검색으로 바로 직행
      window.open(getCoupangSearchUrl(query.trim()), '_blank', 'noopener,noreferrer');
      setIsOpen(false);
    }
  };

  const handleTagClick = (tagQuery: string) => {
    setQuery(tagQuery);
    setIsOpen(true);
    inputRef.current?.focus();
  };

  const handlePresetClick = (preset: GamePreset) => {
    if (onSelectPreset) {
      onSelectPreset(preset);
      // 부품 견적 영역으로 스크롤 이동
      const element = document.getElementById('builder-table-section') || document.getElementById('game-selector-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleComponentClick = (comp: ComponentItem) => {
    if (onSelectComponent) {
      onSelectComponent(comp.category, comp);
    }
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto mb-8 z-30">
      {/* 스마트 통합 검색 인풋 바 */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-cyan-600 dark:text-cyan-400 pointer-events-none">
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="원하는 부품(RTX 4060, 7500F)이나 게임명(배그, 롤, 스팀)을 입력하세요..."
          className="w-full pl-12 pr-28 py-3.5 sm:py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus:border-cyan-500 dark:focus:border-cyan-400 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm sm:text-base font-medium shadow-lg shadow-slate-200/50 dark:shadow-none focus:outline-none transition-all duration-200"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              title="검색어 지우기"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <a
            href={getCoupangSearchUrl(query.trim() || '조립컴퓨터')}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all active:scale-95 cursor-pointer"
            title="쿠팡 로켓 최저가 검색"
          >
            <span>검색</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 인기 검색 태그 */}
      <div className="flex items-center gap-1.5 mt-2.5 px-1 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-600 dark:text-slate-300 font-bold shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
          추천 태그:
        </span>
        <div className="flex items-center gap-1.5 flex-nowrap">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag.label}
              onClick={() => handleTagClick(tag.query)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium shrink-0 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/60"
            >
              #{tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 드롭다운 레이어 */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-h-[460px] overflow-y-auto p-3 space-y-4">
            {/* 1. 추천 게이밍 프리셋 & 용도 매칭 */}
            {results.presets.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-500" />
                  맞춤 게이밍 & 용도별 추천 세팅
                </div>
                <div className="mt-1 space-y-1">
                  {results.presets.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handlePresetClick(preset)}
                      className="group p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {preset.title}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 font-semibold">
                            {preset.badge}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          지원 게임: {preset.targetGames.slice(0, 4).join(', ')} • {preset.budgetRange}
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        견적 적용
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. 하드웨어 부품 매칭 */}
            {results.components.length > 0 && (
              <div>
                <div className="px-2 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-blue-500" />
                  매칭된 하드웨어 부품 최저가
                </div>
                <div className="mt-1 space-y-1">
                  {results.components.map((comp) => {
                    const coupangUrl = getCoupangProductUrl(comp.id, comp.name, comp.searchKeyword);
                    return (
                      <div
                        key={comp.id}
                        className="group p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between gap-3"
                      >
                        <div
                          className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
                          onClick={() => handleComponentClick(comp)}
                        >
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shrink-0">
                            {comp.categoryName.split(' ')[0]}
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                              {comp.name}
                            </div>
                            <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                              {comp.price.toLocaleString()}원
                              {comp.inStock ? (
                                <span className="ml-2 text-[10px] text-emerald-600 dark:text-emerald-400 font-sans font-normal inline-flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> 로켓배송 가능
                                </span>
                              ) : (
                                <span className="ml-2 text-[10px] text-rose-500 font-sans font-normal">
                                  품절임박
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {onSelectComponent && (
                            <button
                              onClick={() => handleComponentClick(comp)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                              title="현재 견적에 교체 담기"
                            >
                              견적 담기
                            </button>
                          )}
                          <a
                            href={coupangUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 text-xs font-bold flex items-center gap-1 transition-colors"
                            title="쿠팡 로켓배송 최저가 확인"
                          >
                            <span>쿠팡 최저가</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {!hasResults && (
              <div className="py-6 text-center text-slate-400 text-xs">
                ‘<span className="text-slate-700 dark:text-slate-200 font-semibold">{query}</span>’ 관련 등록 부품이 없습니다.
                <br />
                아래 버튼을 눌러 쿠팡 실시간 전체 로켓배송 검색 결과를 확인해보세요.
              </div>
            )}
          </div>

          {/* 하단 고정: 쿠팡 전체 실시간 검색 CTA & 공정위 경제적 이해관계 표기 */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                ‘<strong className="text-slate-800 dark:text-slate-200">{query}</strong>’ 쿠팡 로켓배송 실시간 검색
              </div>
              <a
                href={getCoupangSearchUrl(query.trim())}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all duration-150 shrink-0"
              >
                <span>쿠팡 최저가 결과 보기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 text-center leading-tight">
              ※ 본 검색 링크 및 추천 상품을 통한 구매 시 쿠팡 파트너스 활동의 일환으로 일정액의 수수료를 제공받습니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
