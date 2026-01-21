
import { MathQuestion, Grade } from "../types";
import { QUESTION_POOL } from "../constants";

const HISTORY_KEY = 'MATH_QUESTION_GLOBAL_HISTORY';

/**
 * Lấy lịch sử các câu hỏi đã làm từ localStorage để tránh trùng lặp tuyệt đối.
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
  // Giới hạn lưu trữ 500 câu hỏi gần nhất để tối ưu bộ nhớ
  if (historyArray.length > 500) historyArray.shift();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(historyArray));
}

/**
 * Xáo trộn mảng dùng thuật toán Fisher-Yates.
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
 * Tạo câu hỏi đảm bảo ngẫu nhiên và KHÔNG BAO GIỜ lặp lại nếu còn câu mới.
 */
export function generateQuestion(grade: Grade, level: number, sessionUsed: Set<string>, isReplay: boolean = false): MathQuestion {
  // Logic tăng độ khó: Khi Replay, các bậc độ khó được nâng lên sớm hơn
  const effectiveLevel = isReplay ? level + 2 : level;
  
  let difficulty: keyof typeof QUESTION_POOL[Grade];
  if (effectiveLevel > 13) difficulty = "Vận dụng cao";
  else if (effectiveLevel > 9) difficulty = "Vận dụng";
  else if (effectiveLevel > 4) difficulty = "Thông hiểu";
  else difficulty = "Nhận biết";

  let allPool = [...(QUESTION_POOL[grade][difficulty] || [])];
  
  // Nếu pool của độ khó này trống, lấy pool mặc định "Nhận biết"
  if (allPool.length === 0) {
     allPool = [...(QUESTION_POOL[grade]["Nhận biết"] || [])];
  }

  const globalHistory = getGlobalHistory();
  
  // 1. Ưu tiên TUYỆT ĐỐI: Chưa dùng trong session này VÀ chưa từng trả lời trong quá khứ
  let availablePool = allPool.filter(q => !sessionUsed.has(q.question) && !globalHistory.has(q.question));
  
  // 2. Dự phòng: Nếu đã dùng hết sạch câu mới, cho phép dùng lại từ lịch sử nhưng KHÔNG TRÙNG trong session hiện tại
  if (availablePool.length === 0) {
    availablePool = allPool.filter(q => !sessionUsed.has(q.question));
  }
  
  // 3. Cuối cùng: Nếu vẫn không còn câu nào (pool cực nhỏ), lấy đại một câu
  if (availablePool.length === 0) {
    availablePool = allPool;
  }

  // Xáo trộn ngẫu nhiên danh sách khả dụng
  const shuffledPool = shuffleArray(availablePool);
  const rawQuestion = shuffledPool[Math.floor(Math.random() * shuffledPool.length)];
  
  // Đánh dấu đã sử dụng
  sessionUsed.add(rawQuestion.question);
  updateGlobalHistory(rawQuestion.question);

  // Xáo trộn vị trí đáp án (A, B, C, D) để chống học vẹt
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


export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
