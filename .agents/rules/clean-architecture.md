# 🏛️ Quy Tắc Kiến Trúc & Ranh Giới Trách Nhiệm Cho AI Agent

Tệp quy tắc này được liên kết trực tiếp với [GEMINI.md](../../GEMINI.md) và [AGENTS.md](../../AGENTS.md).

## Trọng Tâm Kiến Trúc (Architecture Over Arbitrary Limits)

Không áp đặt giới hạn đếm dòng máy móc. Thay vào đó, tiêu chí cốt lõi là **sự tách bạch ranh giới trách nhiệm (Separation of Concerns)**:

1. **Nguyên tắc Đơn trách nhiệm (Single Responsibility Principle - SRP)**:
   - Mỗi file, class, component hoặc function chỉ phục vụ một mục đích duy nhất.
   - Không sinh ra các file "God Object" vừa làm routing, vừa render UI, vừa gọi DB/API, vừa validate dữ liệu.
2. **Phân tầng sạch (Clean Architecture Layers)**:
   - `Presentation` (UI/Controller) $\rightarrow$ `Application` (Service/Orchestration) $\rightarrow$ `Domain` (Entities/Business Rules) $\rightarrow$ `Infrastructure` (Prisma/Neon/External SDKs).
   - Controller không chứa logic truy vấn DB trực tiếp.
   - UI Component không gọi API/ORM trực tiếp hoặc tính toán thuật toán phức tạp ngay trong JSX.
3. **Tách biệt Logic & State (Custom Hooks)**:
   - Logic bất đồng bộ, side-effects, hoặc state phức tạp ở Frontend phải được trích xuất ra Custom Hook (`use<Feature>.ts`).
4. **Mô-đun hóa (Feature-First Structure)**:
   - Gom code theo từng tính năng nghiệp vụ (`features/<feature>/` ở Frontend, `modules/<module>/` ở Backend).
5. **Độ an toàn kiểu dữ liệu (Strict Type Safety)**:
   - Nghiêm cấm dùng `any`. Sử dụng DTO, Interface, hoặc Zod schema có cấu trúc rõ ràng.
6. **Chuẩn Typography & Text Thương Mại (Kid Commercial Typography)**:
   - Tuân thủ nghiêm ngặt [.agents/rules/kid-commercial-typography.md](./kid-commercial-typography.md).
   - Text đậm, sắc nét, tương phản cao (WCAG AAA $\ge 7:1$).
   - Tuyệt đối không dùng font mảnh (`font-light/normal`) hay màu xám mờ nhạt (`text-gray-400`).
   - Văn phong khích lệ, thân thiện, mang tính giáo dục thương mại cho học sinh tiểu học.
