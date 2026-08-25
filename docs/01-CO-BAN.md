# 01. Phương Thức Cơ Bản

## Tổng Quan

GSAP có 4 phương thức chính để tạo animation:

| Method | Mô tả | Use case |
|--------|-------|----------|
| `gsap.to()` | Animate **đến** state mới | Entrance, movement |
| `gsap.from()` | Animate **từ** state về CSS gốc | Fade-in, slide-in |
| `gsap.fromTo()` | Animate **từ** state A **đến** state B | Full control |
| `gsap.set()` | Set properties ngay lập tức (không animate) | Reset, initial state |

---

## 1. gsap.to() - Animate Đến State Mới

Phương thức phổ biến nhất. Từ state hiện tại → state的目标.

```typescript
gsap.to(".box", {
  duration: 2,          // Thời gian (giây)
  x: 200,               // Di chuyển 200px sang phải
  y: 100,               // Di chuyển 100px xuống
  rotation: 360,        // Xoay 1 vòng
  scale: 1.5,           // Phóng to 1.5x
  opacity: 0,           // Mờ dần
  backgroundColor: "#ff0000",
  ease: "power2.inOut", // Easing function
});
```

### Parameters phổ biến

```typescript
gsap.to(".box", {
  duration: 1,        // Duration (default: 0.5s)
  delay: 0.5,         // Delay trước khi bắt đầu
  repeat: 2,          // Lặp 2 lần (-1 = vô hạn)
  yoyo: true,         // Reverse sau mỗi repeat
  ease: "power2.out", // Easing
  stagger: 0.1,       // Delay giữa các elements

  // Callbacks
  onStart: () => console.log("Bắt đầu!"),
  onUpdate: () => console.log("Đang chạy..."),
  onComplete: () => console.log("Xong!"),
});
```

---

## 2. gsap.from() - Animate Từ State

Định nghĩa state **bắt đầu**, animate về CSS gốc.

```typescript
// Fade in từ opacity 0
gsap.from(".box", {
  duration: 1,
  opacity: 0,
});

// Slide in từ trái
gsap.from(".box", {
  duration: 1.5,
  x: -200,
  ease: "power3.out",
});

// Scale up từ nhỏ
gsap.from(".box", {
  duration: 0.8,
  scale: 0.5,
  ease: "back.out(1.7)", // Overshoot
});
```

### ⚠️ Lưu ý quan trọng

```typescript
// ❌ SAI: from() sẽ animate từ opacity: 0 → opacity: 0 (không thấy gì)
gsap.from(".box", { opacity: 0 });

// ✅ ĐÚNG: Đặt opacity gốc trong CSS hoặc dùng fromTo
// CSS: .box { opacity: 1; }
gsap.from(".box", { opacity: 0 });
```

---

## 3. gsap.fromTo() - Full Control

Định nghĩa rõ ràng **state A** và **state B**.

```typescript
gsap.fromTo(
  ".box",
  {
    // FROM state
    x: -100,
    opacity: 0,
    rotation: -45,
  },
  {
    // TO state
    x: 100,
    opacity: 1,
    rotation: 45,
    duration: 2,
    ease: "power3.inOut",
  }
);
```

### Khi nào dùng fromTo?

- Khi cần **pixel-perfect control**
- Khi không biết CSS gốc của element
- Khi cần animation **repeatable** và predictable
- Khi dùng trong **timelines** cần explicit values

---

## 4. gsap.set() - Instant Properties

Đặt properties **ngay lập tức** (không animate). Tương đương `gsap.to()` với `duration: 0`.

```typescript
// Ẩn element ngay lập tức
gsap.set(".box", { opacity: 0, visibility: "hidden" });

// Randomize position
gsap.set(".box", {
  x: Math.random() * 500,
  y: Math.random() * 500,
  rotation: Math.random() * 360,
});

// Reset transform
gsap.set(".box", { clearProps: "all" });
```

### Khi nào dùng set()?

- **Reset state** trước khi animate
- **Set initial values** trong timeline
- **Apply instant changes** không cần animation
- **Clear properties** với `clearProps`

---

## 5. Properties Có Thể Animate

### CSS Transforms (GPU-accelerated) ⚡

```typescript
gsap.to(".box", {
  x: 100,              // translateX
  y: 50,               // translateY
  rotation: 360,       // rotate (degrees)
  rotationX: 45,       // rotate3D X
  rotationY: 45,       // rotate3D Y
  scale: 1.5,          // scale
  scaleX: 2,           // scale X
  scaleY: 0.5,         // scale Y
  skewX: 15,           // skew X
  skewY: 15,           // skew Y
  transformOrigin: "center center",
});
```

### CSS Properties

```typescript
gsap.to(".box", {
  width: 200,
  height: 200,
  padding: 20,
  margin: 10,
  borderRadius: "50%",
  backgroundColor: "#ff0000",
  color: "#ffffff",
  fontSize: "24px",
  opacity: 0.5,
});
```

### Colors

