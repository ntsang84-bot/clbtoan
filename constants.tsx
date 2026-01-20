
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
  wrong: 'https://www.myinstants.com/media/sounds/wrong-answer.mp3',
  intro: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-nhac-nen.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  whoosh: 'https://assets.mixkit.co/active_storage/sfx/2004/2004-preview.mp3',
};

export const QUESTION_POOL: Record<Grade, Record<string, MathQuestion[]>> = {
  10: {
    "Nhận biết": [
      { question: "Mệnh đề phủ định của “$\\exists x \\in \\mathbb{R}, x^2 + 1 = 0$” là:", options: { A: "$\\forall x \\in \\mathbb{R}, x^2 + 1 \\neq 0$", B: "$\\forall x \\in \\mathbb{R}, x^2 + 1 = 0$", C: "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\neq 0$", D: "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$" }, correctAnswer: "A", explanation: "Phủ định của $\\exists$ là $\\forall$, phủ định của $=$ là $\\neq$.", level: "Nhận biết" },
      { question: "Hàm số $y = x^2 - 4x + 3$ có trục đối xứng là:", options: { A: "$x=2$", B: "$x=-2$", C: "$x=4$", D: "$x=1$" }, correctAnswer: "A", explanation: "Trục đối xứng $x = -b/2a = 4/2 = 2$.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Tập hợp $A = [-2; 4)$ và $B = [0; 5]$. Tìm $A \\setminus B$:", options: { A: "$[-2; 0)$", B: "$[-2; 0]$", C: "$[4; 5]$", D: "$[0; 4)$" }, correctAnswer: "A", explanation: "Phần tử thuộc A nhưng không thuộc B.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Tam giác ABC có $b=4, c=5, A=60^\\circ$. Độ dài cạnh $a$ là:", options: { A: "$\\sqrt{21}$", B: "$\\sqrt{61}$", C: "21", D: "3" }, correctAnswer: "A", explanation: "$a^2 = b^2+c^2-2bc\\cos A = 16+25-20=21$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": []
  },
  11: {
    "Nhận biết": [
      { question: "Đổi số đo của góc $\\alpha = 30^\\circ$ sang ra-đi-an:", options: { A: "$\\pi/3$", B: "$\\pi/6$", C: "$\\pi/4$", D: "$\\pi/2$" }, correctAnswer: "B", explanation: "$30 \\cdot \\pi/180 = \\pi/6$.", level: "Nhận biết" },
      { question: "Khẳng định nào sau đây SAI?", options: { A: "$\\sin^2 x + \\cos^2 x = 1$", B: "$\\tan x = \\cos x / \\sin x$", C: "$\\sin 2x = 2\\sin x \\cos x$", D: "$\\cos 2x = \\cos^2 x - \\sin^2 x$" }, correctAnswer: "B", explanation: "Công thức đúng là $\\tan x = \\sin x / \\cos x$.", level: "Nhận biết" },
      { question: "Tập xác định của hàm số $y = \\frac{1}{\\sin x}$ là:", options: { A: "$\\mathbb{R} \\setminus \\{\\pi/2 + k\\pi\\}$", B: "$\\mathbb{R} \\setminus \\{k2\\pi\\}$", C: "$\\mathbb{R} \\setminus \\{k\\pi\\}$", D: "$\\mathbb{R}$" }, correctAnswer: "C", explanation: "Điều kiện $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi$.", level: "Nhận biết" },
      { question: "Cho cấp số cộng $(u_n)$ có $u_1 = -2, d = 3$. Số hạng $u_2$ là:", options: { A: "-6", B: "1", C: "5", D: "-5" }, correctAnswer: "B", explanation: "$u_2 = u_1 + d = -2 + 3 = 1$.", level: "Nhận biết" },
      { question: "Với $a > 0$, biểu thức $a^{1/3}$ viết dưới dạng căn thức là:", options: { A: "$\\sqrt{a}$", B: "$\\sqrt[3]{a}$", C: "$a^3$", D: "$1/a^3$" }, correctAnswer: "B", explanation: "$a^{m/n} = \\sqrt[n]{a^m}$.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Nghiệm của phương trình $\\cos x = \\frac{\\sqrt{2}}{2}$ là:", options: { A: "$x = \\pm \\pi/4 + k2\\pi$", B: "$x = \\pm \\pi/3 + k2\\pi$", C: "$x = \\pi/4 + k2\\pi$", D: "$x = \\pm 3\\pi/4 + k2\\pi$" }, correctAnswer: "A", explanation: "Giá trị cơ bản của hàm cos.", level: "Thông hiểu" },
      { question: "Giá trị lớn nhất M của hàm số $y = 3\\sin(2x - \\pi/6) + 1$ là:", options: { A: "3", B: "4", C: "2", D: "5" }, correctAnswer: "B", explanation: "$M = 3(1) + 1 = 4$.", level: "Thông hiểu" },
      { question: "Tìm $x$ để $x-1; x; x+2$ lập thành cấp số nhân:", options: { A: "1", B: "-1", C: "2", D: "-2" }, correctAnswer: "C", explanation: "$x^2 = (x-1)(x+2) \\Rightarrow x=2$.", level: "Thông hiểu" },
      { question: "Dãy số nào sau đây là dãy số tăng?", options: { A: "$u_n = 1/n$", B: "$u_n = -2n+1$", C: "$u_n = 2n-1$", D: "$u_n = (-1)^n$" }, correctAnswer: "C", explanation: "Hàm bậc nhất có hệ số góc dương.", level: "Thông hiểu" },
      { question: "Tính giới hạn $L = \\lim \\frac{2n+1}{n-3}$:", options: { A: "2", B: "1", C: "-1", D: "$+\\infty$" }, correctAnswer: "A", explanation: "Bậc tử bằng bậc mẫu, lấy hệ số chia nhau.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Số nghiệm của phương trình $\\tan(x + \\pi/3) = \\sqrt{3}$ trên khoảng $(0; 2\\pi)$ là:", options: { A: "2", B: "1", C: "3", D: "0" }, correctAnswer: "B", explanation: "$x + \\pi/3 = \\pi/3 + k\\pi \\Rightarrow x = k\\pi$. Trong $(0; 2\\pi)$ chỉ có $x=\\pi$.", level: "Vận dụng" },
      { question: "Tổng 10 số hạng đầu của cấp số cộng $2, 5, 8, \\dots$ là:", options: { A: "150", B: "155", C: "145", D: "200" }, correctAnswer: "B", explanation: "$S_{10} = \\frac{10}{2}[2\\cdot 2 + 9\\cdot 3] = 155$.", level: "Vận dụng" },
      { question: "Trong không gian, qua một điểm nằm ngoài đường thẳng, có bao nhiêu đường thẳng song song với nó?", options: { A: "0", B: "2", C: "Vô số", D: "1" }, correctAnswer: "D", explanation: "Tiên đề Euclid trong không gian.", level: "Vận dụng" },
      { question: "Cho hình vuông ABCD cạnh $a$. Tính $|\\vec{AB} + \\vec{AC}|$:", options: { A: "$a\\sqrt{2}$", B: "$a\\sqrt{5}$", C: "$2a$", D: "$a\\sqrt{3}$" }, correctAnswer: "B", explanation: "Tính độ dài vectơ tổng trong hình học tọa độ.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tìm tất cả giá trị $m$ để $4^x - 2\\cdot 2^x + m = 0$ có nghiệm:", options: { A: "$m > 1$", B: "$m \\leq 1$", C: "$m \\geq 0$", D: "$m < 0$" }, correctAnswer: "B", explanation: "Đặt $t=2^x > 0$, xét bảng biến thiên hàm bậc hai.", level: "Vận dụng cao" },
      { question: "Tính tổng $S = 1 + 1/2 + 1/4 + \\dots + 1/2^n + \\dots$:", options: { A: "1", B: "2", C: "1.5", D: "+\\infty$" }, correctAnswer: "B", explanation: "Cấp số nhân lùi vô hạn $S = \\frac{u_1}{1-q} = 2$.", level: "Vận dụng cao" }
    ]
  },
  12: {
    "Nhận biết": [
      { question: "Điểm cực đại của đồ thị hàm số $y = x^3 - 3x + 2$ là:", options: { A: "$(1; 0)$", B: "$(-1; 4)$", C: "$(0; 2)$", D: "$(2; 4)$" }, correctAnswer: "B", explanation: "$y'=0 \\Rightarrow x=\\pm 1$. Tại $x=-1, y=4$.", level: "Nhận biết" },
      { question: "Tiệm cận ngang của đồ thị hàm số $y = \\frac{2x-1}{x+1}$ là:", options: { A: "$x=-1$", B: "$y=-1$", C: "$y=2$", D: "$x=2$" }, correctAnswer: "C", explanation: "Giới hạn tại vô cực bằng 2.", level: "Nhận biết" },
      { question: "Họ nguyên hàm của hàm số $f(x) = x^2$ là:", options: { A: "$2x+C$", B: "$x^3/3 + C$", C: "$x^3+C$", D: "$x^2/2+C$" }, correctAnswer: "B", explanation: "Công thức cơ bản $\\int x^n dx$.", level: "Nhận biết" },
      { question: "Vectơ đơn vị của trục $Oz$ trong hệ tọa độ $Oxyz$ là:", options: { A: "$\\vec{i}=(1;0;0)$", B: "$\\vec{j}=(0;1;0)$", C: "$\\vec{k}=(0;0;1)$", D: "$\\vec{0}=(0;0;0)$" }, correctAnswer: "C", explanation: "Trục cao tương ứng với vectơ k.", level: "Nhận biết" },
      { question: "Vectơ pháp tuyến của mặt phẳng $(P): 2x - 3y + z - 1 = 0$ là:", options: { A: "$\\vec{n}=(2;3;1)$", B: "$\\vec{n}=(2;-3;1)$", C: "$\\vec{n}=(2;-3;-1)$", D: "$\\vec{n}=(-2;-3;1)$" }, correctAnswer: "B", explanation: "Hệ số đứng trước x, y, z.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Giá trị nhỏ nhất của $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ là:", options: { A: "3", B: "2", C: "11", D: "1" }, correctAnswer: "B", explanation: "$f'(x)=0 \\Rightarrow x=1$. So sánh các giá trị biên và cực trị.", level: "Thông hiểu" },
      { question: "Tiệm cận đứng của đồ thị hàm số $y = \\frac{x+2}{x-3}$ là:", options: { A: "$y=1$", B: "$x=3$", C: "$x=-2$", D: "$y=3$" }, correctAnswer: "B", explanation: "Mẫu số bằng 0 tại $x=3$.", level: "Thông hiểu" },
      { question: "Tọa độ trọng tâm G của tam giác ABC với $A(1;0;0), B(0;2;0), C(0;0;3)$:", options: { A: "$(1;2;3)$", B: "$(1/2;1;3/2)$", C: "$(1/3;2/3;1)$", D: "$(3;6;9)$" }, correctAnswer: "C", explanation: "Trung bình cộng tọa độ 3 đỉnh.", level: "Thông hiểu" },
      { question: "Tính tích phân $I = \\int_0^1 x^2 dx$:", options: { A: "1", B: "1/3", C: "1/2", D: "2" }, correctAnswer: "B", explanation: "Áp dụng định nghĩa Newton-Leibniz.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Diện tích hình phẳng giới hạn bởi parabol $y = x^2 - 2x$ và trục hoành là:", options: { A: "4/3", B: "2/3", C: "2", D: "8/3" }, correctAnswer: "A", explanation: "Tích phân trị tuyệt đối hàm số từ 0 đến 2.", level: "Vận dụng" },
      { question: "Vận tốc vật $v(t) = 3t^2 + 2$. Quãng đường đi được trong 2 giây đầu là:", options: { A: "10m", B: "12m", C: "8m", D: "14m" }, correctAnswer: "B", explanation: "$S = \\int_0^2 v(t) dt = [t^3 + 2t]_0^2 = 12$.", level: "Vận dụng" },
      { question: "Tìm $m$ để $y = x^4 - 2mx^2 + 1$ có 3 điểm cực trị:", options: { A: "$m \\leq 0$", B: "$m > 0$", C: "$m < 0$", D: "$m \\geq 0$" }, correctAnswer: "B", explanation: "Điều kiện $ab < 0$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tìm $m$ để $f(x) = \\sin^4 x + \\cos^4 x = m$ có nghiệm:", options: { A: "$m \\in [0;1]$", B: "$m \\in [1/4;1]$", C: "$m \\in [1/2;1]$", D: "$m \\in [0;1/2]$" }, correctAnswer: "C", explanation: "Biến đổi biểu thức về dạng hàm bậc hai theo $\\sin^2 2x$.", level: "Vận dụng cao" },
      { question: "Tính tích phân $I = \\int_1^e \\frac{\\ln x}{x} dx$:", options: { A: "1", B: "1/2", C: "e", D: "2" }, correctAnswer: "B", explanation: "Sử dụng phương pháp đổi biến số $t = \\ln x$.", level: "Vận dụng cao" }
    ]
  }
};
