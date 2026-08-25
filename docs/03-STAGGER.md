# 03. Stagger - Animation Nhóm

## Stagger là gì?

**Stagger** tạo **delay** giữa các elements khi animate nhóm, tạo hiệu ứng **cascade** (làn sóng) thay vì animate tất cả cùng lúc.

```
Không stagger:   [1][2][3][4][5] → cùng lúc (nhàm chán)
Có stagger:      [1] → [2] → [3] → [4] → [5] → (đẹp!)
```

---

## 1. Stagger Cơ Bản

```typescript
// Simple stagger: 0.1s delay giữa mỗi element
gsap.to(".box", {
  duration: 0.8,
  x: 200,
  stagger: 0.1,  // 0.1s delay giữa mỗi box
});
```

### Kết quả timeline:
```
Box 1: ═══════════════
Box 2:   ═══════════════
Box 3:     ═══════════════
Box 4:       ═══════════════
Box 5:         ═══════════════
```

---

## 2. Stagger Object - Full Control

```typescript
gsap.to(".box", {
  duration: 0.8,
  x: 200,
  stagger: {
    amount: 0.8,      // Tổng thời gian spread
    from: "start",    // Bắt đầu từ đâu
    grid: [2, 3],     // Grid layout (rows, cols)
    axis: "x",        // Axis để tính distance
    ease: "power1.in", // Easing cho stagger
  },
});
```

### Stagger Options

| Option | Type | Mô tả |
|--------|------|-------|
| `amount` | number | Tổng thời gian spread (thay vì per-element) |
| `from` | string | Direction: "start", "end", "center", "edges", "random" |
| `grid` | array | `[rows, cols]` cho 2D grid animation |
| `axis` | string | "x" hoặc "y" để tính distance |
| `ease` | string | Easing function cho stagger |

---

## 3. Stagger Directions

```typescript
// from: "start" - Từ phần tử đầu tiên
gsap.to(".box", { stagger: { from: "start", amount: 0.5 } });

// from: "end" - Từ phần tử cuối cùng
gsap.to(".box", { stagger: { from: "end", amount: 0.5 } });

// from: "center" - Từ trung tâm
gsap.to(".box", { stagger: { from: "center", amount: 0.5 } });

// from: "edges" - Từ các cạnh
gsap.to(".box", { stagger: { from: "edges", amount: 0.5 } });

// from: "random" - Ngẫu nhiên
gsap.to(".box", { stagger: { from: "random", amount: 0.5 } });
```

---

## 4. Grid Stagger (2D Layout)

```typescript
// Grid 4 columns x 3 rows
gsap.to(".grid-item", {
  duration: 0.6,
  scale: 1.2,
  stagger: {
    amount: 1,
    grid: [3, 4],    // [rows, cols]
    from: "center",   // Từ trung tâm ra ngoài
  },
});
```

### Grid Visual

```
From "center":        From "edges":
  6  5  4  5  6        1  2  3  2  1
  5  3  2  3  5        2  3  4  3  2
  6  5  4  5  6        3  4  5  4  3
                        2  3  4  3  2
                        1  2  3  2  1
```

---

## 5. Stagger với Each Parameter

```typescript
// each: delay cụ thể cho mỗi element (không phải amount)
gsap.to(".box", {
  duration: 0.5,
  y: -50,
  stagger: {
    each: 0.1,    // 0.1s cho MỖI element
    from: "start",
  },
});

// Phân biệt:
// stagger: 0.1       → each: 0.1 (giống nhau)
// stagger: { amount: 0.5, from: "start" } → spread 0.5s tổng
// stagger: { each: 0.1, from: "start" }   → 0.1s mỗi element
```

---

## 6. Stagger với Callbacks

```typescript
gsap.to(".box", {
  duration: 0.6,
  x: 200,
  stagger: {
    each: 0.1,
    onStart: (target, index) => {
      console.log(`Box ${index} bắt đầu animate`);
    },
    onUpdate: (target, index, progress) => {
      // progress: 0 → 1
    },
    onComplete: (target, index) => {
      console.log(`Box ${index} hoàn thành`);
    },
  },
});
```

---

## 7. Kết Hợp Stagger + Easing

```typescript
// Stagger từ center với bounce easing
gsap.from(".card", {
  duration: 0.8,
  y: 100,
  opacity: 0,
  stagger: {
    amount: 0.6,
    from: "center",
    ease: "power2.in",
  },
  ease: "back.out(1.7)",
});
```

---

## 8. Stagger trong Timeline

```typescript
const tl = gsap.timeline();

// Stagger trong timeline
tl.from(".hero-title", {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.1,
});

// Stagger khác cho section tiếp theo
tl.from(".feature-card", {
  duration: 0.8,
  scale: 0.8,
  opacity: 0,
  stagger: {
    amount: 0.5,
    from: "edges",
  },
}, "-=0.3"); // Overlap với section trước
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: List Animation

```typescript
// Tạo danh sách 10 items
// Animate từ bên trái với stagger: 0.05
// Mỗi item fade in + slide từ trái
gsap.from(".list-item", {
  duration: 0.6,
  x: -50,
  opacity: 0,
  stagger: 0.05,
  ease: "power2.out",
});
```

### Bài 2: Grid Reveal

```typescript
// Tạo grid 4x4
// Animate từ center ra ngoài
// Mỗi item scale từ 0 lên 1
gsap.from(".grid-item", {
  duration: 0.5,
  scale: 0,
  stagger: {
    amount: 0.8,
    grid: [4, 4],
    from: "center",
  },
  ease: "back.out(1.7)",
});
```

### Bài 3: Navigation Menu

```typescript
// Tạo hamburger menu
// Khi mở, menu items animate từ trên xuống
// Khi đóng, menu items animate ngược lại
// Dùng stagger với from: "start" và reverse
```

---

*Bài tiếp theo: [04-TIMELINE.md](./04-TIMELINE.md) - Timeline & Position Parameter*
