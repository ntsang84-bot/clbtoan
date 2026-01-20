
import React, { useEffect, useState } from 'react';
import { getLeaderboard } from '../services/sheetsService';
import { Trophy, ArrowLeft, Loader2, Medal, Clock, Users, Star, School, Trash2 } from 'lucide-react';
import { AUDIO_URLS } from '../constants';

interface LeaderboardScreenProps {
  onBack: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const results = await getLeaderboard();
      setData(results);
      setLoading(false);
    };
    loadData();
  }, []);

  const playClick = () => {
    new Audio(AUDIO_URLS.click).play().catch(() => {});
  };

  const clearLeaderboard = () => {
    if (confirm("Bạn có chắc chắn muốn xoá toàn bộ bảng xếp hạng hiện tại không?")) {
      // Fix: Use the correct LOCAL_STORAGE_KEY defined in sheetsService.ts
      localStorage.removeItem('MATH_MILLIONAIRE_LEADERBOARD_LOCAL');
      setData([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen millionaire-bg p-4 md:p-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => { playClick(); onBack(); }}
            className="flex items-center gap-2 text-blue-300 hover:text-yellow-400 transition-colors group"
          >
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-wider text-xs md:text-sm">Quay lại màn hình chính</span>
          </button>
          
          <button 
            onClick={clearLeaderboard}
            className="flex items-center gap-2 text-rose-400/50 hover:text-rose-400 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <Trash2 size={14} /> Xoá bảng điểm
          </button>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-4 mb-2">
            <Star className="text-yellow-500 fill-yellow-500 animate-pulse" />
            <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-tighter drop-shadow-2xl">
              Bảng Vàng Cao Thủ
            </h1>
            <Star className="text-yellow-500 fill-yellow-500 animate-pulse" />
          </div>
          <p className="text-blue-300/60 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">Dữ liệu được lưu trữ trực tiếp trên trình duyệt của bạn</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
          </div>
        ) : (
          <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-yellow-500/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800/80 text-yellow-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    <th className="px-8 py-6 text-center">Hạng</th>
                    <th className="px-8 py-6">Thí sinh</th>
                    <th className="px-8 py-6">Lớp</th>
                    <th className="px-8 py-6 text-center">Điểm</th>
                    <th className="px-8 py-6">Thời gian</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((entry, index) => (
                    <tr 
                      key={index}
                      className={`
                        border-b border-blue-900/20 hover:bg-blue-900/30 transition-all duration-300
                        ${index < 3 ? 'bg-yellow-500/5' : ''}
                      `}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center">
                          {index === 0 ? <Medal className="text-yellow-500 w-6 h-6" /> : 
                           index === 1 ? <Medal className="text-slate-400 w-6 h-6" /> : 
                           index === 2 ? <Medal className="text-orange-600 w-6 h-6" /> : 
                           <span className="text-slate-500 font-black">#{index + 1}</span>}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`font-black text-lg tracking-tight ${index < 3 ? 'text-yellow-400' : 'text-blue-50'}`}>
                          {entry.name}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-bold text-blue-300 uppercase tracking-wider">{entry.lop}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="font-black text-xl text-white">
                          {entry.diem}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                          <Clock size={14} className="text-emerald-500" />
                          {entry.thoi_gian}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {data.length === 0 && (
              <div className="py-24 text-center text-slate-500 italic flex flex-col items-center gap-4">
                <Trophy size={48} className="opacity-20" />
                <p>Chưa có ai ghi danh. Hãy chơi ngay để xuất hiện tại đây!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardScreen;
