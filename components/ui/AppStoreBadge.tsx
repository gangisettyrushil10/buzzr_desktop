import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple } from '@fortawesome/free-brands-svg-icons';

interface AppStoreBadgeProps {
  href: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline';
  className?: string;
}

const SIZES = {
  sm: 'h-11 px-4 gap-2.5',
  md: 'h-12 px-5 gap-3',
  lg: 'h-14 px-6 gap-3.5'
} as const;

const ICON_SIZES = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7'
} as const;

const LABEL_SIZES = {
  sm: { top: 'text-[9px]', bottom: 'text-[13px]' },
  md: { top: 'text-[10px]', bottom: 'text-[15px]' },
  lg: { top: 'text-[11px]', bottom: 'text-[17px]' }
} as const;

/**
 * Apple-style "Download on the App Store" button.
 * Pairs with the Buzzr palette. Solid variant uses the brand emerald.
 */
export function AppStoreBadge({
  href,
  size = 'md',
  variant = 'solid',
  className = ''
}: AppStoreBadgeProps) {
  const base =
    'group inline-flex items-center rounded-md font-sans transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-buzzr-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background';
  const solid =
    'bg-buzzr-accent text-buzzr-onAccent hover:shadow-glow-emerald';
  const outline =
    'border border-white/15 bg-white/[0.03] text-foreground hover:border-buzzr-accent/50 hover:bg-white/[0.06]';

  const labels = LABEL_SIZES[size];

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${SIZES[size]} ${variant === 'solid' ? solid : outline} ${className}`}
    >
      <FontAwesomeIcon icon={faApple} className={ICON_SIZES[size]} aria-hidden />
      <span className="flex flex-col items-start leading-tight">
        <span className={`${labels.top} font-medium uppercase tracking-[0.18em] opacity-80`}>
          Download on the
        </span>
        <span className={`${labels.bottom} font-semibold tracking-tight`}>
          App Store
        </span>
      </span>
    </Link>
  );
}
