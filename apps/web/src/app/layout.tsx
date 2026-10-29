import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { MotionProvider } from '@/components/motion/MotionProvider';
import { ThemeScript } from '@/features/theme';
import './globals.css';

// Inter keeps longer Vietnamese learning content crisp and highly legible.
const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

// Plus Jakarta Sans gives screen and section titles a distinctive, polished
// SaaS-style hierarchy without affecting body-text readability.
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Toán Vui | Nền Tảng Học Toán Tiểu Học Thông Minh Tích Hợp AI',
  description: 'Hệ thống học toán vui nhộn, khảo sát đánh giá năng lực tư duy toán học dành cho học sinh tiểu học Lớp 1 - 5',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-body bg-kid-cream dark:bg-[#0B1120] text-kid-dark dark:text-slate-100 antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
