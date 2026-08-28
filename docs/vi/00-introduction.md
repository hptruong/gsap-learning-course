# 00. Bắt Đầu Với GSAP

> **Mục tiêu:** sau bài này, bạn cài được GSAP, hiểu tween là gì, và tự chạy được animation đầu tiên từ một file HTML trống.

## GSAP giải quyết vấn đề gì?

CSS transition phù hợp khi một element chỉ đổi giữa hai state đơn giản, ví dụ hover đổi màu. GSAP phù hợp khi cần điều khiển animation bằng JavaScript: chạy một chuỗi nhiều bước, đảo chiều, tạm dừng, đồng bộ với scroll, animate SVG hoặc tính giá trị động.

GSAP không phụ thuộc React, Vue hay bất kỳ framework nào. Hãy học bằng HTML/CSS/JavaScript thuần trước; kiến thức đó chuyển sang framework nguyên vẹn.

## Điều kiện đầu vào

- Biết tạo HTML element, class và CSS selector.
- Biết JavaScript cơ bản: biến, function và event listener.
- Biết `transform` và `opacity` trong CSS là lợi thế, nhưng bài 01 sẽ giải thích lại phần cần thiết.

## Cài đặt

### Cách 1: CDN, tốt nhất để học nhanh

Tạo file `index.html`, dán toàn bộ ví dụ dưới đây rồi mở bằng trình duyệt:

```html
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <title>GSAP đầu tiên</title>
    <style>
      body { min-height: 100vh; display: grid; place-items: center; margin: 0; }
      .box { width: 100px; height: 100px; border-radius: 16px; background: #2563eb; }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
    <script>
      gsap.to(".box", { x: 160, rotation: 180, duration: 1 });
    </script>
  </body>
</html>
```

Kết quả mong đợi: khi load trang, ô xanh dịch sang phải 160px và xoay 180 độ trong một giây.

### Cách 2: npm, cho dự án thật

```bash
npm install gsap
```

```js
import gsap from "gsap";

gsap.to(".box", { x: 160, duration: 1 });
```

Chỉ cài `@gsap/react` khi đi đến bài React. Các plugin đều nằm trong package `gsap`, nhưng cần import và register trước khi dùng.

## Từ vựng đầu tiên

| Từ | Nghĩa |
| --- | --- |
| **Target** | Element hoặc object được animate, ví dụ `".box"`. |
| **Tween** | Một animation thay đổi giá trị theo thời gian. `gsap.to()` trả về một tween. |
| **Vars** | Object cấu hình tween: property, duration, ease, callback. |
| **Timeline** | Container sắp xếp nhiều tween thành một choreography. |
| **Plugin** | Khả năng bổ sung như ScrollTrigger hoặc SplitText. |

## Cách học khóa này

1. Chạy ví dụ trước khi sửa bất cứ thứ gì.
2. Chỉ thay đổi một property mỗi lần và đoán kết quả trước khi refresh.
3. Hoàn thành checkpoint từ file trống, không copy toàn bộ đáp án.
4. Khi API trong course và API mới khác nhau, ưu tiên [GSAP Docs](https://gsap.com/docs/v3/).

## Checkpoint

- Đổi `x` thành `y`, sau đó đổi `rotation` thành `scale: 1.5`.
- Lưu tween vào biến: `const move = gsap.to(...)`.
- Mở DevTools Console, bảo đảm không có lỗi `gsap is not defined`.

## Đọc thêm

- [Official installation guide](https://gsap.com/docs/v3/Installation)
- [Your first animation](https://gsap.com/resources/get-started)

*Tiếp theo: [01. Tween cơ bản](./01-basics.md)*
