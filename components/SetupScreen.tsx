
import React, { useState } from 'react';
import { Grade, Player } from '../types';
import { Trophy, User, ArrowRight, Star, ShieldCheck, BookOpen } from 'lucide-react';
import { AUDIO_URLS } from '../constants';

interface SetupScreenProps {
  onStart: (player: Player, topic: string, timeLimit: number) => void;
  onViewLeaderboard: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onViewLeaderboard }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade>(11);
  const [classRoom, setClassRoom] = useState('');

  const playClick = () => {
    new Audio(AUDIO_URLS.click).play().catch(() => {});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !classRoom.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
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
    <div className="flex items-center justify-center min-h-screen p-6 millionaire-bg">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl p-8 md:p-14 rounded-[3.5rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-5 bg-blue-600 rounded-3xl mb-6 shadow-xl shadow-blue-200">
            <Trophy className="text-white" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter mb-2">
            TOÁN HỌC <span className="text-blue-600">TRIỆU PHÚ</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-8">
            HÀNH TRÌNH CHINH PHỤC ĐỈNH CAO 2026
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-10 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Họ tên thí sinh</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-4 text-slate-800 focus:border-blue-500 focus:bg-white outline-none font-bold transition-all"
                  placeholder="Nhập tên của bạn..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Khối & Lớp</label>
              <div className="flex gap-2">
                <select 
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-800 outline-none font-bold appearance-none cursor-pointer focus:border-blue-500 focus:bg-white"
                  value={grade}
                  onChange={e => setGrade(parseInt(e.target.value) as Grade)}
                >
                  <option value={10}>Lớp 10</option>
                  <option value={11}>Lớp 11</option>
                  <option value={12}>Lớp 12</option>
                </select>
                <input 
                  required
                  className="w-24 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-slate-800 focus:border-blue-500 focus:bg-white outline-none font-bold text-center uppercase"
                  placeholder="Lớp"
                  value={classRoom}
                  onChange={e => setClassRoom(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              type="submit"
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 text-white font-black text-xl rounded-3xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-4 uppercase tracking-tighter"
            >
              Bắt đầu hành trình
              <ArrowRight size={24} />
            </button>
            <button 
              type="button"
              onClick={() => { playClick(); onViewLeaderboard(); }}
              className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
            >
              <Star size={14} className="text-yellow-500 fill-yellow-500" /> Bảng vinh danh
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 opacity-50">
             <ShieldCheck size={12} className="text-emerald-500" />
             <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Hệ thống thi chuẩn hóa CLB Mang Thít 2026</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;
