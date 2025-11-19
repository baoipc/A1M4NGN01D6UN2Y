
import { Users, Calendar, FileText, FolderOpen, Award, Activity } from 'lucide-react';
import { Section } from '../App';

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  sidebarOpen: boolean;
}

const menuItems = [
  { id: 'members' as Section, label: 'Quản lý đảng viên', icon: Users }, 
  { id: 'meetings' as Section, label: 'Sinh hoạt chi bộ', icon: Calendar },
  { id: 'forms' as Section, label: 'Biểu mẫu & Thủ tục', icon: FileText },
  { id: 'documents' as Section, label: 'Kho tài liệu', icon: FolderOpen },
  { id: 'activities' as Section, label: 'Hoạt động chuyên đề', icon: Activity },
  { id: 'recognition' as Section, label: 'Tuyên dương', icon: Award },
];

function Sidebar({ activeSection, setActiveSection, sidebarOpen }: SidebarProps) {
  if (!sidebarOpen) return null;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto shadow-lg">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-red-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-4">
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-xs text-red-800 font-semibold mb-1">Chỉ dành cho nội bộ</p>
          <p className="text-xs text-gray-600">Chỉ đảng viên được phân quyền mới có thể truy cập</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
