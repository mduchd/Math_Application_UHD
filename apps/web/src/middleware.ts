import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('kid_auth_token')?.value;
  const role = request.cookies.get('kid_user_role')?.value;
  const isGuest = request.cookies.get('kid_is_guest')?.value === 'true';

  const isTeacherRoute =
    pathname.startsWith('/classes') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/students');

  const isStudentRoute =
    pathname.startsWith('/classroom') ||
    pathname.startsWith('/plan') ||
    pathname.startsWith('/games') ||
    pathname.startsWith('/lessons') ||
    pathname.startsWith('/library') ||
    pathname.startsWith('/life-skills');

  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  // Đang vào trang auth nhưng đã đăng nhập tài khoản chính thức (không phải khách trải nghiệm)
  if (isAuthRoute && token && !isGuest) {
    if (role === 'TEACHER') {
      return NextResponse.redirect(new URL('/classes', request.url));
    }
    return NextResponse.redirect(new URL('/classroom', request.url));
  }

  // Bảo vệ route Giáo viên
  if (isTeacherRoute) {
    if (!token || role !== 'TEACHER') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'teacher');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Bảo vệ route Học sinh (cần token)
  if (isStudentRoute) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'student');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/classes/:path*',
    '/analytics/:path*',
    '/students/:path*',
    '/classroom/:path*',
    '/plan/:path*',
    '/games/:path*',
    '/lessons/:path*',
    '/library/:path*',
    '/life-skills/:path*',
    '/login',
    '/register',
  ],
};
