'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { 
  User, 
  Bookmark, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  BellRing, 
  ExternalLink, 
  Trash2, 
  LogOut, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  TrendingDown,
  ArrowRight,
  Clock,
  Laptop
} from 'lucide-react';
import { SavedQuote } from '@/components/QuoteStorageModal';

const STORAGE_KEY = 'pccraft_saved_quotes_v1';

export default function MyPage() {
  const { data: session, status } = useSession();
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [activeTab, setActiveTab] = useState<'quotes' | 'benefits' | 'settings'>('quotes');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [isDeletedNotice, setIsDeletedNotice] = useState(false);

  // 로컬 저장소 및 보관된 견적 목록 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setSavedQuotes(JSON.parse(stored));
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // 특정 견적 삭제
  const handleDeleteQuote = (id: string) => {
    if (!confirm('이 견적서를 보관함에서 삭제하시겠습니까?')) return;
    const updated = savedQuotes.filter((q) => q.id !== id);
    setSavedQuotes(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  // 회원 탈퇴 처리 (로컬 보관 데이터 완전 삭제 및 세션 로그아웃)
  const handleAccountWithdrawal = () => {
    if (deleteInput.trim() !== '탈퇴') {
      alert("확인을 위해 '탈퇴'를 정확히 입력해주세요.");
      return;
    }

    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('pccraft_custom_components');
      }
      setIsDeletedNotice(true);
      setTimeout(() => {
        signOut({ callbackUrl: '/' });
      }, 1500);
    } catch (e) {
      console.error(e);
      signOut({ callbackUrl: '/' });
    }
  };

  // 로딩 상태
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
            <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-semibold">회원 정보를 불러오는 중입니다...</span>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 비로그인 상태 안내
  if (status === 'unauthenticated' || !session) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">로그인이 필요한 페이지입니다</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              카카오 또는 구글 계정으로 1초 만에 로그인하시면<br />
              내 보관 견적 열람, 기기 간 실시간 동기화, 특가 혜택을 이용하실 수 있습니다.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <Link
                href="/"
                className="w-full py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>홈으로 돌아가 로그인하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* 상단 회원 프로필 카드 */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
            {/* 프로필 아바타 */}
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-20 h-20 rounded-2xl ring-4 ring-cyan-500/20 object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center text-2xl font-black shadow-md">
                {session.user?.name?.[0] || 'U'}
              </div>
            )}

            {/* 유저 정보 */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {session.user?.name || 'PC-Craft 회원'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  VIP 정회원
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {session.user?.email || '소셜 간편 연동 계정'}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  보관된 견적서 <strong>{savedQuotes.length}개</strong>
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  모바일 동기화 <strong>활성화됨</strong>
                </span>
              </div>
            </div>

            {/* 빠른 액션 */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>새 견적 짜러가기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                title="로그아웃"
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>

          {/* 탭 네비게이션 */}
          <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'quotes'
                  ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>내 보관 견적서 ({savedQuotes.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('benefits')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'benefits'
                  ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>회원 전용 혜택 센터</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-slate-900 text-white dark:bg-cyan-500 dark:text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>계정 및 탈퇴 관리</span>
            </button>
          </div>
        </section>

        {/* 탭 1: 내 보관 견적서 리스트 */}
        {activeTab === 'quotes' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">보관된 견적 목록</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  클라우드에 영구 보관된 견적으로 모바일 및 다른 기기에서도 실시간으로 불러올 수 있습니다.
                </p>
              </div>
              <Link
                href="/"
                className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                + 새 견적 추가
              </Link>
            </div>

            {savedQuotes.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-12 text-center">
                <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">아직 보관된 견적이 없습니다</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 mb-5">
                  맞춤 견적기에서 마음에 드는 사양을 조합하고 [내 견적 보관]을 눌러보세요.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  맞춤 견적 짜러가기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 mb-1">
                          {quote.presetTitle}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 dark:text-white line-clamp-1">
                          {quote.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg transition-colors"
                        title="견적 삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 py-2 border-y border-slate-100 dark:border-slate-800/80 mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">CPU</span>
                        <span className="font-semibold">{quote.components?.cpu?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">그래픽카드</span>
                        <span className="font-semibold">{quote.components?.gpu?.name || '-'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">메모리 / SSD</span>
                        <span className="font-semibold">
                          {quote.components?.ram?.name ? `${quote.components.ram.name} / ` : ''}
                          {quote.components?.ssd?.name || '-'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {quote.savedAt}
                        </span>
                        <span className="text-base font-black text-cyan-600 dark:text-cyan-400">
                          {quote.totalPrice.toLocaleString()}원
                        </span>
                      </div>
                      <Link
                        href="/"
                        className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity flex items-center gap-1"
                      >
                        <span>견적 불러오기</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 탭 2: 회원 전용 혜택 센터 */}
        {activeTab === 'benefits' && (
          <section className="space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">PC-Craft 회원 전용 혜택</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                로그인하신 회원님만을 위한 스마트 PC 견적 & 쇼핑 케어 시스템입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">PC · 모바일 크로스 동기화</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                      제공 중
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    출퇴근길 스마트폰에서 짠 부품 견적을 집이나 사무실 PC에서 그대로 이어 확인하고 주문할 수 있습니다. 브라우저 캐시 삭제 시에도 안전하게 보존됩니다.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">부품 실시간 최저가 추적</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                      연동 중
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    쿠팡 로켓배송, 지마켓, 롯데ON 메가딜 등 검증된 공식 오픈마켓의 최저가 변동 추이를 실시간으로 비교하여 부품별 최저가 구매 링크를 제공합니다.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">하드웨어 호환성 & 정격 파워 검증</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      100% 무상
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    CPU 소켓(AM5/LGA1700), DDR5 메모리 클럭, 그래픽카드 권장 파워 용량(W)을 실시간으로 연산하여 부품 불일치나 파워 부족 현상을 원천 방지합니다.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <BellRing className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">커뮤니티 검증용 영구 공유 링크</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      무제한
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    퀘이사존, 쿨엔조이, 펨코 등에 견적 문의 글을 올릴 수 있도록 나만의 견적서 웹페이지 고유 URL을 원클릭으로 생성하여 공유할 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 탭 3: 계정 및 탈퇴 관리 */}
        {activeTab === 'settings' && (
          <section className="max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">계정 및 데이터 설정</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                연동된 소셜 계정 정보 확인 및 데이터 관리 설정입니다.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">연동 소셜 계정</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {session.user?.email ? session.user.email : '소셜 로그인 인증됨'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">회원 식별 ID</span>
                <span className="font-mono text-[11px] text-slate-400">
                  {session.user?.id ? session.user.id.slice(0, 16) + '...' : 'Verified Session'}
                </span>
              </div>
            </div>

            {/* 회원 탈퇴 메뉴 (조그맣고 정갈하게 배치) */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    회원 탈퇴 및 데이터 영구 파기
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    탈퇴 시 보관된 모든 견적서와 캐시된 사용자 데이터가 즉시 영구 삭제됩니다.
                  </p>
                </div>
                {!showDeleteConfirm && (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    탈퇴하기
                  </button>
                )}
              </div>

              {/* 탈퇴 확인 입력창 */}
              {showDeleteConfirm && (
                <div className="mt-4 p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3 animate-in fade-in duration-150">
                  <p className="text-xs font-semibold text-rose-800 dark:text-rose-300">
                    정말로 탈퇴하시겠습니까? 확인을 위해 아래 입력창에 <strong>'탈퇴'</strong>를 입력해 주세요.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="탈퇴"
                      value={deleteInput}
                      onChange={(e) => setDeleteInput(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 w-32"
                    />
                    <button
                      onClick={handleAccountWithdrawal}
                      disabled={deleteInput.trim() !== '탈퇴'}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer"
                    >
                      영구 탈퇴 확인
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteInput('');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              {isDeletedNotice && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold text-center">
                  회원 탈퇴 및 보관 데이터 파기가 완료되었습니다. 메인 페이지로 이동합니다...
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
