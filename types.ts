
export type Grade = 10 | 11 | 12;

export interface MathQuestion {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  level: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng' | 'Vận dụng cao';
}

export interface Player {
  name: string;
  grade: Grade;
  classRoom: string;
  score: number; 
  time: string; 
  startTime?: number; 
}

export type GameState = 'START' | 'PLAYING' | 'RESULT' | 'LEADERBOARD';

export interface Milestone {
  level: number;
  reward: string;
  points: number; 
  isSafe: boolean;
}

export interface CardConfig {
  gender: 'Nam' | 'Nữ';
  outfit: 'Sơ mi trắng' | 'Áo dài' | 'Vest' | 'Áo Polo học sinh';
  hair: 'Gọn gàng' | 'Dài xõa' | 'Búi cao';
  background: 'Xanh dương' | 'Trắng';
  size: '3x4' | '4x6';
  beautyLevel: 'Tự nhiên' | 'Nâng cao';
  customRequest: string;
}
