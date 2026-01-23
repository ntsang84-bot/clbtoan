
import React, { useState } from 'react';
import { Grade, Player } from '../types';
import { Trophy, User, ArrowRight, Star, ShieldCheck, AlertCircle, Settings } from 'lucide-react';
import { AUDIO_URLS } from '../constants';
import { getPlayerAttemptCount } from '../services/sheetsService';
import { clearGlobalQuestionHistory } from '../services/mathEngine';

interface SetupScreenProps {
  onStart: (player: Player, topic: string, timeLimit: number) => void;
  onViewLeaderboard: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onViewLeaderboard }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade>(gradeFromStorage() || 11);
  const [classRoom, setClassRoom] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  function gradeFromStorage(): Grade | null {
    const saved = localStorage.getItem('MATH_PREF_GRADE');
    return saved ? parseInt(saved) as Grade : null;
  }

  const playClick = () => {
    new Audio(AUDIO_URLS.click).play().catch(() => {});
  };

  const playSuccess = () => {
    new Audio(AUDIO_URLS.success).play().catch(() => {});
  };

  const handleAdminReset = () => {
    const password = window.prompt("HỆ THỐNG QUẢN TRỊ\nVui lòng nhập mật khẩu xác thực để đặt lại ngân hàng đề:");
    
    if (password === "MT14") {
      playSuccess();
      clearGlobalQuestionHistory();
      alert("XÁC NHẬN: Ngân hàng câu hỏi đã được làm mới và xáo trộn lại hoàn toàn!");
    } else if (password !== null) {
      alert("Mật khẩu không chính xác!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !classRoom.trim()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setIsChecking(true);
    const attempts = await getPlayerAttemptCount(name, classRoom);
    
    if (attempts >= 3) {
      alert(`Thí sinh ${name} - Lớp ${classRoom} đã dùng hết 3 lượt tham gia.`);
      setIsChecking(false);
      return;
    }

    localStorage.setItem('MATH_PREF_GRADE', grade.toString());
    playClick();
    onStart({ 
      name: name.trim(), 
      grade, 
      classRoom: classRoom.trim(), 
      score: 0, 
      time: "" 
    }, "Toán học tổng hợp", 0);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen millionaire-bg relative overflow-y-auto pb-24">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] border border-white shadow-2xl my-10 mx-4">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-5 bg-blue-600 rounded-3xl mb-6 shadow-xl shadow-blue-200">
            <Trophy className="text-white" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter mb-2">
            ĐẤU TRƯỜNG <span className="text-blue-600">TOÁN HỌC</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8 italic">
            CHINH PHỤC ĐỈNH CAO TRI THỨC 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Họ tên thí sinh</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:border-blue-500 focus:bg-white outline-none font-bold transition-all"
                  placeholder="Nhập tên..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Khối & Lớp</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-800 outline-none font-bold cursor-pointer focus:border-blue-500"
                  value={grade}
                  onChange={e => setGrade(parseInt(e.target.value) as Grade)}
                >
                  <option value={10}>Lớp 10</option>
                  <option value={11}>Lớp 11</option>
                  <option value={12}>Lớp 12</option>
                </select>
                <input 
                  required
                  className="w-24 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-800 focus:border-blue-500 outline-none font-bold text-center uppercase"
                  placeholder="Lớp"
                  value={classRoom}
                  onChange={e => setClassRoom(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
             <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={16} />
             <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase tracking-tight">
               Lưu ý: Mỗi thí sinh có tối đa 3 lượt thi. Kết quả cao nhất sẽ được vinh danh trên bảng vàng.
             </p>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              type="submit"
              disabled={isChecking}
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-3xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-4 uppercase tracking-tighter disabled:opacity-50"
            >
              {isChecking ? "Đang kiểm tra..." : "Vào Đấu Trường"}
              {!isChecking && <ArrowRight size={24} />}
            </button>
            <button 
              type="button"
              onClick={() => { playClick(); onViewLeaderboard(); }}
              className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
            >
              <Star size={14} className="text-yellow-500 fill-yellow-500" /> Xem Bảng Vàng
            </button>
          </div>

          <div className="pt-10 flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 opacity-50">
               <ShieldCheck size={12} className="text-emerald-500" />
               <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Verified System 2026</span>
             </div>
             
             <button 
               type="button"
               onClick={() => { playClick(); handleAdminReset(); }}
               className="px-6 py-2.5 bg-slate-800 hover:bg-black text-white rounded-full transition-all text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg border border-slate-700"
             >
               <Settings size={14} /> Quản trị (Reset)
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;
