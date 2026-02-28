'use client';

import { useScrollBuzz } from '@/src/hooks/useScrollBuzz';

export function ScrollAudioTrigger() {
  useScrollBuzz({ threshold: 0.2 });
  return null;
}
