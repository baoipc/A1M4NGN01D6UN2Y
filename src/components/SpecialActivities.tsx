
import { Calendar, MapPin, Users, Heart, ExternalLink } from 'lucide-react';

const activities = [
  {
    title: 'Tham quan Bảo tàng Lịch sử Hồ Chí Minh',
    date: '19/05/2025',
    location: 'Bảo tàng Lịch sử Hồ Chí Minh',
    participants: 24,
    image: 'https://images.pexels.com/photos/2901212/pexels-photo-2901212.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Chi bộ tổ chức chuyến tham quan học tập tại Bảo tàng Lịch sử Hồ Chí Minh. Các đảng viên đã thảo luận sâu sắc về lịch sử đấu tranh và ý nghĩa hiện đại của lý tưởng Đảng.',
    tags: ['Giáo dục', 'Lịch sử', 'Gắn kết'],
    url: '#',
  },
  {
    title: 'Tham quan Dinh độc Lập',
    date: '30/04/2025',
    location: 'Dinh Độc Lập',
    participants: 18,
    image: 'https://images.pexels.com/photos/6646851/pexels-photo-6646851.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Đảng viên tham tham quan Dinh độc lập và tìm hiểu về chiến thắng lịch sử 30/4/1975',
    tags: ['Giáo dục', 'Lịch sử', 'Gắn kết'],
    url: '#',
  },
  {
    title: 'Sinh hoạt chuyên đề: Học tập và làm việc theo tấm gương đạo đức phong cách Chủ tịch Hồ Chí Minh',
    date: '30/08/2025',
    location: 'Phòng B.204, UIT',
    participants: 32,
    image: 'https://images.pexels.com/photos/7944017/pexels-photo-7944017.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Buổi học chuyên sâu về học tập và làm theo tư tưởng Hồ Chí Minh.',
    tags: ['Lý luận', 'Giáo dục', 'Thảo luận'],
    url: '#',
  },
  {
    title: 'Chương trình Trung thu cho em',
    date: '12/08/2025',
    location: 'Xã ABC, tỉnh XYZ',
    participants: 28,
    image: 'https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Hoạt động tình nguyện tặng quà Trung thu cho trẻ em nghèo.',
    tags: ['Tình nguyện', 'Phục vụ'],
    url: '#',
  },
];

function SpecialActivities() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hoạt động chuyên đề</h2>
        <p className="text-gray-600">Các hoạt động theo chủ đề, tham quan và phục vụ cộng đồng</p>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <a
            key={index}
            href={activity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-lg hover:border-red-300 transition-all cursor-pointer block group"
          >
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-red-700 transition-colors">{activity.title}</h3>
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-red-700 transition-colors flex-shrink-0 ml-2" />
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-red-700" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-700" />
                    <span>{activity.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-red-700" />
                    <span>{activity.participants} người tham gia</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{activity.description}</p>

                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-red-50 to-amber-50 border-2 border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Heart size={24} className="text-red-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">Tham gia & Gắn kết</h3>
            <p className="text-sm text-gray-800">
              Tất cả đảng viên được khuyến khích tích cực tham gia hoạt động chuyên đề. Những hoạt động này tăng cường đoàn kết, phục vụ cộng đồng và thể hiện tinh thần đoàn kết. Liên hệ chi ủy để đề xuất hoạt động mới.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialActivities;
