export type AuthRole = 'student' | 'teacher';

export interface MascotOption {
  id: string;
  icon: string;
  label: string;
}

export const AUTH_MASCOTS: MascotOption[] = [
  { id: 'owl', icon: '🦉', label: 'Cú Bi' },
  { id: 'bear', icon: '🐻', label: 'Gấu Bự' },
  { id: 'rabbit', icon: '🐰', label: 'Thỏ Con' },
  { id: 'lion', icon: '🦁', label: 'Sư Tử' },
  { id: 'panda', icon: '🐼', label: 'Trúc Trúc' },
];
