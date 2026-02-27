'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/components/utils';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  animation?: 'fade-in-up' | 'fade-in';
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  rootMargin?: string;
};

export function ScrollReveal({
  children,
  className,
  animation = 'fade-in-up',
  delay = 0,
  rootMargin = '0px 0px -40px 0px'
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.1, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !inView && 'opacity-0 translate-y-6',
        inView && 'opacity-100 translate-y-0',
        delay && `stagger-${delay}`,
        className
      )}
      style={delay ? { transitionDelay: `${delay * 100}ms` } : undefined}
    >
      {children}
    </div>
  );
}
