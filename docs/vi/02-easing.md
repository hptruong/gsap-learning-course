# 02. Easing và Cảm Giác Chuyển Động

> **Mục tiêu:** chọn ease theo ý nghĩa UI thay vì chọn vì “trông hay”.

Easing điều khiển **tốc độ thay đổi** của tween. Nó không thay đổi quãng đường. Hậu tố `.in` bắt đầu chậm, `.out` kết thúc chậm, `.inOut` chậm ở cả đầu và cuối.

```js
gsap.to(".card", { x: 180, duration: 0.6, ease: "power2.out" });
gsap.to(".dialog", { scale: 1, duration: 0.25, ease: "power2.inOut" });
gsap.to(".progress", { scaleX: 1, duration: 1, ease: "none" });
```

## Chọn ease theo ngữ cảnh

| Ý định | Điểm bắt đầu tốt | Lý do |
| --- | --- | --- |
| Content đi vào | `power2.out` hoặc `power3.out` | Nhanh xuất hiện, chậm ổn định. |
| Đổi state | `power2.inOut` | Cảm giác cân bằng hai state. |
| Tiến trình/scroll | `none` | Không làm sai quan hệ 1:1 với dữ liệu hoặc scroll. |
| Feedback nhỏ | `back.out(1.4)` | Có overshoot nhẹ, không nên dùng cho nội dung quan trọng. |
| Loop trang trí | `sine.inOut` | Chuyển động mềm, không giật. |

`elastic` và `bounce` thu hút chú ý mạnh. Hãy dùng chúng cho game hoặc personality rõ ràng, không dùng mặc định cho form, modal hay điều hướng.

## Thử nghiệm trực quan

```js
const eases = ["none", "power2.out", "power2.inOut", "back.out(1.4)"];

eases.forEach((ease, index) => {
  gsap.to(`.demo-${index}`, { x: 220, duration: 1, ease, repeat: -1, yoyo: true });
});
```

Chạy bốn hàng cạnh nhau. Đừng chỉ quan sát điểm cuối, hãy quan sát thời gian object tăng tốc và giảm tốc.

## Easing và ScrollTrigger

Khi `scrub` nối progress animation với scroll, dùng `ease: "none"` cho tween hoặc timeline được scrub. Nếu thêm ease, vị trí scroll và vị trí visual không còn tuyến tính, người dùng sẽ thấy cảm giác trượt không đúng tay.

## CustomEase, chỉ khi cần

```js
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("product-enter", ".16,1,.3,1");
gsap.to(".panel", { y: 0, ease: "product-enter" });
```

Tên custom ease theo mục đích. Một design system thường chỉ cần vài curve nhất quán; không tạo curve mới cho từng component.

## Bài tập

Làm ba phiên bản cùng một notification: entrance, dismiss và progress bar. Ghi một câu giải thích tại sao mỗi ease phản ánh đúng mục đích.

**Tiêu chí đạt:** progress dùng `none`; không có ease làm người dùng chờ đọc content; duration và easing nhất quán trong một component.

## Đọc thêm

- [GSAP Eases](https://gsap.com/docs/v3/Eases/)
- [Ease Visualizer](https://gsap.com/docs/v3/Eases/CustomEase/)
