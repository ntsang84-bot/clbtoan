
import React, { useState, useEffect } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import { Player, GameState } from './types';
import { AUDIO_URLS } from './constants';
import { GraduationCap, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('START');
  const [player, setPlayer] = useState<Player | null>(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [timeLimit, setTimeLimit] = useState(0);

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  const playTransitionSound = () => {
    const audio = new Audio(AUDIO_URLS.whoosh);
    audio.volume = 0.4;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const startIntro = () => {
      if (gameState === 'START') {
        const audio = new Audio(AUDIO_URLS.intro);
        audio.volume = 0.2;
        audio.loop = true;
        audio.play().catch(() => {});
        document.removeEventListener('click', startIntro);
      }
    };
    document.addEventListener('click', startIntro);
    return () => document.removeEventListener('click', startIntro);
  }, [gameState]);

  const handleStartGame = (newPlayer: Player, topic: string, limit: number) => {
    playTransitionSound();
    setPlayer({ ...newPlayer, startTime: Date.now(), isReplay: false });
    setCurrentTopic(topic);
    setTimeLimit(limit);
    setGameState('PLAYING');
  };

  const handleGameOver = (finalPoints: number) => {
    if (!player || !player.startTime) return;
    playTransitionSound();
    const endTime = Date.now();
    const durationStr = formatDuration(endTime - player.startTime);
    setPlayer({ ...player, score: finalPoints, time: durationStr });
    setGameState('RESULT');
  };

  const handleReset = (isReplay: boolean = false) => {
    if (!player) return;
    playTransitionSound();
    setPlayer({ 
      ...player, 
      score: 0, 
      time: "", 
      startTime: Date.now(),
      isReplay: isReplay 
    });
    setGameState('PLAYING');
  };

  const handleGoHome = () => {
    playTransitionSound();
    setGameState('START');
  };

  return (
    <div className="min-h-screen millionaire-bg flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/60 backdrop-blur-md border-b border-white/5 no-print">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <GraduationCap className="text-white" size={20} />
             </div>
             <div className="flex flex-col">
               <span className="font-black text-[10px] uppercase tracking-widest text-white leading-none">CLB Toán Mang Thít</span>
               <span className="text-[8px] font-black text-blue-400 uppercase tracking-tighter mt-0.5">Đấu trường trí tuệ Toán học</span>
             </div>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <Zap size={10} className="text-blue-400 fill-blue-400" />
            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">
              Hệ thống sinh đề thông minh
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-14">
        {gameState === 'START' && (
          <SetupScreen onStart={handleStartGame} onViewLeaderboard={() => setGameState('LEADERBOARD')} />
        )}
        {gameState === 'PLAYING' && player && (
          <GameScreen player={player} topic={currentTopic} timeLimit={timeLimit} onGameOver={handleGameOver} />
        )}
        {gameState === 'RESULT' && player && (
          <ResultScreen player={player} onReset={handleReset} onGoHome={handleGoHome} />
        )}
        {gameState === 'LEADERBOARD' && (
          <LeaderboardScreen onBack={() => setGameState('START')} />
        )}
      </main>
    </div>
  );
};

export default App;
