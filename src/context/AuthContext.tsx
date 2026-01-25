import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserInfo {
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: UserInfo | null;
  permissions: string[];
  loading: boolean;
  error: string;
  signOut: () => void;
  checkPermission: (section: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const GOOGLE_CLIENT_ID = '690072405542-bifdg16ikg74tph9tdikr9cmkok9pk8p.apps.googleusercontent.com';
// URL Google Apps Script để kiểm tra quyền
const PERMISSION_CHECK_URL = 'https://script.google.com/macros/s/YOUR_PERMISSION_SCRIPT_URL/exec';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    initializeGoogleAPI();
  }, []);

  const initializeGoogleAPI = () => {
    // Load Google Sign-In
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Tạo callback global
    (window as any).handleSignIn = handleSignIn;
    (window as any).handleSignOut = handleSignOut;

    // Kiểm tra nếu đã đăng nhập trước đó
    checkPreviousLogin();

    setLoading(false);
  };

  const checkPreviousLogin = () => {
    const storedUser = localStorage.getItem('user');
    const storedPermissions = localStorage.getItem('permissions');

    if (storedUser && storedPermissions) {
      try {
        setUser(JSON.parse(storedUser));
        setPermissions(JSON.parse(storedPermissions));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
      }
    }
  };

  const handleSignIn = async (response: any) => {
    try {
      setError('');
      const userinfo = parseJwt(response.credential);

      const userObj = {
        email: userinfo.email,
        name: userinfo.name,
        picture: userinfo.picture
      };

      setUser(userObj);

      // Kiểm tra quyền từ Google Sheets
      await checkUserPermissions(userinfo.email, response.credential);

      // Lưu token để sử dụng sau
      localStorage.setItem('googleToken', response.credential);
      localStorage.setItem('user', JSON.stringify(userObj));
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Lỗi đăng nhập');
    }
  };

  const checkUserPermissions = async (email: string, token: string) => {
    try {
      const response = await fetch(PERMISSION_CHECK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, token })
      });

      if (!response.ok) {
        throw new Error('Không thể kiểm tra quyền');
      }

      const data = await response.json();

      if (data.hasAccess) {
        const userPermissions = data.sections || [];
        setPermissions(userPermissions);
        localStorage.setItem('permissions', JSON.stringify(userPermissions));
      } else {
        setError('Email của bạn không có quyền truy cập');
        setPermissions([]);
        setUser(null);
      }
    } catch (err) {
      console.error('Permission check error:', err);
      setError('Lỗi kiểm tra quyền truy cập');
      setUser(null);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setPermissions([]);
    setError('');
    localStorage.removeItem('user');
    localStorage.removeItem('permissions');
    localStorage.removeItem('googleToken');
  };

  const parseJwt = (token: string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  const checkPermission = (section: string): boolean => {
    if (!user) return false;
    // Các section free không cần kiểm tra quyền
    if (['members', 'recognition'].includes(section)) return true;
    // Các section khác cần kiểm tra
    return permissions.includes(section);
  };

  const signOut = () => {
    handleSignOut();
  };

  return (
    <AuthContext.Provider value={{ user, permissions, loading, error, signOut, checkPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}