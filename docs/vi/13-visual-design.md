# 13. Motion Design cho Developer: Thiết Kế Quan Hệ, Không Chỉ Duration

> **Mục tiêu:** biến một UI tĩnh thành motion system nhất quán bằng hierarchy, spatial continuity, timing token và feedback — không chọn ease ngẫu nhiên cho từng component.

Motion design không phải lớp polish đặt lên cuối. Layout, reading order, contrast và interaction state quyết định motion nào có ý nghĩa. Nếu component tĩnh chưa rõ, animation chỉ làm lỗi khó nhìn hơn.

## Bốn nguyên lý dùng được ngay trong UI

| Nguyên lý | Câu hỏi khi code | Ví dụ đúng | Lỗi thường gặp |
| --- | --- | --- | --- |
| Hierarchy | Mắt phải đến đâu trước? | Title vào trước supporting copy; CTA ổn định sau. | Mọi element stagger như nhau. |
| Spatial continuity | Object đi đâu khi state đổi? | Card mở rộng từ card đã click, origin gần điểm click. | Modal xuất hiện từ góc vô nghĩa. |
| Causality | User vừa làm gì và hệ thống phản hồi gì? | Button nhấn → trạng thái loading/complete rõ. | Decorative bounce sau action nghiêm túc. |
| Restraint | Motion có tranh attention với content không? | Một primary transition trong viewport. | Parallax, marquee, cursor cùng chạy. |

## Bắt đầu bằng state map

Không viết `gsap.to()` trước khi biết state. Với một card expansion, map như sau:

| State | Visual | Semantic / interaction | Motion role |
| --- | --- | --- | --- |
| Rest | Card compact, CTA visible | Button `aria-expanded="false"` | Không cần motion. |
| Pressed | Focus vẫn ở button | `aria-expanded="true"` ngay lúc state đổi | Feedback 100–200ms. |
| Open | Detail và close control xuất hiện | Focus chuyển có chủ ý nếu dialog | Continuity từ card sang detail. |
| Close | Trở về card ban đầu | Focus quay lại trigger | Reverse hoặc transition ngắn. |

Accessibility state không được chờ `onComplete`. Code state trước, GSAP chỉ diễn tả visual state.

## Tạo motion tokens thay vì magic number

Một product không cần 20 ease khác nhau. Bắt đầu bằng token có tên theo mục đích:

```js
export const motion = {
  duration: {
    feedback: 0.16,
    enter: 0.42,
    transition: 0.55,
  },
  ease: {
    enter: "power3.out",
    state: "power2.inOut",
    data: "none",
  },
  distance: {
    small: 8,
    medium: 20,
  },
};
```

```js
gsap.from(".dialog__content", {
  y: motion.distance.medium,
  autoAlpha: 0,
  duration: motion.duration.enter,
  ease: motion.ease.enter,
});
```

Token là starting point, không phải luật vật lý. Khi component cần chậm hơn vì đọc text, ghi lý do; không copy duration từ hero sang tooltip chỉ vì “brand consistency”.

## Easing nói gì với user?

- `power3.out`: object/content đi vào, nhanh xác lập rồi chậm lại để đọc.
- `power2.inOut`: đổi giữa hai state có trọng số ngang nhau, như tab hoặc panel.
- `none`: progress/data/scroll phải giữ quan hệ 1:1.
- `back.out(...)`: feedback nhỏ có personality; không phải default cho modal/form.

Duration và distance đi cùng nhau. Một object chỉ đi 8px trong 0.8 giây sẽ có cảm giác lag; một panel đi 80px trong 0.12 giây sẽ giống teleport. Test ở tốc độ touch/mobile, không chỉ mouse desktop.

## Design critique: sửa một sequence lộn xộn

**Trước:** hero title, image, nav, 6 cards cùng fade/scale/bounce; CTA bị reveal cuối sau 1.8 giây.

**Sau:**

1. Nav và CTA có sẵn ngay — chúng là navigation, không phải reward.
2. Eyebrow → title → supporting text dùng một timeline với `power3.out`.
3. Product image reveal sau title, không cạnh tranh với reading order.
4. Feature cards chỉ reveal khi user scroll đến; reduce motion hiển thị sẵn.
5. Decorative loop chỉ chạy nếu không che content, dừng khi tab hidden nếu cần.

Đây là hierarchy bằng motion: bỏ nhiều animation thường tạo cảm giác premium hơn thêm effect.

## React + TypeScript: tokens không thay lifecycle

```tsx
const motion = { enter: 0.45, ease: "power3.out" } as const;

useGSAP(() => {
  gsap.from(".product-title", {
    y: 20,
    autoAlpha: 0,
    duration: motion.enter,
    ease: motion.ease,
  });
}, { scope: root });
```

Token được import được không có nghĩa selector được global. Vẫn scope root, cleanup và tạo motion trong lifecycle client. Khi theme/reduced-motion setting của app đổi, dùng `gsap.matchMediaRefresh()` hoặc recreate context có chủ ý, không mutate global tween bừa bãi.

## Bài tập: motion critique có bằng chứng

1. Chọn một feature card hoặc modal đang có trong project.
2. Vẽ rest / pressed / open / close và viết semantic state của từng bước.
3. Chọn tối đa 2 duration, 2 ease và 2 distance token.
4. Implement state transition; quay video normal và reduced motion.
5. Xóa một effect mà không làm product mất nghĩa, ghi lý do.

**Tiêu chí đạt:** user biết element nào quan trọng trước; state/focus đúng cả khi animation tắt; không có hai primary motion cạnh tranh trong cùng viewport; và token có tên theo intent.

## Đọc thêm

- [GSAP easing guide](https://gsap.com/docs/v3/Eases/)
- [GSAP accessibility guide](https://gsap.com/resources/a11y/)
