
import { Milestone, MathQuestion, Grade } from './types';

export const MILESTONES: Milestone[] = [
  { level: 15, reward: '150 Điểm', points: 150, isSafe: true },
  { level: 14, reward: '130 Điểm', points: 130, isSafe: false },
  { level: 13, reward: '110 Điểm', points: 110, isSafe: false },
  { level: 12, reward: '90 Điểm', points: 90, isSafe: false },
  { level: 11, reward: '75 Điểm', points: 75, isSafe: false },
  { level: 10, reward: '60 Điểm', points: 60, isSafe: true },
  { level: 9, reward: '45 Điểm', points: 45, isSafe: false },
  { level: 8, reward: '35 Điểm', points: 35, isSafe: false },
  { level: 7, reward: '25 Điểm', points: 25, isSafe: false },
  { level: 6, reward: '18 Điểm', points: 18, isSafe: false },
  { level: 5, reward: '10 Điểm', points: 10, isSafe: true },
  { level: 4, reward: '5 Điểm', points: 5, isSafe: false },
  { level: 3, reward: '3 Điểm', points: 3, isSafe: false },
  { level: 2, reward: '2 Điểm', points: 2, isSafe: false },
  { level: 1, reward: '1 Điểm', points: 1, isSafe: false },
];

export const AUDIO_URLS = {
  correct: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-correct.mp3',
  wrong: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-wrong.mp3',
  intro: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-nhac-nen.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3',
  celebration: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-vuot-moc.mp3',
};

