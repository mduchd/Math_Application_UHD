# 🏛️ AI AGENT CODING & ARCHITECTURAL GUIDELINES (BỘ QUY TẮC PHÁT TRIỂN HỆ THỐNG)

> **Mục tiêu tối thượng**: Đảm bảo toàn bộ mã nguồn do AI Agent viết hoặc sửa đổi đều tuân thủ nguyên tắc **Clean Architecture, Single Responsibility (SRP), High Cohesion - Low Coupling**. Cấu trúc hệ thống phải mạch lạc, tách bạch rõ ràng giữa các tầng, loại bỏ các file "God Object" ôm đồm nhiều nhiệm vụ, tạo tiền đề tối ưu cho việc mở rộng (scale) và bảo trì (maintain) lâu dài.

---

## 1. 🎯 NGUYÊN TẮC THIẾT KẾ CỐT LÕI (CORE ARCHITECTURAL PRINCIPLES)

Thay vì giới hạn số dòng một cách máy móc, chất lượng và cấu trúc code được đo lường bằng **Ranh giới Trách nhiệm (Boundaries of Responsibility)**:

1. **Single Responsibility Principle (SRP)**:
   - Một file, một class, hoặc một function chỉ nên có **đúng 1 lý do để thay đổi**.
   - Không tạo các file "God Object" (vừa định nghĩa router, vừa gọi database, vừa validate dữ liệu, vừa xử lý logic nghiệp vụ).
2. **Separation of Concerns (SoC)**:
   - Tách bạch hoàn toàn giữa **Hiển thị (UI)**, **Điều phối nghiệp vụ (Application)**, **Quy tắc nghiệp vụ lõi (Domain)** và **Truy xuất dữ liệu/Hạ tầng (Infrastructure)**.
3. **High Cohesion & Loose Coupling**:
   - Các thành phần cùng giải quyết một bài toán nghiệp vụ thì đặt gần nhau (Co-location).
   - Các module độc lập giao tiếp với nhau qua Contract/Interface, giảm thiểu sự phụ thuộc chéo.

---

## 2. 🧱 CẤU TRÚC PHÂN TẦNG CHUẨN (CLEAN ARCHITECTURE LAYERS)

Luồng phụ thuộc chỉ được phép đi **từ ngoài vào trong** (Inward Dependency):

```
[ Presentation Layer (UI / Controllers) ]
                  ⬇️
[ Application Layer (Use Cases / Services) ]
                  ⬇️
[ Domain Layer (Entities / Business Rules / Interfaces) ]
                  ⬆️ (Dependency Inversion)
[ Infrastructure Layer (Database / Prisma / Third-Party SDKs) ]
```

### 2.1. Presentation Layer (Giao diện & Điểm tiếp nhận)
* **Frontend (React / Next.js)**:
  * Đảm nhận: Render giao diện, phản hồi tương tác người dùng, hiển thị trạng thái loading/error.
  * **Tuyệt đối không**: Viết câu lệnh truy vấn database, tính toán thuật toán nghiệp vụ phức tạp, hoặc trực tiếp mutate state toàn cục ngay trong JSX.
* **Backend (NestJS Controllers / Gateways)**:
  * Đảm nhận: Tiếp nhận HTTP/WebSocket request, ánh xạ URL, validate payload qua DTO, ủy quyền xử lý cho Service và trả về HTTP response tương ứng.
  * **Tuyệt đối không**: Viết câu lệnh SQL/Prisma, mã hóa password, hay xử lý logic nghiệp vụ tại Controller.

### 2.2. Application Layer (Điều phối nghiệp vụ - Use Cases / Services)
* Đảm nhận: Điều phối luồng làm việc (workflow orchestration): kiểm tra quyền, gọi domain logic, gọi repository, gửi email/thông báo.
* Mỗi Service hoặc Method giải quyết một luồng công việc cụ thể, rõ ràng.

