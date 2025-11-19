import { Menu, X } from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-red-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12">
              <img 
                src="/image/logo-cbsv1.png" 
                alt="Logo Chi bộ Sinh viên 1" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Chi bộ Sinh viên 1</h1>
              <p className="text-red-100 text-sm">Đảng bộ Trường Đại học Công nghệ Thông tin, ĐHQG-HCM</p>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm text-red-100"></p>
        </div>
      </div>
    </header>
  );
}

export default Header;