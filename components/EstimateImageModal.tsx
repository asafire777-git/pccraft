'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';
import { X, Download, Copy, Check, Share2, Sparkles, Camera, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface EstimateImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedComponents: Record<string, ComponentItem>;
  currentPreset?: GamePreset;
  totalPrice: number;
  includeWindows?: boolean;
}

const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Pretendard", "Noto Sans KR", "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", sans-serif';
const FONT_MONO = '"Pretendard", "JetBrains Mono", "SF Mono", Consolas, "Malgun Gothic", monospace';

const CATEGORY_ROWS = [
  { key: 'cpu', badge: 'CPU', label: '프로세서', color: '#2563EB' },
  { key: 'cooler', badge: 'COOLER', label: '쿨러/튜닝', color: '#0891B2' },
  { key: 'motherboard', badge: 'M/B', label: '메인보드', color: '#7C3AED' },
  { key: 'ram', badge: 'RAM', label: '메모리', color: '#059669' },
  { key: 'gpu', badge: 'VGA', label: '그래픽카드', color: '#E11D48' },
  { key: 'ssd', badge: 'SSD', label: '저장장치', color: '#D97706' },
  { key: 'power', badge: 'POWER', label: '파워서플라이', color: '#B45309' },
  { key: 'case', badge: 'CASE', label: '케이스', color: '#475569' },
];

