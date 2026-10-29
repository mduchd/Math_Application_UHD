# 🔤 QUY CHUẨN TYPOGRAPHY & TEXT THƯƠNG MẠI CHO ỨNG DỤNG TRẺ EM
> **Áp dụng bắt buộc cho toàn bộ AI Agent khi phát triển tính năng mới hoặc chỉnh sửa mã nguồn.**
> **Đối tượng người dùng**: Học sinh tiểu học (Lớp 1 - 5, từ 6 đến 11 tuổi) cùng Phụ huynh & Thầy cô giáo.

---

## 1. 🎯 NGUYÊN TẮC CỐT LÕI (CORE PRINCIPLES)

Mọi dòng chữ trên giao diện phần mềm giáo dục trẻ em đều phải đạt 3 tiêu chuẩn vàng:
1. **ĐẬM & RÕ NÉT (High Boldness & Legibility)**: Trẻ em nhận diện mặt chữ qua hình khối và độ dày nét chữ. Chữ mỏng làm trẻ mỏi mắt và khó tập trung.
2. **TƯƠNG PHẢN TUYỆT ĐỐI (WCAG AAA Contrast Ratio $\ge 7:1$)**: Màu chữ phải tách bạch rõ ràng khỏi màu nền. Loại bỏ 100% các màu xám mờ nhạt hoặc phối màu gây lóa mắt.
3. **NGÔN NGỮ THƯƠNG MẠI THÂN THIỆN (Commercial & Motivating Copy)**: Văn phong khích lệ, tươi sáng, dễ hiểu, chuẩn chính tả tiếng Việt, tạo động lực học tập vui vẻ.

---

## 2. 👁️ MA TRẬN THỊ GIÁC & ĐỘ SẮC NÉT (VISUAL TYPOGRAPHY MATRIX)

### 2.1. Phân cấp Font Weight (Độ Đậm)
* **Tiêu đề (H1, H2, H3, Section Titles)**:
  * Bắt buộc: `font-black` (900) hoặc `font-extrabold` (800).
* **Nội dung chính (Body Text, Câu hỏi bài tập, Đoạn mô tả)**:
  * Bắt buộc: `font-bold` (700) hoặc tối thiểu `font-semibold` (600).
* **Nút bấm, Huy hiệu, Thẻ điểm (Buttons, Badges, Chips)**:
  * Bắt buộc: `font-extrabold` (800) hoặc `font-black` (900).
* ⛔ **TUYỆT ĐỐI CẤM**:
  * CẤM sử dụng `font-light` (300), `font-thin` (100-200), hoặc `font-normal` (400) cho bất kỳ thành phần giao diện đọc hay tương tác nào.

### 2.2. Thang Kích Thước (Font Sizing)
* **Sàn kích thước tối thiểu (Hard Minimum)**:
  * Không bao giờ dùng font nhỏ hơn `14px` (`text-sm`) cho nội dung đọc thông tin.
  * Chỉ chấp nhận `text-xs` (12px) khi đi kèm `font-black` + chữ in hoa trong các Tag nhỏ (Ví dụ: Tag `"MỚI"`, `"VIP"`).
* **Thang chuẩn**:
  * **H1 (Hero / Tên màn hình)**: `text-3xl` đến `text-5xl` (30px - 48px).
  * **H2 (Tên bài học / Tiêu đề khối)**: `text-2xl` đến `text-3xl` (24px - 30px).
  * **H3 (Tiêu đề thẻ / Câu hỏi phụ)**: `text-xl` đến `text-2xl` (20px - 24px).
  * **Body chính (Đề bài, Nội dung)**: `text-base` đến `text-lg` (16px - 18px), `leading-relaxed` (1.625).
  * **Subtext / Chú thích phụ**: `text-sm` (14px), bắt buộc `font-bold` và màu tương phản cao (`text-slate-700`).

---

## 3. 🎨 MA TRẬN CẶP MÀU TƯƠNG PHẢN (COLOR CONTRAST RULES)

| Màu nền (Background) | Màu chữ BẮT BUỘC (Text Color) | Quy chuẩn tương phản |
| :--- | :--- | :--- |
| **Nền Trắng** (`#FFFFFF`) / **Nền Kem** (`#FDFBF7`) | `text-slate-900` (`#0F172A`) hoặc `text-slate-800` (`#1E293B`) | **$\ge 12:1$** (Sắc nét vượt trội, chống mỏi mắt) |
| **Nền Vàng tươi** (`bg-kid-yellow`, `bg-amber-400`) | `text-amber-950` (`#451A03`) | **$\ge 8.5:1$** (Đạt chuẩn AAA). ❌ CẤM chữ trắng trên nền vàng |
| **Nền Cam rực rỡ** (`bg-kid-orange`) | `text-white font-extrabold` (có viền đổ bóng) hoặc `text-amber-950` | **$\ge 5:1$** (Nổi bật, rõ nét) |
| **Nền Xanh dương / Xanh lá / Tím** (`bg-kid-blue`, `bg-kid-green`, `bg-kid-purple`) | `text-white font-black` | **$\ge 5.5:1$** (Nổi khối 3D rõ nét) |
| **Chú thích phụ (Secondary Text)** | `text-slate-700` (`#334155`) | **$\ge 8:1$**. ❌ CẤM `text-gray-400` / `text-slate-400` |

