import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { AppLogo } from '@/components/kid/AppLogo';

const studentLinks = [
  { href: '/assessment', label: 'Bài khảo sát khởi động' },
  { href: '/login?role=student', label: 'Nhập mã PIN vào lớp' },
  { href: '/games', label: 'Trò chơi Toán và kỹ năng' },
  { href: '/library', label: 'Thư viện bài học' },
];

const educatorLinks = [
  { href: '/classes', label: 'Quản lý lớp học và cấp mã PIN' },
  { href: '/analytics', label: 'Báo cáo tiến độ học tập' },
  { href: '/register?role=teacher', label: 'Đăng ký tài khoản giáo viên' },
  { href: '/login', label: 'Đăng nhập cổng sư phạm' },
];

const companyLinks = [
  { href: '#bang-gia', label: 'Bảng giá và gói trường học' },
  { href: '#hoi-dap', label: 'Trung tâm trợ giúp' },
  { href: '/terms', label: 'Điều khoản dịch vụ' },
  { href: '/privacy', label: 'Chính sách bảo mật trẻ em' },
];

type FooterLinkListProps = {
  headingId: string;
  title: string;
  links: { href: string; label: string }[];
};

const FooterLinkList: React.FC<FooterLinkListProps> = ({ headingId, title, links }) => (
  <section aria-labelledby={headingId}>
    <h3
      id={headingId}
      className="font-display text-sm font-black uppercase tracking-[0.08em] text-white"
    >
      {title}
    </h3>
    <ul className="mt-4 space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm font-bold text-slate-200 transition-colors hover:text-amber-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <section aria-label="Giới thiệu Toán Vui" className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <AppLogo size="sm" variant="icon" />
              <span className="font-display text-xl font-black tracking-tight text-white">Toán Vui</span>
            </Link>
            <p className="mt-5 text-sm font-semibold leading-relaxed text-slate-200">
              Nền tảng học Toán và kỹ năng sống cho học sinh tiểu học Việt Nam.
            </p>
            <div className="mt-5 flex items-start gap-2 text-sm font-bold leading-relaxed text-slate-200">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-300" strokeWidth={2} aria-hidden="true" />
              <span>An toàn và bảo mật thông tin dành cho trẻ em.</span>
            </div>
          </section>

          <FooterLinkList headingId="footer-students" title="Học sinh" links={studentLinks} />
          <FooterLinkList headingId="footer-educators" title="Thầy cô và phụ huynh" links={educatorLinks} />
          <FooterLinkList headingId="footer-services" title="Dịch vụ" links={companyLinks} />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm font-semibold text-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Toán Vui. Bảo lưu mọi quyền.</p>
          <a
            href="mailto:support@kidelearning.vn"
            className="w-fit font-bold text-white underline decoration-slate-500 underline-offset-4 transition-colors hover:text-amber-300 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            support@kidelearning.vn
          </a>
        </div>
      </div>
    </footer>
  );
};
