'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Cpu, Sun, Moon, Bookmark, User, X, Check, Share2, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useSession, signIn, signOut } from 'next-auth/react';

interface HeaderProps {
  onOpenQuoteStorage?: () => void;
}

export default function Header({ onOpenQuoteStorage }: HeaderProps = {}) {
  const { theme, toggleTheme } = useTheme();
  const { data: session, status } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleProviderLogin = async (provider: 'kakao' | 'google') => {
    try {
      setIsLoggingIn(true);
      await signIn(provider);
    } catch (e) {
      console.error(e);
      alert('로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* 로고 영역 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                PC-Craft <span className="text-cyan-600 dark:text-cyan-400 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800/40">2026</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-1 hidden sm:block">
                스마트 컴퓨터 부품 & 게이밍 맞춤 견적 큐레이션
              </span>
            </div>
          </Link>

          {/* 중앙 네비게이션 (SEO 및 애드센스 승인을 위한 충실한 정식 메뉴) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              맞춤 견적기
            </Link>
            <a href="#price-battle-section" className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1">
              <span>⚔️ 최저가 빅매치</span>
            </a>
            <a href="#prebuilt-section" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              완본체 비교
            </a>
            <Link href="/guide" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              하드웨어 가이드
            </Link>
            <Link href="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              플랫폼 소개
            </Link>
          </nav>

          {/* 우측 유틸리티: 테마 토글러 & 로그인 버튼 */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* 테마 토글 버튼 (낮/밤 스위치) */}
            <button
              onClick={toggleTheme}
              aria-label="테마 변경"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-sm"
              title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* 견적 저장 및 로그인 버튼 */}
            {session?.user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (onOpenQuoteStorage) onOpenQuoteStorage();
                  }}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span className="hidden sm:inline">내 견적</span>
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="w-7 h-7 rounded-full ring-2 ring-cyan-500/30"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">
                      {session.user.name?.[0] || 'U'}
                    </div>
                  )}
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden md:inline max-w-[80px] truncate">
                    {session.user.name || '회원'}님
                  </span>
                  <button
                    onClick={() => signOut()}
                    title="로그아웃"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-cyan-400 dark:text-slate-950" />
                <span className="hidden sm:inline">내 견적 보관 /</span> 로그인
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 로그인 & 견적 저장 모달 */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-slate-900 dark:text-white">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">견적서 저장 & 특별 혜택 로그인</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                작성한 견적을 클라우드에 영구 보관하고 실시간 부품 특가 알림을 받으세요.
              </p>
            </div>

            <div className="space-y-3">
              {/* 카카오 간편 로그인 버튼 */}
              <button
                onClick={() => handleProviderLogin('kakao')}
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span>💬 카카오 1초 간편 로그인</span>
              </button>

              {/* 구글 간편 로그인 버튼 */}
              <button
                onClick={() => handleProviderLogin('google')}
                disabled={isLoggingIn}
                className="w-full py-3 px-4 rounded-xl bg-white border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
              >
                <span>구글 계정으로 계속하기</span>
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 text-center leading-relaxed">
              💡 <strong>비회원도 안심하세요!</strong> 로그인 없이도 현재 브라우저에 최근 선택하신 견적이 자동 캐싱되어 유지됩니다.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
