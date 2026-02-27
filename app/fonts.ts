import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const acworth = localFont({
  src: '../public/fonts/Acworth-Bold.otf',
  variable: '--font-acworth',
  display: 'swap'
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

