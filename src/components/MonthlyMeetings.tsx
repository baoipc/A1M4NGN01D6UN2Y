
import {
  Calendar,
  Bell,
  FileText,
  ClipboardCheck,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

const upcomingMeetings = [
  { date: '2025-11-01', time: '08:00', topic: 'Sinh hoạt chi bộ tháng 11/2025', location: 'Phòng B2.04' },
  { date: '2025-12-06', time: '08:00', topic: 'Sinh hoạt chi bộ tháng 12/2025', location: 'Phòng B2.04' },
  { date: '2026-01-03', time: '08:00', topic: 'Sinh hoạt chi bộ tháng 01/2026', location: 'Phòng B2.04' },
];

function MonthlyMeetings() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sinh hoạt chi bộ</h2>
        <p className="text-gray-600">Lịch sinh hoạt chi bộ, biên bản/ nghị quyết sinh hoạt và điểm danh</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg border-2 border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <Calendar size={24} className="text-red-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Lịch sinh hoạt sắp tới (dự kiến)</h3>
          </div>

          <div className="space-y-4">
            {upcomingMeetings.map((meeting, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-red-700">
                    {new Date(meeting.date).getDate()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(meeting.date).toLocaleDateString('vi-VN', {
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{meeting.topic}</h4>
                  <p className="text-sm text-gray-600">
                    {meeting.time} • {meeting.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg border-2 border-amber-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-200 rounded-lg">
              <Bell size={24} className="text-amber-700" />
            </div>
            <h3 className="text-lg font-bold text-amber-900">Thông báo</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <p className="text-sm font-semibold text-amber-900">
                Buổi họp tiếp theo: 01/11/2025
              </p>
              <p className="text-xs text-gray-600 mt-1">Sẽ nhắc trước 2 ngày</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-amber-200">
              <p className="text-sm font-semibold text-amber-900">Yêu cầu điểm danh</p>
              <p className="text-xs text-gray-600 mt-1">Link form điểm danh sẽ được cập nhật tại buổi sinh hoạt, các đồng chí vào điền form để điểm danh.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all group"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border-2 border-blue-200 group-hover:scale-110 transition-transform">
              <FileText size={32} className="text-blue-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                Biên bản họp
                <ExternalLink size={14} className="text-gray-400" />
              </h3>
              <p className="text-xs text-gray-600">Xem lại nội dung các buổi họp</p>
            </div>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all group"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-green-50 rounded-lg border-2 border-green-200 group-hover:scale-110 transition-transform">
              <FileText size={32} className="text-green-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                Nghị quyết
                <ExternalLink size={14} className="text-gray-400" />
              </h3>
              <p className="text-xs text-gray-600">Các quyết định và hành động</p>
            </div>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all group"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-purple-50 rounded-lg border-2 border-purple-200 group-hover:scale-110 transition-transform">
              <ClipboardCheck size={32} className="text-purple-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                Điểm danh
                <ExternalLink size={14} className="text-gray-400" />
              </h3>
              <p className="text-xs text-gray-600">Theo dõi sự tham gia</p>
            </div>
          </div>
        </a>

        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg border-2 border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all group"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="p-3 bg-amber-50 rounded-lg border-2 border-amber-200 group-hover:scale-110 transition-transform">
              <MessageSquare size={32} className="text-amber-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                Góp ý trước họp
                <ExternalLink size={14} className="text-gray-400" />
              </h3>
              <p className="text-xs text-gray-600">Gửi ý kiến trước buổi sinh hoạt</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default MonthlyMeetings;
