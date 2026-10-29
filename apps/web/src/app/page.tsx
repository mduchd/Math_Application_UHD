import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { InteractiveQuizDemo } from '@/components/landing/InteractiveQuizDemo';
import { BentoFeatures } from '@/components/landing/BentoFeatures';
import { CurriculumTabs } from '@/components/landing/CurriculumTabs';
import { TeacherSection } from '@/components/landing/TeacherSection';
import { GamificationRanks } from '@/components/landing/GamificationRanks';
import { TestimonialsStats } from '@/components/landing/TestimonialsStats';
import { PricingSection } from '@/components/landing/PricingSection';
import { FaqAccordion } from '@/components/landing/FaqAccordion';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingBackToTop } from '@/components/landing/LandingBackToTop';
import { LandingAIChatbot } from '@/components/landing/LandingAIChatbot';

export const metadata = {
  title: 'Trường Học Thông Thái | Nền Tảng Học Toán & Kỹ Năng Sống Tiểu Học Tích Hợp AI',
  description:
    'Nền tảng học tập thông minh cho học sinh cấp Tiểu học (Lớp 1 - 5). Tích hợp Toán học trực quan, Kỹ năng sống an toàn, Gia sư AI DeepSeek và Không gian quản lý lớp học cho giáo viên.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-amber-500 flex flex-col font-body text-slate-800 selection:bg-amber-300 selection:text-amber-950">
      {/* 1. Header & Navigation */}
      <LandingNavbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Interactive Quiz Demo (0-Click Trial with Audio & Confetti) */}
      <InteractiveQuizDemo />

      {/* 4. 4 Pillars Bento Grid (Math, Life Skills, AI, Gamification) */}
      <BentoFeatures />

      {/* 5. Grade Curriculum Tabs (Lớp 1 - 5) */}
      <CurriculumTabs />

      {/* 6. Teacher Workspace & Class Management */}
      <TeacherSection />

      {/* 7. Gamification Ranks & Mascot Dressing */}
      <GamificationRanks />

      {/* 8. Social Proof: Testimonials & Stats Counter */}
      <TestimonialsStats />

      {/* 9. SaaS Pricing Plans (Free, Family Pro, School Pro) */}
      <PricingSection />

      {/* 10. Interactive FAQ Accordion */}
      <FaqAccordion />

      {/* 11. Final Call To Action & Footer */}
      <LandingFooter />

      {/* 12. Floating Back To Top Button */}
      <LandingBackToTop />

      {/* 13. Interactive Mascot AI Chatbot with Fullscreen Mode */}
      <LandingAIChatbot />
    </main>
  );
}
