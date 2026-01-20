
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, MathQuestion } from '../types';
import { MILESTONES } from '../constants';
import { generateQuestion } from '../services/mathEngine';
import MathRenderer from './MathRenderer';
import { Trophy, Timer, Info, Loader2, BookOpen, UserCheck, RefreshCw, XCircle } from 'lucide-react';

interface GameScreenProps {
  player: Player;
  topic: string; // Correctly define passed prop
  timeLimit: number; // Correctly define passed prop
  onGameOver: (finalScore: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ player, onGameOver }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  
  // Lifelines state
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    changeQuestion: true,
    removeOne: true
  });
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);

  const usedQuestionsRef = useRef<Set<string>>(new Set());

  const getNewQuestion = useCallback((level: number, isChange: boolean = false) => {
    setLoading(true);
    setHiddenOptions([]);
    // Reset thời gian ngay lập tức để tránh bị đứng ở số cũ của câu trước
    if (!isChange) {
      setTimeLeft(level <= 5 ? 60 : level <= 10 ? 120 : 180);
    }
    
    setTimeout(() => {
      try {
        const q = generateQuestion(player.grade, level, usedQuestionsRef.current);
        setQuestion(q);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setSelectedOption(null);
        setIsAnswered(false);
      }
    }, 600); // Giảm nhẹ thời gian chờ để mượt mà hơn
  }, [player.grade]);

  // Sửa lỗi: Bổ sung currentLevel vào dependency để tự động gọi khi tăng level
  useEffect(() => {
    getNewQuestion(currentLevel);
  }, [currentLevel, getNewQuestion]);

  useEffect(() => {
    // Fix: Using 'any' type for interval variable to avoid 'NodeJS.Timeout' namespace errors in browser environments
    let interval: any;
    
    if (question && !isAnswered && !loading && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered && !loading && question) {
      handleAnswer('TIMEOUT');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timeLeft, isAnswered, question, loading]);

  const handleAnswer = (opt: string) => {
    if (isAnswered || loading) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === question?.correctAnswer;
    
    setTimeout(() => {
      if (isCorrect) {
        if (currentLevel === 15) {
          onGameOver(150);
        } else {
          // Chỉ cần tăng Level, useEffect phía trên sẽ tự kích hoạt getNewQuestion
          setCurrentLevel(prev => prev + 1);
        }
      } else {
        const finalPoints = MILESTONES.find(m => m.level === currentLevel - 1)?.points || 0;
        onGameOver(finalPoints);
      }
    }, 2000);
  };

  // Lifeline Logic
  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || !question) return;
    const options = ['A', 'B', 'C', 'D'] as const;
    const wrongOptions = options.filter(opt => opt !== question.correctAnswer);
    const toHide = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(prev => [...prev, ...toHide]);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const useChangeQuestion = () => {
    if (!lifelines.changeQuestion) return;
    setLifelines(prev => ({ ...prev, changeQuestion: false }));
    getNewQuestion(currentLevel, true);
  };

  const useRemoveOne = () => {
    if (!lifelines.removeOne || !question) return;
    const options = ['A', 'B', 'C', 'D'] as const;
    const availableWrong = options.filter(opt => opt !== question.correctAnswer && !hiddenOptions.includes(opt));
    if (availableWrong.length > 0) {
        const toHide = availableWrong[Math.floor(Math.random() * availableWrong.length)];
        setHiddenOptions(prev => [...prev, toHide]);
    }
    setLifelines(prev => ({ ...prev, removeOne: false }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4 md:p-8 millionaire-bg">
      {/* Sidebar Milestone */}
      <div className="hidden lg:flex w-64 flex-col gap-2 pr-6 sticky top-20 h-[80vh]">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-2 shadow-sm">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">Bậc thang điểm 2026</p>
        </div>
        <div className="flex flex-col-reverse gap-1 overflow-y-auto pr-2 custom-scrollbar">
          {MILESTONES.map(m => (
            <div 
              key={m.level} 
              className={`flex justify-between items-center px-4 py-2 rounded-xl text-[11px] font-bold transition-all border ${
                currentLevel === m.level 
                ? 'bg-blue-600 text-white border-blue-400 scale-105 shadow-md z-10' 
                : m.isSafe 
                  ? 'text-blue-600 border-blue-100 bg-blue-50' 
                  : 'text-slate-400 border-transparent'
              }`}
            >
              <span className="opacity-60">{m.level}</span>
              <span>{m.reward}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center w-full max-w-5xl mx-auto">
        {/* Header & Lifelines */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <BookOpen size={28} />
            </div>
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Khối {player.grade} - Câu {currentLevel}</p>
              <h2 className="text-xl font-extrabold text-slate-800 uppercase italic leading-none">Chinh phục triệu phú</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-3xl border border-slate-100">
             <button 
                onClick={useFiftyFifty}
                disabled={!lifelines.fiftyFifty || isAnswered}
                className="lifeline-btn flex flex-col items-center justify-center w-14 h-14 bg-white border border-slate-200 rounded-2xl text-rose-500 hover:bg-rose-50 hover:border-rose-300"
                title="Quyền 50/50"
             >
                <XCircle size={20} />
                <span className="text-[7px] font-black mt-1 uppercase">50:50</span>
             </button>
             <button 
                onClick={useChangeQuestion}
                disabled={!lifelines.changeQuestion || isAnswered}
                className="lifeline-btn flex flex-col items-center justify-center w-14 h-14 bg-white border border-slate-200 rounded-2xl text-blue-500 hover:bg-blue-50 hover:border-blue-300"
                title="Đổi câu hỏi"
             >
                <RefreshCw size={20} />
                <span className="text-[7px] font-black mt-1 uppercase">Đổi câu</span>
             </button>
             <button 
                onClick={useRemoveOne}
                disabled={!lifelines.removeOne || isAnswered}
                className="lifeline-btn flex flex-col items-center justify-center w-14 h-14 bg-white border border-slate-200 rounded-2xl text-emerald-500 hover:bg-emerald-50 hover:border-emerald-300"
                title="Bỏ 1 phương án sai"
             >
                <UserCheck size={20} />
                <span className="text-[7px] font-black mt-1 uppercase">Bỏ 1</span>
             </button>
          </div>

          <div className={`text-right px-6 py-2 rounded-2xl border ${timeLeft <= 10 ? 'border-rose-300 bg-rose-50 animate-pulse' : 'border-slate-200 bg-slate-50'}`}>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Thời gian</p>
             <p className={`text-3xl font-mono font-black ${timeLeft <= 10 ? 'text-rose-600' : 'text-slate-700'}`}>{timeLeft}s</p>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-40">
             <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
             <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-xs italic">Đang tải đề thi số hóa...</p>
          </div>
        ) : (
          <div className="w-full space-y-8 animate-in fade-in zoom-in duration-500">
            {/* INFOGRAPHIC QUESTION CARD - NỀN TRẮNG CHỮ ĐEN CỰC RÕ */}
            <div className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-2xl border-[10px] border-blue-50 flex flex-col items-center justify-center text-center min-h-[350px] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
               <div className="relative z-10 w-full">
                  {question && (
                    <MathRenderer 
                      text={question.question} 
                      className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight" 
                      isLarge 
                    />
                  )}
               </div>
            </div>

            {/* Answers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-2">
              {question && Object.entries(question.options).map(([key, value]) => {
                const isHidden = hiddenOptions.includes(key);
                return (
                  <button
                    key={key}
                    disabled={isAnswered || isHidden}
                    onClick={() => handleAnswer(key)}
                    className={`
                      ans-btn p-7 text-left relative group border-2 transition-all duration-300
                      ${isHidden ? 'opacity-0 pointer-events-none' : ''}
                      ${!isAnswered ? 'bg-white border-slate-200 hover:bg-blue-600 hover:border-blue-700 hover:scale-[1.02] shadow-sm' : ''}
                      ${isAnswered && key === question.correctAnswer ? 'bg-emerald-500 border-emerald-600 text-white shadow-xl scale-[1.04] z-10' : ''}
                      ${isAnswered && selectedOption === key && key !== question.correctAnswer ? 'bg-rose-500 border-rose-600 text-white' : ''}
                      ${isAnswered && key !== question.correctAnswer && key !== selectedOption ? 'opacity-20 grayscale' : ''}
                    `}
                  >
                    <div className="flex items-center gap-6">
                      <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                        isAnswered && key === question.correctAnswer ? 'bg-white text-emerald-700' : 'bg-slate-100 text-blue-600'
                      } group-hover:bg-white group-hover:text-blue-700 transition-colors`}>{key}</span>
                      <MathRenderer 
                        text={value} 
                        className={`text-xl md:text-2xl font-bold flex-1 ${!isAnswered ? 'text-slate-700 group-hover:text-white' : 'text-inherit'}`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-10 bg-white rounded-[3rem] border border-blue-100 shadow-lg animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-50 rounded-xl">
                      <Info size={20} className="text-blue-600" />
                   </div>
                   <h4 className="text-blue-600 font-black uppercase text-xs tracking-widest italic">Phân tích học thuật:</h4>
                </div>
                <div className="text-slate-600 text-xl leading-relaxed font-medium italic border-l-4 border-blue-200 pl-6">
                   <MathRenderer text={question?.explanation || ""} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
