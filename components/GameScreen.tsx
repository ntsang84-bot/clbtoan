
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, MathQuestion } from '../types';
import { MILESTONES, AUDIO_URLS } from '../constants';
import { generateQuestion } from '../services/mathEngine';
import MathRenderer from './MathRenderer';
import { Trophy, Timer, Info, Loader2, BookOpen, UserCheck, RefreshCw, XCircle } from 'lucide-react';

interface GameScreenProps {
  player: Player;
  topic: string;
  timeLimit: number;
  onGameOver: (finalScore: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ player, onGameOver }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    changeQuestion: true,
    removeOne: true
  });
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);

  const usedQuestionsRef = useRef<Set<string>>(new Set());
  const thinkingAudioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = (url: string, volume: number = 0.4) => {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  const getNewQuestion = useCallback((level: number, isChange: boolean = false) => {
    setLoading(true);
    setHiddenOptions([]);
    
    if (!isChange) {
      setTimeLeft(level <= 5 ? 60 : level <= 10 ? 120 : 180);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      try {
        const q = generateQuestion(player.grade, level, usedQuestionsRef.current, player.isReplay);
        setQuestion(q);
      } catch (err) {
        console.error("Lỗi nạp câu hỏi:", err);
      } finally {
        setLoading(false);
        setSelectedOption(null);
        setIsAnswered(false);
        
        playAudio(AUDIO_URLS.questionAppear, 0.5);
        
        if (thinkingAudioRef.current) {
          thinkingAudioRef.current.pause();
        }
        thinkingAudioRef.current = new Audio(AUDIO_URLS.thinking);
        thinkingAudioRef.current.volume = 0.15;
        thinkingAudioRef.current.loop = true;
        thinkingAudioRef.current.play().catch(() => {});
      }
    }, 800);
  }, [player.grade, player.isReplay]);

  useEffect(() => {
    getNewQuestion(currentLevel);
    return () => {
      if (thinkingAudioRef.current) {
        thinkingAudioRef.current.pause();
      }
    };
  }, [currentLevel, getNewQuestion]);

  useEffect(() => {
    let interval: any;
    if (question && !isAnswered && !loading && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered && !loading && question) {
      handleAnswer('TIMEOUT');
    }
    return () => clearInterval(interval);
  }, [timeLeft, isAnswered, question, loading]);

  const handleAnswer = (opt: string) => {
    if (isAnswered || loading) return;
    
    if (thinkingAudioRef.current) {
      thinkingAudioRef.current.pause();
    }

    playAudio(AUDIO_URLS.click, 0.4);
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === question?.correctAnswer;
    
    setTimeout(() => {
      if (isCorrect) {
        const milestone = MILESTONES.find(m => m.level === currentLevel);
        if (milestone?.isSafe) {
          playAudio(AUDIO_URLS.celebration, 0.6);
        } else {
          playAudio(AUDIO_URLS.correct, 0.5);
        }
      } else {
        if (opt !== 'TIMEOUT') playAudio(AUDIO_URLS.wrong, 0.5);
      }
    }, 800);

    setTimeout(() => {
      if (isCorrect) {
        if (currentLevel === 15) {
          onGameOver(150);
        } else {
          setCurrentLevel(prev => prev + 1);
        }
      } else {
        const finalPoints = MILESTONES.find(m => m.level === currentLevel - 1)?.points || 0;
        onGameOver(finalPoints);
      }
    }, 3200);
  };

  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty || !question) return;
    playAudio(AUDIO_URLS.click);
    const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const wrongOptions = options.filter(opt => opt !== question.correctAnswer);
    const toHide = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
    setHiddenOptions(prev => [...prev, ...toHide]);
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
  };

  const useChangeQuestion = () => {
    if (!lifelines.changeQuestion) return;
    playAudio(AUDIO_URLS.click);
    setLifelines(prev => ({ ...prev, changeQuestion: false }));
    getNewQuestion(currentLevel, true);
  };

  const useRemoveOne = () => {
    if (!lifelines.removeOne || !question) return;
    playAudio(AUDIO_URLS.click);
    const options: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    const availableWrong = options.filter(opt => opt !== question.correctAnswer && !hiddenOptions.includes(opt));
    if (availableWrong.length > 0) {
        const toHide = availableWrong[Math.floor(Math.random() * availableWrong.length)];
        setHiddenOptions(prev => [...prev, toHide]);
    }
    setLifelines(prev => ({ ...prev, removeOne: false }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-3 md:p-8 millionaire-bg overflow-y-auto scroll-smooth">
      {/* Cột điểm số bên trái - Desktop */}
      <div className="hidden lg:flex w-64 flex-col gap-2 pr-6 sticky top-20 h-fit">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-2 shadow-sm">
           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest text-center">Tiến trình 2026</p>
        </div>
        <div className="flex flex-col-reverse gap-1 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
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

      <div className="flex-1 flex flex-col items-center w-full max-w-5xl mx-auto pb-10">
        {/* Status Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 md:p-6 rounded-[2rem] border border-slate-200 shadow-sm gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600 shrink-0">
              <BookOpen size={24} />
            </div>
            <div className="overflow-hidden">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-0.5">Khối {player.grade} • Thí sinh {player.name}</p>
              <h2 className="text-sm md:text-lg font-extrabold text-slate-800 uppercase italic">Câu hỏi số {currentLevel}</h2>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 md:gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100 w-full md:w-auto">
             <button onClick={useFiftyFifty} disabled={!lifelines.fiftyFifty || isAnswered} className="lifeline-btn flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl text-rose-500">
                <XCircle size={18} />
                <span className="text-[6px] font-black mt-1 uppercase">50:50</span>
             </button>
             <button onClick={useChangeQuestion} disabled={!lifelines.changeQuestion || isAnswered} className="lifeline-btn flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl text-blue-500">
                <RefreshCw size={18} />
                <span className="text-[6px] font-black mt-1 uppercase">Đổi câu</span>
             </button>
             <button onClick={useRemoveOne} disabled={!lifelines.removeOne || isAnswered} className="lifeline-btn flex flex-col items-center justify-center w-12 h-12 bg-white border border-slate-200 rounded-xl text-emerald-500">
                <UserCheck size={18} />
                <span className="text-[6px] font-black mt-1 uppercase">Bỏ 1</span>
             </button>
          </div>

          <div className={`flex flex-row md:flex-col items-center md:items-end justify-between px-5 py-2 rounded-2xl border w-full md:w-auto ${timeLeft <= 10 ? 'border-rose-300 bg-rose-50 animate-pulse' : 'border-slate-200 bg-slate-50'}`}>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest md:hidden">Thời gian</p>
             <p className={`text-2xl font-mono font-black ${timeLeft <= 10 ? 'text-rose-600' : 'text-slate-700'}`}>{timeLeft}s</p>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20">
             <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs italic">Đang chuẩn bị câu hỏi...</p>
          </div>
        ) : (
          <div className="w-full space-y-4 md:space-y-6 animate-in fade-in zoom-in duration-500">
            
            {/* VÙNG CÂU HỎI - CÓ THANH CUỘN NGANG CHO CÔNG THỨC DÀI */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border-4 border-blue-50 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
               <div className="scroll-container overflow-x-auto pb-4">
                  {question && (
                    <MathRenderer 
                      text={question.question} 
                      className="text-lg md:text-3xl font-extrabold text-slate-900 leading-snug min-w-full" 
                      isLarge 
                    />
                  )}
               </div>
            </div>

            {/* VÙNG ĐÁP ÁN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {question && Object.entries(question.options).map(([key, value]) => {
                const isHidden = hiddenOptions.includes(key);
                return (
                  <button
                    key={key}
                    disabled={isAnswered || isHidden}
                    onClick={() => handleAnswer(key)}
                    className={`
                      ans-btn p-4 md:p-6 text-left relative group border-2 transition-all duration-300
                      ${isHidden ? 'opacity-0 pointer-events-none' : ''}
                      ${!isAnswered ? 'bg-white border-slate-200 hover:bg-blue-600 hover:border-blue-700 shadow-sm' : ''}
                      ${isAnswered && key === question.correctAnswer ? 'bg-emerald-500 border-emerald-600 text-white shadow-lg scale-[1.01] z-10' : ''}
                      ${isAnswered && selectedOption === key && key !== question.correctAnswer ? 'bg-rose-500 border-rose-600 text-white' : ''}
                      ${isAnswered && key !== question.correctAnswer && key !== selectedOption ? 'opacity-20 grayscale' : ''}
                    `}
                  >
                    <div className="flex items-center gap-4 scroll-container overflow-x-auto">
                      <span className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-inner ${
                        isAnswered && key === question.correctAnswer ? 'bg-white text-emerald-700' : 'bg-slate-100 text-blue-600'
                      } group-hover:bg-white group-hover:text-blue-700 transition-colors`}>{key}</span>
                      <div className="flex-1">
                        <MathRenderer 
                          text={value} 
                          className={`text-base md:text-xl font-bold ${!isAnswered ? 'text-slate-700 group-hover:text-white' : 'text-inherit'}`} 
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* VÙNG GIẢI THÍCH - CÓ THANH CUỘN DỌC NẾU QUÁ DÀI */}
            {isAnswered && (
              <div className="p-6 md:p-8 bg-white rounded-[2.5rem] border border-blue-100 shadow-md animate-in slide-in-from-top-4">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                     <Info size={20} />
                   </div>
                   <h4 className="text-blue-600 font-black uppercase text-[10px] tracking-widest italic">Phân tích học thuật:</h4>
                </div>
                <div className="text-slate-600 text-base md:text-lg leading-relaxed font-medium italic border-l-4 border-blue-200 pl-4 overflow-x-auto scroll-container max-h-[300px] overflow-y-auto">
                   <MathRenderer text={question?.explanation || "Vui lòng chờ giây lát..."} />
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
