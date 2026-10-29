import type { LucideIcon } from 'lucide-react';

export interface SidebarBadge {
  text: string | number;
  variant?: 'amber' | 'emerald' | 'sky' | 'rose' | 'purple' | 'neutral';
}

export interface SidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: SidebarBadge | string | number;
  color?: string;
  activeColor?: string;
}

export interface CurvedSidebarProps {
  items: SidebarNavItem[];
  currentPath: string;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  brandTitle?: string;
  brandSubtitle?: string;
  showMascot?: boolean;
  role?: 'student' | 'teacher';
  onLogout?: () => void;
  className?: string;
}