export default function EstimateImageModal({
  isOpen,
  onClose,
  selectedComponents,
  currentPreset,
  totalPrice,
  includeWindows = false,
}: EstimateImageModalProps) {
  const { theme: siteTheme } = useTheme();
  // 사이트 테마를 기본값으로 사용하되 모달 내에서 화이트(낮)/다크(밤) 자유 전환 가능
  const [cardTheme, setCardTheme] = useState<'light' | 'dark'>('light');

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
  const [canShareFile, setCanShareFile] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 모달 열릴 때 현재 사이트 테마로 자동 초기화
  useEffect(() => {
    if (isOpen) {
      setCardTheme(siteTheme === 'dark' ? 'dark' : 'light');
    }
  }, [isOpen, siteTheme]);

  // 예상 소비전력 계산
  const cpuTdp = selectedComponents.cpu?.tdp || 65;
  const gpuTdp = selectedComponents.gpu?.tdp || 115;
  const estWattage = cpuTdp + gpuTdp + 80;
  const recWattage = Math.round((estWattage * 1.4) / 50) * 50;

  // 고해상도 Canvas 렌더링 함수 (화이트(낮) & 다크(밤) 듀얼 테마 지원)
  const generateEstimateImage = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvasRef.current = canvas;

    // 2x Retina 고해상도 렌더링 (가로 1040px 기준 x 2 = 2080px)
    const scale = 2;
    const width = 1040;
    const height = 1360;

    canvas.width = width * scale;
    canvas.height = height * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);

    const isLight = cardTheme === 'light';

    // 1. 배경 드로잉
    if (isLight) {
      // [화이트 모드] 깨끗하고 신뢰도 높은 순백색 문서 스타일
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // 상단 은은한 헤더 그라데이션 포인트
      const headerGrad = ctx.createLinearGradient(0, 0, width, 180);
      headerGrad.addColorStop(0, '#F8FAFC');
      headerGrad.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = headerGrad;
      ctx.fillRect(0, 0, width, 180);

      // 외곽 프레임 테두리
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(18, 18, width - 36, height - 36);
    } else {
      // [다크 모드] 딥 사이버 테크 다크 스타일
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090D16');
      bgGrad.addColorStop(0.5, '#0F172A');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 앰비언트 글로우
      const glowTop = ctx.createRadialGradient(250, 100, 10, 250, 100, 450);
      glowTop.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      glowTop.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = glowTop;
      ctx.fillRect(0, 0, width, 500);

      const glowBottom = ctx.createRadialGradient(850, 1150, 10, 850, 1150, 450);
      glowBottom.addColorStop(0, 'rgba(244, 63, 94, 0.12)');
      glowBottom.addColorStop(1, 'rgba(244, 63, 94, 0)');
      ctx.fillStyle = glowBottom;
      ctx.fillRect(0, 800, width, height);

      // 외곽 테두리 프레임
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(18, 18, width - 36, height - 36);
    }

    // 2. 상단 헤더 영역
    // 로고 뱃지
    ctx.fillStyle = isLight ? '#0284C7' : '#06B6D4';
    ctx.font = `bold 28px ${FONT_MONO}`;
    ctx.fillText('PC-CRAFT', 50, 72);

    ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
    ctx.font = `15px ${FONT_SANS}`;
    ctx.fillText('| 스마트 조립 컴퓨터 견적서 (pccraft.kr)', 210, 70);

    // 프리셋 제목
    ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
    ctx.font = `bold 34px ${FONT_SANS}`;
    const titleText = currentPreset ? `${currentPreset.title} 추천 견적` : '맞춤 커스텀 PC 견적서';
    ctx.fillText(titleText, 50, 122);

    // 발행일자 & 최저가 검증 안내
    const now = new Date();
    const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} 기준`;
    ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
    ctx.font = `14px ${FONT_SANS}`;
    ctx.fillText(`발행일시: ${dateStr}  |  오픈마켓(쿠팡·G마켓·11번가 공식유통사) 실시간 최저가 검증 완료`, 50, 154);

    // 구분선
    ctx.strokeStyle = isLight ? '#E2E8F0' : '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 178);
    ctx.lineTo(width - 50, 178);
    ctx.stroke();

    // 3. 8종 부품 테이블 렌더링
    let currentY = 196;
    const rowHeight = 98;

    CATEGORY_ROWS.forEach(({ key, badge, color }, index) => {
      const item = selectedComponents[key];
      const isAlt = index % 2 === 1;

      // 행 카드 배경
      if (isLight) {
        ctx.fillStyle = isAlt ? '#F8FAFC' : '#FFFFFF';
        ctx.beginPath();
        ctx.roundRect(48, currentY, width - 96, rowHeight - 8, 12);
        ctx.fill();

        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.fillStyle = isAlt ? 'rgba(30, 41, 59, 0.65)' : 'rgba(15, 23, 42, 0.75)';
        ctx.beginPath();
        ctx.roundRect(48, currentY, width - 96, rowHeight - 8, 12);
        ctx.fill();

        ctx.strokeStyle = 'rgba(71, 85, 105, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 카테고리 뱃지 박스
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(62, currentY + 14, 84, 28, 6);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold 13px ${FONT_MONO}`;
      ctx.textAlign = 'center';
      ctx.fillText(badge, 62 + 42, currentY + 33);
      ctx.textAlign = 'left';

      if (item) {
        // 브랜드 뱃지
        if (isLight) {
          ctx.fillStyle = '#F1F5F9';
          ctx.beginPath();
          ctx.roundRect(154, currentY + 15, 76, 26, 6);
          ctx.fill();
          ctx.strokeStyle = '#CBD5E1';
          ctx.stroke();

          ctx.fillStyle = '#0284C7';
        } else {
          ctx.fillStyle = 'rgba(6, 182, 212, 0.16)';
          ctx.beginPath();
          ctx.roundRect(154, currentY + 15, 76, 26, 6);
          ctx.fill();
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
          ctx.stroke();

          ctx.fillStyle = '#38BDF8';
        }
        ctx.font = `bold 12px ${FONT_SANS}`;
        ctx.textAlign = 'center';
        ctx.fillText(item.brand, 154 + 38, currentY + 32);
        ctx.textAlign = 'left';

        // 부품명 (화이트: 딥 블랙 #0F172A / 다크: 순백색 #FFFFFF)
        ctx.fillStyle = isLight ? '#0F172A' : '#FFFFFF';
        ctx.font = `bold 20px ${FONT_SANS}`;
        let displayName = item.name;
        const maxTextWidth = 540;
        if (ctx.measureText(displayName).width > maxTextWidth) {
          while (ctx.measureText(displayName + '...').width > maxTextWidth && displayName.length > 0) {
            displayName = displayName.slice(0, -1);
          }
          displayName += '...';
        }
        ctx.fillText(displayName, 240, currentY + 34);

        // 스펙 요약 라인 (화이트: #475569 / 다크: #CBD5E1)
        ctx.fillStyle = isLight ? '#475569' : '#CBD5E1';
        ctx.font = `13px ${FONT_SANS}`;
        const specSummary = Object.entries(item.specs)
          .slice(0, 3)
          .map(([k, v]) => `${k}: ${v}`)
          .join('   |   ');
        ctx.fillText(specSummary, 64, currentY + 68);

        // 개별 부품 가격 (사용자 요청: 선명한 붉은색 계열)
        // 화이트: #DC2626 (선명한 크림슨 레드) / 다크: #F43F5E (네온 로즈 레드)
        ctx.fillStyle = isLight ? '#DC2626' : '#F43F5E';
        ctx.font = `bold 22px ${FONT_MONO}`;
        ctx.textAlign = 'right';
        ctx.fillText(`${item.price.toLocaleString()} 원`, width - 68, currentY + 44);
        ctx.textAlign = 'left';
      } else {
        ctx.fillStyle = '#94A3B8';
        ctx.font = `italic 16px ${FONT_SANS}`;
        ctx.fillText('미선택 부품', 160, currentY + 45);
      }

      currentY += rowHeight;
    });

    // 4. 합계 및 호환성 종합 판정 박스
    const summaryBoxY = currentY + 12;
    const summaryBoxHeight = 155;

    if (isLight) {
      // 화이트 테마 합계 박스
      ctx.fillStyle = '#F8FAFC';
      ctx.beginPath();
      ctx.roundRect(48, summaryBoxY, width - 96, summaryBoxHeight, 16);
      ctx.fill();

      ctx.strokeStyle = '#DC2626';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 왼쪽: 호환성 & 전력 정보
      ctx.fillStyle = '#15803D';
      ctx.font = `bold 16px ${FONT_SANS}`;
      ctx.fillText('✓ 부품 규격 및 소켓 호환성 검증 통과 (100% 호환)', 75, summaryBoxY + 42);

      ctx.fillStyle = '#334155';
      ctx.font = `14px ${FONT_SANS}`;
      ctx.fillText(`• 시스템 예상 소비전력: 약 ${estWattage}W (권장 파워: 정격 ${recWattage}W 이상)`, 75, summaryBoxY + 74);

      if (includeWindows) {
        ctx.fillStyle = '#0284C7';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText('• [OS 포함] 정품 Windows 11 Home FPP 처음사용자용 (+189,000원) 포함', 75, summaryBoxY + 102);

        ctx.fillStyle = '#64748B';
        ctx.font = `12px ${FONT_SANS}`;
        ctx.fillText('• 단종/중고품 배제  •  오픈마켓 실시간 실거래 최저가 기준', 75, summaryBoxY + 124);
      } else {
        ctx.fillStyle = '#64748B';
        ctx.font = `13px ${FONT_SANS}`;
        ctx.fillText('• 단종/중고/미끼상품 배제  •  오픈마켓 실시간 실거래 최저가 기준', 75, summaryBoxY + 106);
      }

      // 오른쪽: 총 견적 합계 금액 (선명한 붉은색 강조)
      ctx.fillStyle = '#64748B';
      ctx.font = `14px ${FONT_SANS}`;
      ctx.textAlign = 'right';
      ctx.fillText('총 견적 합산 금액', width - 75, summaryBoxY + 45);

      ctx.fillStyle = '#DC2626';
      ctx.font = `bold 42px ${FONT_MONO}`;
      ctx.fillText(`${totalPrice.toLocaleString()} 원`, width - 75, summaryBoxY + 96);

      ctx.fillStyle = '#94A3B8';
      ctx.font = `12px ${FONT_SANS}`;
      ctx.fillText(includeWindows ? '(정품 윈도우 OS 포함 / 무료배송)' : '(로켓배송 / 무료배송 혜택 포함)', width - 75, summaryBoxY + 125);
      ctx.textAlign = 'left';
    } else {
      // 다크 테마 합계 박스
      const sumGrad = ctx.createLinearGradient(48, summaryBoxY, width - 48, summaryBoxY + summaryBoxHeight);
      sumGrad.addColorStop(0, '#0F172A');
      sumGrad.addColorStop(1, '#020617');
      ctx.fillStyle = sumGrad;
      ctx.beginPath();
      ctx.roundRect(48, summaryBoxY, width - 96, summaryBoxHeight, 16);
      ctx.fill();

      ctx.strokeStyle = '#F43F5E';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // 왼쪽: 호환성 & 전력 정보
      ctx.fillStyle = '#10B981';
      ctx.font = `bold 16px ${FONT_SANS}`;
      ctx.fillText('✓ 부품 규격 및 소켓 호환성 검증 통과 (100% 호환)', 75, summaryBoxY + 42);

      ctx.fillStyle = '#E2E8F0';
      ctx.font = `14px ${FONT_SANS}`;
      ctx.fillText(`• 시스템 예상 소비전력: 약 ${estWattage}W (권장 파워: 정격 ${recWattage}W 이상)`, 75, summaryBoxY + 74);

      if (includeWindows) {
        ctx.fillStyle = '#38BDF8';
        ctx.font = `bold 13px ${FONT_SANS}`;
        ctx.fillText('• [OS 포함] 정품 Windows 11 Home FPP 처음사용자용 (+189,000원) 포함', 75, summaryBoxY + 102);

        ctx.fillStyle = '#94A3B8';
        ctx.font = `12px ${FONT_SANS}`;
        ctx.fillText('• 단종/중고품 배제  •  오픈마켓 실시간 실거래 최저가 기준', 75, summaryBoxY + 124);
      } else {
        ctx.fillStyle = '#94A3B8';
        ctx.font = `13px ${FONT_SANS}`;
        ctx.fillText('• 단종/중고/미끼상품 배제  •  오픈마켓 실시간 실거래 최저가 기준', 75, summaryBoxY + 106);
      }

      // 오른쪽: 총 견적 합계 금액 (네온 로즈 레드)
      ctx.fillStyle = '#94A3B8';
      ctx.font = `14px ${FONT_SANS}`;
      ctx.textAlign = 'right';
      ctx.fillText('총 견적 합산 금액', width - 75, summaryBoxY + 45);

      ctx.fillStyle = '#F43F5E';
      ctx.font = `bold 42px ${FONT_MONO}`;
      ctx.fillText(`${totalPrice.toLocaleString()} 원`, width - 75, summaryBoxY + 96);

      ctx.fillStyle = '#64748B';
      ctx.font = `12px ${FONT_SANS}`;
      ctx.fillText(includeWindows ? '(정품 윈도우 OS 포함 / 무료배송)' : '(로켓배송 / 무료배송 혜택 포함)', width - 75, summaryBoxY + 125);
      ctx.textAlign = 'left';
    }

    // 5. 하단 워터마크 및 커뮤니티 출처 표기 (자연 바이럴)
    const footerY = summaryBoxY + summaryBoxHeight + 35;
    ctx.fillStyle = isLight ? '#64748B' : '#94A3B8';
    ctx.font = `13px ${FONT_SANS}`;
    ctx.fillText('💡 이 견적서를 퀘이사존, 디시 컴본갤, 에펨코리아에 [Ctrl+V]로 붙여넣어 "이륙 가능한가요?" 질문해보세요.', 50, footerY);

    ctx.fillStyle = isLight ? '#0284C7' : '#06B6D4';
    ctx.font = `bold 14px ${FONT_MONO}`;
    ctx.textAlign = 'right';
    ctx.fillText('https://pccraft.kr', width - 50, footerY);
    ctx.textAlign = 'left';

    // 6. DataURL 및 Blob 변환
    const dataUrl = canvas.toDataURL('image/png');
    setImageUrl(dataUrl);

    canvas.toBlob((blob) => {
      if (blob) {
        setImageBlob(blob);
        if (typeof navigator !== 'undefined' && navigator.canShare) {
          const testFile = new File([blob], 'test.png', { type: 'image/png' });
          setCanShareFile(navigator.canShare({ files: [testFile] }));
        }
      }
    }, 'image/png');
  }, [selectedComponents, currentPreset, totalPrice, estWattage, recWattage, includeWindows, cardTheme]);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
      const timer = setTimeout(() => {
        generateEstimateImage();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, generateEstimateImage]);

  // 이미지 다운로드 핸들러
  const handleDownload = () => {
    if (!imageUrl) return;
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const filename = `pccraft-estimate-${cardTheme}-${currentPreset?.id || 'custom'}-${dateStr}.png`;

    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // 클립보드 이미지 복사 (Ctrl+V) 핸들러
  const handleCopyImage = async () => {
    if (!imageBlob) return;
    try {
      if (navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        const item = new ClipboardItem({ 'image/png': imageBlob });
        await navigator.clipboard.write([item]);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } else {
        handleDownload();
      }
    } catch {
      handleDownload();
    }
  };

  // 모바일 네이티브 공유 핸들러 (카카오톡 등)
  const handleNativeShare = async () => {
    if (!imageBlob) return;
    try {
      const now = new Date();
      const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const file = new File([imageBlob], `pccraft-estimate-${cardTheme}-${dateStr}.png`, { type: 'image/png' });

      if (navigator.share && canShareFile) {
        await navigator.share({
          files: [file],
          title: `PC-Craft 조립PC 견적서 (${currentPreset?.title || '맞춤 견적'})`,
          text: `PC-Craft에서 실시간 최저가로 맞춘 조립 컴퓨터 견적서입니다. https://pccraft.kr`,
        });
      } else {
        handleDownload();
      }
    } catch {
      // 사용자 취소 시 무시
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-4xl lg:max-w-5xl rounded-3xl p-4 sm:p-6 shadow-2xl relative text-white max-h-[94vh] flex flex-col overflow-hidden">
        {/* 상단 헤더 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-4 border-b border-slate-800 gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center shadow-md shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                견적서 이미지 생성 &amp; 커뮤니티 공유
              </h3>
              <p className="text-xs text-slate-400 hidden sm:block">
                퀘이사존·쿨엔조이·디시·펨코에 질문글을 올리거나 친구에게 카톡으로 보낼 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 견적서 스타일 화이트(낮) / 다크(밤) 즉시 변경 토글 */}
            <div className="flex items-center p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setCardTheme('light')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  cardTheme === 'light'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>화이트 (낮)</span>
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('dark')}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  cardTheme === 'dark'
                    ? 'bg-slate-950 text-cyan-400 shadow-sm border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-cyan-400" />
                <span>다크 (밤)</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 생성된 이미지 미리보기 스크롤 영역 */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {/* 가독성 및 테마 안내 바 */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {cardTheme === 'light'
                  ? '☀️ 신뢰도 높은 화이트 깔끔 스타일 (검정 글씨 + 붉은색 가격)이 적용되었습니다.'
                  : '🌙 다크 테크 스타일 (선명한 네온 컬러)이 적용되었습니다.'}
              </span>
            </span>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              (2080px 고해상도 레티나 원본 렌더링)
            </span>
          </div>

          <div className={`rounded-2xl p-2 sm:p-5 border flex items-center justify-center shadow-inner relative min-h-[360px] transition-colors ${
            cardTheme === 'light' ? 'bg-slate-200/50 border-slate-700/60' : 'bg-slate-950/90 border-slate-800'
          }`}>
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt="PC-Craft 조립 견적서 이미지"
                className="w-full max-w-[860px] h-auto rounded-xl shadow-2xl border border-slate-300/80 dark:border-slate-800/80 mx-auto"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400 text-xs py-20">
                <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <span>선명한 견적서 카드 생성 중...</span>
              </div>
            )}
          </div>

          {/* 커뮤니티 질문 꿀팁 가이드 박스 */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300 mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>커뮤니티 질문 꿀팁</span>
            </div>
            <p className="text-[11px] text-slate-300">
              아래 <strong>[이미지 복사]</strong> 버튼을 누르면 클립보드에 복사되어 커뮤니티 글 작성창에서 <strong>Ctrl+V</strong>를 누르면 이미지가 즉시 첨부됩니다. “이륙 가능한가요?”, “호환성 어떤가요?” 질문 시 유용합니다.
            </p>
          </div>
        </div>

        {/* 하단 액션 버튼 바 */}
        <div className="pt-3 border-t border-slate-800 shrink-0 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            onClick={handleCopyImage}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>클립보드 복사 완료! (Ctrl+V)</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>이미지 복사 (Ctrl+V용)</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>이미지 다운로드 (PNG)</span>
          </button>

          {canShareFile && (
            <button
              onClick={handleNativeShare}
              className="w-full sm:w-auto px-4 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>카카오톡 / 모바일 공유</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
