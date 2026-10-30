'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateWithGoogle } from '@/lib/api';
import { useAppStore } from '@/stores/useAppStore';
import { sound } from '@/lib/sound';

declare global {
  interface Window {
    google?: GoogleIdentityApi;
  }
}

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentityApi {
  accounts: {
    id: {
      initialize: (configuration: {
        client_id: string;
        callback: (response: GoogleCredentialResponse) => void;
      }) => void;
      prompt: () => void;
    };
  };
}

interface GoogleLoginButtonProps {
  role: 'STUDENT' | 'TEACHER';
  onSuccess?: () => void;
  onError?: (error: string) => void;
  redirectPath?: string;
  className?: string;
}

export const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  role,
  onSuccess,
  onError,
  redirectPath,
  className = '',
}) => {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  const handleCredentialResponse = useCallback(async (response: GoogleCredentialResponse) => {
    setLoading(true);
    try {
      const authRes = await authenticateWithGoogle({
        credential: response.credential,
        role,
      });

      setUser(authRes.user);
      sound.playSuccess();

      if (onSuccess) {
        onSuccess();
      } else {
        const destination =
          redirectPath || (authRes.user.role === 'TEACHER' ? '/classes' : '/classroom');
        router.push(destination);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Đăng nhập Google không thành công.';
      if (onError) onError(msg);
    } finally {
      setLoading(false);
    }
  }, [onError, onSuccess, redirectPath, role, router, setUser]);

  const handleFallbackGoogleLogin = async () => {
    // Chế độ demo nhanh khi chưa kích hoạt client ID thực trên Cloud Console
    setLoading(true);
    try {
      sound.playPop();

      // Giả lập ID token JWT định dạng sub.payload.sig hợp lệ cho dev
      const mockPayload = {
        sub: `google_user_${Date.now()}`,
        email: role === 'TEACHER' ? 'giaovien.google@gmail.com' : 'hocsinh.google@gmail.com',
        name: role === 'TEACHER' ? 'Thầy Minh Tuấn (Google)' : 'Bé Bảo Nam (Google)',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
      };
      const fakeToken = `header.${btoa(unescape(encodeURIComponent(JSON.stringify(mockPayload))))}.signature`;

      const authRes = await authenticateWithGoogle({
        credential: fakeToken,
        role,
      });

      setUser(authRes.user);
      sound.playSuccess();

      if (onSuccess) {
        onSuccess();
      } else {
        const destination =
          redirectPath || (authRes.user.role === 'TEACHER' ? '/classes' : '/classroom');
        router.push(destination);
      }
    } catch (err: unknown) {
      if (onError) onError(err instanceof Error ? err.message : 'Lỗi kết nối tài khoản Google');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!clientId || clientId.includes('mock-google-client-id')) return;

    // Load Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [clientId, handleCredentialResponse]);

  const handleButtonClick = () => {
    if (window.google?.accounts?.id && clientId && !clientId.includes('mock-google-client-id')) {
      window.google.accounts.id.prompt();
    } else {
      handleFallbackGoogleLogin();
    }
  };

  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={loading}
      className={`w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border-2 border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-sm transition-all shadow-xs active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {/* Google SVG Icon */}
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        />
      </svg>
      <span>
        {loading
          ? 'Đang kết nối Google...'
          : 'Tiếp tục với Google'}
      </span>
    </button>
  );
};
