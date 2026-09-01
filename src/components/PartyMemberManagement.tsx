import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Calendar, Star, UserCheck } from 'lucide-react';

// URL Google Apps Script của bạn
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby115JpJe9D5D0y-Wn2GV44mL-W3lcDyEuBEOubGXA2edym_VTdWzFuCxxmcI9eAyW4Dg/exec';

// Code cứng sheet name
const SHEET_NAME = 'Thông tin Đảng viên - General';

interface SheetRow {
  'MSSV': string;
  'Họ và tên': string;
  'Khoa': string;
  'Chức vụ Chi bộ': string;
  'Chức vụ Đoàn - Hội': string;
  'Tình trạng': string;
  'Người hướng dẫn': string;
  'Giới tính': string;
}

interface Leader {
  'MSSV': string;
  'Họ và tên': string;
  'Khoa': string;
  'Chức vụ Chi bộ': string;
  'Chức vụ Đoàn - Hội': string;
}

interface Stats {
  totalMembers: number;
  officialMembers: number;
  probationaryMembers: number;
  excellentMembers: number;
  chiBoMembers: number;
  maleCount: number;
  femaleCount: number;
  faculties: string[];
}

function PartyMemberManagement() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalMembers: 0,
    officialMembers: 0,
    probationaryMembers: 0,
    excellentMembers: 0,
    chiBoMembers: 0,
    maleCount: 0,
    femaleCount: 0,
    faculties: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch từ Google Sheet
      const response = await fetch(GOOGLE_SCRIPT_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const allSheets = await response.json();
      
      console.log('Tất cả sheets:', allSheets);
      
      // Lấy data từ sheet cụ thể
      const data: SheetRow[] = allSheets[SHEET_NAME];
      
      if (!data) {
        throw new Error(`Sheet "${SHEET_NAME}" không tồn tại`);
      }
      
      console.log('Data từ Google Sheet:', data);
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Không có dữ liệu từ Google Sheet');
      }
      
      // Lọc ra những người có chức vụ Chi bộ (Chi ủy)
      const leaderData = data.filter((item: SheetRow) => 
        item['Chức vụ Chi bộ'] && item['Chức vụ Chi bộ'].trim() !== ''
      );
      
      // Sắp xếp: Bí thư lên đầu
      const sortedLeaders = leaderData.sort((a: SheetRow, b: SheetRow) => {
        const aPosition = a['Chức vụ Chi bộ'] || '';
        const bPosition = b['Chức vụ Chi bộ'] || '';
        
        // Bí thư (không có "Phó") lên đầu
        if (aPosition.includes('Bí thư') && !aPosition.includes('Phó')) return -1;
        if (bPosition.includes('Bí thư') && !bPosition.includes('Phó')) return 1;
        
        // Phó Bí thư thứ 2
        if (aPosition.includes('Phó Bí thư')) return -1;
        if (bPosition.includes('Phó Bí thư')) return 1;
        
        return 0;
      });

      // Tính toán thống kê
      const totalMembers = data.length;
      
      // Phân loại theo cột "Tình trạng"
      const officialMembers = data.filter((item: SheetRow) => 
        item['Tình trạng'] && item['Tình trạng'].toLowerCase().includes('chính thức')
      ).length;
      
      const probationaryMembers = data.filter((item: SheetRow) => 
        item['Tình trạng'] && item['Tình trạng'].toLowerCase().includes('dự bị')
      ).length;
      
      const excellentMembers = data.filter((item: SheetRow) => 
        item['Tình trạng'] && item['Tình trạng'].toLowerCase().includes('đoàn viên ưu tú')
      ).length;
      
      const chiBoMembers = leaderData.length;
      
      // Thống kê giới tính
      const maleCount = data.filter((item: SheetRow) => 
        item['Giới tính'] && item['Giới tính'].toLowerCase().includes('nam')
      ).length;
      
      const femaleCount = data.filter((item: SheetRow) => 
        item['Giới tính'] && item['Giới tính'].toLowerCase().includes('nữ')
      ).length;
      
      // Lấy danh sách các khoa (unique)
      const faculties = [...new Set(data
        .map((item: SheetRow) => item['Khoa'])
        .filter(khoa => khoa && khoa.trim() !== '')
      )];

      setLeaders(sortedLeaders.slice(0, 3)); // Chỉ lấy 3 người đầu
      setStats({
        totalMembers,
        officialMembers,
        probationaryMembers,
        excellentMembers,
        chiBoMembers,
        maleCount,
        femaleCount,
        faculties: faculties as string[]
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu');
      setLoading(false);
    }
  };

  // Hàm lấy đường dẫn ảnh từ tên người
  const getImagePath = (name: string) => {
    // Xóa dấu tiếng Việt, ghép chữ cái đầu của mỗi từ
    const words = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
      .split(' ');
    
    const imageName = words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
    
    return `./image/${imageName}.jpg`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu từ Google Sheets...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <h3 className="text-lg font-bold text-red-900 mb-2">Lỗi kết nối</h3>
            <p className="text-sm text-red-800 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quản lý đảng viên</h2>
          <p className="text-gray-600">Thông tin tổng quan về đảng viên chi bộ</p>
        </div>

        {/* Chi ủy */}
        {leaders.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
              <Users />
              Chi ủy
            </h3>
            
            {/* Layout đặc biệt: 1 người trên, 2 người dưới */}
            <div className="max-w-5xl mx-auto">
              {/* Người đứng đầu - Bí thư - Ở giữa trên */}
              <div className="flex justify-center mb-8">
                <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-red-300">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white text-center">
                    <div className="w-36 h-36 mx-auto mb-4 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                      <img 
                        src={getImagePath(leaders[0]['Họ và tên'])}
                        alt={leaders[0]['Họ và tên']}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/150?text=Avatar';
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold">{leaders[0]['Họ và tên']}</h4>
                      <p className="text-red-100 text-sm font-medium">{leaders[0]['Chức vụ Chi bộ']}</p>
                      {leaders[0]['Chức vụ Đoàn - Hội'] && leaders[0]['Chức vụ Đoàn - Hội'].trim() !== '' && (
                        <p className="text-red-100 text-sm font-medium">{leaders[0]['Chức vụ Đoàn - Hội']}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 người còn lại - Ở dưới, trái và phải */}
              {leaders.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {leaders.slice(1, 3).map((leader, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:border-red-300 transition-all">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 text-white text-center">
                        <div className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-white overflow-hidden bg-gray-200">
                          <img 
                            src={getImagePath(leader['Họ và tên'])}
                            alt={leader['Họ và tên']}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://via.placeholder.com/150?text=Avatar';
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-bold">{leader['Họ và tên']}</h4>
                          <p className="text-red-100 text-sm font-medium">{leader['Chức vụ Chi bộ']}</p>
                          {leader['Chức vụ Đoàn - Hội'] && leader['Chức vụ Đoàn - Hội'].trim() !== '' && (
                            <p className="text-red-100 text-sm font-medium">{leader['Chức vụ Đoàn - Hội']}</p>
                          )}
                          <div className="border-t border-red-500 pt-2 mt-2 space-y-1">
                            <p className="text-red-100 text-xs font-medium">MSSV: {leader['MSSV']}</p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Thống kê */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <TrendingUp />
            Thống kê tổng quan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Users size={32} className="opacity-80" />
                <span className="text-3xl font-bold">{stats.totalMembers}</span>
              </div>
              <p className="text-sm font-medium opacity-90">Tổng thành viên</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <UserCheck size={32} className="opacity-80" />
                <span className="text-3xl font-bold">{stats.officialMembers}</span>
              </div>
              <p className="text-sm font-medium opacity-90">Đảng viên chính thức</p>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Calendar size={32} className="opacity-80" />
                <span className="text-3xl font-bold">{stats.probationaryMembers}</span>
              </div>
              <p className="text-sm font-medium opacity-90">Đảng viên dự bị</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <Star size={32} className="opacity-80" />
                <span className="text-3xl font-bold">{stats.excellentMembers}</span>
              </div>
              <p className="text-sm font-medium opacity-90">Đoàn viên ưu tú</p>
            </div>
          </div>

          {/* Biểu đồ giới tính */}
          <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4">Cơ cấu giới tính</h4>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Nam</span>
                  <span className="text-sm font-bold text-blue-600">{stats.maleCount} người ({stats.totalMembers > 0 ? Math.round((stats.maleCount / stats.totalMembers) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${stats.totalMembers > 0 ? (stats.maleCount / stats.totalMembers) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Nữ</span>
                  <span className="text-sm font-bold text-pink-600">{stats.femaleCount} người ({stats.totalMembers > 0 ? Math.round((stats.femaleCount / stats.totalMembers) * 100) : 0}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-pink-600 h-4 rounded-full transition-all"
                    style={{ width: `${stats.totalMembers > 0 ? (stats.femaleCount / stats.totalMembers) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lưu ý */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-red-900 mb-2">Lưu ý quan trọng</h3>
          <p className="text-sm text-red-800">
            Tất cả thông tin đảng viên là tài liệu nội bộ, chỉ dành cho người có quyền truy cập. Dữ liệu được đồng bộ tự động từ Google Sheets.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PartyMemberManagement;