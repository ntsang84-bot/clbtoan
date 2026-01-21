
import { Player } from "../types";

const LOCAL_STORAGE_KEY = 'MATH_MILLIONAIRE_LEADERBOARD_LOCAL';

/**
 * Lưu kết quả người chơi vào LocalStorage thay vì Google Sheets.
 */
export async function savePlayerResult(data: { name: string, lop: string, diem: number, thoi_gian: string }): Promise<boolean> {
  try {
    const existingData = await getLeaderboard();
    const newData = [...existingData, { 
      ...data, 
      id: Date.now(), 
      timestamp: new Date().toLocaleString('vi-VN') 
    }];
    
    const sortedData = newData.sort((a, b) => {
      if (b.diem !== a.diem) return b.diem - a.diem;
      return a.thoi_gian.localeCompare(b.thoi_gian);
    }).slice(0, 100); // Lưu tối đa 100 kết quả
    
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

/**
 * Kiểm tra số lần đã tham gia của một học sinh cụ thể.
 */
export async function getPlayerAttemptCount(name: string, lop: string): Promise<number> {
  const leaderboard = await getLeaderboard();
  const playerAttempts = leaderboard.filter(entry => 
    entry.name.toLowerCase().trim() === name.toLowerCase().trim() && 
    entry.lop.toUpperCase().trim() === lop.toUpperCase().trim()
  );
  return playerAttempts.length;
}
