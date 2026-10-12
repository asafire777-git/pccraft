import React from 'react';
import { GAME_PRESETS, GamePreset } from '@/data/presets';
import { Gamepad2, Flame, Zap, Crown } from 'lucide-react';

interface GameSelectorProps {
  selectedPresetId: string;
  onSelectPreset: (preset: GamePreset) => void;
}

const ICONS_MAP: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />,
  Flame: <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
  Zap: <Zap className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />,
  Crown: <Crown className="w-5 h-5 text-purple-500 dark:text-purple-400" />
};

export default function GameSelector({ selectedPresetId, onSelectPreset }: GameSelectorProps) {
  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            🎮 게임 & 플레이 용도별 맞춤 프리셋
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            원하는 게임 환경을 선택하시면 검증된 최적의 부품 견적과 완본체 세팅이 원클릭으로 세팅됩니다.
          </p>
        </div>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-2 sm:mt-0">
          실시간 최저가 기준 자동 갱신
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {GAME_PRESETS.map((preset) => {
          const isSelected = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-5 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between group cursor-pointer ${
                isSelected
                  ? 'bg-cyan-50/50 dark:bg-slate-900 border-cyan-500 dark:border-cyan-500 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/50'
                  : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50">
                    {ICONS_MAP[preset.iconName]}
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {preset.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                  {preset.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {preset.performanceDescription}
                </p>

                {/* Target Games Pill List */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {preset.targetGames.map((game) => (
                    <span
                      key={game}
                      className="text-[10px] bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {game}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">예산 가이드</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  {preset.budgetRange}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
