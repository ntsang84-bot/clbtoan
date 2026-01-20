
import { Player } from "../types";

const LOCAL_STORAGE_KEY = 'MATH_MILLIONAIRE_LEADERBOARD_LOCAL';

/**
 * Lưu kết quả người chơi vào LocalStorage thay vì Google Sheets.
 * Giữ nguyên cấu trúc dữ liệu để không làm hỏng tính năng bảng xếp hạng.
 */
export async function savePlayerResult(data: { name: string, lop: string, diem: number, thoi_gian: string }): Promise<boolean> {
  try {
    const existingData = await getLeaderboard();
    const newData = [...existingData, { 
      ...data, 
      id: Date.now(), 
      timestamp: new Date().toLocaleString('vi-VN') 
    }];
    
    // Sắp xếp theo điểm giảm dần và thời gian nhanh hơn (nếu bằng điểm)
    const sortedData = newData.sort((a, b) => {
      if (b.diem !== a.diem) return b.diem - a.diem;
      return a.thoi_gian.localeCompare(b.thoi_gian);
    }).slice(0, 50); // Lưu tối đa 50 người cao nhất
    
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sortedData));
    return true;
  } catch (error) {
    console.error("Lỗi lưu trữ dữ liệu nội bộ:", error);
    return false;
  }
}

/**
 * Lấy danh sách bảng xếp hạng từ bộ nhớ trình duyệt.
 */
export async function getLeaderboard(): Promise<any[]> {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Lỗi đọc dữ liệu bảng xếp hạng:", error);
    return [];
  }
}