---

## 4. 🚀 KỸ THUẬT RENDER SẮC NÉT (SHARPNESS & RENDERING)
1. **Toàn bộ ứng dụng kích hoạt tối ưu hóa render**:
   ```css
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-rendering: optimizeLegibility;
   ```
2. **Khắc phục chữ dính**: Giữ `tracking-normal` hoặc `tracking-wide` (0.01em - 0.025em), tránh dùng `tracking-tighter` làm dính chữ tiếng Việt có dấu.
3. **Hiệu ứng khối 3D xúc giác (Tactile Border & Shadow)**:
   * Chữ trên nút bấm và thẻ bài luôn đi cùng viền đậm nét và bóng đổ xúc giác (Tactile Button) để trẻ chạm tay chính xác.

---

## 5. ✍️ QUY CHUẨN VĂN PHONG THƯƠNG MẠI CHO TRẺ EM (COMMERCIAL EDTECH MICROCOPY)

### 5.1. Xưng hô & Cảm xúc (Tone & Voice)
* Luôn dùng đại từ thân mật: `"Bạn"`, `"Chúng mình"`, `"Bé"`, `"Thầy cô"`.
* Mang tinh thần đồng hành, tích cực, truyền cảm hứng (Positive Psychology).

### 5.2. Mẫu câu chuẩn theo ngữ cảnh (Contextual Templates)
* **Nút bấm hành động (CTA)**:
  * Chuẩn: *"Bắt đầu học ngay 🚀"*, *"Cùng chơi nào! ✨"*, *"Nộp bài ngay 🎯"*, *"Khám phá tiếp 🌟"*, *"Thử lại lần nữa 💪"*.
  * ❌ CẤM: *"Submit"*, *"OK"*, *"Gửi"*, *"Bấm vào đây"*.
* **Khi bé trả lời đúng / Hoàn thành**:
  * Chuẩn: *"Tuyệt vời quá! Bạn nhận được +10 Ngôi Sao! ⭐"*, *"Xuất sắc! Chúng mình cùng sang bài tiếp theo nhé! 🏆"*.
* **Khi bé làm sai / Cần thử lại (Không chê bai, không tạo áp lực)**:
  * Chuẩn: *"Gần đúng rồi! Bạn thử suy nghĩ thêm một chút nhé! 💪"*, *"Không sao cả, chúng mình làm lại lần nữa nào! 🌟"*.
  * ❌ CẤM: *"Sai rồi!"*, *"Thất bại"*, *"Lỗi nghiệp vụ"*.
* **Thông báo lỗi hệ thống / Mất kết nối**:
  * Chuẩn: *"Ối, mạng internet đang giải lao một chút! Chúng mình nhấn tải lại nhé! 🔄"*.
  * ❌ CẤM: *"Lỗi 500"*, *"Server Error"*, *"Internal Server Error"*.

---

## 6. 🛑 DANH SÁCH ANTI-PATTERNS (TUYỆT ĐỐI CẤM)

| ❌ Hành vi CẤM | ✅ Giải pháp BẮT BUỘC |
| :--- | :--- |
| Dùng `text-gray-400`, `text-slate-400`, `text-zinc-400` | Đổi sang `text-slate-700` hoặc `text-slate-800` |
| Dùng `font-light`, `font-normal` cho chữ nội dung | Đổi sang `font-semibold` (600) hoặc `font-bold` (700) |
| Dùng `text-white` trên nền vàng nhạt/vàng cam | Đổi sang `text-amber-950 font-black` |
| Dùng chữ nhỏ hơn `14px` (`text-[10px]`, `text-[11px]`) | Dùng tối thiểu `text-sm` (14px) với `font-bold` |
| Để thông báo lỗi cộc lốc, khô khan kiểu IT | Viết lại bằng giọng văn khích lệ, thân thiện của chú Cú Thông Thái |

---

## 7. 🤖 CHECKLIST BẮT BUỘC CHO AGENT TRƯỚC KHI COMMIT/HOÀN THÀNH
- [ ] **Weight**: Toàn bộ tiêu đề $\ge$ `font-extrabold`, body $\ge$ `font-semibold`. Không có `font-normal` hay `font-light`.
- [ ] **Contrast**: Màu chữ trên nền sáng là `text-slate-800`/`900` hoặc `text-slate-700`. Không có xám nhạt `gray-400`.
- [ ] **Sharpness**: Chữ sắc nét, có padding thoáng đãng, leading thoải mái (`leading-relaxed`).
- [ ] **Tone**: Lời thoại, nút bấm vui tươi, có emoji phù hợp, chuẩn văn phong trẻ em.
