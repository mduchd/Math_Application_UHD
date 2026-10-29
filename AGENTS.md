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
   - **Độ đậm (Weight)**: Tiêu đề bắt buộc `font-black` (900) hoặc `font-extrabold` (800). Nội dung thân (body) bắt buộc `font-semibold` (600) hoặc `font-bold` (700). Nút bấm/Thẻ bắt buộc `font-extrabold`. Tuyệt đối CẤM `font-light`, `font-thin`, `font-normal`.
   - **Độ tương phản & Sắc nét (WCAG AAA $\ge 7:1$)**: Màu chữ trên nền sáng bắt buộc là `text-slate-800` hoặc `text-slate-900`. Chữ trên nền vàng (`bg-kid-yellow`) bắt buộc là `text-amber-950` (CẤM chữ trắng trên nền vàng). CẤM dùng `text-gray-400`, `text-slate-400`, `text-zinc-400` cho nội dung đọc.
   - **Kích thước tối thiểu**: Không dùng font nhỏ hơn `14px` (`text-sm`) cho nội dung đọc hiểu.
   - **Văn phong thương mại cho trẻ em**: Lời thoại thân thiện, khích lệ ("Bạn", "Chúng mình"), nút bấm có động từ hành động + emoji sinh động, thông báo lỗi nhẹ nhàng khích lệ thử lại.

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
  - Tiêu đề $\ge$ `font-extrabold` (800/900)? Body $\ge$ `font-semibold` (600/700)? Có bị sót `font-light/normal` không?
  - Màu chữ có tương phản sắc nét ($\ge 7:1$) không? Có dùng `text-gray-400`/`text-slate-400` gây mờ mắt trẻ không?
  - Cỡ chữ có bị nhỏ hơn `14px` không? Nút bấm vàng có dùng chữ `text-amber-950` không?
  - Văn phong thương mại thân thiện, tích cực, đúng ngữ pháp tiếng Việt chưa?
- [ ] **Khả năng Scale & Maintain**: Người khác có dễ dàng đọc hiểu, bảo trì và viết test cho module này không?
