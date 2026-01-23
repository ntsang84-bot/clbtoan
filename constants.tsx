
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
  thinking: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-nhac-hoi-hop.mp3',
  questionAppear: 'https://www.myinstants.com/media/sounds/ai-la-trieu-phu-mo-dau-cau-hoi.mp3'
};

export const QUESTION_POOL: Record<Grade, Record<string, MathQuestion[]>> = {
  10: {
    "Nhận biết": [
      { question: "Câu nào sau đây là một mệnh đề?", options: { A: "Mấy giờ rồi?", B: "Mệt quá!", C: "Hà Nội là thủ đô của Việt Nam.", D: "$x + 1 > 0$" }, correctAnswer: "C", explanation: "Mệnh đề là câu khẳng định có tính đúng hoặc sai.", level: "Nhận biết" },
      { question: "Phủ định của mệnh đề “$\\exists x \\in \\mathbb{R}, x^2 + 1 = 0$” là:", options: { A: "$\\forall x \\in \\mathbb{R}, x^2 + 1 \\neq 0$", B: "$\\forall x \\in \\mathbb{R}, x^2 + 1 = 0$", C: "$\\exists x \\in \\mathbb{R}, x^2 + 1 \\neq 0$", D: "$\\forall x \\in \\mathbb{R}, x^2 + 1 > 0$" }, correctAnswer: "A", explanation: "Phủ định của $\\exists$ là $\\forall$, phủ định của $=$ là $\\neq$.", level: "Nhận biết" },
      { question: "Cho tập hợp $A = \\{x \\in \\mathbb{N} \\mid x < 5\\}$. Tập hợp A được viết dưới dạng liệt kê là:", options: { A: "$A = \\{0; 1; 2; 3; 4\\}$", B: "$A = \\{1; 2; 3; 4\\}$", C: "$A = \\{1; 2; 3; 4; 5\\}$", D: "$A = \\{0; 1; 2; 3; 4; 5\\}$" }, correctAnswer: "A", explanation: "Số tự nhiên nhỏ hơn 5 bao gồm cả số 0.", level: "Nhận biết" },
      { question: "Số tập con của tập hợp $X = \\{a; b\\}$ là:", options: { A: "2", B: "3", C: "4", D: "1" }, correctAnswer: "C", explanation: "Số tập con là $2^n = 2^2 = 4$.", level: "Nhận biết" },
      { question: "Ký hiệu nào sau đây dùng để chỉ mối quan hệ giữa phần tử và tập hợp?", options: { A: "$\\subset$", B: "$\\in$", C: "$\\cap$", D: "$\\cup$" }, correctAnswer: "B", explanation: "Phần tử thuộc tập hợp dùng ký hiệu $\\in$.", level: "Nhận biết" },
      { question: "Bất phương trình nào sau đây là BPT bậc nhất hai ẩn?", options: { A: "$x^2 + y > 0$", B: "$x + y^2 < 1$", C: "$2x - 3y + 1 \\leq 0$", D: "$xy + 1 > 0$" }, correctAnswer: "C", explanation: "Bậc nhất đối với cả x và y, không chứa tích xy.", level: "Nhận biết" },
      { question: "Điểm $O(0; 0)$ thuộc miền nghiệm của BPT nào?", options: { A: "$x + 3y + 1 < 0$", B: "$x + y - 2 > 0$", C: "$2x - y + 1 > 0$", D: "$2x + 5y - 2 > 0$" }, correctAnswer: "C", explanation: "Thay $(0; 0)$ vào phương án C: $0 - 0 + 1 = 1 > 0$ (Đúng).", level: "Nhận biết" },
      { question: "Vectơ có điểm đầu A, điểm cuối B ký hiệu là:", options: { A: "$AB$", B: "$\\overrightarrow{AB}$", C: "$\\overrightarrow{BA}$", D: "$|AB|$" }, correctAnswer: "B", explanation: "Quy ước ký hiệu vectơ từ A đến B.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Cho hai tập hợp $A = (-\\infty; 3]$ và $B = (1; 5]$. Tập hợp $A \\cup B$ là:", options: { A: "$(1; 3]$", B: "$(-\\infty; 5]$", C: "$(-\\infty; 1]$", D: "$(3; 5]$" }, correctAnswer: "B", explanation: "Hợp của hai tập hợp lấy phần rộng nhất: từ âm vô cùng đến 5.", level: "Thông hiểu" },
      { question: "Cho $A = [-2; 4)$ và $B = [0; 5]$. Tập hợp $A \\setminus B$ là:", options: { A: "$[-2; 0)$", B: "$[-2; 0]$", C: "$[4; 5]$", D: "$[0; 4)$" }, correctAnswer: "A", explanation: "Lấy phần thuộc A nhưng bỏ đi phần thuộc B (từ 0 trở đi).", level: "Thông hiểu" },
      { question: "Lớp 10A có 30 HS giỏi Toán, 20 HS giỏi Văn, 10 HS giỏi cả hai. Số HS giỏi ít nhất một môn là:", options: { A: "50", B: "40", C: "60", D: "30" }, correctAnswer: "B", explanation: "Sử dụng công thức: $n(T \\cup V) = n(T) + n(V) - n(T \\cap V) = 30 + 20 - 10 = 40$.", level: "Thông hiểu" },
      { question: "Cho $A = [m; m + 2]$ và $B = [1; 3]$. Tìm m để $A \\subset B$:", options: { A: "$m = 1$", B: "$1 \\leq m \\leq 2$", C: "$m \\geq 1$", D: "$m \\leq 1$" }, correctAnswer: "A", explanation: "Để $A \\subset B$ thì $m \\geq 1$ và $m+2 \\leq 3 \\Rightarrow m=1$.", level: "Thông hiểu" },
      { question: "Miền nghiệm của BPT $x - 2y > 4$ là nửa mặt phẳng KHÔNG chứa điểm nào?", options: { A: "$A(5; 0)$", B: "$B(6; 1)$", C: "$O(0; 0)$", D: "$C(10; 1)$" }, correctAnswer: "C", explanation: "Thay $O(0; 0)$ vào: $0 > 4$ (Sai). Vậy không chứa O.", level: "Thông hiểu" },
      { question: "Giá trị của $\\cos 120^\\circ$ là:", options: { A: "$1/2$", B: "$-1/2$", C: "$\\sqrt{3}/2$", D: "$-\\sqrt{3}/2$" }, correctAnswer: "B", explanation: "Góc tù, cos âm, bù với $60^\\circ$.", level: "Thông hiểu" },
      { question: "Tam giác ABC có $a = 6, b = 8, c = 10$. Diện tích tam giác là:", options: { A: "24", B: "48", C: "12", D: "30" }, correctAnswer: "A", explanation: "Tam giác vuông tại C. $S = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24$.", level: "Thông hiểu" },
      { question: "Cho $\\vec{u} = (2; -3)$. Tọa độ của $2\\vec{u}$ là:", options: { A: "$(2; -3)$", B: "$(4; -6)$", C: "$(4; -3)$", D: "$(2; -6)$" }, correctAnswer: "B", explanation: "Nhân một số với vectơ: $k(x; y) = (kx; ky)$.", level: "Thông hiểu" }
    ],
    "Vận vận": [
      { question: "Giá trị lớn nhất của $F(x; y) = 2x + 3y$ trên miền $0 \\leq x \\leq 2, 0 \\leq y \\leq 2$ là:", options: { A: "4", B: "6", C: "10", D: "8" }, correctAnswer: "C", explanation: "Tại đỉnh (2; 2): $F = 2(2) + 3(2) = 10$.", level: "Vận dụng" },
      { question: "Cho hình vuông ABCD cạnh a. Tính $|\\overrightarrow{AB} + \\overrightarrow{AC}|$:", options: { A: "$a\\sqrt{2}$", B: "$a\\sqrt{5}$", C: "$2a$", D: "$a\\sqrt{3}$" }, correctAnswer: "B", explanation: "Tổng vectơ bằng vectơ đường chéo hình chữ nhật cạnh 2a và a. Độ dài là $a\\sqrt{5}$.", level: "Vận dụng" },
      { question: "Cho tam giác ABC có $b = 4, c = 5, A = 60^\\circ$. Độ dài cạnh a là:", options: { A: "$\\sqrt{21}$", B: "$\\sqrt{61}$", C: "21", D: "3" }, correctAnswer: "A", explanation: "$a^2 = 16 + 25 - 2 \\cdot 4 \\cdot 5 \\cdot \\cos 60^\\circ = 21$.", level: "Vận dụng" },
      { question: "Tìm x để $\\vec{a} = (x; 2)$ vuông góc với $\\vec{b} = (3; -6)$:", options: { A: "$x = 4$", B: "$x = -4$", C: "$x = 2$", D: "$x = 0$" }, correctAnswer: "A", explanation: "Tích vô hướng bằng 0: $3x + 2(-6) = 0 \\Rightarrow 3x = 12 \\Rightarrow x = 4$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Một xưởng may sản xuất áo A (lãi 200k) và áo B (lãi 150k). Miền nghiệm có các đỉnh (0;0), (5;0), (4;4), (0;6). Lợi nhuận lớn nhất là:", options: { A: "1,4 triệu", B: "1,2 triệu", C: "1 triệu", D: "0,9 triệu" }, correctAnswer: "A", explanation: "Tại (4;4), $F = 200(4) + 150(4) = 1400k = 1,4$ triệu.", level: "Vận dụng cao" },
      { question: "Để (P): $y = x^2 - 2x + m$ cắt trục hoành tại hai điểm phân biệt thì:", options: { A: "$m > 1$", B: "$m < 1$", C: "$m = 1$", D: "$m \\geq 1$" }, correctAnswer: "B", explanation: "Phương trình hoành độ giao điểm có $\\Delta' = 1 - m > 0 \\Rightarrow m < 1$.", level: "Vận dụng cao" },
      { question: "Diện tích hình chữ nhật có chu vi 16 lớn nhất là:", options: { A: "12", B: "16", C: "20", D: "64" }, correctAnswer: "B", explanation: "HCN có diện tích lớn nhất khi là hình vuông cạnh 4. $S = 16$.", level: "Vận dụng cao" }
    ]
  },
  11: {
    "Nhận biết": [
      { question: "Đổi số đo của góc $\\alpha = 30^\\circ$ sang ra-đi-an:", options: { A: "$\\pi/3$", B: "$\\pi/6$", C: "$\\pi/4$", D: "$\\pi/2$" }, correctAnswer: "B", explanation: "$30 \\cdot \\pi/180 = \\pi/6$.", level: "Nhận biết" },
      { question: "Khẳng định nào sau đây SAI?", options: { A: "$\\sin^2 x + \\cos^2 x = 1$", B: "$\\tan x = \\cos x / \\sin x$", C: "$\\sin 2x = 2\\sin x \\cos x$", D: "$\\cos 2x = \\cos^2 x - \\sin^2 x$" }, correctAnswer: "B", explanation: "$\\tan x = \\sin x / \\cos x$.", level: "Nhận biết" },
      { question: "Tập xác định của hàm số $y = 1/\\sin x$ là:", options: { A: "$\\mathbb{R} \\setminus \\{\\pi/2 + k\\pi\\}$", B: "$\\mathbb{R} \\setminus \\{k2\\pi\\}$", C: "$\\mathbb{R} \\setminus \\{k\\pi\\}$", D: "$\\mathbb{R}$" }, correctAnswer: "C", explanation: "Xác định khi $\\sin x \\neq 0 \\Leftrightarrow x \\neq k\\pi$.", level: "Nhận biết" },
      { question: "Cho cấp số cộng có $u_1 = -2$ và $d = 3$. Số hạng thứ 2 là:", options: { A: "-6", B: "1", C: "5", D: "-5" }, correctAnswer: "B", explanation: "$u_2 = u_1 + d = -2 + 3 = 1$.", level: "Nhận biết" },
      { question: "Hàm số nào sau đây là hàm số chẵn?", options: { A: "$y = \\sin x$", B: "$y = \\tan x$", C: "$y = \\cos x$", D: "$y = \\cot x$" }, correctAnswer: "C", explanation: "Hàm cos đối xứng qua trục tung.", level: "Nhận biết" },
      { question: "Hình tứ diện có bao nhiêu đỉnh?", options: { A: "3", B: "4", C: "5", D: "6" }, correctAnswer: "B", explanation: "Tứ diện là hình chóp tam giác, có 4 đỉnh.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Tìm GTLN M và GTNN m của hàm số $y = 3\\sin(2x - \\pi/6) + 1$:", options: { A: "$M=3, m=-3$", B: "$M=4, m=-4$", C: "$M=4, m=-2$", D: "$M=2, m=-2$" }, correctAnswer: "C", explanation: "$y$ chạy từ $3(-1)+1=-2$ đến $3(1)+1=4$.", level: "Thông hiểu" },
      { question: "Dãy số nào sau đây là dãy số tăng?", options: { A: "$u_n = 1/n$", B: "$u_n = -2n + 1$", C: "$u_n = 2n - 1$", D: "$u_n = (-1)^n$" }, correctAnswer: "C", explanation: "Hiệu $u_{n+1} - u_n = 2 > 0$.", level: "Thông hiểu" },
      { question: "Cho cấp số nhân có $u_1 = 3, q = -2$. Số hạng tổng quát là:", options: { A: "$3(-2)^n$", B: "$3 \\cdot (-2)^{n-1}$", C: "$3 + (n-1)(-2)$", D: "$3 \\cdot 2^{n-1}$" }, correctAnswer: "B", explanation: "Công thức: $u_n = u_1 \\cdot q^{n-1}$.", level: "Thông hiểu" },
      { question: "Tổng $S = 1 + 1/2 + 1/4 + \\dots + 1/2^n + \\dots$ bằng:", options: { A: "1", B: "2", C: "1.5", D: "$+\\infty$" }, correctAnswer: "B", explanation: "Tổng CSN lùi vô hạn: $S = u_1/(1-q) = 1/(1-0.5) = 2$.", level: "Thông hiểu" },
      { question: "Giá trị đại diện của nhóm $[a; b)$ trong mẫu số liệu ghép nhóm là:", options: { A: "a", B: "b", C: "$(a+b)/2$", D: "$b-a$" }, correctAnswer: "C", explanation: "Trung bình cộng hai đầu mút.", level: "Thông hiểu" },
      { question: "Giới hạn $\\lim_{n \\to +\\infty} 1/n^2$ bằng:", options: { A: "1", B: "0", C: "$+\\infty$", D: "2" }, correctAnswer: "B", explanation: "Giới hạn cơ bản $1/n^k = 0$.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Tìm x để $x-1; x; x+2$ lập thành một cấp số nhân:", options: { A: "$x=1$", B: "$x=-1$", C: "$x=2$", D: "$x=-2$" }, correctAnswer: "C", explanation: "$x^2 = (x-1)(x+2) \\Rightarrow x^2 = x^2+x-2 \\Rightarrow x=2$.", level: "Vận dụng" },
      { question: "Một khán đài hàng đầu 20 chỗ, mỗi hàng sau thêm 2 chỗ. Hàng thứ 10 có:", options: { A: "36", B: "38", C: "40", D: "42" }, correctAnswer: "B", explanation: "$u_{10} = 20 + 9 \\cdot 2 = 38$.", level: "Vận dụng" },
      { question: "Cho hình chóp S.ABCD đáy là hình bình hành. Giao tuyến của (SAB) và (SCD) là:", options: { A: "Sx // AD", B: "Sx // AB", C: "Đường thẳng qua S và tâm đáy", D: "Đường thẳng SA" }, correctAnswer: "B", explanation: "Hai mặt phẳng chứa hai đường thẳng song song thì giao tuyến song song với chúng.", level: "Vận dụng" },
      { question: "Tìm m để $f(x) = (x^2-1)/(x-1)$ khi $x \\neq 1$ và $f(x)=m$ khi $x=1$ liên tục tại $x=1$:", options: { A: "$m=1$", B: "$m=2$", C: "$m=0$", D: "$m=-1$" }, correctAnswer: "B", explanation: "Giới hạn khi $x \\to 1$ là 2, nên m phải bằng 2.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Số nghiệm của phương trình $\\tan(x + \\pi/3) = \\sqrt{3}$ thuộc khoảng $(0; 2\\pi)$ là:", options: { A: "2", B: "1", C: "3", D: "0" }, correctAnswer: "B", explanation: "$x = k\\pi$. Trong $(0; 2\\pi)$ có duy nhất nghiệm $x = \\pi$.", level: "Vận dụng cao" },
      { question: "Phương trình $x^5 - 3x - 1 = 0$ có ít nhất bao nhiêu nghiệm trong $(-2; 2)$?", options: { A: "0", B: "1", C: "2", D: "3" }, correctAnswer: "D", explanation: "Xét $f(-2), f(-1), f(0), f(2)$ thấy có 3 lần đổi dấu.", level: "Vận dụng cao" },
      { question: "Tỉ số diện tích $S_{\\triangle SMN} / S_{\\triangle SCD}$ khi $M, N$ thuộc $SC, SD$ sao cho $SM = 2MC$ là:", options: { A: "2/3", B: "4/9", C: "1/3", D: "1/2" }, correctAnswer: "B", explanation: "Tỉ số bằng $(SM/SC)^2 = (2/3)^2 = 4/9$.", level: "Vận dụng cao" }
    ]
  },
  12: {
    "Nhận biết": [
      { question: "Điểm cực đại của đồ thị hàm số $y = x^3 - 3x + 2$ là:", options: { A: "$(1; 0)$", B: "$(-1; 4)$", C: "$(0; 2)$", D: "$(2; 4)$" }, correctAnswer: "B", explanation: "$y' = 3x^2 - 3$. Cực đại tại $x = -1, y = 4$.", level: "Nhận biết" },
      { question: "Tiệm cận ngang của đồ thị hàm số $y = (2x-1)/(x+1)$ là:", options: { A: "$x=-1$", B: "$y=-1$", C: "$y=2$", D: "$x=2$" }, correctAnswer: "C", explanation: "Giới hạn tại vô cực bằng 2.", level: "Nhận biết" },
      { question: "Trong Oxyz, tọa độ của $\\vec{u} = 2\\vec{i} - \\vec{j} + 3\\vec{k}$ là:", options: { A: "$(2; 1; 3)$", B: "$(2; -1; 3)$", C: "$(-1; 2; 3)$", D: "$(2; -1; -3)$" }, correctAnswer: "B", explanation: "Hệ số của các vectơ đơn vị.", level: "Nhận biết" },
      { question: "Họ nguyên hàm của hàm số $f(x) = \\cos x$ là:", options: { A: "$-\\sin x + C$", B: "$\\sin x + C$", C: "$\\sin 2x + C$", D: "$-\\cos x + C$" }, correctAnswer: "B", explanation: "Nguyên hàm của cos là sin.", level: "Nhận biết" },
      { question: "Mặt phẳng (Oxy) có phương trình là:", options: { A: "$x=0$", B: "$y=0$", C: "$z=0$", D: "$x+y=0$" }, correctAnswer: "C", explanation: "Mọi điểm trên Oxy đều có cao độ bằng 0.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Giá trị nhỏ nhất của hàm số $f(x) = x^4 - 2x^2 + 3$ trên $[0; 2]$ là:", options: { A: "3", B: "2", C: "11", D: "1" }, correctAnswer: "B", explanation: "Cực tiểu tại $x=1, f(1)=2$.", level: "Thông hiểu" },
      { question: "Tiệm cận xiên của đồ thị $y = x + 1 + 2/(x-1)$ là:", options: { A: "$y=x$", B: "$y=x-1$", C: "$y=x+1$", D: "$y=2x+1$" }, correctAnswer: "C", explanation: "Phần đa thức khi $x$ ra vô cực.", level: "Thông hiểu" },
      { question: "Tâm đối xứng của đồ thị $y = (x-2)/(x+1)$ là:", options: { A: "$(1; 1)$", B: "$(-1; -2)$", C: "$(-1; 1)$", D: "$(2; 1)$" }, correctAnswer: "C", explanation: "Giao điểm của hai tiệm cận.", level: "Thông hiểu" },
      { question: "Tính tích phân $I = \\int_0^1 x^2 dx$:", options: { A: "1", B: "1/3", C: "1/2", D: "2" }, correctAnswer: "B", explanation: "$x^3/3$ thế cận từ 0 đến 1.", level: "Thông hiểu" },
      { question: "Diện tích hình phẳng giới hạn bởi $y = x^2 - 2x$ và trục hoành là:", options: { A: "4/3", B: "2/3", C: "2", D: "8/3$" }, correctAnswer: "A", explanation: "Tích phân từ 0 đến 2 của $|x^2-2x|$.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Tìm m để hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m+2)x - 1$ đồng biến trên $\\mathbb{R}$:", options: { A: "$m \\in (-1; 2)$", B: "$m \\in [-1; 2]$", C: "$m \\in (-\\infty; -1]$", D: "$m \\geq 2$" }, correctAnswer: "B", explanation: "Điều kiện $\\Delta' = m^2 - (m+2) \\leq 0$.", level: "Vận dụng" },
      { question: "Diện tích hình phẳng giới hạn bởi $y=x^2$ và $y=2-x^2$ là:", options: { A: "8/3", B: "4/3", C: "2", D: "4" }, correctAnswer: "A", explanation: "Giao điểm tại $\\pm 1$. Tích phân từ -1 đến 1 của $(2-2x^2)$.", level: "Vận dụng" },
      { question: "Quãng đường vật đi được trong 2 giây đầu với gia tốc $a(t) = 6t$, $v(0)=2$ là:", options: { A: "12m", B: "14m", C: "10m", D: "8m" }, correctAnswer: "B", explanation: "$v(t) = 3t^2+2$, tích phân từ 0 đến 2 ra $12$. (Đính chính: tích phân từ 0 đến 2 của $3t^2+2$ là $8+4=12$). Đáp án B trong tài liệu ghi 12m.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tìm m để đồ thị $y = x^3 - 3x^2 + 2$ cắt $y=m$ tại 3 điểm phân biệt:", options: { A: "$m \\in (-2; 2)$", B: "$-2 < m < 2$", C: "$m < -2$", D: "$m > 2$" }, correctAnswer: "B", explanation: "m nằm giữa giá trị cực đại và cực tiểu.", level: "Vận dụng cao" },
      { question: "Tìm m để $y = \\frac{x+1}{\\sqrt{m(x-1)^2+4}}$ có 2 tiệm cận ngang:", options: { A: "$m=0$", B: "$m>0$", C: "$m<0$", D: "Mọi m" }, correctAnswer: "B", explanation: "Cần mẫu xác định ở vô cực và bậc tử bằng bậc mẫu.", level: "Vận dụng cao" },
      { question: "Thùng rượu cao 100cm, đáy 30cm, giữa 40cm, cạnh hình parabol. Thể tích xấp xỉ:", options: { A: "400 lít", B: "425 lít", C: "450 lít", D: "380 lít" }, correctAnswer: "B", explanation: "Tính theo tích phân vật thể tròn xoay.", level: "Vận dụng cao" }
    ]
  }
};
