
import { GoogleGenAI } from "@google/genai";
import { MathQuestion, Grade, Player } from "../types";
import { generateQuestion } from "./mathEngine";

/**
 * Hệ thống lấy câu hỏi từ kho lưu trữ cục bộ (Offline).
 */
export async function fetchMathQuestion(
  grade: Grade, 
  topic: string, // Tham số này sẽ bị bỏ qua vì lấy theo Khối
  level: number,
  usedQuestions: Set<string> = new Set()
): Promise<MathQuestion> {
  // Giả lập loading 0.5s cho cảm giác "hồi hộp"
  await new Promise(resolve => setTimeout(resolve, 500));
  // Fixed: Added usedQuestions argument as the 3rd parameter required by generateQuestion in mathEngine.ts
  return generateQuestion(grade, level, usedQuestions);
}

/**
 * Tạo báo cáo cuối cùng với nhận xét được cá nhân hóa từ AI Gemini.
 */
export async function generateFinalReport(player: Player): Promise<any> {
  try {
    // Khởi tạo Gemini AI client với API Key từ biến môi trường
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Sử dụng model gemini-3-flash-preview cho các tác vụ văn bản cơ bản
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{
        parts: [{
          text: `Bạn là trợ lý ảo của CLB Toán học trường THPT Mang Thít. 
          Hãy viết một lời nhận xét ngắn gọn (tối đa 20 từ), khích lệ và chân thành cho học sinh vừa hoàn thành cuộc thi "Ai là triệu phú Toán học".
          
          Thông tin thí sinh:
          - Họ tên: ${player.name}
          - Lớp: ${player.classRoom}
          - Điểm: ${player.score}/150
          - Thời gian hoàn thành: ${player.time}
          
          Hãy viết bằng tiếng Việt, phong cách năng động, tích cực.`
        }]
      }],
      config: {
        temperature: 0.8,
      }
    });

    return {
      comment: response.text?.trim() || "Chúc mừng bạn đã hoàn thành thử thách!",
      name: player.name,
      lop: player.classRoom,
      diem: player.score,
      thoi_gian: player.time
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Logic dự phòng nếu API gặp lỗi hoặc không có Key
    let comment = "Chúc mừng bạn đã hoàn thành thử thách!";
    if (player.score >= 150) comment = "Đỉnh cao trí tuệ! Bạn chính là nhà vô địch thực thụ.";
    else if (player.score >= 100) comment = "Xuất sắc! Kiến thức Toán học của bạn rất vững chắc.";
    else if (player.score >= 50) comment = "Khá tốt! Hãy tiếp tục rèn luyện để đạt kết quả cao hơn nhé.";

    return {
      comment,
      name: player.name,
      lop: player.classRoom,
      diem: player.score,
      thoi_gian: player.time
    };
  }
}
