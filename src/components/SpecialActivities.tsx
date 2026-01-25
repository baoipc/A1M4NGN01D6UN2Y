import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Heart, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby115JpJe9D5D0y-Wn2GV44mL-W3lcDyEuBEOubGXA2edym_VTdWzFuCxxmcI9eAyW4Dg/exec';
const SHEET_NAME = 'Hoạt động';

interface Activity {
  'Phân loại hoạt động': string;
  'Tên hoạt động': string;
  'Thời gian diễn ra': string;
  'Nội dung chương trình': string;
  'Ảnh': string;
}

interface GroupedActivities {
  [category: string]: Activity[];
}

const ACTIVITY_CATEGORIES = {
  'Tình nguyện': {
    icon: Heart,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  'Về nguồn': {
    icon: MapPin,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  'Sinh hoạt chính trị': {
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  'Khác': {
    icon: Calendar,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  }
};

const ORGANIZATION_DESC = 'Chi bộ sinh viên 1 - Trường Đại học Công nghệ Thông tin, ĐHQG-HCM';

function ActivitiesDisplay() {
  const [activities, setActivities] = useState<GroupedActivities>({});
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Tình nguyện']));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(GOOGLE_SCRIPT_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const allSheets = await response.json();
      const data: Activity[] = allSheets[SHEET_NAME];

      if (!data) {
        throw new Error(`Sheet "${SHEET_NAME}" không tồn tại`);
      }

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Không có dữ liệu hoạt động');
      }

      // Nhóm hoạt động theo phân loại
      const grouped: GroupedActivities = {};
      Object.keys(ACTIVITY_CATEGORIES).forEach(cat => {
        grouped[cat] = [];
      });

      data.forEach(item => {
        const category = item['Phân loại hoạt động']?.trim() || 'Khác';
        if (!grouped[category]) {
          grouped[category] = [];
        }
        grouped[category].push(item);
      });

      setActivities(grouped);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải hoạt động...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <h3 className="text-lg font-bold text-red-900 mb-2">Lỗi kết nối</h3>
            <p className="text-sm text-red-800 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hoạt động Chi bộ</h1>
          <p className="text-gray-600">{ORGANIZATION_DESC}</p>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          {Object.entries(ACTIVITY_CATEGORIES).map(([category, styles]) => {
            const Icon = styles.icon;
            const categoryActivities = activities[category] || [];
            const isExpanded = expandedCategories.has(category);

            return (
              <div
                key={category}
                className={`rounded-lg border-2 overflow-hidden transition-all ${styles.borderColor}`}
              >
                {/* Category Header */}
                <button
                  onClick={() => {
                    const newExpanded = new Set(expandedCategories);
                    if (newExpanded.has(category)) {
                      newExpanded.delete(category);
                    } else {
                      newExpanded.add(category);
                    }
                    setExpandedCategories(newExpanded);
                  }}
                  className={`w-full px-6 py-4 bg-gradient-to-r ${styles.color} text-white flex items-center justify-between hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={24} />
                    <div className="text-left">
                      <h2 className="text-xl font-bold">{category}</h2>
                      <p className="text-sm opacity-90">
                        {categoryActivities.length} hoạt động
                      </p>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>

                {/* Activities List */}
                {isExpanded && (
                  <div className={`${styles.bgColor} p-6 space-y-4`}>
                    {categoryActivities.length > 0 ? (
                      categoryActivities.map((activity, idx) => (
                        <div
                          key={idx}
                          className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row">
                            {/* Image */}
                            {activity['Ảnh'] && (
                              <div className="md:w-48 h-48 md:h-auto flex-shrink-0 overflow-hidden bg-gray-200">
                                <img
                                  src={activity['Ảnh']}
                                  alt={activity['Tên hoạt động']}
                                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                      'https://via.placeholder.com/300?text=No+Image';
                                  }}
                                />
                              </div>
                            )}

                            {/* Content */}
                            <div className="p-5 flex-1">
                              <h3 className={`text-lg font-bold ${styles.textColor} mb-2`}>
                                {activity['Tên hoạt động']}
                              </h3>

                              {/* Organization Info */}
                              <p className="text-sm text-gray-600 mb-3 italic">
                                {ORGANIZATION_DESC}
                              </p>

                              {/* Time */}
                              {activity['Thời gian diễn ra'] && (
                                <div className="flex items-center gap-2 mb-3 text-gray-700">
                                  <Calendar size={16} className={styles.textColor} />
                                  <span className="text-sm font-medium">
                                    {activity['Thời gian diễn ra']}
                                  </span>
                                </div>
                              )}

                              {/* Content */}
                              {activity['Nội dung chương trình'] && (
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                  {activity['Nội dung chương trình']}
                                </p>
                              )}

                              {/* Link if image available */}
                              {activity['Ảnh'] && (
                                <a
                                  href={activity['Ảnh']}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${styles.color} text-white hover:shadow-md transition-shadow text-sm font-medium`}
                                >
                                  Xem bài viết
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Chưa có hoạt động {category.toLowerCase()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}

export default ActivitiesDisplay;