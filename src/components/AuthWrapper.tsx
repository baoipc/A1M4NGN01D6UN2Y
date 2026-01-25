import { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

interface AuthWrapperProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    google?: any;
  }
}

const GOOGLE_CLIENT_ID = '690072405542-bifdg16ikg74tph9tdikr9cmkok9pk8p.apps.googleusercontent.com';

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { user, loading, error, signOut } = useAuth();
  const buttonRenderedRef = useRef(false);

  useEffect(() => {
    if (!buttonRenderedRef.current) {
      const checkGoogleLoaded = setInterval(() => {
        if (window.google && document.getElementById('g_id_signin')) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (window as any).handleSignIn
          });
          window.google.accounts.id.renderButton(
            document.getElementById('g_id_signin'),
            {
              theme: 'outline',
              size: 'large'
            }
          );
          buttonRenderedRef.current = true;
          clearInterval(checkGoogleLoaded);
        }
      }, 100);

      return () => clearInterval(checkGoogleLoaded);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main content */}
      {children}
      
      {/* Hidden Google button for callback */}
      <div id="g_id_signin" style={{ display: 'none' }}></div>
    </div>
  );
}