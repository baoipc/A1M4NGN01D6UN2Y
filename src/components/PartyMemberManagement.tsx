
import { ExternalLink, Users, FileText, DollarSign, UserPlus } from 'lucide-react';

const managementLinks = [
  {
    title: 'Danh sách đảng viên',
    description: 'Danh sách đầy đủ các đảng viên trong chi bộ',
    icon: Users,
    url: '#',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    title: 'Hồ sơ chuyển Đảng chính thức',
    description: 'Hồ sơ chính thức về việc chuyển Đảng chính thức cho các Đảng viên dự bị',
    icon: FileText,
    url: '#',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    title: 'Hồ sơ phát triển Đảng',
    description: 'Hồ sơ kết nạp đảng viên mới vào chi bộ',
    icon: UserPlus,
    url: '#',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    title: 'Theo dõi đóng đảng phí',
    description: 'Lịch sử đóng đảng phí hàng tháng của đảng viên',
    icon: DollarSign,
    url: '#',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  }
];

function PartyMemberManagement() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đảng viên</h2>
        <p className="text-gray-600">Truy cập hồ sơ và bảng theo dõi đảng viên</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managementLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg border-2 ${link.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    {link.title}
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-red-600" />
                  </h3>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-red-900 mb-2">Lưu ý quan trọng</h3>
        <p className="text-sm text-red-800">
          Tất cả thông tin đảng viên là tài liệu nội bộ. Các liên kết dẫn đến Google Drive/ Google Sheets chỉ dành cho người có quyền truy cập.
        </p>
      </div>
    </div>
  );
}

export default PartyMemberManagement;
