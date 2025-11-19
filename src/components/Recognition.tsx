
import { Award, Star, Trophy, Medal, TrendingUp, Users, Heart , TrophyIcon} from 'lucide-react';
import React, { useState } from "react";
import { X } from "lucide-react";

type dutiesByYear = {
  [year: number]: { name: string; department: string }[];
};

const yearlyDuties: dutiesByYear = {
  2024: [
    { name: 'Nguyễn Nhật Bằng', department: 'Bí thư Chi bộ' },
    { name: 'Danh Nguyễn Thành Thắng', department: 'Phó Bí thư Chi bộ, SV khoa KTMT' },
    { name: 'Nguyễn Hiền My', department: 'Chi ủy viên Chi bộ, SV khoa KTMT' },
    { name: 'Phạm Thái Bảo', department: 'Đảng viên, SV khoa MMT&TT' },
    { name: 'Bùi Đăng Huy', department: 'Đảng viên, SV khoa KTMT' },
    { name: 'Dương Trần Trà My', department: 'Đảng viên, SV khoa MMT&TT' },
    { name: 'Nguyễn Đình Khang', department: 'Đảng viên, SV khoa MMT&TT' },
  ],

  2023: [
    { name: 'ABC', department: 'Chi ủy viên ...' },
    { name: 'DEF', department: 'Đảng viên ...' },
  ],
};


