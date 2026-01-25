import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthWrapper from './components/AuthWrapper';
import Header from './components/Header';
import PartyMemberManagement from './components/PartyMemberManagement';
import MonthlyMeetings from './components/MonthlyMeetings';
import FormsProcedures from './components/FormsProcedures';
import DocumentRepository from './components/DocumentRepository';
import SpecialActivities from './components/SpecialActivities';
import Recognition from './components/Recognition';
import Footer from './components/Footer';
import { Lock } from 'lucide-react';

export type Section = 'members' | 'meetings' | 'forms' | 'documents' | 'activities' | 'recognition';

// Các section không cần auth
const PUBLIC_SECTIONS: Section[] = ['members', 'recognition', 'activities'];

// Trang preview cho những section cần auth
function LockedSectionPreview({ section }: { section: Section }) {
  const sectionInfo: Record<Section, { title: string; description: string }> = {
    members: { title: 'Quản lý đảng viên', description: '' },
    meetings: { 
      title: 'Tháng sinh hoạt', 
      description: 'Xem chi tiết các cuộc họp, sinh hoạt và kế hoạch tháng của chi bộ.' 
    },
    forms: { 
      title: 'Biểu mẫu & Thủ tục', 
      description: 'Truy cập các biểu mẫu, thủ tục và hướng dẫn nội bộ của chi bộ.' 
    },
    documents: { 
      title: 'Kho tài liệu', 
      description: 'Lưu trữ và tìm kiếm các tài liệu, quy định và hướng dẫn từ chi bộ.' 
    },
    activities: { 
      title: 'Hoạt động đặc biệt', 
      description: 'Xem chi tiết các hoạt động tình nguyện, về nguồn và sự kiện đặc biệt.' 
    },
    recognition: { title: 'Khen thưởng', description: '' }
  };

  const info = sectionInfo[section];

  const handleSignInClick = () => {
    // Tìm và click button Google Sign-In
    const googleButton = document.querySelector('[role="button"]') as HTMLElement;
    if (googleButton) {
      googleButton.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <Lock size={48} className="mx-auto text-amber-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h2>
        
        {info.description && (
          <p className="text-gray-600 mb-6">{info.description}</p>
        )}

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 font-medium">
            🔒 Yêu cầu xác thực
          </p>
          <p className="text-xs text-blue-700 mt-2">
            Để xem thông tin chi tiết của section này, vui lòng đăng nhập bằng tài khoản Google được cấp quyền.
          </p>
        </div>

        <button
          onClick={handleSignInClick}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors mb-3"
        >
          Đăng nhập ngay
        </button>

        <p className="text-xs text-gray-500">
          Hoặc sử dụng nút đăng nhập ở trên cùng bên phải
        </p>
      </div>
    </div>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState<Section>('members');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, checkPermission } = useAuth();

  const renderContent = () => {
    // Nếu section không cần auth, hiển thị bình thường
    if (PUBLIC_SECTIONS.includes(activeSection)) {
      switch (activeSection) {
        case 'members':
          return <PartyMemberManagement />;
        case 'recognition':
          return <Recognition />;
        case 'activities':
          return <SpecialActivities />;
        default:
          return <PartyMemberManagement />;
      }
    }

    // Nếu section cần auth
    if (!checkPermission(activeSection)) {
      // Chưa authorize hoặc không có quyền → hiển thị preview
      return <LockedSectionPreview section={activeSection} />;
    }

    // Đã authorize và có quyền → hiển thị component đầy đủ
    switch (activeSection) {
      case 'meetings':
        return <MonthlyMeetings />;
      case 'forms':
        return <FormsProcedures />;
      case 'documents':
        return <DocumentRepository />;
      case 'activities':
        return <SpecialActivities />;
      default:
        return <PartyMemberManagement />;
    }
  };

  // Lọc menu: ẩn những section cần auth nếu chưa authorize
  const getVisibleSections = (): Section[] => {
    const allSections: Section[] = ['members', 'meetings', 'forms', 'documents', 'activities', 'recognition'];
    return allSections.filter(section => {
      // Section public luôn hiển thị
      if (PUBLIC_SECTIONS.includes(section)) return true;
      // Section khác chỉ hiển thị nếu đã authorize
      return user !== null;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AuthWrapper>
        <Header 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          availableSections={getVisibleSections()}
        />

        <main className="flex-1">
          {renderContent()}
        </main>

        <Footer />
      </AuthWrapper>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;