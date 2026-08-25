# 02. Easing - Cảm Giác Chuyển Động

## Easing là gì?

**Easing** kiểm soát **gia tốc** và **chuyển động** của animation. Cùng một duration nhưng easing khác nhau sẽ tạo cảm giác hoàn toàn khác.

```
Linear:        ──────────────────────────→ (đều đều, nhàm chán)
Power2.out:    ═══════════───────────────→ (nhanh đầu, chậm cuối)
Elastic.out:   ══════════≌≌≌≌≌≌≌≌≌≌≌≌≌≌→ (như lò xo)
Bounce.out:    ══════════/Images/bounce   → (như bóng nảy)
```

---

## Các Nhóm Easing Chính

### 1. Power Eases (Phổ biến nhất)

```typescript
// power1: Subtle (mềm nhất)
gsap.to(".box", { x: 200, ease: "power1.out" });  // Nhẹ nhàng
gsap.to(".box", { x: 200, ease: "power1.inOut" });

// power2: Moderate (hay dùng nhất)
gsap.to(".box", { x: 200, ease: "power2.out" });
gsap.to(".box", { x: 200, ease: "power2.inOut" });

// power3: Strong
gsap.to(".box", { x: 200, ease: "power3.out" });

// power4: Very strong (mạnh nhất)
gsap.to(".box", { x: 200, ease: "power4.out" });
```

**Quy tắc**: power越 lớn = acceleration越 mạnh

### 2. Sine Eases (Mượt mà)

```typescript
gsap.to(".box", { x: 200, ease: "sine.out" });     // Organic, tự nhiên
gsap.to(".box", { x: 200, ease: "sine.inOut" });   // Smooth como sóng
```

### 3. Elastic Eases (Như lò xo)

```typescript
gsap.to(".box", { x: 200, ease: "elastic.out(1, 0.3)" });
// Parameters: (amplitude, period)
// amplitude: độ mạnh của bounce (default: 1)
// period: thời gian giữa mỗi bounce (default: 0.3)
```

### 4. Bounce Eases (Như bóng nảy)

```typescript
gsap.to(".box", {
  y: -200,
  ease: "bounce.out",    // Nảy khi chạm đất
});

gsap.to(".box", {
  y: 200,
  ease: "bounce.in",     // Nảy khi bắt đầu
});
```

### 5. Back Eases (Overshoot)

```typescript
gsap.to(".box", {
  x: 200,
  ease: "back.out(1.7)",  // Vượt qua rồi quay lại
});
// Parameter: overshoot amount (default: 1.70158)
```

### 6. Circ Eases (Circular)

```typescript
gsap.to(".box", { x: 200, ease: "circ.out" });
gsap.to(".box", { x: 200, ease: "circ.inOut" });
```

### 7. Expo Eases (Exponential)

```typescript
gsap.to(".box", { x: 200, ease: "expo.out" });
gsap.to(".box", { x: 200, ease: "expo.inOut" });
```

---

## Ba Variants: in, out, inOut

```
.in    → Chậm đầu, nhanh cuối     (dùng cho exit animations)
.out   → Nhanh đầu, chậm cuối     (dùng cho entrance animations)
.inOut → Chậm đầu và cuối         (dùng cho continuous motion)
```

| Easing | Khi nào dùng |
|--------|---------------|
| `power2.out` | Entrance (fade in, slide in) |
| `power2.in` | Exit (fade out, slide out) |
| `power2.inOut` | Continuous motion |
| `back.out` | Playful entrance |
| `elastic.out` | Attention-grabbing |
| `bounce.out` | Landing/falling |
| `sine.inOut` | Smooth, organic |

---

## Custom Ease (Nâng cao)

```typescript
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

// Tạo custom curve
CustomEase.create("myEase", "M0,0 C0.2,1 0.8,1 1,1");

// Dùng trong animation
gsap.to(".box", { x: 200, ease: "myEase" });
```

---

## Visual Easing Reference

```
power1.out:   ═══════──────────────────────
power2.out:   ═══════════──────────────────
power3.out:   ═══════════════──────────────
power4.out:   ═══════════════════──────────

elastic.out:  ═══════≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌≌
bounce.out:   ═══════/Images/bounce
back.out:     ═══════════════════════──→←──

sine.inOut:   ══════════════════════════════ (smooth wave)
circ.inOut:   ══════════════════════════════ (circular)
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Easing Comparison

```typescript
// Tạo 5 boxes, mỗi box dùng easing khác nhau
// Animate cùng lúc để thấy sự khác biệt
const easings = [
  "power2.out",
  "elastic.out",
  "bounce.out",
  "back.out(1.7)",
  "sine.inOut",
];

easings.forEach((ease, i) => {
  gsap.to(`.box-${i}`, {
    x: 300,
    duration: 2,
    ease,
  });
});
```

### Bài 2: Interactive Easing

```typescript
// Tạo slider để thay đổi easing value
// User thay đổi slider → animation chạy với easing mới
// Hiển thị tên easing hiện tại
```

### Bài 3: Entrance Sequence

```typescript
// Tạo hero section với title, subtitle, button
// Mỗi element dùng easing khác nhau:
// - Title: power3.out (mạnh, nhanh)
// - Subtitle: power2.out (mềm hơn)
// - Button: back.out(1.7) (playful)
```

---

*Bài tiếp theo: [03-STAGGER.md](./03-STAGGER.md) - Stagger Animations*
