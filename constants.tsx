
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
      { question: "Bất phương trình nào sau đây là bất phương trình bậc nhất hai ẩn?", options: { A: "$x^2 + y > 0$", B: "$x - 2y + 3 \\leq 0$", C: "$x + y^2 < 2$", D: "$xy + 5 \\geq 0$" }, correctAnswer: "B", explanation: "Bất phương trình bậc nhất hai ẩn có dạng $ax + by + c \\leq 0$ với bậc của $x, y$ là 1.", level: "Nhận biết" },
      { question: "Giá trị của $\\cos 150^\\circ$ bằng:", options: { A: "$\\sqrt{3}/2$", B: "$-\\sqrt{3}/2$", C: "$1/2$", D: "$-1/2$" }, correctAnswer: "B", explanation: "$\\cos 150^\\circ = -\\cos(180^\\circ - 150^\\circ) = -\\cos 30^\\circ = -\\sqrt{3}/2$.", level: "Nhận biết" },
      { question: "Cho tam giác ABC. Định lý cô-sin được phát biểu là:", options: { A: "$a^2 = b^2 + c^2 + 2bc \\cos A$", B: "$a^2 = b^2 + c^2 - 2bc \\sin A$", C: "$a^2 = b^2 + c^2 - 2bc \\cos A$", D: "$a^2 = b^2 - c^2 + 2bc \\cos A$" }, correctAnswer: "C", explanation: "Công thức định lý cô-sin: $a^2 = b^2 + c^2 - 2bc \\cos A$.", level: "Nhận biết" },
      { question: "Định lý sin được phát biểu là:", options: { A: "$a/\\sin A = R$", B: "$a/\\sin A = 2R$", C: "$a \\sin A = 2R$", D: "$\\sin A / a = 2R$" }, correctAnswer: "B", explanation: "Hệ thức lượng trong tam giác: $a/\\sin A = b/\\sin B = c/\\sin C = 2R$.", level: "Nhận biết" },
      { question: "Hai vectơ được gọi là bằng nhau nếu chúng:", options: { A: "Cùng phương và cùng độ dài", B: "Cùng hướng và cùng độ dài", C: "Cùng độ dài", D: "Cùng điểm đầu và cùng điểm cuối" }, correctAnswer: "B", explanation: "Định nghĩa: Hai vectơ bằng nhau khi chúng cùng hướng và cùng độ dài.", level: "Nhận biết" },
      { question: "Tọa độ của vectơ $\\vec{u} = 2\\vec{i} - 3\\vec{j}$ là:", options: { A: "$(2; 3)$", B: "$(2; -3)$", C: "$(-3; 2)$", D: "$(2; 0)$" }, correctAnswer: "B", explanation: "Vectơ $\\vec{u} = x\\vec{i} + y\\vec{j}$ có tọa độ $(x; y)$.", level: "Nhận biết" },
      { question: "Số quy tròn của số $a = 123456$ với độ chính xác $d = 500$ là:", options: { A: "123500", B: "124000", C: "123000", D: "120000" }, correctAnswer: "C", explanation: "Độ chính xác đến hàng trăm (500), ta quy tròn đến hàng nghìn. 3 đứng trước 4 (<5) nên giữ nguyên.", level: "Nhận biết" },
      { question: "Cho mẫu số liệu: 2, 4, 4, 5, 7, 8. Mốt của mẫu số liệu là:", options: { A: "2", B: "4", C: "5", D: "7" }, correctAnswer: "B", explanation: "Mốt là giá trị xuất hiện nhiều nhất. Số 4 xuất hiện 2 lần.", level: "Nhận biết" },
      { question: "Tứ phân vị thứ hai $Q_2$ của mẫu số liệu chính là:", options: { A: "Số trung bình", B: "Mốt", C: "Trung vị", D: "Độ lệch chuẩn" }, correctAnswer: "C", explanation: "$Q_2$ chia mẫu số liệu thành 2 phần bằng nhau, đó là trung vị.", level: "Nhận biết" },
      { question: "Độ lệch chuẩn là căn bậc hai của:", options: { A: "Số trung bình", B: "Khoảng biến thiên", C: "Phương sai", D: "Trung vị" }, correctAnswer: "C", explanation: "Công thức $s = \\sqrt{s^2}$ (căn bậc hai của phương sai).", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Cho hai tập hợp $A = [-2; 3]$ và $B = (1; +\\infty)$. Tập hợp $A \\cap B$ là:", options: { A: "$[-2; +\\infty)$", B: "$(1; 3)$", C: "$(1; 3]$", D: "$[-2; 1]$" }, correctAnswer: "C", explanation: "Giao của hai tập hợp là phần chung: lấy từ lớn hơn 1 đến 3 (ngoặc vuông tại 3).", level: "Thông hiểu" },
      { question: "Cặp số $(1; -1)$ là nghiệm của bất phương trình nào sau đây?", options: { A: "$x + y - 3 > 0$", B: "$-x - y < 0$", C: "$x + 2y + 1 \\geq 0$", D: "$x - y + 2 < 0$" }, correctAnswer: "C", explanation: "Thay $(1; -1)$ vào C: $1 + 2(-1) + 1 = 0 \\geq 0$ (Đúng).", level: "Thông hiểu" },
      { question: "Miền nghiệm của hệ bất phương trình $\\{x \\geq 0, y \\geq 0, x + y \\leq 1\\}$ là miền trong của hình nào?", options: { A: "Tam giác", B: "Tứ giác", C: "Ngũ giác", D: "Miền không bị chặn" }, correctAnswer: "A", explanation: "Miền nghiệm là tam giác vuông OAB với $O(0;0), A(1;0), B(0;1)$.", level: "Thông hiểu" },
      { question: "Cho tam giác ABC có $a = 6, b = 8, c = 10$. Diện tích tam giác đó là:", options: { A: "48", B: "24", C: "12", D: "30" }, correctAnswer: "B", explanation: "Tam giác này vuông tại C vì $6^2 + 8^2 = 10^2$. Diện tích $S = (1/2) \\cdot 6 \\cdot 8 = 24$.", level: "Thông hiểu" },
      { question: "Cho $\\vec{a} = (1; 2)$ và $\\vec{b} = (3; 4)$. Tọa độ của vectơ $\\vec{u} = \\vec{a} + \\vec{b}$ là:", options: { A: "$(2; 2)$", B: "$(4; 6)$", C: "$(4; 8)$", D: "$(3; 8)$" }, correctAnswer: "B", explanation: "$\\vec{u} = (1+3; 2+4) = (4; 6)$.", level: "Thông hiểu" },
      { question: "Tích vô hướng của hai vectơ $\\vec{a} = (1; -2)$ và $\\vec{b} = (2; 3)$ bằng:", options: { A: "$-4$", B: "4", C: "8", D: "$-8$" }, correctAnswer: "A", explanation: "$\\vec{a} \\cdot \\vec{b} = 1(2) + (-2)(3) = 2 - 6 = -4$.", level: "Thông hiểu" },
      { question: "Góc giữa hai vectơ $\\vec{i} = (1; 0)$ và $\\vec{u} = (0; 1)$ là:", options: { A: "$0^\\circ$", B: "$45^\\circ$", C: "$90^\\circ$", D: "$180^\\circ$" }, correctAnswer: "C", explanation: "Hai vectơ đơn vị trên hai trục tọa độ vuông góc với nhau.", level: "Thông hiểu" },
      { question: "Khoảng biến thiên của mẫu số liệu: 10, 2, 5, 15, 8 là:", options: { A: "10", B: "13", C: "5", D: "15" }, correctAnswer: "B", explanation: "$R = x_{max} - x_{min} = 15 - 2 = 13$.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Điểm nào sau đây thuộc miền nghiệm của hệ bất phương trình $\\{2x - y > 0, x + y > 3\\}$?", options: { A: "$M(1; 1)$", B: "$N(2; 0)$", C: "$P(3; 1)$", D: "$Q(0; 4)$" }, correctAnswer: "C", explanation: "Thay $P(3;1)$: $2(3)-1=5>0$ và $3+1=4>3$. Cả hai đều thỏa mãn.", level: "Vận dụng" },
      { question: "Cho tam giác ABC có $AB=3, AC=6, A=60^\\circ$. Độ dài cạnh $BC$ là:", options: { A: "$3\\sqrt{3}$", B: "$3\\sqrt{2}$", C: "$3\\sqrt{5}$", D: "9" }, correctAnswer: "A", explanation: "$BC^2 = 9 + 36 - 2 \\cdot 3 \\cdot 6 \\cdot \\cos 60^\\circ = 27 \\Rightarrow BC = 3\\sqrt{3}$.", level: "Vận dụng" },
      { question: "Trong mặt phẳng tọa độ Oxy, cho $A(1;2), B(-1;1), C(5;-1)$. Cosin góc giữa $\\vec{AB}$ và $\\vec{AC}$ là:", options: { A: "$-\\sqrt{5}/5$", B: "$-3/5$", C: "$3/5$", D: "$4/5$" }, correctAnswer: "A", explanation: "Tính tích vô hướng và độ dài: $\\cos = -5/(5\\sqrt{5}) = -\\sqrt{5}/5$.", level: "Vận dụng" },
      { question: "Cho hình vuông ABCD cạnh $a$, tâm O. Tính độ dài vectơ $\\vec{u} = \\vec{AB} + \\vec{AD} + \\vec{AC}$:", options: { A: "$a\\sqrt{2}$", B: "$2a\\sqrt{2}$", C: "$3a$", D: "$a$" }, correctAnswer: "B", explanation: "$\\vec{AB} + \\vec{AD} = \\vec{AC} \\Rightarrow \\vec{u} = 2\\vec{AC}$. Độ dài $|2\\vec{AC}| = 2(a\\sqrt{2})$.", level: "Vận dụng" },
      { question: "Cho tam giác ABC có trung tuyến AM. Hệ thức nào sau đây đúng?", options: { A: "$AM^2 = (b^2+c^2)/2 + a^2/4$", B: "$AM^2 = (b^2+c^2)/2 - a^2/4$", C: "$AM^2 = (b^2+c^2-a^2)/2$", D: "$AM^2 = b^2+c^2-a^2$" }, correctAnswer: "B", explanation: "Công thức đường trung tuyến: $m_a^2 = (b^2+c^2)/2 - a^2/4$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Một nông dân trồng đậu và cà trên 8ha. Trồng đậu cần 20 công, lãi 3tr/ha. Trồng cà cần 30 công, lãi 4tr/ha. Tổng công không quá 180. Diện tích để lãi cao nhất là:", options: { A: "$x=6, y=2$", B: "$x=6, y=2$ (trùng)", C: "$x=0, y=6$", D: "$x=8, y=0$" }, correctAnswer: "A", explanation: "Sử dụng quy hoạch tuyến tính, Max tại $x=6, y=2$ cho lãi 26 triệu.", level: "Vận dụng cao" },
      { question: "Tìm giá trị nhỏ nhất của biểu thức $F(x; y) = x - y$ trên miền nghiệm $\\{x \\geq 0, 0 \\leq y \\leq 4, x-y-1 \\leq 0, x+2y-10 \\leq 0\\}$:", options: { A: "0", B: "$-4$", C: "$-2$", D: "$-1$" }, correctAnswer: "B", explanation: "Kiểm tra các đỉnh, tại $(0; 4)$ giá trị $F = -4$ là nhỏ nhất.", level: "Vận dụng cao" },
      { question: "Cho hình thang vuông ABCD tại A và D, $AB=2a, AD=DC=a$. Tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$ bằng:", options: { A: "$a^2$", B: "$3a^2$", C: "$2a^2$", D: "$4a^2$" }, correctAnswer: "C", explanation: "$\\vec{AC} = \\vec{AD} + \\vec{DC}$. $\\vec{AB} \\cdot (\\vec{AD} + \\vec{DC}) = 0 + 2a \\cdot a = 2a^2$.", level: "Vận dụng cao" },
      { question: "Đo chiều cao tòa tháp từ A và B cách nhau 40m, góc nhìn lần lượt là $30^\\circ$ và $60^\\circ$. Chiều cao tháp là:", options: { A: "$20\\sqrt{3}$ m", B: "$20\\sqrt{3}$ m (trùng)", C: "$40\\sqrt{3}$ m", D: "$10\\sqrt{3}$ m" }, correctAnswer: "A", explanation: "$h = 20\\sqrt{3} \\approx 34.6$m.", level: "Vận dụng cao" },
      { question: "Cho $A(1;1), B(2;4), C(10;-2)$. Điểm $E$ trên trục Ox sao cho $|\\vec{EA} + \\vec{EB} + \\vec{EC}|$ nhỏ nhất là:", options: { A: "$(4; 0)$", B: "$(13/3; 0)$", C: "$(3; 0)$", D: "$(5; 0)$" }, correctAnswer: "B", explanation: "E là hình chiếu của trọng tâm $G(13/3; 1)$ lên trục Ox.", level: "Vận dụng cao" }
    ]
  },
  11: {
    "Nhận biết": [
      { question: "Đổi số đo của góc $\\alpha = 30^\\circ$ sang ra-đi-an:", options: { A: "$\\pi/3$", B: "$\\pi/6$", C: "$\\pi/4$", D: "$\\pi/2$" }, correctAnswer: "B", explanation: "$30^\\circ = 30 \\cdot \\frac{\\pi}{180} = \\pi/6$.", level: "Nhận biết" },
      { question: "Cho cấp số cộng $(u_n)$ có $u_1 = -2, d = 3$. Số hạng $u_2$ là:", options: { A: "-6", B: "1", C: "5", D: "-5" }, correctAnswer: "B", explanation: "$u_2 = u_1 + d$.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Nghiệm của phương trình $\\cos x = \\frac{\\sqrt{2}}{2}$ là:", options: { A: "$x = \\pm \\pi/4 + k2\\pi$", B: "$x = \\pm \\pi/3 + k2\\pi$", C: "$x = \\pi/4 + k2\\pi$", D: "$x = \\pm 3\\pi/4 + k2\\pi$" }, correctAnswer: "A", explanation: "Giá trị lượng giác cơ bản.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Số nghiệm của phương trình $\\tan(x + \\pi/3) = \\sqrt{3}$ trên khoảng $(0; 2\\pi)$ là:", options: { A: "2", B: "1", C: "3", D: "0" }, correctAnswer: "A", explanation: "$x + \\pi/3 = \\pi/3 + k\\pi \\Rightarrow x = k\\pi$. Nghiệm là $\\pi$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tính tổng $S = 1 + 2 + 4 + \\dots + 2^9$:", options: { A: "1023", B: "1024", C: "511", D: "2047" }, correctAnswer: "A", explanation: "Tổng của cấp số nhân $S_n = u_1 \\frac{1-q^n}{1-q}$.", level: "Vận dụng cao" }
    ]
  },
  12: {
    "Nhận biết": [
      { question: "Điểm cực đại của đồ thị hàm số $y = x^3 - 3x + 2$ là:", options: { A: "$(1; 0)$", B: "$(-1; 4)$", C: "$(0; 2)$", D: "$(2; 4)$" }, correctAnswer: "B", explanation: "$y'=3x^2-3=0 \\Rightarrow x=\\pm 1$. Tại $x=-1, y=4$.", level: "Nhận biết" }
    ],
    "Thông hiểu": [
      { question: "Giá trị nhỏ nhất của $f(x) = x^4 - 2x^2 + 3$ trên đoạn $[0; 2]$ là:", options: { A: "3", B: "2", C: "11", D: "1" }, correctAnswer: "B", explanation: "Đạt tại $x=1, y=2$.", level: "Thông hiểu" }
    ],
    "Vận dụng": [
      { question: "Vận tốc vật $v(t) = 3t^2 + 2$. Quãng đường đi được trong 2 giây đầu là:", options: { A: "10m", B: "12m", C: "8m", D: "14m" }, correctAnswer: "B", explanation: "$S = \\int_0^2 (3t^2+2)dt$.", level: "Vận dụng" }
    ],
    "Vận dụng cao": [
      { question: "Tìm m để hàm số $y = \\frac{1}{3}x^3 - mx^2 + (m^2-m+1)x + 1$ đạt cực đại tại $x=1$:", options: { A: "m=2", B: "m=1", C: "m=0", D: "Không có m" }, correctAnswer: "A", explanation: "Sử dụng $y'(1)=0$ và $y''(1)<0$.", level: "Vận dụng cao" }
    ]
  }
};
