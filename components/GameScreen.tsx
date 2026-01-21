import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, MathQuestion } from '../types';
import { MILESTONES, AUDIO_URLS } from '../constants';
import { generateQuestion } from '../services/mathEngine';
import MathRenderer from './MathRenderer';
import {
  BookOpen,
  Info,
  Loader2,
  RefreshCw,
  UserCheck,
  XCircle
} from 'lucide-react';

interface GameScreenProps {
  player: Player;
  topic: string;
  timeLimit: number;
  onGameOver: (finalScore: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ player, onGameOver }) => {
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState<MathQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);

  const [lifelines, setLifelines] = useState({
    fifty: true,
    change: true,
    removeOne: true
  });

  const [hidden, setHidden] = useState<string[]>([]);
  const usedRef = useRef<Set<string>>(new Set());

  /* ================= AUDIO ================= */
  const play = (url: string, volume = 0.4) => {
    const a = new Audio(url);
    a.volume = volume;
    a.play().catch(() => {});
  };

  /* ================= LOAD QUESTION ================= */
  const loadQuestion = useCallback((lv: number, change = false) => {
    setLoading(true);
    setHidden([]);

    if (!change) {
      setTimeLeft(lv <= 5 ? 60 : lv <= 10 ? 120 : 180);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
      const q = generateQuestion(
        player.grade,
        lv,
        usedRef.current,
        player.isReplay
      );
      setQuestion(q);
      setSelected(null);
      setAnswered(false);
      setLoading(false);
      play(AUDIO_URLS.whoosh, 0.5);
    }, 600);
  }, [player]);

  useEffect(() => {
    loadQuestion(level);
  }, [level, loadQuestion]);

  /* ================= TIMER ================= */
  useEffect(() => {
    if (!question || answered || loading) return;

    if (timeLeft === 0) {
      handleAnswer('TIMEOUT');
      return;
    }

    const t = setInterval(() => {
      setTimeLeft(v => v - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft, answered, loading, question]);

  /* ================= ANSWER ================= */
  const handleAnswer = (opt: string) => {
    if (answered || loading || !question) return;

    setSelected(opt);
    setAnswered(true);
    play(AUDIO_URLS.click);

    const correct = opt === question.correctAnswer;

    setTimeout(() => {
      play(correct ? AUDIO_URLS.correct : AUDIO_URLS.wrong);
    }, 600);

    setTimeout(() => {
      if (correct) {
        if (level === 15) onGameOver(150);
        else setLevel(v => v + 1);
      } else {
        const safe =
          MILESTONES.find(m => m.level === level - 1)?.points || 0;
        onGameOver(safe);
      }
    }, 2500);
  };

  /* ================= LIFELINES ================= */
  const fiftyFifty = () => {
    if (!lifelines.fifty || !question) return;
    const wrong = ['A', 'B', 'C', 'D'].filter(
      o => o !== question.correctAnswer
    );
    setHidden(wrong.sort(() => 0.5 - Math.random()).slice(0, 2));
    setLifelines(v => ({ ...v, fifty: false }));
  };

  const changeQuestion = () => {
    if (!lifelines.change) return;
    setLifelines(v => ({ ...v, change: false }));
    loadQuestion(level, true);
  };

  const removeOne = () => {
    if (!lifelines.removeOne || !question) return;
    const wrong = ['A', 'B', 'C', 'D'].filter(
      o => o !== question.correctAnswer && !hidden.includes(o)
    );
    if (wrong.length)
      setHidden(v => [...v, wrong[Math.floor(Math.random() * wrong.length)]]);
    setLifelines(v => ({ ...v, removeOne: false }));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-4 bg-slate-50">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl shadow mb-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-600" />
          <div>
            <p className="text-xs text-slate-400 font-bold">
              Khối {player.grade} – Câu {level}
            </p>
            <h2 className="font-extrabold text-slate-800">
              AI LÀ TRIỆU PHÚ TOÁN
            </h2>
          </div>
        </div>

        <div className={`font-mono text-xl font-black ${
          timeLeft <= 10 ? 'text-red-600' : 'text-slate-700'
        }`}>
          {timeLeft}s
        </div>
      </div>

      {/* Lifelines */}
      <div className="flex gap-3 justify-center mb-4">
        <button onClick={fiftyFifty} disabled={!lifelines.fifty}>50:50</button>
        <button onClick={changeQuestion} disabled={!lifelines.change}>Đổi câu</button>
        <button onClick={removeOne} disabled={!lifelines.removeOne}>Bỏ 1</button>
      </div>

      {/* Question */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <>
          <div className="bg-white p-8 rounded-2xl shadow mb-6 text-center">
            <MathRenderer
              text={question?.question || ''}
              className="text-3xl font-bold"
              isLarge
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {question &&
              Object.entries(question.options).map(([k, v]) => (
                <button
                  key={k}
                  disabled={answered || hidden.includes(k)}
                  onClick={() => handleAnswer(k)}
                  className={`p-5 rounded-xl border text-left transition
                    ${hidden.includes(k) ? 'opacity-0' : ''}
                    ${answered && k === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : answered && selected === k
                      ? 'bg-red-500 text-white'
                      : 'bg-white hover:bg-blue-600 hover:text-white'}
                  `}
                >
                  <b>{k}.</b>{' '}
                  <MathRenderer text={v} />
                </button>
              ))}
          </div>

          {answered && (
            <div className="bg-white mt-6 p-6 rounded-xl border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-blue-600" />
                <b className="text-blue-600">Phân tích</b>
              </div>
              <MathRenderer text={question?.explanation || ''} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GameScreen;