### 2.3. Domain Layer (Lõi nghiệp vụ & Entities)
* Đảm nhận: Định nghĩa các thực thể (Entities), Domain Rules, Value Objects, Types & Interfaces.
* Tầng này hoàn toàn **độc lập**, không phụ thuộc vào framework (Next.js/NestJS) hay công cụ ORM.

### 2.4. Infrastructure / Data Layer (Hạ tầng & Kết nối ngoại vi)
* Đảm nhận: Tương tác cơ sở dữ liệu (Prisma, Neon, Postgres), SDK bên ngoài (AWS S3, AI Gemini, Payment Gateways...).
* Triển khai cụ thể các Interfaces đã được quy định bởi các tầng bên trong.

---

## 3. 📂 TỔ CHỨC THƯ MỤC THEO MODULE (FEATURE-FIRST)

Tuyệt đối tránh dồn toàn bộ components hoặc toàn bộ controllers của cả hệ thống vào một thư mục dùng chung. Mọi chức năng phải được nhóm theo **Module / Tính năng nghiệp vụ**.

### 3.1. Cấu trúc Frontend (`apps/web`)

```text
apps/web/src/
├── app/                      # Next.js App Router (Chỉ làm nhiệm vụ routing & layout mỏng)
│   └── (dashboard)/
│       └── courses/
│           └── page.tsx      # Entrypoint mỏng, import Container từ features
├── features/courses/         # Toàn bộ module nghiệp vụ khóa học
│   ├── components/           # UI components đặc thù của khóa học
│   │   ├── CourseCard.tsx
│   │   ├── CourseList.tsx
│   │   └── CourseHeader.tsx
│   ├── hooks/                # Quản lý state, side-effects, API calls
│   │   ├── useCourses.ts
│   │   └── useCourseFilter.ts
│   ├── services/             # Endpoint fetching riêng của module
│   │   └── course.api.ts
│   ├── types/                # Types/Interfaces nội bộ module
│   │   └── index.ts
│   ├── utils/                # Helper functions riêng của module
│   └── index.ts              # Public API (export những gì cần thiết cho bên ngoài)
├── components/ui/            # Reusable UI primitives dùng chung toàn app (Button, Modal, Input...)
├── lib/                      # Cấu hình dùng chung (axios, socket, utils)
└── hooks/                    # Hooks dùng chung toàn app (useAuth, useDebounce...)
```

### 3.2. Cấu trúc Backend (`apps/api`)

```text
apps/api/src/
├── modules/courses/          # Module nghiệp vụ NestJS
│   ├── courses.controller.ts # Chỉ routing, phân luồng HTTP
│   ├── courses.service.ts    # Nghiệp vụ cốt lõi
│   ├── dto/                  # Data Transfer Objects & Schema Validation
│   │   ├── create-course.dto.ts
│   │   └── filter-course.dto.ts
│   ├── interfaces/           # Hợp đồng / Interfaces nội bộ
│   │   └── course-query.interface.ts
│   ├── repositories/         # Tương tác DB riêng biệt (khi truy vấn phức tạp)
│   │   └── course.repository.ts
│   └── courses.module.ts     # Khai báo Nest Module
├── common/                   # Dùng chung (Guards, Interceptors, Filters, Decorators)
└── config/                   # Config env, database...
```

---

## 4. ⚛️ QUY CHUẨN FRONTEND (REACT / NEXT.JS)

1. **Phân tách Smart Component (Container) và Dumb Component (Presentational)**:
   - **Presentational Component**: Thuần túy nhận `props` và render giao diện. Dễ đọc, dễ tái sử dụng, dễ test giao diện (Storybook/Unit test).
   - **Container / Custom Hook**: Chịu trách nhiệm fetch dữ liệu, handle loading/error, sau đó truyền dữ liệu đã xử lý xuống cho Presentational Component.
2. **Tách biệt Logic phức tạp sang Custom Hook**:
   - Khi một component có logic xử lý state phức tạp, xử lý sự kiện bất đồng bộ, hoặc gọi API $\rightarrow$ **Trích xuất sang Custom Hook riêng** (`use<Feature>.ts`).
