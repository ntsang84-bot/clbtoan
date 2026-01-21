
import { MathQuestion, Grade } from "../types";
import { QUESTION_POOL } from "../constants";

const HISTORY_KEY = 'MATH_QUESTION_GLOBAL_HISTORY';

/**
 * Lấy lịch sử các câu hỏi đã làm từ localStorage để tránh trùng lặp giữa các phiên chơi.
 */
function getGlobalHistory(): Set<string> {
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

/**
 * Cập nhật lịch sử câu hỏi vào localStorage.
 */
function updateGlobalHistory(question: string) {
  const historySet = getGlobalHistory();
  historySet.add(question);
  const historyArray = Array.from(historySet);
  // Giới hạn lịch sử 300 câu gần nhất
  if (historyArray.length > 300) historyArray.shift();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historyArray));
}

/**
 * Xáo trộn mảng dùng thuật toán Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

/**
 * Tạo câu hỏi đảm bảo ngẫu nhiên và tăng độ khó nếu là lượt chơi lại.
 */
export function generateQuestion(grade: Grade, level: number, sessionUsed: Set<string>, isReplay: boolean = false): MathQuestion {
  // Logic tăng độ khó: Khi Replay, các câu hỏi khó sẽ xuất hiện sớm hơn 2 bậc
  const effectiveLevel = isReplay ? level + 2 : level;
  
  let difficulty: keyof typeof QUESTION_POOL[Grade];
  if (effectiveLevel > 13) difficulty = "Vận dụng cao";
  else if (effectiveLevel > 10) difficulty = "Vận dụng";
  else if (effectiveLevel > 5) difficulty = "Thông hiểu";
  else difficulty = "Nhận biết";

  let allPool = [...(QUESTION_POOL[grade][difficulty] || [])];
  
  // Nếu pool của độ khó này trống (do dữ liệu chưa cập nhật đủ), lùi lại độ khó thấp hơn
  if (allPool.length === 0) {
     allPool = [...(QUESTION_POOL[grade]["Nhận biết"] || [])];
  }

  const globalHistory = getGlobalHistory();
  
  // 1. Ưu tiên: Chưa dùng trong session NÀY và chưa dùng trong LỊCH SỬ toàn cục
  let availablePool = allPool.filter(q => !sessionUsed.has(q.question) && !globalHistory.has(q.question));
  
  // 2. Dự phòng: Nếu hết câu mới hoàn toàn, cho phép dùng lại câu từ lịch sử nhưng KHÔNG ĐƯỢC trùng trong session này
  if (availablePool.length === 0) {
    availablePool = allPool.filter(q => !sessionUsed.has(q.question));
  }
  
  // 3. Cuối cùng: Nếu vẫn hết (trường hợp hiếm), lấy đại một câu bất kỳ trừ câu vừa mới làm xong
  if (availablePool.length === 0) {
    availablePool = allPool;
  }

  // Luôn xáo trộn pool khả dụng trước khi chọn
  const shuffledPool = shuffleArray(availablePool);
  const rawQuestion = shuffledPool[0];
  
  // Lưu vào bộ nhớ session và bộ nhớ toàn cục
  sessionUsed.add(rawQuestion.question);
  updateGlobalHistory(rawQuestion.question);

  // XÁO TRỘN ĐÁP ÁN để người chơi không học thuộc lòng vị trí A, B, C, D
  const originalOptions = Object.entries(rawQuestion.options);
  const correctValue = rawQuestion.options[rawQuestion.correctAnswer];
  const shuffledOptionsEntries = shuffleArray(originalOptions);
  
  const newOptions: any = {};
  let newCorrectKey: 'A' | 'B' | 'C' | 'D' = 'A';
  
  const keys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  keys.forEach((key, index) => {
    const optionValue = shuffledOptionsEntries[index][1];
    newOptions[key] = optionValue;
    if (optionValue === correctValue) {
      newCorrectKey = key;
    }
  });

  return {
    ...rawQuestion,
    options: newOptions,
    correctAnswer: newCorrectKey
  };
}
