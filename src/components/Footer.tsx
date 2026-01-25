import { Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-red-800 to-red-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="image/logo-cbsv1.png" 
                alt="Logo" 
                className="w-12 h-12 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h3 className="font-bold text-lg">Chi bộ Sinh viên 1</h3>
                <p className="text-red-200 text-sm">Đảng bộ Trường ĐH CNTT</p>
              </div>
            </div>
            <p className="text-red-100 text-sm leading-relaxed">
              Xây dựng chi bộ trong sạch, vững mạnh, góp phần đào tạo thế hệ sinh viên có bản lĩnh chính trị vững vàng.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 border-b border-red-600 pb-2">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-300 mt-1 flex-shrink-0" />
                <span className="text-red-100">Khu phố 6, Phường Linh Trung, TP. Thủ Đức, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-300 flex-shrink-0" />
                <span className="text-red-100">(028) 372 52002</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-300 flex-shrink-0" />
                <a href="mailto:cbsv1@uit.edu.vn" className="text-red-100 hover:text-white transition-colors">
                  cbsv1@uit.edu.vn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/*責任者 Section */}
      <div className="bg-red-950 border-t border-red-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-red-200 text-sm text-center">
            <span className="font-semibold">Chịu trách nhiệm nội dung:</span> <span className="text-white">Nguyễn Nhật Bằng</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;