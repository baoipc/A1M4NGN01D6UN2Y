import { Award, Star, Trophy, Medal, TrendingUp, Users, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby115JpJe9D5D0y-Wn2GV44mL-W3lcDyEuBEOubGXA2edym_VTdWzFuCxxmcI9eAyW4Dg/exec';

type Achievement = {
  year: number;
  content: string;
  awardedBy: string;
  recipient: string;
  category?: string;
};

type PersonAchievements = {
  name: string;
  image: string;
  achievements: Achievement[];
};

function Recognition() {
  const [dangAchievements, setDangAchievements] = useState<Achievement[]>([]);
  const [otherAchievements, setOtherAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openYear, setOpenYear] = useState<number | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<PersonAchievements | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching data from Google Sheets...');
      
      // Fetch all data
      const response = await fetch(GOOGLE_SCRIPT_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Response (first 500 chars):', text.substring(0, 500));
      
      let allData = {};
      try {
        const cleanText = text.trim().replace(/^\uFEFF/, '');
        allData = JSON.parse(cleanText);
        console.log('Parsed all data:', allData);
      } catch (e) {
        console.error('Error parsing data:', e);
        console.error('Raw text:', text);
        setError('Lỗi parse JSON. Vui lòng kiểm tra console.');
        return;
      }
      
      // Extract data từ object
      const dangData = allData['Thành tích - HTXSNV'] || [];
      const otherData = allData['Thành tích - Khác'] || [];
      
      console.log('Đảng data:', dangData);
      console.log('Other data:', otherData);
      
      // Map tên cột tiếng Việt sang tiếng Anh
      const mapToEnglish = (item: any) => ({
        category: item['Phân loại'] || item['category'],
        year: item['Năm'] || item['year'],
        content: item['Nội dung'] || item['content'],
        awardedBy: item['Cấp khen thưởng'] || item['awardedBy'],
        recipient: item['Cá nhân'] || item['recipient'] || ''
      });
      
      setDangAchievements(dangData.map(mapToEnglish));
      setOtherAchievements(otherData.map(mapToEnglish));
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Không thể tải dữ liệu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Group achievements by person
  const groupedByPerson = otherAchievements.reduce((acc, ach) => {
    if (!ach.recipient) return acc;
    
    const recipients = ach.recipient.split(',').map(r => r.trim()).filter(r => r);
    
    recipients.forEach(person => {
      if (!acc[person]) {
        acc[person] = [];
      }
      acc[person].push(ach);
    });
    
    return acc;
  }, {} as Record<string, Achievement[]>);

  // Convert to array and add image paths
  const individuals: PersonAchievements[] = Object.entries(groupedByPerson).map(([name, achievements]) => {
    // Chuyển đổi tên: Nguyễn Văn A -> NguyenVanA
    const imageName = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'D')
      .replace(/Đ/g, 'D');
    
    return {
      name,
      image: `image/${imageName}.jpg`,
      achievements: achievements.sort((a, b) => (b.year || 0) - (a.year || 0))
    };
  });

  // Group Đảng achievements by category
  const chiBo = dangAchievements.filter(a => a.category === 'Chi bộ');
  const caNhan = dangAchievements.filter(a => a.category === 'Cá nhân');

  // Group by year for statistics
  const yearlyStats = caNhan.reduce((acc, ach) => {
    if (!ach.recipient || !ach.year) return acc;
    
    const recipients = ach.recipient.split(',').map(r => r.trim()).filter(r => r);
    
    if (!acc[ach.year]) {
      acc[ach.year] = new Set();
    }
    
    recipients.forEach(r => acc[ach.year].add(r));
    
    return acc;
  }, {} as Record<number, Set<string>>);

  const sortedYears = Object.keys(yearlyStats)
    .map(Number)
    .sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <X size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Tuyên dương & Khen thưởng</h2>
        <p className="text-gray-600">Ghi nhận sự nỗ lực và thành tích của các đảng viên</p>
      </div>



      {/* Thành tích Đảng */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <Award size={28} className="text-red-700" />
            <h3 className="text-xl font-bold text-gray-900">Thành tích trong công tác Đảng</h3>
          </div>

          <div className="space-y-4">
            {/* Chi bộ */}
            <div className="bg-red-50 rounded-lg border-2 border-red-200 p-4">
              <button
                onClick={() => setOpenCategory(openCategory === 'chiBo' ? null : 'chiBo')}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-red-100 hover:bg-red-200 transition font-semibold text-red-900"
              >
                <div className="flex items-center gap-2">
                  <Trophy size={20} className="text-red-700" />
                  <span>Thành tích Chi bộ ({chiBo.length})</span>
                </div>
                {openCategory === 'chiBo' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openCategory === 'chiBo' && (
                <div className="mt-4 space-y-3">
                  {chiBo.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">Chưa có dữ liệu</p>
                  ) : (
                    chiBo.map((cert, idx) => (
                      <div key={idx} className="p-4 rounded-lg border-2 border-red-300 bg-white">
                        <div className="flex items-start gap-3">
                          <Trophy size={20} className="text-red-700 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{cert.content || 'N/A'}</h4>
                            <p className="text-sm text-gray-700 mb-1">
                              <span className="font-semibold">Đơn vị:</span> {cert.awardedBy || 'N/A'}
                            </p>
                            <p className="text-xs text-gray-600">
                              <span className="font-semibold">Năm:</span> {cert.year || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Đảng viên xuất sắc theo năm */}
            {sortedYears.length > 0 && (
              <div className="bg-green-50 rounded-lg border-2 border-green-200 p-4">
                <button
                  onClick={() => setOpenCategory(openCategory === 'xuatSac' ? null : 'xuatSac')}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-green-100 hover:bg-green-200 transition font-semibold text-green-900"
                >
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-green-700" />
                    <span>Đảng viên xuất sắc qua các năm</span>
                  </div>
                  {openCategory === 'xuatSac' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {openCategory === 'xuatSac' && (
                  <div className="mt-4 space-y-4">
                    {sortedYears.map((year) => {
                      const members = Array.from(yearlyStats[year]);
                      return (
                        <div key={year}>
                          <button
                            onClick={() => setOpenYear(openYear === year ? null : year)}
                            className="flex items-center justify-between w-full bg-green-200 px-4 py-3 rounded-lg hover:bg-green-300 transition"
                          >
                            <span className="text-green-900 font-bold">
                              Năm {year} — {members.length} Đảng viên
                            </span>
                            {openYear === year ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>

                          {openYear === year && (
                            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                              {members.map((member, idx) => (
                                <div key={idx} className="bg-white border-2 border-green-300 rounded-lg p-4 flex items-center gap-3">
                                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Star size={20} className="text-white" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-green-900">{member}</h4>
                                    <p className="text-sm text-green-700">Hoàn thành xuất sắc nhiệm vụ</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Đảng viên nổi bật */}
      {individuals.length > 0 && (
        <div className="mb-8">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-blue-700" />
              <h3 className="text-xl font-bold text-gray-900">Đảng viên nổi bật</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {individuals.map((person, idx) => (
                <div
                  key={idx}
                  className="group cursor-pointer"
                  onClick={() => setSelectedPerson(person)}
                >
                  <div className="relative mb-3">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full aspect-square rounded-xl object-cover border-4 border-blue-200 group-hover:border-blue-500 transition-all duration-300"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold text-sm">Xem chi tiết</span>
                    </div>
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {person.achievements.length}
                    </div>
                  </div>
                  <h4 className="font-bold text-center text-gray-900 group-hover:text-blue-700 transition">
                    {person.name}
                  </h4>
                  <p className="text-xs text-center text-gray-600 mt-1">
                    {person.achievements.length} thành tích
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative">
            
            <button
              onClick={() => setSelectedPerson(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100 shadow-lg z-10"
            >
              <X size={24} />
            </button>

            {/* Left: Image */}
            <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-8">
              <div className="text-center">
                <img
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 mx-auto mb-4 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedPerson.name}</h2>
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <Trophy size={18} />
                  <span className="font-semibold">{selectedPerson.achievements.length} thành tích</span>
                </div>
              </div>
            </div>

            {/* Right: Achievements */}
            <div className="w-full md:w-3/5 p-6 overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award size={24} className="text-blue-700" />
                Thành tích tiêu biểu
              </h3>
              
              <div className="space-y-3">
                {selectedPerson.achievements.map((ach, idx) => (
                  <div key={idx} className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Star size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-2">
                          {ach.content || 'N/A'}
                        </h4>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-semibold">Đơn vị:</span> {ach.awardedBy || 'N/A'}
                        </p>
                        <p className="text-xs text-blue-700 font-semibold">
                          Năm {ach.year || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-8 bg-gradient-to-r from-yellow-50 to-red-50 border-2 border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Trophy size={24} className="text-yellow-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Chương trình tuyên dương</h3>
            <p className="text-sm text-gray-800">
              Chi bộ ghi nhận những đóng góp nổi bật trong công tác, nghiên cứu, lãnh đạo và rèn luyện tư tưởng. 
              Các đảng viên hoàn thành tốt nhiệm vụ năm là tấm gương tiêu biểu. 
              Việc đề cử khen thưởng được xét duyệt hàng quý bởi chi ủy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recognition;