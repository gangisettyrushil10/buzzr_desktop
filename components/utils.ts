import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Rgb = { r: number; g: number; b: number };

function hexToRgb(hex: string): Rgb | null {
  const raw = hex.replace('#', '').trim();
  const normalized =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => char + char)
          .join('')
      : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16)
  };
}

function channelToLinear(value: number) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function contrastRatio(foreground: Rgb, background: Rgb) {
  const foregroundLuminance =
    0.2126 * channelToLinear(foreground.r) +
    0.7152 * channelToLinear(foreground.g) +
    0.0722 * channelToLinear(foreground.b);
  const backgroundLuminance =
    0.2126 * channelToLinear(background.r) +
    0.7152 * channelToLinear(background.g) +
    0.0722 * channelToLinear(background.b);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export function readableTextColor(
  backgroundHex: string,
  darkHex = '#07140a',
  lightHex = '#ffffff'
) {
  const background = hexToRgb(backgroundHex);
  const dark = hexToRgb(darkHex);
  const light = hexToRgb(lightHex);

  if (!background || !dark || !light) {
    return lightHex;
  }

  return contrastRatio(dark, background) >= contrastRatio(light, background)
    ? darkHex
    : lightHex;
}
