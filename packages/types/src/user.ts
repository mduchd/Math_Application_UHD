export type UserRole = 'STUDENT' | 'TEACHER';

export interface User {
  id: string;
  role: UserRole;
  fullName: string;
  email?: string;
  username?: string;
  avatarMascot?: string;
  avatarUrl?: string;
  googleId?: string;
  gradeLevel?: number; // 1 to 5 for primary school
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface TeacherRegisterInput {
  fullName: string;
  email: string;
  password: string;
  gradeLevel?: number;
}

export interface TeacherLoginInput {
  email: string;
  password: string;
}

export interface StudentRegisterInput {
  fullName: string;
  pin: string;
  username?: string;
  avatarMascot?: string;
  gradeLevel?: number;
}

export interface StudentLoginInput {
  identifier: string; // Username hoặc Full name
  pin: string;
}

export interface GoogleAuthInput {
  credential?: string; // ID token from Google Identity Services
  idToken?: string;
  role?: UserRole;
  gradeLevel?: number;
}
