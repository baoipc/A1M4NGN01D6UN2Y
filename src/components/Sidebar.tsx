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
    <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-28 h-[calc(100vh-7rem)] overflow-y-auto shadow-lg lg:hidden z-40">
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
    </aside>
  );
}

export default Sidebar;