```typescript
gsap.to(".box", {
  backgroundColor: "#ff0000",
  borderColor: "rgb(0, 255, 0)",
  backgroundImage: "linear-gradient(45deg, #ff0000, #0000ff)",
});
```

### CSS Variables

```typescript
gsap.to(".box", {
  "--primary-color": "#ff0000",
  "--spacing": "20px",
  duration: 1,
});
```

---

## 6. Key Properties Deep Dive

### autoAlpha (opacity + visibility)

`autoAlpha` = `opacity` + `visibility` combined. Khi opacity = 0, element cũng自动 set `visibility: hidden` — prevent click/interaction trên element ẩn.

```typescript
// ✅ Dùng autoAlpha thay vì opacity
gsap.to(".element", {
  autoAlpha: 0,  // opacity: 0 + visibility: hidden
  duration: 0.5,
});

gsap.from(".element", {
  autoAlpha: 0,  // Từ opacity: 0 + visibility: hidden
  duration: 0.5,
});

// Why?
// opacity: 0 → element vẫn có thể click (invisible nhưng interactive)
// autoAlpha: 0 → element bị ẩn hoàn toàn (hidden + non-interactive)
```

### Keyframes Syntax

Keyframes cho phép multi-step animation trong 1 tween thay vì tạo timeline phức tạp.

```typescript
// Thay vì tạo timeline:
// ❌
const tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 0.3 })
  .to(".box", { y: 50, duration: 0.3 })
  .to(".box", { rotation: 360, duration: 0.5 });

// ✅ Dùng keyframes
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 0.3 },
    { y: 50, duration: 0.3 },
    { rotation: 360, duration: 0.5 },
  ],
});

// Keyframes với easing per-step
gsap.to(".box", {
  keyframes: [
    { x: 100, ease: "power2.out" },
    { y: 50, ease: "power2.in" },
    { rotation: 360, scale: 1.5, ease: "back.out(1.7)" },
  ],
});

// Keyframes với position parameter (overlap)
gsap.to(".box", {
  keyframes: [
    { x: 100, duration: 0.3 },
    { y: 50, duration: 0.3, position: "-=0.1" },
    { rotation: 360, duration: 0.5, position: "<" },
  ],
});
```

### overwrite

Control overlap behavior khi new tween target cùng property với existing tween.

```typescript
// overwrite: false (default)
// → Old tween tiếp tục, new tween override khi conflict
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1 }); // Cả 2 chạy, x nhảy

// overwrite: true
// → Kill TẤT CẢ existing tweens trên element này
gsap.to(".box", { x: 100, duration: 2 });
gsap.to(".box", { x: 200, duration: 1, overwrite: true }); // Old bị kill

// overwrite: "auto" (Recommended)
// → Kill chỉ những tweens conflict trên cùng properties
gsap.to(".box", { x: 100, y: 50, duration: 2 });
gsap.to(".box", { x: 200, duration: 1, overwrite: "auto" });
// Chỉ x tween bị kill, y tween tiếp tục
```

### clearProps

Remove inline styles sau khi animation hoàn thành.

```typescript
// clearProps: "all" — remove TẤT CẢ inline styles
gsap.from(".element", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  clearProps: "all", // Sau animation: không còn inline styles
});

// clearProps specific properties
gsap.from(".element", {
  y: 50,
  scale: 0.5,
  rotation: 10,
  duration: 0.5,
  clearProps: "y,scale,rotation", // Chỉ clear这些
});

// Why clearProps quan trọng?
// Sau gsap.from(), inline styles vẫn còn → conflict với CSS classes
// clearProps đảm bảo clean state cho CSS classes
```

---

## 7. React Integration Cơ Bản

```typescript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function MyComponent() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dùng ref thay vì selector
    gsap.to(boxRef.current, {
      x: 200,
      rotation: 360,
      duration: 2,
      ease: "power2.inOut",
    });
  }, { scope: boxRef }); // Scope cho cleanup

  return <div ref={boxRef} className="box" />;
}
```

### Tại sao dùng `useGSAP` thay vì `useEffect`?

1. **Auto cleanup**: Animation tự revert khi component unmount
2. **Scoped selectors**: Selector text chỉ tìm trong scope
3. **SSR-safe**: Hoạt động với Next.js server rendering
4. **Context-safe**: Event handlers được manage đúng cách

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Hello Animation

```typescript
// Tạo component có 3 boxes, mỗi box animate theo cách khác nhau
// Box 1: gsap.to() - di chuyển sang phải
// Box 2: gsap.from() - fade in từ dưới lên
// Box 3: gsap.fromTo() - scale từ 0 lên 1 với rotation
```

### Bài 2: Interactive Button

```typescript
// Tạo button khi hover thì scale lên 1.1
// Khi click thì rotation 360 độ
// Dùng gsap.to() với ease: "back.out(1.7)"
```

### Bài 3: Loading Animation

```typescript
// Tạo 3 dots依次 animate opacity
// Dùng gsap.set() để reset state
// Dùng gsap.to() với repeat: -1, yoyo: true
```

---

*Bài tiếp theo: [02-EASING.md](./02-EASING.md) - Easing Functions*
