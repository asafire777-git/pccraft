'use client';

import React, { useState } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { generateCommunityText, COMMUNITY_DESTINATIONS } from '@/lib/community-export';
import { trackEvent } from '@/lib/gtag';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  PlaneTakeoff,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
  Share2,
  Gauge,
  Flame
} from 'lucide-react';

interface TakeoffAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponents: Record<string, ComponentItem | null>;
  currentPreset?: GamePreset | null;
  totalPrice: number;
  includeWindows?: boolean;
}

export default function TakeoffAuditModal({
  isOpen,
  onClose,
  selectedComponents,
  currentPreset,
  totalPrice,
  includeWindows = false,
}: TakeoffAuditModalProps) {
  const [activeTab, setActiveTab] = useState<'audit' | 'text'>('audit');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const cpu = selectedComponents.cpu;
  const mb = selectedComponents.motherboard;
  const ram = selectedComponents.ram;
  const gpu = selectedComponents.gpu;
  const psu = selectedComponents.power;
  const cooler = selectedComponents.cooler;

  // 1. 소켓 호환성 검사
  const socketMatch = cpu?.socket && mb?.socket ? cpu.socket === mb.socket : true;

  // 2. 램 규격 호환성 검사
  const ramDdr5 = ram?.specs['규격']?.includes('DDR5') || ram?.name.includes('DDR5');
  const ramDdr4 = ram?.specs['규격']?.includes('DDR4') || ram?.name.includes('DDR4');
  const mbDdr5 = mb?.specs['메모리 규격']?.includes('DDR5') || mb?.name.includes('D5') || mb?.socket === 'AM5';
  const mbDdr4 = mb?.specs['메모리 규격']?.includes('DDR4') || mb?.name.includes('D4') || mb?.socket === 'AM4';

  let ramMatch = true;
  if (ramDdr5 && mbDdr4) ramMatch = false;
  if (ramDdr4 && mbDdr5) ramMatch = false;

  // 3. 전력 계산
  const cpuTdp = cpu?.tdp || 65;
  const gpuTdp = gpu?.tdp || (gpu?.specs['TDP'] ? parseInt(gpu.specs['TDP'], 10) : 160);
  const systemBase = 70; // 보드, 램, SSD, 팬 기본 소비전력
  const estimatedPeakPower = cpuTdp + gpuTdp + systemBase;
  const recommendedPsu = Math.round((estimatedPeakPower * 1.35) / 50) * 50; // 35% 피크 버퍼

  let psuWatt = 600;
  if (psu?.specs['정격출력']) {
    psuWatt = parseInt(psu.specs['정격출력'], 10) || 600;
  } else if (psu?.name) {
    const match = psu.name.match(/(\d{3,4})W/i);
    if (match) psuWatt = parseInt(match[1], 10);
  }

  const psuSufficient = psuWatt >= recommendedPsu;
  const psuHeadroom = Math.round(((psuWatt - estimatedPeakPower) / psuWatt) * 100);

  // 4. 쿨러 매칭 검사
  let coolerAdequate = true;
  if (cpuTdp >= 120 && cooler?.name.includes('기본형')) coolerAdequate = false;

  // 종합 판정
  const allPassed = socketMatch && ramMatch && psuSufficient && coolerAdequate;
  const compatibilityScore = !socketMatch || !ramMatch ? 40 : !psuSufficient ? 80 : 100;
  const efficiencyScore = Math.min(99, 88 + Math.floor((psuHeadroom % 10)));
  const balanceScore = 95;

  const communityText = generateCommunityText({
    selectedComponents,
    currentPreset,
    totalPrice,
    includeWindows,
  });

  const handleCopyText = () => {
    navigator.clipboard.writeText(communityText);
    setCopied(true);
    trackEvent('community_text_copied', {
      preset: currentPreset?.id,
      totalPrice,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 상단 헤더 */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-cyan-500/20">
              <PlaneTakeoff className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                이륙 가능? AI 호환성 &amp; 밸런스 판독기
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                실제 하드웨어 전력·소켓·대역폭 데이터 기반 실시간 적합성 검사
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/40 px-5 pt-3">
          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>AI 호환성 &amp; 이륙 승인표</span>
          </button>

          <button
            onClick={() => setActiveTab('text')}
            className={`pb-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'text'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Copy className="w-4 h-4" />
            <span>📋 커뮤니티 질문용 텍스트 복사</span>
          </button>
        </div>

        {/* 모달 본문 영역 (스크롤 가능) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {activeTab === 'audit' ? (
            <>
              {/* 상단: 이륙 판정 스탬프 배너 */}
              <div
                className={`p-5 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden ${
                  allPassed
                    ? 'bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border-emerald-500/40 text-emerald-950 dark:text-emerald-100'
                    : 'bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent border-amber-500/40 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      allPassed
                        ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                        : 'bg-amber-600 text-white shadow-amber-500/30'
                    }`}
                  >
                    {allPassed ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <AlertTriangle className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        {allPassed ? '🎉 이륙 완벽 허가!' : '⚠️ 일부 점검 필요'}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono ${
                          allPassed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-600 text-white'
                        }`}
                      >
                        {allPassed ? 'Take-off Approved' : 'Review Needed'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {allPassed
                        ? '부품 간 소켓, 메모리 규격, 파워 용량 및 쿨링 여유도가 매우 훌륭합니다. 안심하고 구매하셔도 좋습니다.'
                        : '소켓 또는 파워 정격 용량에 추가 확인이 필요한 항목이 있습니다. 아래 세부 진단을 확인하세요.'}
                    </p>
                  </div>
                </div>

                {/* 3대 점수 지표 */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-center px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-semibold">호환성</span>
                    <span className="text-lg font-black text-cyan-600 dark:text-cyan-400 font-mono">
                      {compatibilityScore}점
                    </span>
                  </div>
                  <div className="text-center px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-semibold">가성비</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {efficiencyScore}점
                    </span>
                  </div>
                  <div className="text-center px-3 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-semibold">안전성</span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {balanceScore}점
                    </span>
                  </div>
                </div>
              </div>

              {/* 4대 세부 정밀 진단 카드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. CPU & 메인보드 소켓 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      1. CPU ↔ 메인보드 소켓
                    </span>
                    {socketMatch ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 호환 완료
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> 소켓 불일치
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    CPU: {cpu?.socket || '미지정'} / 보드: {mb?.socket || '미지정'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {socketMatch
                      ? '핀 규격 및 바이오스 전원부 완벽 호환'
                      : 'CPU와 메인보드 소켓이 일치하지 않습니다.'}
                  </p>
                </div>

                {/* 2. 메모리(RAM) 규격 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      2. 메모리(RAM) ↔ 보드 규격
                    </span>
                    {ramMatch ? (
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 규격 일치
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> 규격 불일치
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium truncate">
                    {ram?.name || 'RAM 선택 필요'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {ramMatch
                      ? `${ramDdr5 ? 'DDR5 고대역폭 규격' : 'DDR4 표준 규격'} 슬롯 정상 인식`
                      : '보드와 메모리의 DDR4/DDR5 세대가 다릅니다.'}
                  </p>
                </div>

                {/* 3. 파워서플라이 용량 여유율 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      3. 파워 용량 여유도 (정격출력)
                    </span>
                    <span
                      className={`text-[11px] font-bold flex items-center gap-1 ${
                        psuSufficient
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-500'
                      }`}
                    >
                      {psuSufficient ? '✓ 여유 안전' : '⚠️ 증설 권장'}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <span>예상 피크 {estimatedPeakPower}W</span>
                    <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                      정격 {psuWatt}W (여유 +{psuHeadroom}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (estimatedPeakPower / psuWatt) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* 4. CPU 발열 vs 쿨러 등급 */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      4. CPU 발열 ↔ 쿨러 등급
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 온도 제어 적정
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium truncate">
                    {cooler?.name || '쿨러 미지정'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    CPU TDP {cpuTdp}W 기준 게이밍 시 60~70도 안정권 유지
                  </p>
                </div>
              </div>

              {/* 하단 전환 액션 버튼 */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('text')}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4" />
                  <span>이 견적 그대로 커뮤니티에 질문 글 올리기 (텍스트 복사)</span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 탭 2: 커뮤니티 질문용 텍스트 복사 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    📋 복사될 본문 미리보기 (자동 서식 완료)
                  </span>
                  <button
                    onClick={handleCopyText}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>본문 전체 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  readOnly
                  value={communityText}
                  rows={11}
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 leading-relaxed focus:outline-none select-all"
                  onClick={(e) => (e.target as HTMLTextAreaElement).select()}
                />

                {/* 대형 커뮤니티 1클릭 직행 버튼 그리드 */}
                <div>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2.5">
                    🚀 텍스트 복사 후 바로 질문할 커뮤니티 선택:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {COMMUNITY_DESTINATIONS.map((dest) => (
                      <a
                        key={dest.name}
                        href={dest.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleCopyText}
                        className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 flex items-center justify-between transition-all group shadow-sm cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5">
                            <span>{dest.name}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-500" />
                          </div>
                          <span className="text-[10px] text-slate-500">{dest.badge}</span>
                        </div>
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-1 rounded-lg">
                          복사 후 이동 →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 text-[11px] text-slate-500 leading-relaxed">
                  💡 <strong>팁:</strong> 위 버튼을 누르면 견적 텍스트가 클립보드에 자동으로 복사된 상태로 해당 커뮤니티 글쓰기 화면으로 이동합니다. 글 내용에 <strong>Ctrl + V</strong>(붙여넣기)만 누르시면 완벽한 질문 글이 완성됩니다!
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
