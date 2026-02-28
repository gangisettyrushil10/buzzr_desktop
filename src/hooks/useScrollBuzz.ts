'use client';

import { useEffect, useRef } from 'react';
import { playBuzzSound } from '@/src/lib/audio';

export function useScrollBuzz(options = { threshold: 0.2 }) {
  const isInitialLoad = useRef(true);

  useEffect(() => {
    setTimeout(() => {
      isInitialLoad.current = false;
    }, 1000); // 1 second grace period to avoid buzzing on load

    const observer = new IntersectionObserver((entries) => {
      let shouldBuzz = false;
      entries.forEach((entry) => {
        if (!isInitialLoad.current && entry.isIntersecting) {
          shouldBuzz = true;
        }
      });
      
      if (shouldBuzz) {
        playBuzzSound();
      }
    }, options);

    const elements = document.querySelectorAll('[data-buzz-section]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [options.threshold]);
}
