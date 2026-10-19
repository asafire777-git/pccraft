'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { isAdmin } from '@/lib/admin';
import { AnalyticsStats } from '@/lib/analytics';
import { GA_TRACKING_ID } from '@/lib/gtag';
import {
  Shield,
  Activity,
  MousePointerClick,
  Camera,
  Users,
  Eye,
  RefreshCw,
  ExternalLink,
  Lock,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Clock,
  Sparkles,
  Search,
  ShoppingCart
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'links' | 'users' | 'ga4'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const authorized = isAdmin(session?.user);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
        setLastRefreshed(new Date().toLocaleTimeString('ko-KR'));
      }
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchStats();
      const interval = setInterval(fetchStats, 30000); // 30초마다 자동 갱신
      return () => clearInterval(interval);
    }
  }, [authorized]);

  // 비로그인 또는 관리자가 아닐 때 접근 제한 뷰
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500 font-mono">관리자 권한 확인 중...</p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
        <Header />
        <main className="flex-1 max-w-xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-5 border border-rose-200 dark:border-rose-800/40">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/50 px-3 py-1 rounded-full mb-3">
            Admin Access Restricted
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            관리자 전용 대시보드
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            이 페이지는 사이트 최고 관리자(<strong>asafire777</strong> 계정) 전용입니다.
            <br />
            해당 구글 또는 카카오 계정으로 로그인 후 이용해 주세요.
          </p>

          {session?.user ? (
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full mb-6 text-xs text-left">
              <span className="text-slate-400 block mb-1 font-semibold">현재 로그인된 계정:</span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {session.user.email || session.user.name}
              </div>
              <span className="text-[11px] text-rose-500 mt-1 block">
                ※ 관리자 권한이 부여되지 않은 계정입니다.
              </span>
            </div>
          ) : null}

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
            <button
              onClick={() => signIn('google')}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Google 관리자 로그인</span>
            </button>

            <Link
              href="/"
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>메인 홈으로 이동</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 관리자 인증 통과 시 대시보드 뷰
  const filteredActivities = (stats?.recentActivities || []).filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const actionStr = String(item.action).toLowerCase();
    const userStr = String(item.userEmail || item.userName || '').toLowerCase();
    const paramStr = JSON.stringify(item.params || {}).toLowerCase();
    return actionStr.includes(q) || userStr.includes(q) || paramStr.includes(q);
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Header />

      <main className="flex-1 max-w-7xl 2xl:max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 상단 브레드크럼 & 타이틀 바 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  통합 관리자 대시보드
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  asafire777 (Super Admin)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                실시간 사이트 방문 트래픽, 인기 제휴 링크 클릭 랭킹 및 로그인 사용자 행동 분석
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            {lastRefreshed && (
              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                마지막 갱신: {lastRefreshed}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-500' : ''}`} />
              <span>새로고침</span>
            </button>
          </div>
        </div>

        {/* 1. 핵심 KPI 카드 그리드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* 총 페이지뷰 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">오늘 / 총 페이지뷰</span>
              <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                {stats?.todayPageViews.toLocaleString() || 0}
                <span className="text-xs font-normal text-slate-500 ml-1.5 font-sans">
                  / 총 {(stats?.totalPageViews || 0).toLocaleString()} PV
                </span>
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 실시간 수집 정상 작동중
              </span>
            </div>
          </div>

          {/* 총 제휴 링크 클릭 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">총 제휴 링크 클릭</span>
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                {(stats?.totalAffiliateClicks || 0).toLocaleString()}
                <span className="text-xs font-normal text-slate-500 ml-1 font-sans">회</span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1 flex items-center gap-1.5 flex-wrap">
                <span className="text-rose-500">쿠팡 {stats?.clicksByPlatform.coupang || 0}</span>
                <span>•</span>
                <span className="text-red-500">11번가 {stats?.clicksByPlatform['11st'] || 0}</span>
                <span>•</span>
                <span className="text-orange-500">G마켓 {stats?.clicksByPlatform.gmarket || 0}</span>
              </div>
            </div>
          </div>

          {/* 견적서 캡처 생성수 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">견적서 캡처/공유</span>
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {(stats?.totalQuoteCaptures || 0).toLocaleString()}
                <span className="text-xs font-normal text-slate-500 ml-1 font-sans">회</span>
              </div>
              <span className="text-[11px] text-indigo-500 dark:text-indigo-400 font-medium mt-1 block">
                커뮤니티 바이럴 생성 누적
              </span>
            </div>
          </div>

          {/* GA4 연동 상태 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">Google Analytics 4</span>
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white font-mono truncate">
                {GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX' ? GA_TRACKING_ID : '연동 준비완료'}
              </div>
              <a
                href="https://analytics.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline font-semibold flex items-center gap-1 mt-1"
              >
                <span>GA4 실시간 콘솔 바로가기</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* 2. 대시보드 탭 네비게이션 */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-200/60 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            📊 인기 부품 &amp; 프리셋 랭킹
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            👥 유저 실시간 행동 분석
          </button>
          <button
            onClick={() => setActiveTab('ga4')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ga4'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            ⚙️ GA4 이벤트 설정 가이드
          </button>
        </div>

        {/* 탭 1: 인기 부품 클릭 & 프리셋 랭킹 */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 인기 제휴 링크 클릭 TOP 15 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-rose-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    실시간 인기 제휴 링크 클릭 TOP 15
                  </h3>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  누적 {stats?.topClickedProducts.length || 0}개 품목
                </span>
              </div>

              {stats?.topClickedProducts && stats.topClickedProducts.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {stats.topClickedProducts.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-mono font-bold text-[11px] shrink-0 ${
                          idx === 0 ? 'bg-amber-400 text-slate-950 font-black' :
                          idx === 1 ? 'bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200' :
                          idx === 2 ? 'bg-amber-600/30 text-amber-700 dark:text-amber-300' :
                          'text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>

                        <div className="min-w-0">
                          <span className="font-bold text-slate-800 dark:text-slate-200 truncate block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.category ? `[${item.category}] ` : ''}마지막 클릭: {new Date(item.lastClicked).toLocaleDateString('ko-KR')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          item.platform === 'coupang' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
                          item.platform === '11st' ? 'bg-red-50 text-red-600 border border-red-200' :
                          'bg-orange-50 text-orange-600 border border-orange-200'
                        }`}>
                          {item.platform === 'coupang' ? '쿠팡' : item.platform === '11st' ? '11번가' : 'G마켓'}
                        </span>
                        <span className="font-mono font-black text-rose-600 dark:text-rose-400 text-sm w-12 text-right">
                          {item.count}회
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  아직 클릭 데이터가 없습니다. 사용자가 제휴 링크를 클릭하면 실시간 집계됩니다.
                </div>
              )}
            </div>

            {/* 인기 게임 프리셋 순위 */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    인기 게임 프리셋 선택 비중
                  </h3>
                </div>
              </div>

              {stats?.topPresets && stats.topPresets.length > 0 ? (
                <div className="space-y-3">
                  {stats.topPresets.map((preset, idx) => {
                    const totalPresetClicks = stats.topPresets.reduce((a, b) => a + b.count, 0) || 1;
                    const percent = Math.round((preset.count / totalPresetClicks) * 100);

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-800 dark:text-slate-200">{preset.title}</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-mono font-bold">
                            {preset.count}회 ({percent}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-teal-500 h-2 rounded-full transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  프리셋 변경 활동이 집계되는 중입니다.
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 2: 로그인 유저 실시간 행동 분석 (Live Activity Log) */}
        {activeTab === 'users' && (
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  실시간 사용자 행동 로그 (최근 50건)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  로그인 사용자의 이메일 및 수행한 액션(제휴 링크 클릭, 견적 캡처, 프리셋 탐색 등)의 타임라인입니다.
                </p>
              </div>

              {/* 검색 필터 */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="이메일 또는 액션 검색..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {filteredActivities.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">발생 일시</th>
                      <th className="py-2.5 px-3">사용자 계정</th>
                      <th className="py-2.5 px-3">행동 유형</th>
                      <th className="py-2.5 px-3">상세 내용</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                    {filteredActivities.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                          {new Date(act.timestamp).toLocaleString('ko-KR')}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {act.userEmail ? (
                            <span className="font-bold text-cyan-600 dark:text-cyan-400">
                              {act.userEmail}
                            </span>
                          ) : (
                            <span className="text-slate-400">비로그인 방문자</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {act.action === 'affiliate_click' && (
                            <span className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 font-bold text-[10px]">
                              제휴 링크 클릭
                            </span>
                          )}
                          {act.action === 'quote_capture' && (
                            <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 font-bold text-[10px]">
                              견적서 캡처
                            </span>
                          )}
                          {act.action === 'preset_select' && (
                            <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-bold text-[10px]">
                              프리셋 선택
                            </span>
                          )}
                          {act.action === 'page_view' && (
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px]">
                              페이지 이동
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700 dark:text-slate-300 font-sans truncate max-w-md">
                          {act.action === 'affiliate_click' && (
                            <span>
                              [{String(act.params?.platform).toUpperCase()}] {String(act.params?.item_name || '')}
                            </span>
                          )}
                          {act.action === 'quote_capture' && (
                            <span>
                              견적서 이미지 캡처 ({Number(act.params?.total_price || 0).toLocaleString()}원)
                            </span>
                          )}
                          {act.action === 'preset_select' && (
                            <span>{String(act.params?.preset_title || act.params?.preset_id)}</span>
                          )}
                          {act.action === 'page_view' && (
                            <span className="font-mono text-slate-400">{String(act.params?.url || '/')}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                조건에 맞는 최근 활동 기록이 없습니다.
              </div>
            )}
          </div>
        )}

        {/* 탭 3: GA4 설정 가이드 */}
        {activeTab === 'ga4' && (
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              Google Analytics 4 (GA4) 연동 세부 구성
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  1. GA4 측정 ID (Measurement ID)
                </span>
                <p>
                  환경변수 <code className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">NEXT_PUBLIC_GA_ID</code> 에 구글 애널리틱스 스트림 측정 ID(예: G-XXXXXXXXXX)를 입력하시면 즉시 구글 공식 서버로 트래픽이 전송됩니다.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">현재 상태:</span>
                  <span className="px-2 py-0.5 rounded font-mono bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 font-bold">
                    {GA_TRACKING_ID}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  2. 자동 전송되는 4대 커스텀 이벤트
                </span>
                <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
                  <li><strong className="text-rose-500">affiliate_click</strong>: 오픈마켓 플랫폼(쿠팡/11번가/G마켓), 품목명, 단가, 카테고리</li>
                  <li><strong className="text-indigo-500">quote_capture</strong>: 견적서 이미지 복사/다운로드 시 최종 금액 및 테마</li>
                  <li><strong className="text-emerald-500">preset_select</strong>: 방문자가 선택한 게임 프리셋(배그, 롤, 사이버펑크 등)</li>
                  <li><strong className="text-cyan-500">user_properties</strong>: 로그인 회원 이메일, 이름, 가입 유형(구글/카카오)</li>
                </ul>
              </div>

              <div className="pt-2">
                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition-all"
                >
                  <span>Google Analytics 4 콘솔 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
