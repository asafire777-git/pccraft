import React from 'react';

interface ComponentThumbnailProps {
  category: 'cpu' | 'cooler' | 'motherboard' | 'ram' | 'gpu' | 'ssd' | 'power' | 'case';
  name?: string;
  className?: string;
}

export default function ComponentThumbnail({ category, className = 'w-14 h-14' }: ComponentThumbnailProps) {
  switch (category) {
    case 'cpu':
      // CPU (프로세서 실물 기판 & 실버 히트스프레더)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 녹색 PCB 기판 */}
            <rect x="6" y="6" width="52" height="52" rx="4" fill="#065F46" stroke="#10B981" strokeWidth="1.5" />
            {/* 골드 핀 접점 포인트 */}
            <circle cx="10" cy="10" r="1.5" fill="#F59E0B" />
            <circle cx="54" cy="10" r="1.5" fill="#F59E0B" />
            <circle cx="10" cy="54" r="1.5" fill="#F59E0B" />
            <circle cx="54" cy="54" r="1.5" fill="#F59E0B" />
            {/* 니켈 도금 실버 히트스프레더 (IHS) */}
            <rect x="14" y="14" width="36" height="36" rx="3" fill="url(#cpuGrad)" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* 레이저 각인 텍스트 */}
            <rect x="20" y="24" width="24" height="3" rx="1" fill="#475569" />
            <rect x="22" y="30" width="20" height="2" rx="1" fill="#64748B" />
            <rect x="24" y="35" width="16" height="2" rx="1" fill="#94A3B8" />
            <defs>
              <linearGradient id="cpuGrad" x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F1F5F9" />
                <stop offset="0.5" stopColor="#E2E8F0" />
                <stop offset="1" stopColor="#CBD5E1" />
              </linearGradient>
            </defs>
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-emerald-400 font-mono tracking-tighter">CPU</span>
        </div>
      );

    case 'cooler':
      // 쿨러 (알루미늄 방열판 핀 & 쿨링팬)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-cyan-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 히트싱크 알루미늄 타워 */}
            <rect x="14" y="8" width="36" height="48" rx="2" fill="#334155" stroke="#64748B" strokeWidth="1" />
            {/* 히트파이프 핀 */}
            <line x1="14" y1="14" x2="50" y2="14" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="20" x2="50" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="26" x2="50" y2="26" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="32" x2="50" y2="32" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="38" x2="50" y2="38" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="44" x2="50" y2="44" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="14" y1="50" x2="50" y2="50" stroke="#94A3B8" strokeWidth="1.5" />
            {/* 중앙 120mm 쿨링팬 프레임 & 블레이드 */}
            <circle cx="32" cy="32" r="18" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
            <circle cx="32" cy="32" r="6" fill="#0891B2" />
            {/* 회전 팬 블레이드 */}
            <path d="M32 26 C28 18 36 18 32 26 Z" fill="#22D3EE" opacity="0.8" />
            <path d="M38 32 C46 28 46 36 38 32 Z" fill="#22D3EE" opacity="0.8" />
            <path d="M32 38 C36 46 28 46 32 38 Z" fill="#22D3EE" opacity="0.8" />
            <path d="M26 32 C18 36 18 28 26 32 Z" fill="#22D3EE" opacity="0.8" />
            {/* 구리 히트파이프 기둥 4개 */}
            <circle cx="20" cy="5" r="2" fill="#D97706" />
            <circle cx="28" cy="5" r="2" fill="#D97706" />
            <circle cx="36" cy="5" r="2" fill="#D97706" />
            <circle cx="44" cy="5" r="2" fill="#D97706" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-cyan-400 font-mono tracking-tighter">COOLER</span>
        </div>
      );

    case 'motherboard':
      // 메인보드 (검은색 PCB 기판, CPU 소켓, RAM 슬롯 2개, PCIe 슬롯, VRM 대형 방열판)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 메인보드 검정 기판 */}
            <rect x="4" y="4" width="56" height="56" rx="3" fill="#0B132B" stroke="#1E293B" strokeWidth="1.5" />
            {/* 전원부 VRM 알루미늄 방열판 (좌측/상단) */}
            <rect x="8" y="8" width="8" height="24" rx="1" fill="#475569" stroke="#64748B" strokeWidth="1" />
            <rect x="18" y="8" width="20" height="6" rx="1" fill="#475569" stroke="#64748B" strokeWidth="1" />
            {/* CPU 소켓 브라켓 */}
            <rect x="20" y="16" width="18" height="18" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            <rect x="23" y="19" width="12" height="12" fill="#CBD5E1" />
            {/* 메모리(RAM) 슬롯 2개 */}
            <rect x="42" y="12" width="3" height="26" rx="1" fill="#0284C7" stroke="#38BDF8" strokeWidth="0.8" />
            <rect x="48" y="12" width="3" height="26" rx="1" fill="#0284C7" stroke="#38BDF8" strokeWidth="0.8" />
            {/* 메인보드 칩셋 방열판 */}
            <rect x="40" y="42" width="14" height="14" rx="2" fill="#334155" stroke="#475569" strokeWidth="1" />
            <rect x="43" y="45" width="8" height="8" fill="#1E293B" />
            {/* PCIe 그래픽카드 슬롯 (메탈 실드 아머) */}
            <rect x="10" y="42" width="26" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
            <line x1="12" y1="44.5" x2="34" y2="44.5" stroke="#0F172A" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-sky-400 font-mono tracking-tighter">MAINBOARD</span>
        </div>
      );

    case 'ram':
      // 메모리 RAM (골드 핑거 접점 핀, 방열판, 메모리 칩 모듈)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 1번 램 모듈 (뒤쪽) */}
            <g transform="translate(6, 12)">
              <rect x="0" y="0" width="48" height="18" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />
              {/* RGB 라이트 바 */}
              <rect x="2" y="1" width="44" height="3" rx="1" fill="#EC4899" />
              {/* 골드핑거 접점 */}
              <rect x="4" y="18" width="40" height="3" fill="#F59E0B" />
              <line x1="24" y1="18" x2="24" y2="21" stroke="#0F172A" strokeWidth="1.5" />
            </g>
            {/* 2번 램 모듈 (앞쪽 듀얼채널) */}
            <g transform="translate(10, 24)">
              <rect x="0" y="0" width="48" height="18" rx="2" fill="#0F172A" stroke="#6366F1" strokeWidth="1.2" />
              {/* RGB 라이트 바 */}
              <rect x="2" y="1" width="44" height="3" rx="1" fill="#A855F7" />
              {/* 히트싱크 음각 패턴 */}
              <line x1="12" y1="8" x2="20" y2="8" stroke="#334155" strokeWidth="2" />
              <line x1="28" y1="8" x2="36" y2="8" stroke="#334155" strokeWidth="2" />
              <rect x="20" y="7" width="8" height="4" fill="#6366F1" />
              {/* 골드핑거 접점 */}
              <rect x="4" y="18" width="40" height="3" fill="#F59E0B" />
              <line x1="24" y1="18" x2="24" y2="21" stroke="#0F172A" strokeWidth="1.5" />
            </g>
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-indigo-400 font-mono tracking-tighter">RAM</span>
        </div>
      );

    case 'gpu':
      // 그래픽카드 GPU (듀얼 대형 쿨링팬, 백플레이트, PCIe 골드 슬롯, PCI 브라켓)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 후면 PCI 메탈 브라켓 (출력 포트) */}
            <rect x="6" y="14" width="4" height="36" rx="1" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
            <rect x="4" y="20" width="2" height="6" fill="#475569" />
            <rect x="4" y="30" width="2" height="6" fill="#475569" />
            {/* 그래픽카드 본체 슈라우드 (블랙 메탈) */}
            <rect x="10" y="18" width="48" height="28" rx="3" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            {/* GEFORCE RTX 각인 뱃지 */}
            <rect x="14" y="20" width="16" height="3" rx="0.5" fill="#10B981" />
            {/* 1번 쿨링팬 */}
            <circle cx="24" cy="32" r="9" fill="#1E293B" stroke="#10B981" strokeWidth="1.2" />
            <circle cx="24" cy="32" r="3" fill="#059669" />
            {/* 2번 쿨링팬 */}
            <circle cx="44" cy="32" r="9" fill="#1E293B" stroke="#10B981" strokeWidth="1.2" />
            <circle cx="44" cy="32" r="3" fill="#059669" />
            {/* PCIe 골드 슬롯 단자 */}
            <rect x="16" y="46" width="24" height="3" rx="0.5" fill="#F59E0B" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-emerald-400 font-mono tracking-tighter">GPU</span>
        </div>
      );

    case 'ssd':
      // M.2 NVMe SSD (M.2 2280 직사각형 초록/검정 PCB, 골드 M.2 노치 핀, 낸드 플래시 칩 2개, DRAM 컨트롤러)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-purple-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* M.2 2280 PCB 기판 가로형 */}
            <rect x="6" y="22" width="52" height="20" rx="1.5" fill="#064E3B" stroke="#10B981" strokeWidth="1" />
            {/* 나사 결합 반원 홈 (좌측) */}
            <circle cx="6" cy="32" r="2.5" fill="#0F172A" stroke="#10B981" strokeWidth="1" />
            {/* M.2 골드 핀 단자 (우측) */}
            <rect x="55" y="24" width="3" height="16" fill="#F59E0B" />
            <line x1="55" y1="28" x2="58" y2="28" stroke="#0F172A" strokeWidth="1" />
            {/* 컨트롤러 칩 (은색/검정) */}
            <rect x="14" y="25" width="9" height="14" rx="1" fill="#1E293B" stroke="#A855F7" strokeWidth="1" />
            <rect x="16" y="27" width="5" height="4" fill="#9333EA" />
            {/* DRAM 캐시 칩 */}
            <rect x="25" y="27" width="5" height="10" rx="0.5" fill="#334155" />
            {/* 3D NAND 플래시 메모리 칩 2개 */}
            <rect x="33" y="25" width="9" height="14" rx="1" fill="#0F172A" stroke="#475569" strokeWidth="0.8" />
            <rect x="44" y="25" width="9" height="14" rx="1" fill="#0F172A" stroke="#475569" strokeWidth="0.8" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-purple-400 font-mono tracking-tighter">M.2 SSD</span>
        </div>
      );

    case 'power':
      // 파워서플라이 PSU (블랙 스틸 케이스, 대형 120mm 흡기 팬 그릴, AC 전원 스위치 & 콘센트 홀)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-amber-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 파워 서플라이 블랙 외형 */}
            <rect x="6" y="10" width="52" height="44" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            {/* 80PLUS 인증 골드 뱃지 */}
            <rect x="10" y="14" width="12" height="6" rx="1" fill="#F59E0B" />
            <rect x="12" y="16" width="8" height="2" fill="#78350F" />
            {/* 대형 원형 쿨링팬 그릴 */}
            <circle cx="36" cy="32" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
            <circle cx="36" cy="32" r="10" stroke="#475569" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="36" cy="32" r="4" fill="#D97706" />
            {/* AC 전원 소켓 & 스위치 (좌측) */}
            <rect x="10" y="26" width="10" height="8" rx="1" fill="#020617" stroke="#334155" strokeWidth="1" />
            <rect x="10" y="38" width="6" height="8" rx="1" fill="#DC2626" />
            <line x1="10" y1="42" x2="16" y2="42" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-amber-400 font-mono tracking-tighter">PSU 700W</span>
        </div>
      );

    case 'case':
      // PC 케이스 (파노라마 통유리 어항형 케이스, 내부 RGB 팬 3개, 전원 버튼 I/O)
      return (
        <div className={`${className} rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 border border-slate-700 p-1.5 flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group`}>
          <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow">
            {/* 케이스 미들타워 메탈 프레임 */}
            <rect x="10" y="6" width="44" height="52" rx="3" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            {/* 상단 파워 버튼 & USB 단자 */}
            <circle cx="16" cy="9" r="1.5" fill="#38BDF8" />
            <rect x="20" y="8" width="4" height="2" rx="0.5" fill="#64748B" />
            <rect x="26" y="8" width="4" height="2" rx="0.5" fill="#64748B" />
            {/* 전면/측면 무프레임 통유리 (어항 파노라마 뷰) */}
            <rect x="13" y="13" width="38" height="42" rx="2" fill="#0284C7" fillOpacity="0.15" stroke="#38BDF8" strokeWidth="1" />
            {/* 내부 전면 RGB 흡기 팬 3개 */}
            <circle cx="44" cy="20" r="5" fill="#0F172A" stroke="#EC4899" strokeWidth="1.2" />
            <circle cx="44" cy="33" r="5" fill="#0F172A" stroke="#8B5CF6" strokeWidth="1.2" />
            <circle cx="44" cy="46" r="5" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.2" />
            {/* 내부 그래픽카드 장착 실루엣 */}
            <rect x="16" y="32" width="20" height="4" rx="0.5" fill="#10B981" />
            {/* 하단 파워서플라이 체임버 가림막 */}
            <rect x="13" y="49" width="38" height="6" fill="#1E293B" />
          </svg>
          <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-sky-400 font-mono tracking-tighter">CASE</span>
        </div>
      );

    default:
      return null;
  }
}
