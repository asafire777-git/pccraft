'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { decodeQuoteFromParams } from '@/lib/share';
import { ComponentItem } from '@/data/components';
import { GamePreset } from '@/data/presets';

interface QuoteUrlSyncProps {
  onRestore: (components: Record<string, ComponentItem>, preset?: GamePreset) => void;
}

export default function QuoteUrlSync({ onRestore }: QuoteUrlSyncProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const restored = decodeQuoteFromParams(searchParams);
    if (restored && (restored.preset || restored.components)) {
      onRestore(restored.components || {}, restored.preset);
    }
  }, [searchParams, onRestore]);

  return null;
}
