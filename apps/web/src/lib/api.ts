import type {
  AILearningPlan,
  AssessmentQuestion,
  AuthResponse,
  Classroom,
  ClassroomMember,
  CreateLibraryItemDto,
  GoogleAuthInput,
  GuestAuthInput,
  LibraryItem,
  StudentLoginInput,
  StudentRegisterInput,
  TeacherLoginInput,
  TeacherRegisterInput,
  UpgradeGuestInput,
  User,
} from '@kid-elearning/types';
import Cookies from 'js-cookie';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

const TOKEN_KEY = 'kid_auth_token';
const USER_KEY = 'kid_user';
const GUEST_KEY = 'kid_is_guest';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return Cookies.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || null;
}

export function setStoredAuth(token: string, user: User) {
  if (typeof window === 'undefined') return;
  Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'lax' });
  Cookies.set('kid_user_role', user.role, { expires: 7, sameSite: 'lax' });
  Cookies.set(GUEST_KEY, user.isGuest ? 'true' : 'false', { expires: 7, sameSite: 'lax' });
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredAuth() {
  if (typeof window === 'undefined') return;
  Cookies.remove(TOKEN_KEY);
  Cookies.remove('kid_user_role');
  Cookies.remove(GUEST_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('kid_submission');
  localStorage.removeItem('kid_plan');
}

export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message)
      ? body.message.join(', ')
      : body?.message ?? 'Không thể kết nối tới hệ thống. Vui lòng thử lại.';
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  proficiencyLevel: 'BASIC' | 'APPLIED' | 'ADVANCED';
  review: Array<{
    questionId: string;
    questionText: string;
    selectedOptionId?: string;
    correctOptionId: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  completedAt: string;
}

// --- AUTH APIS ---

export async function authenticateWithGoogle(input: GoogleAuthInput): Promise<AuthResponse> {
  const credential = input.credential || input.idToken;
  if (!credential) {
    throw new Error('Thiếu thông tin xác thực từ Google');
  }

  const res = await request<AuthResponse>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      role: input.role,
      gradeLevel: input.gradeLevel,
    }),
  });

  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function registerTeacher(input: TeacherRegisterInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/register/teacher', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function loginTeacher(input: TeacherLoginInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/login/teacher', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function registerStudent(input: StudentRegisterInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/register/student', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function loginStudent(input: StudentLoginInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/login/student', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function loginAsGuest(input?: GuestAuthInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/guest', {
    method: 'POST',
    body: JSON.stringify(input || {}),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function upgradeGuest(input: UpgradeGuestInput): Promise<AuthResponse> {
  const res = await request<AuthResponse>('/auth/upgrade-guest', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  setStoredAuth(res.accessToken, res.user);
  return res;
}

export async function getMe(): Promise<User> {
  return request<User>('/auth/me');
}

// --- ASSESSMENT & PLANNING APIS ---

export async function getDiagnosticQuestions() {
  return request<AssessmentQuestion[]>('/assessment/questions');
}

export async function createGuestStudent(input: {
  fullName: string;
  avatarMascot: string;
  gradeLevel: number;
}) {
  return request<User>('/users/guest-students', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function submitAssessment(studentId: string, answers: Record<string, string>) {
  return request<{ gradeResult: AssessmentResult; learningPlan: AILearningPlan }>('/assessment/submit', {
    method: 'POST',
    body: JSON.stringify({ studentId, answers }),
  });
}

// --- CLASSROOMS APIS (AUTHENTICATED) ---

export async function getMyTeacherClasses(): Promise<Classroom[]> {
  return request<Classroom[]>('/classrooms/teacher/my-classes');
}

export async function createTeacherClass(name: string, gradeLevel: number = 3): Promise<Classroom> {
  return request<Classroom>('/classrooms', {
    method: 'POST',
    body: JSON.stringify({ name, gradeLevel }),
  });
}

export async function getClassMembers(classroomId: string): Promise<ClassroomMember[]> {
  return request<ClassroomMember[]>(`/classrooms/${classroomId}/members`);
}

export async function reviewClassMember(
  memberId: string,
  action: 'APPROVE' | 'REJECT',
): Promise<ClassroomMember> {
  return request<ClassroomMember>(`/classrooms/members/${memberId}/review`, {
    method: 'PATCH',
    body: JSON.stringify({ action }),
  });
}

export async function studentJoinClass(joinCode: string): Promise<ClassroomMember> {
  return request<ClassroomMember>('/classrooms/join', {
    method: 'POST',
    body: JSON.stringify({ joinCode }),
  });
}

export async function getMyStudentClasses(): Promise<
  Array<{
    membershipId: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    requestedAt: string;
    approvedAt?: string;
    classroom: {
      id: string;
      name: string;
      gradeLevel: number;
      joinCode: string;
      teacherName: string;
    };
  }>
> {
  return request('/classrooms/student/my-classes');
}

export async function getTeacherAnalytics(): Promise<{
  totalClasses: number;
  totalStudents: number;
  totalSubmissions: number;
  avgScore: number;
  completionRate: number;
  levels: Array<{ name: string; count: number; percent: string; color: string }>;
  recentSubmissions: Array<{
    id: string;
    studentId: string;
    score: number;
    proficiencyLevel: string;
    completedAt: string;
  }>;
}> {
  return request('/classrooms/teacher/analytics');
}

export async function seedDemoClass(): Promise<{ success: boolean; message: string; classroomId: string }> {
  return request('/classrooms/teacher/seed-demo', {
    method: 'POST',
  });
}

// --- LIBRARY APIS (AUTHENTICATED) ---

export async function getPublicLibraryItems(): Promise<LibraryItem[]> {
  return request<LibraryItem[]>('/library/public');
}

export async function getMyLibraryItems(): Promise<LibraryItem[]> {
  return request<LibraryItem[]>('/library/my-items');
}

export async function createLibraryItem(dto: CreateLibraryItemDto): Promise<LibraryItem> {
  return request<LibraryItem>('/library', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}

export async function toggleLibraryItemVisibility(itemId: string): Promise<LibraryItem> {
  return request<LibraryItem>(`/library/${itemId}/toggle-visibility`, {
    method: 'PATCH',
  });
}
