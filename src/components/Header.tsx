import { Menu, X } from 'lucide-react';
import { Users, Calendar, FileText, FolderOpen, Award, Activity } from 'lucide-react';
import { Section } from '../App';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  availableSections: Section[]; // Thêm dòng này
}

// Trong render, chỉ hiển thị các button của availableSections

const menuItems = [
  { id: 'members' as Section, label: 'Quản lý đảng viên', icon: Users }, 
  { id: 'meetings' as Section, label: 'Sinh hoạt chi bộ', icon: Calendar },
  { id: 'forms' as Section, label: 'Biểu mẫu & Thủ tục', icon: FileText },
  { id: 'documents' as Section, label: 'Kho tài liệu', icon: FolderOpen },
  { id: 'activities' as Section, label: 'Hoạt động', icon: Activity },
  { id: 'recognition' as Section, label: 'Tuyên dương', icon: Award },
];

function Header({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }: HeaderProps) {
  return (
    <header className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-red-800 rounded-lg transition-colors lg:hidden"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <img 
                src="image/logo-cbsv1.png" 
                alt="Logo Chi bộ Sinh viên 1" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Chi bộ Sinh viên 1</h1>
              <p className="text-red-100 text-sm hidden md:block">Đảng bộ Trường Đại học Công nghệ Thông tin, ĐHQG-HCM</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-red-100"></p>
        </div>
      </div>

      {/* Menu ngang */}
      <nav className="border-t border-red-600 px-6">
        <ul className="flex items-center gap-1 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-white text-white bg-red-800'
                      : 'border-transparent text-red-100 hover:text-white hover:bg-red-800'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

export default Header;