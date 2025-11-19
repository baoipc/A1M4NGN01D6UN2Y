import { FolderOpen, ExternalLink, Lock } from 'lucide-react';

const months = [
  { name: 'Tháng 1/2025', docs: 8, url: '#' },
  { name: 'Tháng 2/2025', docs: 6, url: '#' },
  { name: 'Tháng 3/2025', docs: 10, url: '#' },
  { name: 'Tháng 4/2025', docs: 7, url: '#' },
  { name: 'Tháng 5/2025', docs: 9, url: '#' },
  { name: 'Tháng 6/2025', docs: 5, url: '#' },
  { name: 'Tháng 7/2025', docs: 8, url: '#' },
  { name: 'Tháng 8/2025', docs: 11, url: '#' },
  { name: 'Tháng 9/2025', docs: 7, url: '#' },
  { name: 'Tháng 10/2025', docs: 4, url: '#' },
];

const categories = [
  {
    title: 'Văn bản cấp trên',
    description: 'Bao gồm các văn bản: nghị quyết/ quyết định/... được Đảng ủy cấp Trường, cấp ĐHQG và các cấp trên ban hành',
    color: 'bg-red-50 border-red-200 text-red-700',
    url: '#',
  },
  {
    title: 'Nghị quyết Chi bộ',
    description: 'Nghị quyết và quyết định từ các buổi sinh hoạt chi bộ',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    url: '#',
  },
  {
    title: 'Tài liệu học tập',
    description: 'Tài liệu lý luận chính trị và nội dung học tập',
    color: 'bg-green-50 border-green-200 text-green-700',
    url: '#',
  },
  {
    title: 'Hồ sơ hành chính',
    description: 'Một số văn bản nội bộ và tài liệu khác trong chi bộ',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    url: '#',
  },
];

function DocumentRepository() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Kho tài liệu</h2>
        <p className="text-gray-600">Truy cập văn bản theo tháng và phân loại</p>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Phân loại tài liệu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-lg border-2 ${category.color} hover:shadow-md hover:scale-105 transition-all cursor-pointer block`}
            >
              <h4 className="font-bold mb-2">{category.title}</h4>
              <p className="text-xs opacity-80">{category.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FolderOpen size={24} className="text-purple-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Lưu trữ theo tháng</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {months.map((month, index) => (
            <a
              key={index}
              href={month.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg border border-gray-300 group-hover:border-purple-500 transition-colors">
                  <FolderOpen size={20} className="text-gray-600 group-hover:text-purple-700" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{month.name}</h4>
                  <p className="text-xs text-gray-600">{month.docs} tài liệu</p>
                </div>
              </div>
              <ExternalLink size={18} className="text-gray-400 group-hover:text-purple-700" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Lock size={24} className="text-red-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Quy định truy cập</h3>
            <p className="text-sm text-red-800 mb-2">
              Tất cả tài liệu trong kho này là tài liệu nội bộ, chỉ dành cho đảng viên trong chi bộ.
            </p>
            <p className="text-sm text-red-800">
              Các liên kết dẫn đến thư mục Google Drive có phân quyền truy cập. Nếu gặp sự cố, vui lòng liên hệ Chi ủy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentRepository;