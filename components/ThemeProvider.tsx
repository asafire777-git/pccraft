'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved: Theme | null = null;
    try {
      saved = localStorage.getItem('pc_craft_theme') as Theme | null;
    } catch {
      // ignore storage errors
    }

    // 모바일/PC 모두 기본값은 화이트(낮) 모드로 통일
    // 사용자가 수동으로 다크 모드를 선택해 저장한 경우에만 'dark' 적용
    const initial: Theme = saved === 'dark' ? 'dark' : 'light';
    
    setTheme(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('pc_craft_theme', next);
    } catch {
      // ignore storage errors
    }
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
