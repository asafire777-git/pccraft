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

            {/* 견적 저장 및 로그인 버튼 (새로고침 깜빡임 방지: status === 'loading' 스켈레톤 처리) */}
            {status === 'loading' ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-20 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
              </div>
            ) : session?.user ? (
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
                  <Link
                    href="/mypage"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    title="마이페이지로 이동"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-7 h-7 rounded-full ring-2 ring-cyan-500/30 object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">
                        {session.user.name?.[0] || 'U'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden md:inline max-w-[80px] truncate">
                      {session.user.name || '회원'}님
                    </span>
                  </Link>
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
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl relative text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 헤더 */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-cyan-100 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 mb-2">
                ✨ PC-Craft 회원 전용 혜택
              </span>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                로그인하고 스마트하게 견적 관리하세요
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                3초 간편 로그인으로 모든 기기에서 내 견적을 영구 보관하고 특가 소식을 받으세요.
              </p>
            </div>

            {/* 회원 전용 4대 혜택 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  📱
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">PC · 모바일 실시간 동기화</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    기기 제약 없이 언제 어디서나 동일한 견적서 열람 및 수정
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  📉
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">보관 부품 최저가 변동 추적</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    쿠팡 · 오픈마켓 부품 빅세일 시 가격 인하 알림 제공
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  🔗
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">나만의 견적 영구 공유 링크</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    커뮤니티(퀘이사존/쿨엔 등) 피드백용 고유 URL 무제한 생성
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold text-sm">
                  🛡️
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">호환성 & 정격 파워 검증</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    부품 간 간섭 및 정격 파워 용량 리포트 영구 보관
                  </p>
                </div>
              </div>
            </div>

            {/* 로그인 버튼 그룹 */}
            <div className="space-y-2.5">
              {/* 카카오 간편 로그인 버튼 */}
              <button
                onClick={() => handleProviderLogin('kakao')}
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 active:scale-[0.99]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-5.52 0-10 3.58-10 8c0 2.87 1.86 5.39 4.67 6.79l-1.18 4.36c-.1.38.31.69.64.49l5.12-3.37c.25.02.5.03.75.03 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                </svg>
                <span>카카오 계정으로 1초 간편 시작</span>
              </button>

              {/* 구글 간편 로그인 버튼 */}
              <button
                onClick={() => handleProviderLogin('google')}
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm hover:shadow disabled:opacity-50 active:scale-[0.99]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>구글 계정으로 계속하기</span>
              </button>
            </div>

            {/* 비회원과 차이 안내 푸터 */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
              💡 <strong>비회원 안내:</strong> 로그인하지 않아도 현재 사용 중인 기기의 브라우저에 임시 저장되지만, <strong>쿠키 삭제 시 삭제</strong>되며 다른 기기(모바일 등)와는 연동되지 않습니다.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
