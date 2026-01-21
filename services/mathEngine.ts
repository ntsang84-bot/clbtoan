
import { MathQuestion, Grade } from "../types";
import { QUESTION_POOL } from "../constants";

const HISTORY_KEY = 'MATH_QUESTION_HISTORY';

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
  // Giới hạn lịch sử 200 câu gần nhất để không làm đầy bộ nhớ
  if (historyArray.length > 200) historyArray.shift();
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
 * Tạo câu hỏi đảm bảo ngẫu nhiên hoàn toàn và không trùng lặp.
 * isReplay: Nếu là lượt chơi lại, ưu tiên lấy câu hỏi từ cuối danh sách (nửa cuối chương).
 */
export function generateQuestion(grade: Grade, level: number, sessionUsed: Set<string>, isReplay: boolean = false): MathQuestion {
  let difficulty: keyof typeof QUESTION_POOL[Grade] = "Nhận biết";
  if (level > 5) difficulty = "Thông hiểu";
  if (level > 10) difficulty = "Vận dụng";
  if (level > 13) difficulty = "Vận dụng cao";

  let allPool = [...QUESTION_POOL[grade][difficulty]];
  
  // Logic "Lấy từ cuối đến đầu hoặc nửa cuối đến cuối" khi chơi lại
  if (isReplay) {
    // Đảo ngược pool hoặc chỉ lấy nửa sau để tạo cảm giác "mới mẻ" từ cuối chương
    const midIndex = Math.floor(allPool.length / 2);
    const secondHalf = allPool.slice(midIndex).reverse();
    const firstHalf = allPool.slice(0, midIndex).reverse();
    allPool = [...secondHalf, ...firstHalf];
  }

  const globalHistory = getGlobalHistory();
  
  // 1. Lọc ra các câu hỏi CHƯA TỪNG dùng trong session này VÀ CHƯA TỪNG dùng trong lịch sử (ưu tiên)
  let availablePool = allPool.filter(q => !sessionUsed.has(q.question) && !globalHistory.has(q.question));
  
  // 2. Nếu kho câu hỏi mới cạn kiệt, cho phép dùng lại từ lịch sử nhưng vẫn KHÔNG ĐƯỢC trùng trong session này
  if (availablePool.length === 0) {
    availablePool = allPool.filter(q => !sessionUsed.has(q.question));
  }
  
  // 3. Trường hợp xấu nhất: Lấy đại 1 câu trừ câu vừa mới làm
  if (availablePool.length === 0) {
    const sessionArray = Array.from(sessionUsed);
    const lastQuestion = sessionArray[sessionArray.length - 1];
    availablePool = allPool.filter(q => q.question !== lastQuestion);
  }

  // Nếu là Replay, chúng ta không chọn ngẫu nhiên hoàn toàn mà ưu tiên các phần tử đầu tiên của pool đã được xử lý (cuối chương)
  // Nhưng vẫn giữ tính ngẫu nhiên nhẹ bằng cách chọn trong 3 câu đầu tiên khả dụng
  const pickRange = isReplay ? Math.min(3, availablePool.length) : availablePool.length;
  const randomIndex = Math.floor(Math.random() * pickRange);
  const rawQuestion = availablePool[randomIndex];
  
  sessionUsed.add(rawQuestion.question);
  updateGlobalHistory(rawQuestion.question);

  // XÁO TRỘN ĐÁP ÁN
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
