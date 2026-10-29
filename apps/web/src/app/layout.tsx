import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { MotionProvider } from '@/components/motion/MotionProvider';
import './globals.css';

// Nunito has a rounded, friendly shape while keeping Vietnamese accents in the
// same typeface as the rest of each word. This avoids mixed-size glyphs in
// headings such as "Bản Đồ Trò Chơi".
const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trường Học Thông Thái | Nền Tảng Học Toán & Kỹ Năng Sống Tiểu Học Tích Hợp AI',
  description: 'Hệ thống học tập, khảo sát đánh giá năng lực và kỹ năng sống sinh động dành cho học sinh tiểu học',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={nunito.variable}>
      <body className="min-h-screen font-body bg-amber-500 text-kid-dark antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