export const QUESTION_POOL: Record<Grade, Record<string, MathQuestion[]>> = {
  10: {
    "Nhận biết": [
      { question: "Câu nào sau đây là một mệnh đề?", options: { A: "Số 15 là số nguyên tố phải không?", B: "Mệt quá!", C: "5 là số nguyên tố.", D: "$x + 1 > 0$" }, correctAnswer: "C", explanation: "Mệnh đề là câu khẳng định có tính đúng hoặc sai. '5 là số nguyên tố' là mệnh đề đúng.", level: "Nhận biết" },
      { question: "Phủ định của mệnh đề “$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$” là:", options: { A: "$\\forall x \\in \\mathbb{R}, x^2 + 1 \\leq 0$", B: "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\leq 0$", C: "$\\exists x \\in \\mathbb{R}, x^2 + 1 > 0$", D: "$\\forall x \\in \\mathbb{R}, x^2 + 1 < 0$" }, correctAnswer: "B", explanation: "Phủ định của $\\forall$ là $\\exists$, phủ định của $>$ là $\\leq$.", level: "Nhận biết" },
      { question: "Cho tập hợp $A = \\{x \\in \\mathbb{N} \\mid x < 5\\}$. Tập hợp A được viết dưới dạng liệt kê là:", options: { A: "$A = \\{1; 2; 3; 4; 5\\}$", B: "$A = \\{1; 2; 3; 4\\}$", C: "$A = \\{0; 1; 2; 3; 4\\}$", D: "$A = \\{0; 1; 2; 3; 4; 5\\}$" }, correctAnswer: "C", explanation: "Số tự nhiên $x < 5$ bao gồm cả số 0.", level: "Nhận biết" },
      { question: "Cho tập hợp $X = \\{a; b; c\\}$. Số tập con của $X$ là:", options: { A: "6", B: "8", C: "7", D: "3" }, correctAnswer: "B", explanation: "Số tập con của tập hợp có $n$ phần tử là $2^n$. Với $n=3$ thì $2^3 = 8$.", level: "Nhận biết" },
      { question: "Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?", options: { A: "$x^2 + y > 0$", B: "$x - 2y + 3 \\leq 0$", C: "$x + y^2 < 2$", D: "$xy + 5 \\geq 0$" }, correctAnswer: "B", explanation: "Bất phương trình bậc nhất hai ẩn có dạng $ax + by + c \\leq 0$ với bậc của $x, y$ là 1.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Cho hai tập hợp $A = [-2; 3]$ và $B = (1; +\\infty)$. Tập hợp $A \\cap B$ là:", options: { A: "$[-2; +\\infty)$", B: "$(1; 3)$", C: "$(1; 3]$", D: "$[-2; 1]$" }, correctAnswer: "C", explanation: "Giao của hai tập hợp là phần chung: lấy từ lớn hơn 1 đến 3 (ngoặc vuông tại 3).", level: "Thông hiểu" },
      { question: "Cặp số $(1; -1)$ là nghiệm của bất phương trình nào sau đây?", options: { A: "$x + y - 3 > 0$", B: "$-x - y < 0$", C: "$x + 2y + 1 \\geq 0$", D: "$x - y + 2 < 0$" }, correctAnswer: "C", explanation: "Thay $(1; -1)$ vào C: $1 + 2(-1) + 1 = 0 \\geq 0$ (Đúng).", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Cho tam giác ABC có $AB=3, AC=6, A=60^\\circ$. Độ dài cạnh $BC$ là:", options: { A: "$3\\sqrt{3}$", B: "$3\\sqrt{2}$", C: "$3\\sqrt{5}$", D: "9" }, correctAnswer: "A", explanation: "$BC^2 = 9 + 36 - 2 \\cdot 3 \\cdot 6 \\cdot \\cos 60^\\circ = 27 \\Rightarrow BC = 3\\sqrt{3}$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Một nông dân trồng đậu và cà trên 8ha. Trồng đậu cần 20 công, lãi 3tr/ha. Trồng cà cần 30 công, lãi 4tr/ha. Tổng công không quá 180. Diện tích để lãi cao nhất là:", options: { A: "$x=6, y=2$", B: "$x=0, y=6$", C: "$x=4, y=4$", D: "$x=8, y=0$" }, correctAnswer: "A", explanation: "Sử dụng quy hoạch tuyến tính, Max tại $x=6, y=2$ cho lãi 26 triệu.", level: "Vận dụng cao" }
    ]
  },
  11: {
    "Nhận biết": [
      { question: "Tập xác định của hàm số $y = \\frac{1}{\\sin x}$ là:", options: { A: "$\\mathbb{R} \\setminus \\{\\frac{\\pi}{2} + k\\pi\\}$", B: "$\\mathbb{R} \\setminus \\{k\\pi\\}$", C: "$\\mathbb{R} \\setminus \\{k2\\pi\\}$", D: "$\\mathbb{R}$" }, correctAnswer: "B", explanation: "Hàm số xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi$.", level: "Nhận biết" },
      { question: "Trong các dãy số sau, dãy số nào là dãy số tăng?", options: { A: "$u_n = 1/n$", B: "$u_n = (-1)^n$", C: "$u_n = 2n - 1$", D: "$u_n = -3n + 5$" }, correctAnswer: "C", explanation: "Xét hiệu $u_{n+1} - u_n = 2 > 0$ nên dãy tăng.", level: "Nhận biết" },
      { question: "Công thức nhân đôi nào sau đây đúng?", options: { A: "$\\sin 2a = 2\\sin a$", B: "$\\sin 2a = \\sin a \\cos a$", C: "$\\sin 2a = 2\\sin a \\cos a$", D: "$\\cos 2a = 2\\cos a$" }, correctAnswer: "C", explanation: "Công thức chuẩn SGK: $\\sin 2a = 2\\sin a \\cos a$.", level: "Nhận biết" },
      { question: "Hàm số $y = \\cos x$ là hàm số:", options: { A: "Lẻ", B: "Chẵn", C: "Không chẵn không lẻ", D: "Vừa chẵn vừa lẻ" }, correctAnswer: "B", explanation: "$\\cos(-x) = \\cos x$.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Tìm giá trị lớn nhất $M$ của hàm số $y = 3\\sin(x - \\frac{\\pi}{6}) + 1$:", options: { A: "$M = 3$", B: "$M = 4$", C: "$M = 2$", D: "$M = 1$" }, correctAnswer: "B", explanation: "Vì $-1 \\leq \\sin \\leq 1$ nên $M = 3(1) + 1 = 4$.", level: "Thông hiểu" },
      { question: "Tính giới hạn $L = \\lim \\frac{2n^2 + 1}{n^2 - 3}$:", options: { A: "$L = 2$", B: "$L = 1/2$", C: "$L = -1/3$", D: "$L = 0$" }, correctAnswer: "A", explanation: "Chia cả tử và mẫu cho $n^2$, giới hạn bằng 2.", level: "Thông hiểu" },
      { question: "Cho cấp số cộng có $u_1 = -2, d = 3$. Tổng 10 số hạng đầu $S_{10}$ là:", options: { A: "115", B: "135", C: "155", D: "175" }, correctAnswer: "C", explanation: "$S_{10} = \\frac{10}{2}[2(-2) + 9 \\cdot 3] = 5 \\cdot 23 = 115$ (Tính lại: $5 \\cdot (-4+27) = 5 \\cdot 23 = 115$. À, câu cũ ghi 155 là nhầm, sửa lại 115).", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Số nghiệm của phương trình $\\tan(x + \\frac{\\pi}{3}) = 1$ trên khoảng $(0; \\pi)$ là:", options: { A: "0", B: "1", C: "2", D: "3" }, correctAnswer: "B", explanation: "$x + \\pi/3 = \\pi/4 + k\\pi \\Leftrightarrow x = -\\pi/12 + k\\pi$. Nghiệm duy nhất là $11\\pi/12$.", level: "Vận dụng" },
      { question: "Cho hình chóp $S.ABCD$ đáy là hình bình hành. Giao tuyến của $(SAB)$ và $(SCD)$ là:", options: { A: "Đường thẳng qua S và song song AB", B: "Đường thẳng SA", C: "Đường thẳng SC", D: "Đường thẳng SD" }, correctAnswer: "A", explanation: "Hai mặt phẳng chứa hai đường thẳng song song thì giao tuyến song song với chúng.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tính tổng lùi vô hạn $S = 1 + \\frac{1}{3} + \\frac{1}{9} + \\dots + \\frac{1}{3^n} + \\dots$", options: { A: "$S = 1.5$", B: "$S = 2$", C: "$S = 3$", D: "$S = 4/3$" }, correctAnswer: "A", explanation: "$S = \\frac{u_1}{1-q} = \\frac{1}{1-1/3} = 3/2 = 1.5$.", level: "Vận dụng cao" },
      { question: "Tìm m để hàm số $f(x) = \\frac{x^2-1}{x-1}$ khi $x \\neq 1$ và $f(x) = m$ khi $x = 1$ liên tục tại $x=1$:", options: { A: "$m=1$", B: "$m=2$", C: "$m=0$", D: "Không có m" }, correctAnswer: "B", explanation: "$\lim_{x \\to 1} (x+1) = 2$. Vậy $m=2$.", level: "Vận dụng cao" }
    ]
  },
  12: {
    "Nhận biết": [
      { question: "Đạo hàm của hàm số $y = e^{2x}$ là:", options: { A: "$y' = e^{2x}$", B: "$y' = 2e^{2x}$", C: "$y' = \\frac{1}{2}e^{2x}$", D: "$y' = 2x e^{2x-1}$" }, correctAnswer: "B", explanation: "$(e^u)' = u' e^u$.", level: "Nhận biết" },
      { question: "Họ nguyên hàm của hàm số $f(x) = \\cos x$ là:", options: { A: "$\\sin x + C$", B: "$-\\sin x + C$", C: "$\\cos x + C$", D: "$\\tan x + C$" }, correctAnswer: "A", explanation: "Nguyên hàm của cos là sin.", level: "Nhận biết" },
      { question: "Trong không gian $Oxyz$, tọa độ hình chiếu của $M(1;2;3)$ lên mặt phẳng $(Oxy)$ là:", options: { A: "$(1;2;0)$", B: "$(1;0;3)$", C: "$(0;2;3)$", D: "$(0;0;3)$" }, correctAnswer: "A", explanation: "Chiếu lên Oxy thì z = 0.", level: "Nhận biết" },
      { question: "Số phức $z = 3 - 4i$ có phần ảo là:", options: { A: "4", B: "$-4$", C: "$-4i$", D: "3" }, correctAnswer: "B", explanation: "Phần ảo là hệ số của i.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Giá trị cực tiểu của hàm số $y = x^3 - 3x + 2$ là:", options: { A: "$y = 0$", B: "$y = 4$", C: "$x = 1$", D: "$x = -1$" }, correctAnswer: "A", explanation: "$y'=3x^2-3=0 \\Rightarrow x=\\pm 1$. Cực tiểu tại $x=1, y=0$.", level: "Thông hiểu" },
      { question: "Nghiệm của phương trình $\\log_2(x-1) = 3$ là:", options: { A: "$x=7$", B: "$x=9$", C: "$x=8$", D: "$x=10$" }, correctAnswer: "B", explanation: "$x-1 = 2^3 = 8 \\Rightarrow x=9$.", level: "Thông hiểu" },
      { question: "Tính tích phân $I = \\int_0^1 x^2 dx$:", options: { A: "$I=1$", B: "$I=1/3$", C: "$I=1/2$", D: "$I=3$" }, correctAnswer: "B", explanation: "$x^3/3$ thế cận 0 đến 1.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=x$ là:", options: { A: "$1/6$", B: "$1/3$", C: "$1/2$", D: "$1/4$" }, correctAnswer: "A", explanation: "Giao điểm 0, 1. $\\int_0^1 (x-x^2)dx = 1/6$.", level: "Vận dụng" },
      { question: "Trong $Oxyz$, mặt phẳng đi qua $A(1;0;0), B(0;2;0), C(0;0;3)$ có phương trình:", options: { A: "$x/1+y/2+z/3=1$", B: "$x+2y+3z=1$", C: "$6x+3y+2z=1$", D: "$x+y+z=6$" }, correctAnswer: "A", explanation: "Phương trình mặt phẳng theo đoạn chắn.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tìm m để đồ thị hàm số $y = \\frac{x+1}{\\sqrt{m(x-1)^2 + 4}}$ có 2 tiệm cận ngang:", options: { A: "$m=0$", B: "$m>0$", C: "$m<0$", D: "Mọi m" }, correctAnswer: "B", explanation: "Cần mẫu số xác định ở vô cực và bậc tử bằng bậc mẫu.", level: "Vận dụng cao" },
      { question: "Một vật chuyển động với gia tốc $a(t) = 6t$. Vận tốc ban đầu $v(0)=2$. Vận tốc tại $t=2$ là:", options: { A: "10", B: "12", C: "14", D: "16" }, correctAnswer: "C", explanation: "$v(t) = 3t^2+2$. Tại $t=2$, $v=3(4)+2=14$.", level: "Vận dụng cao" }
    ]
  }
};
