
import { MathQuestion, Grade } from "../types";
import { QUESTION_POOL } from "../constants";

/**
 * Xáo trộn mảng
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function generateQuestion(grade: Grade, level: number, usedQuestions: Set<string>): MathQuestion {
  let difficulty = "Nhận biết";
  if (level > 5) difficulty = "Thông hiểu";
  if (level > 10) difficulty = "Vận dụng";
  if (level > 13) difficulty = "Vận dụng cao";

  const allPool = QUESTION_POOL[grade][difficulty];
  
  // Lọc bỏ những câu đã dùng
  let availablePool = allPool.filter(q => !usedQuestions.has(q.question));
  
  // Nếu hết câu mới trong mức độ này, dùng lại nhưng vẫn xáo trộn
  if (availablePool.length === 0) {
    availablePool = allPool;
  }

  const rawQuestion = availablePool[Math.floor(Math.random() * availablePool.length)];
  usedQuestions.add(rawQuestion.question);

  // LOGIC QUAN TRỌNG: Xáo trộn đáp án
  const originalOptions = Object.entries(rawQuestion.options); // [['A', 'val'], ['B', 'val']...]
  const correctValue = rawQuestion.options[rawQuestion.correctAnswer];
  
  const shuffledOptionsEntries = shuffleArray(originalOptions);
  
  const newOptions: any = {};
  let newCorrectKey: any = 'A';
  
  ['A', 'B', 'C', 'D'].forEach((key, index) => {
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
