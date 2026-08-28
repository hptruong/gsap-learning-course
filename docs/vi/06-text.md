# 06. Text Animation Có Accessibility

> **Mục tiêu:** animate text mà không làm screen reader đọc từng ký tự hoặc làm line split sai khi resize.

## Chọn đúng công cụ

| Nhu cầu | Công cụ |
| --- | --- |
| Đổi nội dung đơn giản | `TextPlugin` hoặc DOM text an toàn. |
| Reveal theo word, char, line | `SplitText`. |
| Hiệu ứng giải mã/chữ nhiễu | `ScrambleTextPlugin`. |

Tất cả plugin GSAP hiện nằm trong package `gsap`, nhưng phải import/register. Text animation là enhancement: heading phải đọc được nếu JavaScript không chạy.

## SplitText responsive

```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const split = SplitText.create(".headline", {
  type: "lines,words",
  mask: "lines",
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, {
      yPercent: 110,
      autoAlpha: 0,
      stagger: 0.08,
      duration: 0.55,
      ease: "power3.out",
    });
  },
});
```

`autoSplit: true` revert và split lại khi font/load width làm line thay đổi. Animation phải được tạo trong `onSplit()` và **return** animation để GSAP cleanup/sync đúng khi re-split.

## Accessibility

Với plain text, SplitText mặc định thêm `aria-label` vào parent và `aria-hidden` vào các phần đã split. Đây là lý do không được tự làm `text.split("")`: cách đó hỏng emoji/grapheme và khiến screen reader đọc ký tự rời rạc.

Nếu heading có link hoặc markup mang nghĩa, `aria-label` không giữ được semantics đó. Dùng `aria: "none"` và giữ một bản sao screen-reader-only theo [GSAP accessibility guide](https://gsap.com/resources/a11y/). Chỉ split phần text bạn thực sự animate; char split tốn DOM hơn word/line split.

## ScrambleText đúng cú pháp

```js
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);
gsap.to(".status", {
  duration: 0.6,
  scrambleText: { text: "Đã lưu", chars: "01", revealDelay: 0.15 },
});
```

`text: {}` là TextPlugin, không phải ScrambleText. Không dùng scramble cho status quan trọng nếu người dùng cần đọc nó ngay.

## Bài tập

Tạo heading line reveal có custom font. Resize trang và kiểm tra line split lại. Sau đó tạo bản reduced motion chỉ fade hoặc hiển thị ngay.

**Tiêu chí đạt:** screen reader đọc nguyên câu; không có nested link bị mất nghĩa; `split.revert()` được gọi khi bạn tự teardown outside context.

## Đọc thêm

- [SplitText API](https://gsap.com/docs/v3/Plugins/SplitText/)
- [ScrambleText API](https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin/)
