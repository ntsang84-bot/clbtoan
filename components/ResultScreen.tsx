
import React, { useEffect, useState, useRef } from 'react';
import { Player } from '../types';
import { Trophy, RefreshCcw, Home, Loader2, Clock, FileText, Image as ImageIcon, MessageSquareQuote, CheckCircle } from 'lucide-react';
import { generateFinalReport } from '../services/geminiService';
import { savePlayerResult } from '../services/sheetsService';
import { toPng } from 'html-to-image';
import { AUDIO_URLS } from '../constants';

interface ResultScreenProps {
  player: Player;
  onReset: (isReplay?: boolean) => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ player, onReset }) => {
  const [report, setReport] = useState<{ name: string, lop: string, diem: number, thoi_gian: string, comment: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAndSaveReport = async () => {
      try {
        const data = await generateFinalReport(player);
        setReport(data);
        await savePlayerResult({
          name: data.name,
          lop: data.lop,
          diem: data.diem,
          thoi_gian: data.thoi_gian
        });
      } catch (err) {
        console.error("Gemini Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndSaveReport();
  }, [player]);

  const handleDownloadPDF = () => {
    window.print();
  };

  const playClick = () => {
    new Audio(AUDIO_URLS.click).play().catch(() => {});
  };

  const handleDownloadImage = async () => {
    if (certificateRef.current === null) return;
    setExporting(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const dataUrl = await toPng(certificateRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 3,
      });
      const link = document.createElement('a');
      link.download = `ChungNhan_2026_${player.name.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert('Lỗi xuất ảnh. Hãy dùng PDF thay thế.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen millionaire-bg p-3 md:p-10 pt-16 md:pt-20 pb-20 h-auto overflow-y-visible">
      <style>{`
        @media print {
          body { background: white !important; padding: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          #certificate-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-8 py-40 h-screen w-full">
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-blue-600 animate-spin" />
          <h2 className="text-lg md:text-2xl font-black text-blue-700 uppercase tracking-widest animate-pulse italic text-center px-4">
            AI đang biên soạn chứng chỉ <br/> vinh danh niên khóa 2026...
          </h2>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center gap-6 md:gap-10">
          <div className="text-center no-print animate-in fade-in slide-in-from-top-10 duration-1000">
            <div className="flex justify-center mb-2 md:mb-4">
               <CheckCircle size={40} className="md:size-60 text-emerald-500 fill-emerald-50" />
            </div>
            <h2 className="text-2xl md:text-5xl font-black text-slate-800 uppercase tracking-tighter mb-1 italic">HOÀN THÀNH THỬ THÁCH!</h2>
            <p className="text-blue-600 text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] opacity-80 italic">Chúc mừng nhà toán học trẻ xuất sắc</p>
          </div>

          {/* Certificate Container - Có thể cuộn ngang trên Mobile */}
          <div className="w-full max-w-5xl no-print rounded-3xl md:rounded-[4rem] border border-slate-200 bg-white/50 backdrop-blur-md p-2 md:p-12 shadow-xl mb-6 overflow-x-auto overflow-y-visible custom-scrollbar">
            <div 
              ref={certificateRef}
              id="certificate-print-area" 
              className="min-w-[900px] bg-white text-slate-900 rounded-sm p-4 mx-auto relative shadow-2xl"
              style={{ width: '900px' }}
            >
              <div className="border-[20px] border-[#8b6d31] m-2 p-14 border-double rounded-sm flex flex-col items-center text-center relative bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] bg-[#fffdfa]">
                
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 p-8"><div className="w-24 h-24 border-t-[8px] border-l-[8px] border-[#8b6d31]"></div></div>
                <div className="absolute top-0 right-0 p-8"><div className="w-24 h-24 border-t-[8px] border-r-[8px] border-[#8b6d31]"></div></div>
                <div className="absolute bottom-0 left-0 p-8"><div className="w-24 h-24 border-b-[8px] border-l-[8px] border-[#8b6d31]"></div></div>
                <div className="absolute bottom-0 right-0 p-8"><div className="w-24 h-24 border-b-[8px] border-r-[8px] border-[#8b6d31]"></div></div>

                <div className="mb-10">
                  <p className="font-serif italic text-xs text-[#5d4037] font-bold tracking-[0.5em] mb-1 uppercase">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                  <p className="font-serif font-bold text-[11px] text-[#5d4037] border-b border-[#5d4037] pb-1 inline-block px-12 uppercase italic">Độc lập - Tự do - Hạnh phúc</p>
                  <div className="mt-10">
                    <h3 className="font-serif font-black text-2xl text-[#3e2723] uppercase tracking-[0.1em]">TRƯỜNG THPT MANG THÍT - CLB TOÁN HỌC</h3>
                  </div>
                </div>
                
                <h1 className="text-8xl font-serif font-black uppercase text-[#4e342e] tracking-[0.05em] mb-4">
                  CHỨNG NHẬN
                </h1>
                <p className="text-2xl font-serif italic text-[#8b6d31] tracking-[0.4em] mb-16 uppercase">THÀNH TÍCH TOÁN HỌC XUẤT SẮC</p>
                
                <div className="mb-12 w-full">
                  <p className="font-serif italic text-lg text-slate-400 mb-2 underline decoration-[#8b6d31]/30">Trân trọng vinh danh học sinh:</p>
                  <h2 className="text-7xl font-bold text-[#1a237e] border-b-4 border-[#8b6d31]/30 pb-4 inline-block min-w-[75%] font-serif italic drop-shadow-md">
                    {report?.name}
                  </h2>
                  <div className="flex justify-center gap-20 mt-8 text-2xl font-serif text-slate-700">
                    <p>Lớp: <span className="font-bold text-[#1a237e]">{report?.lop}</span></p>
                    <p>Khối: <span className="font-bold text-[#1a237e]">{player.grade}</span></p>
                  </div>
                </div>

                <p className="font-serif text-2xl text-slate-700 max-w-2xl leading-relaxed mb-12">
                  Đã chứng minh bản lĩnh, tư duy sắc bén và kiến thức vững vàng <br/>
                  trong thử thách trí tuệ <span className="font-bold text-[#b71c1c] text-3xl uppercase tracking-tighter">"ĐẤU TRƯỜNG TOÁN HỌC 2026"</span>
                </p>

                <div className="grid grid-cols-2 gap-10 w-full max-w-3xl mb-14">
                  <div className="bg-white/50 p-10 border-4 border-double border-[#8b6d31]/40 rounded-[2.5rem] flex flex-col items-center shadow-lg">
                    <div className="flex items-center gap-2 text-[#8b6d31] font-black uppercase text-xs tracking-widest mb-3">
                      <Clock size={24} /> THỜI GIAN
                    </div>
                    <p className="text-3xl font-black text-slate-800 font-serif italic">{report?.thoi_gian}</p>
                  </div>
                  <div className="bg-white/50 p-10 border-4 border-double border-[#8b6d31]/40 rounded-[2.5rem] flex flex-col items-center shadow-lg">
                    <div className="flex items-center gap-2 text-yellow-700 font-black uppercase text-xs tracking-widest mb-3">
                       <Trophy size={24} /> TỔNG ĐIỂM
                    </div>
                    <p className="text-7xl font-black text-[#d84315] font-serif">{report?.diem} <span className="text-xl text-slate-300 font-normal">/ 150</span></p>
                  </div>
                </div>

                <div className="w-full max-w-3xl bg-blue-50/80 border-l-[12px] border-blue-200 p-12 mb-20 text-left italic relative rounded-r-[2rem] shadow-sm">
                  <MessageSquareQuote className="absolute -top-6 -left-6 text-blue-200" size={56} />
                  <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest mb-3">Nhận xét từ Ban Giám Khảo AI:</p>
                  <p className="text-[#1a237e] text-3xl font-serif font-medium leading-relaxed italic drop-shadow-sm">
                    "{report?.comment}"
                  </p>
                </div>

                {/* Signatures & Seal 2026 */}
                <div className="flex justify-between items-end w-full mt-auto pt-10 border-t border-slate-200">
                  <div className="text-left flex flex-col items-center">
                    <div className="w-44 h-44 border-4 border-[#b71c1c]/25 rounded-full flex items-center justify-center bg-white shadow-inner relative mb-3">
                      <div className="absolute inset-2 border-2 border-dashed border-[#b71c1c]/50 rounded-full"></div>
                      <div className="text-[#b71c1c] font-black text-[13px] text-center leading-tight uppercase scale-110">
                        CLB TOÁN HỌC<br/>TRƯỜNG MANG THÍT<br/>★<br/>2026
                      </div>
                    </div>
                    <p className="font-black text-[#3e2723] uppercase text-[10px] tracking-[0.4em] opacity-60 italic underline">NIÊN KHÓA 2025 - 2026</p>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <p className="font-serif italic text-base mb-2 text-slate-400">Mang Thít, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
                    <p className="font-bold text-[#3e2723] uppercase text-sm tracking-[0.2em] mb-24">Chủ tịch Câu lạc bộ</p>
                    <div className="relative">
                      <p className="font-serif italic text-6xl text-blue-900 mb-1 rotate-[-4deg] drop-shadow-md opacity-90">Gemini AI Agent</p>
                      <p className="font-black text-slate-300 uppercase text-[9px] tracking-[0.6em]">XÁC THỰC ĐIỆN TỬ 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-2xl no-print pb-20 animate-in slide-in-from-bottom-10 duration-1000 px-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleDownloadImage}
                disabled={exporting}
                className="flex items-center justify-center gap-3 py-4 md:py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl md:rounded-3xl transition-all uppercase text-xs md:text-sm tracking-widest shadow-xl disabled:opacity-50"
              >
                {exporting ? <Loader2 size={24} className="animate-spin" /> : <ImageIcon size={24} />}
                Lưu ảnh chứng chỉ
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-3 py-4 md:py-6 bg-slate-800 hover:bg-slate-900 text-white font-black rounded-2xl md:rounded-3xl transition-all uppercase text-xs md:text-sm tracking-widest shadow-xl"
              >
                <FileText size={24} /> In chứng nhận
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
               <button
                onClick={() => { playClick(); onReset(true); }}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all uppercase text-[10px] tracking-widest"
              >
                <RefreshCcw size={16} /> Chơi lại
              </button>
              <button
                onClick={() => { playClick(); window.location.reload(); }}
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all uppercase text-[10px] tracking-widest shadow-lg"
              >
                <Home size={16} /> Về trang chủ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultScreen;