const certificates = [
  // === Thành tích chung của chi bộ ===
  {
    category: 'Chi bộ Dân vận khéo',
    awardedBy: 'Đảng bộ Trường Đại học Công nghệ Thông tin, ĐHQG-HCM',
    recipients: [], // không cần liệt kê cá nhân
    year: 2024,
    icon: Award,
    color: 'bg-red-50 border-red-200 text-red-700',
  },
  {
    category: 'Chi bộ Tiên phong về nghiên cứu',
    awardedBy: 'Đảng bộ Trường Đại học Công nghệ Thông tin, ĐHQG-HCM',
    recipients: [],
    year: 2023,
    icon: Award,
    color: 'bg-red-50 border-red-200 text-red-700',
  },

  // === Thành tích cá nhân Đảng viên ===
  {
    category: 'Đảng viên hoàn thành xuất sắc nhiệm vụ',
    awardedBy: 'Đảng bộ Trường Đại học Công nghệ Thông tin, ĐHQG-HCM',
    recipients: ['Nguyễn Nhật Bằng', 'Danh Nguyễn Thành Thắng', 'Nguyễn Hiền My'],
    year: 2024,
    icon: Star,
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  },
  {
    category: 'Thanh niên Tiên tiến Làm theo lời Bác',
    awardedBy: 'Đoàn trường Đại học Công nghệ Thông tin, ĐHQG-HCM',
    recipients: ['Danh Nguyễn Thành Thắng', 'Phạm Thái Bảo'],
    year: 2024,
    icon: Trophy,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    category: 'Đảng viên tích cực tham gia tình nguyện',
    awardedBy: 'Chi đoàn Sinh viên CNTT',
    recipients: ['Bùi Đăng Huy', 'Dương Trần Trà My', 'Nguyễn Đình Khang'],
    year: 2024,
    icon: Trophy,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
];

type Achievement = {
  title: string;
  description: string;
  year: number;
};

type Individual = {
  name: string;
  image: string;
  achievements: Achievement[];
};

const individuals: Individual[] = [
  {
    name: "Danh Nguyễn Thành Thắng",
    image: "/image/PhamThaiBao.jpg",
    achievements: [
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích tình nguyện", description: "Đóng góp chương trình XYZ", year: 2024 },
    ],
  },
  {
    name: "Danh Nguyễn Thành Thắng",
    image: "/images/danh-nguyen.jpg",
    achievements: [
      { title: "Thanh niên Tiên tiến", description: "Hoạt động phong trào", year: 2024 },
    ],
  },
  {
    name: "Danh Nguyễn Thành Thắng",
    image: "/images/pham-thai-bao.jpg",
    achievements: [
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích tình nguyện", description: "Đóng góp chương trình XYZ", year: 2024 },
    ],
  },
  {
    name: "Danh Nguyễn Thành Thắng",
    image: "/images/pham-thai-bao.jpg",
    achievements: [
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích tình nguyện", description: "Đóng góp chương trình XYZ", year: 2024 },
    ],
  },
  {
    name: "Danh Nguyễn Thành Thắng",
    image: "/images/pham-thai-bao.jpg",
    achievements: [
      { title: "Thành tích nghiên cứu", description: "Bài báo quốc tế ABC", year: 2024 },
      { title: "Thành tích tình nguyện", description: "Đóng góp chương trình XYZ", year: 2024 },
    ],
  },
];

function Recognition() {
  const [openYear, setOpenYear] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Individual | null>(null);


  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tuyên dương & Khen thưởng</h2>
        <p className="text-gray-600">Ghi nhận sự nỗ lực và thành tích của các đảng viên</p>
      </div>

      <div className="mb-8">
        {/* Khung tổng thể */}
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-md">
          {/* Tiêu đề chung */}
          <div className="flex items-center gap-3 mb-6">
            <TrophyIcon size={28} className="text-green-700" />
            <h3 className="text-xl font-bold text-gray-900">Giấy khen & Danh hiệu</h3>
          </div>

          <div className="space-y-4">
            {/* Phần 1: Thành tích chung của chi bộ */}
            <div className="bg-yellow-50 rounded-lg border-2 border-yellow-200 p-4">
              <button
                onClick={() => setOpenCategory(openCategory === 'chiBo' ? null : 'chiBo')}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-700" />
                  Thành tích chung của chi bộ
                </div>
                {openCategory === 'chiBo' ? '▲' : '▼'}
              </button>

              {openCategory === 'chiBo' && (
                <div className="mt-3 space-y-2">
                  {certificates
                    .filter(cert => cert.recipients.length === 0)
                    .map((cert, idx) => {
                      const Icon = cert.icon;
                      return (
                        <div key={idx} className={`p-4 rounded-lg border ${cert.color}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <Icon size={24} />
                            <h4 className="font-bold">{cert.category}</h4>
                          </div>
                          <p className="text-sm opacity-80">Trao tặng bởi: {cert.awardedBy}</p>
                          <p className="text-xs opacity-70 mt-1">Năm: {cert.year}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>

            {/* Phần 2: Thành tích nổi bật cá nhân */}
            <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-4">
              <button
                onClick={() => setOpenCategory(openCategory === 'caNhan' ? null : 'caNhan')}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Trophy size={20} className="text-blue-700" />
                  Thành tích nổi bật cá nhân
                </div>
                {openCategory === 'caNhan' ? '▲' : '▼'}
              </button>

              {openCategory === 'caNhan' && (
                <div className="mt-3 space-y-2">
                  {certificates
                    .filter(cert => cert.recipients.length > 0)
                    .map((cert, idx) => {
                      const Icon = cert.icon;
                      return (
                        <div key={idx} className={`p-4 rounded-lg border ${cert.color}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <Icon size={24} />
                            <h4 className="font-bold">{cert.category}</h4>
                          </div>
                          <p className="text-sm opacity-80 mb-2">Trao tặng bởi: {cert.awardedBy}</p>
                          <p className="text-sm font-semibold mb-1">
                            Số lượng: {cert.recipients.length} đồng chí
                          </p>
                          <div className="space-y-1">
                            {cert.recipients.map((recipient, ridx) => (
                              <p key={ridx} className="text-sm font-semibold">• {recipient}</p>
                            ))}
                          </div>
                          <p className="text-xs opacity-70 mt-2">Năm: {cert.year}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Award size={24} className="text-green-700" />
            <h3 className="text-xl font-bold text-gray-900">
              Thống kê Đảng viên Hoàn thành xuất sắc nhiệm vụ qua các năm
            </h3>
          </div>

          <div className="relative pl-0 space-y-6">
            {Object.keys(yearlyDuties)
              .sort((a, b) => Number(b) - Number(a))   // 👈 sửa chỗ này
              .map((year) => (
                <div key={year}>
                  {/* Button toggle theo năm */}
                  <button
                    onClick={() => setOpenYear(openYear === year ? null : year)}
                    className="flex items-center justify-between w-full bg-green-100 px-4 py-2 rounded-lg mb-4 hover:bg-green-200 transition"
                  >
                    <span className="text-green-800 font-bold">
                      Năm {year} — {yearlyDuties[Number(year)].length} Đảng viên hoàn thành xuất sắc nhiệm vụ
                    </span>
                    {openYear === year ? "▲" : "▼"}
                  </button>

                  {/* Danh sách xổ ra */}
                  {openYear === year &&
                    yearlyDuties[Number(year)].map((member, index) => (
                      <div key={index} className="relative mb-6">
                        <div className="absolute -left-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <Star size={14} className="text-white" />
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
                          <h4 className="text-lg font-bold text-green-800">{member.name}</h4>
                          <p className="text-sm text-gray-700">{member.department}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Đảng viên nổi bật</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {individuals.map((ind, idx) => (
            <div
              key={idx}
              className="text-center cursor-pointer"
              onClick={() => setSelected(ind)}
            >
              <img
                src={ind.image}
                alt={ind.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-green-600 mx-auto mb-2"
              />
              <p className="font-semibold truncate">{ind.name}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full h-3/4 flex relative">
              {/* Nút đóng */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 z-10"
              >
                <X size={24} />
              </button>

              {/* Cột ảnh bên trái */}
              <div className="w-1/2 flex items-center justify-center bg-gray-100 rounded-l-lg overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="h-full object-cover"
                />
              </div>

              {/* Cột thông tin & thành tích bên phải */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{selected.name}</h2>
                

                <h3 className="text-xl font-semibold mb-2">Thành tích tiêu biểu</h3>
                <div className="space-y-3">
                  {selected.achievements.map((ach, idx) => (
                    <div key={idx} className="p-3 border rounded-lg bg-green-50">
                      <h4 className="font-bold">{ach.title} ({ach.year})</h4>
                      <p className="text-gray-700 text-sm">{ach.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>




      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Trophy size={24} className="text-yellow-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Chương trình tuyên dương</h3>
            <p className="text-sm text-gray-800">
              Chi bộ ghi nhận những đóng góp nổi bật trong công tác, nghiên cứu, lãnh đạo và rèn luyện tư tưởng. Các đảng viên hoàn thành tốt nhiệm vụ năm là tấm gương tiêu biểu. Việc đề cử khen thưởng được xét duyệt hàng quý bởi chi ủy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recognition;