3. **Tách nhỏ Sub-components khi cần thiết**:
   - Khi một phần UI có trạng thái riêng biệt hoặc lặp lại theo danh sách (như item trong bảng, item trong list), tách thành component vệ tinh trong cùng thư mục `components/`.
4. **Quy chuẩn Typography & Text Thương mại cho Trẻ Em (Kid Commercial Typography)**:
   - *Chi tiết quy chuẩn*: Xem tại [.agents/rules/kid-commercial-typography.md](file:///.agents/rules/kid-commercial-typography.md).
   - **CẤM Eyebrow Pill / Micro-tag trên đầu tiêu đề**: Tuyệt đối KHÔNG tạo các viên thuốc nhỏ chứa icon (Sparkles, Star...) lơ lửng bên trên tiêu đề (`inline-flex rounded-full border px-3 py-1 text-xs...`). Giao diện trẻ em cần đi thẳng vào Tiêu đề chính to bản (`font-black`) và Mascot linh vật sinh động, loại bỏ hoàn toàn khuôn mẫu sáo rỗng của SaaS B2B. Tag/Badge chỉ được dùng bên trong item card để biểu thị trạng thái dữ liệu (Status) cụ thể.
   - **Độ đậm (Weight)**: Tiêu đề bắt buộc `font-black` (900) hoặc `font-extrabold` (800). Nội dung thân (body) bắt buộc `font-semibold` (600) hoặc `font-bold` (700). Nút bấm/Thẻ bắt buộc `font-extrabold`. Tuyệt đối CẤM `font-light`, `font-thin`, `font-normal`.
   - **Độ tương phản & Sắc nét (WCAG AAA $\ge 7:1$)**: Màu chữ trên nền sáng bắt buộc là `text-slate-800` hoặc `text-slate-900`. Chữ trên nền vàng (`bg-kid-yellow`) bắt buộc là `text-amber-950` (CẤM chữ trắng trên nền vàng). CẤM dùng `text-gray-400`, `text-slate-400`, `text-zinc-400` cho nội dung đọc.
   - **Kích thước tối thiểu**: Không dùng font nhỏ hơn `14px` (`text-sm`) cho nội dung đọc hiểu.
   - **Văn phong thương mại cho trẻ em**: Lời thoại thân thiện, khích lệ ("Bạn", "Chúng mình"), nút bấm có động từ hành động + emoji sinh động, thông báo lỗi nhẹ nhàng khích lệ thử lại.
5. **Icon có chủ đích, không “AI slop”**:
   - **Kid Icon System là bộ icon chuẩn duy nhất của sản phẩm**, đặt trong `apps/web/src/components/kid/icons/`, thay thế cả icon thương hiệu lẫn icon thao tác hệ thống: tìm kiếm, đóng, quay lại, điều hướng, cài đặt, chỉnh sửa và xoá. Không import icon mới từ `lucide-react` hoặc cài thêm thư viện icon UI khác. Các import Lucide đã tồn tại là technical debt cần migrate dần sang Kid Icon System.
   - Mỗi `KidIcon` phải là SVG vẽ riêng, có một silhouette dễ nhận diện, nét bo tròn đồng nhất và `viewBox` 24×24. Viền dùng `currentColor`; mảng nhận diện dùng token `--kid-icon-gold` (mặc định `#FFCA28`) để gắn với Cú Vàng. Không dùng ảnh raster, emoji hoặc SVG sinh tự động làm icon production. Logo, mascot và minh hoạ vẫn là asset thương hiệu riêng.
   - Chỉ thêm icon khi nó truyền tải **một hành động, trạng thái hoặc loại nội dung cụ thể** mà chữ hoặc bố cục không thể hiện rõ hơn. Không thêm icon chỉ để lấp chỗ trống, làm giao diện “trông vui hơn”, hoặc vì một mẫu UI có sẵn dùng icon.
   - ⛔ Không tự động rải các icon chung chung như `Sparkles`, `Star`, `Rocket`, `Zap`, `Wand2`, `Brain`, `Trophy` vào tiêu đề, hero, card, CTA hoặc nền trang. Chúng chỉ được dùng khi đúng với dữ liệu/thành tích thực tế (ví dụ: số sao bé vừa nhận), không phải trang trí.
   - Với các action/navigation chuẩn, dùng icon có nghĩa quy ước rõ ràng và khớp chính xác với nhãn: `Search` cho tìm kiếm, `Settings` cho cài đặt, `ChevronRight` cho điều hướng tiếp. Nếu nhãn chữ đã đủ rõ, ưu tiên bỏ icon hơn là chọn một icon mơ hồ.
   - Dùng outline Kid Icon với `strokeWidth={2.25}`; dùng `size-4` (16px) cho control phụ, `size-5` (20px) cho action/navigation, `size-6` (24px) cho action chính. Chỉ dùng filled icon phần thưởng khi biểu thị điểm hoặc thành tích đã đạt. Không trộn icon 3D, emoji, filled và outline ngẫu nhiên; không tạo icon gradient/bóng đổ/circular tile chỉ để trang trí.
   - Không biến mọi card, nút hay dòng thông tin thành một icon trong ô vuông/ô tròn màu sắc. Icon chỉ là tín hiệu phụ; nội dung, typography và hình minh hoạ/mascot có chủ đề mới là trọng tâm thị giác.
   - Icon-only button bắt buộc có `aria-label` và tooltip; icon mang nghĩa trạng thái phải đi kèm text hoặc nhãn hỗ trợ. Emoji được phép trong microcopy theo quy chuẩn trẻ em, nhưng không dùng để thay thế icon chức năng hoặc làm họa tiết rải ngẫu nhiên.
6. **Responsive & Mobile UI bắt buộc**:
   - Với mọi code mới hoặc thay đổi có ảnh hưởng đến giao diện, thiết kế và triển khai theo hướng mobile-first; kiểm tra cả màn hình nhỏ, tablet và desktop, kể cả các màn hình hoặc component liên quan bị ảnh hưởng.
   - Kiểm tra thực tế trên trình duyệt hoặc công cụ mô phỏng tại tối thiểu các chiều rộng 320px, 375px, 768px và 1440px; kiểm tra thêm breakpoint và chiều ngang/dọc khi thay đổi có liên quan. Không chỉ dựa vào việc đọc CSS hoặc build thành công để kết luận responsive hoạt động.
   - Kiểm tra nội dung không bị tràn ngang ngoài ý muốn, cắt mất, chồng lấp hoặc khó đọc; bố cục, ảnh, bảng, menu, modal, form và các trạng thái loading/error/empty phải thích ứng với không gian hiển thị. Vùng cuộn ngang có chủ đích phải rõ ràng và sử dụng được.
   - Trên mobile, kiểm tra thao tác cảm ứng, khoảng cách giữa các control, vùng chạm tối thiểu 44×44 CSS px cho các hành động chính, điều hướng, bàn phím và nội dung không bị che bởi thanh cố định, safe area hoặc bàn phím ảo khi phù hợp. Giữ nguyên khả năng sử dụng bằng bàn phím và công nghệ hỗ trợ.
   - Sửa các lỗi responsive phát sinh từ thay đổi trước khi hoàn thành. Trong báo cáo cuối, nêu các viewport và luồng đã kiểm tra; nếu không thể kiểm tra thực tế, nêu rõ lý do, phần chưa kiểm tra và rủi ro còn lại. Các thay đổi không ảnh hưởng UI không cần kiểm tra trực quan responsive.

---

## 5. 🛠️ QUY CHUẨN BACKEND (NESTJS / NODE.JS)

1. **Luồng dữ liệu một chiều chuẩn (Request Lifecycle)**:
   $$\text{Client Request} \longrightarrow \text{Controller (Validate DTO)} \longrightarrow \text{Service (Business Logic)} \longrightarrow \text{Repository / Database}$$
2. **DTO & Validation bắt buộc**:
   - Mọi request body, query params, path params đều phải có DTO tương ứng với decorator `class-validator` hoặc schema `zod`.
   - Cấm sử dụng `any` trong `req.body` hoặc tham số phương thức.
3. **Tách Service theo miền nghiệp vụ**:
   - Khi một Service bắt đầu thực hiện nhiều nhóm nghiệp vụ khác nhau, chủ động phân tách thành các sub-services chuyên biệt:
     - *Ví dụ*: `UserAuthService`, `UserProfileService`, `UserAvatarService`.
4. **Xử lý Ngoại lệ chuẩn mực (Centralized Exception Handling)**:
   - Sử dụng NestJS Built-in Exceptions (`NotFoundException`, `BadRequestException`, `ForbiddenException`).
   - Tuyệt đối không nuốt lỗi bằng `catch (e) {}` trống.

---

## 6. 📦 QUY CHUẨN MONOREPO & CHIA SẺ MÃ NGUỒN

1. **Typescript Strict**:
   - Nghiêm cấm dùng `any`. Sử dụng `unknown`, Generic `<T>`, hoặc Interface có cấu trúc rõ ràng.
   - Types dùng chung giữa Frontend và Backend phải đặt tại `packages/types/`.
2. **Database Access (`packages/database`)**:
   - Truy vấn database thông qua client tập trung trong `packages/database`, tránh khởi tạo connection riêng rẽ.

---

## 7. 🤖 CHECKLIST TỰ KIỂM TRA CHO AI AGENT (SELF-VERIFICATION)

Trước khi hoàn thành bất kỳ tác vụ nào, AI Agent phải rà soát:

- [ ] **Ranh giới trách nhiệm (SRP)**: File mới hoặc file sửa đổi có ôm đồm nhiều việc không liên quan không?
- [ ] **Tách biệt Logic & UI**: Component giao diện có bị lẫn lộn logic gọi API trực tiếp hoặc xử lý thuật toán phức tạp không?
- [ ] **Đúng vị trí phân tầng**: Code đã nằm đúng tầng kiến trúc (Controller $\rightarrow$ Service $\rightarrow$ Repository) chưa?
- [ ] **Type Safety**: Toàn bộ dữ liệu vào/ra có type/interface rõ ràng, không có `any` không?
- [ ] **Typography & Độ Tương Phản**:
  - **Không có Eyebrow Pill**: Đã loại bỏ các tag nhỏ/viên thuốc lơ lửng trên đầu tiêu đề? Tiêu đề có mở đầu trực diện không?
  - Tiêu đề $\ge$ `font-extrabold` (800/900)? Body $\ge$ `font-semibold` (600/700)? Có bị sót `font-light/normal` không?
  - Màu chữ có tương phản sắc nét ($\ge 7:1$) không? Có dùng `text-gray-400`/`text-slate-400` gây mờ mắt trẻ không?
  - Cỡ chữ có bị nhỏ hơn `14px` không? Nút bấm vàng có dùng chữ `text-amber-950` không?
  - Văn phong thương mại thân thiện, tích cực, đúng ngữ pháp tiếng Việt chưa?
- [ ] **Icon có chủ đích**: Mỗi icon có mang nghĩa hành động/trạng thái/dữ liệu cụ thể không? Đã bỏ icon trang trí chung chung, icon trong ô màu lặp lại và các icon “Sparkles/Star/Rocket/Zap” không gắn với nội dung thực tế chưa?
- [ ] **Responsive & Mobile UI**: Với thay đổi ảnh hưởng UI, đã kiểm tra thực tế các viewport 320px, 375px, 768px, 1440px và các luồng liên quan; xử lý tràn, che khuất, thao tác cảm ứng và báo cáo kết quả hoặc giới hạn kiểm tra chưa?
- [ ] **Khả năng Scale & Maintain**: Người khác có dễ dàng đọc hiểu, bảo trì và viết test cho module này không?
