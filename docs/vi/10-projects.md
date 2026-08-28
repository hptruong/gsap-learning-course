# 10. Capstone: Học Bằng Cách Hoàn Thành Dự Án

> **Mục tiêu:** biến API thành kỹ năng xây dựng sản phẩm, không chỉ sưu tầm effect.

Mỗi capstone bắt đầu bằng trang tĩnh. Chỉ thêm motion sau khi hierarchy, content và responsive layout đã hoạt động không có JavaScript.

## Capstone 1: Accessible Hero

**Brief:** tạo hero cho portfolio hoặc product với eyebrow, heading, mô tả và CTA.

1. Viết HTML và CSS để toàn bộ content đọc được ngay khi JS tắt.
2. Dùng một timeline có labels để reveal content theo thứ tự.
3. Thêm nút replay, nhưng không tự động replay vô hạn.
4. Reduced motion chỉ fade hoặc giữ state cuối.

**Acceptance criteria:** keyboard focus CTA không bị che; refresh không FOUC; timeline không dùng delay chain; nội dung chính sẵn sàng trong thời gian ngắn.

## Capstone 2: Responsive Feature Story

**Brief:** giải thích ba feature product bằng scroll, không làm mobile thành horizontal scroll khó dùng.

1. Tạo ba section flow dọc bình thường.
2. Thêm one-shot reveal bằng ScrollTrigger và markers trong development.
3. Chỉ desktop mới dùng một pinned explainer ngắn nếu pin thực sự giúp giải thích.
4. Dùng `gsap.matchMedia()` để revert desktop ScrollTriggers khi về mobile.
5. Test ảnh và web font load chậm, sau đó refresh đúng một lần khi layout ổn định.

**Acceptance criteria:** mobile không pin/scrub; reduced motion không có scroll-linked movement; markers không ship; resize không làm trigger sai vị trí.

## Capstone 3: Text hoặc SVG Specialist

Chọn **một** hướng:

- Text: SplitText line reveal với custom font, `autoSplit`, screen reader test và `revert()`.
- SVG: stroke reveal và MotionPath ở nhiều viewBox size, có nhãn cho SVG mang nghĩa.

**Acceptance criteria:** không dùng manual `split("")`; không animate fill bằng DrawSVG; teardown không để lại split markup hoặc plugin instance.

## Capstone 4: Product Landing Page

### Motion inventory trước khi code

| Element | Mục đích | Trigger | Fallback |
| --- | --- | --- | --- |
| Hero copy | Dẫn mắt vào hierarchy | page load | visible ngay/fade. |
| Feature cards | Nhóm hóa nội dung | viewport enter | visible ngay. |
| Product visual | Giải thích chi tiết | optional scroll | static image. |
| CTA | Feedback tương tác | hover/focus | CSS state. |

Không có mục đích và fallback thì bỏ animation.

## Handoff checklist

- Link repository, cách chạy và screenshot/video ngắn.
- Motion inventory và lý do chọn mỗi effect.
- Matrix test: desktop, 375px, keyboard, reduced motion, slow network.
- Chrome Performance evidence trước/sau nếu có effect nặng.
- Retrospective: effect nào bị bỏ và vì sao.

## Cách tự chấm

| Tiêu chí | Câu hỏi |
| --- | --- |
| Mục đích | Motion có giúp hiểu hierarchy, feedback hoặc orientation không? |
| Kỹ thuật | Có timeline/cleanup/registration đúng API không? |
| Accessibility | Reduced motion, focus, semantics có giữ nguyên không? |
| Performance | Có test thiết bị yếu và tránh layout work không? |
| Chất lượng code | Component/animation có teardown, tên rõ và không duplicate state không? |

Capstone đạt khi mọi hàng đều có bằng chứng, không phải khi trang có nhiều effect nhất.
