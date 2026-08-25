# 04. Timeline - Lắp Ráp Animation

## Timeline là gì?

**Timeline** là container quản lý và **sequence** nhiều animations. Thay vì tính delay thủ công, timeline tự động sắp xếp thứ tự và timing.

```
Without Timeline:
Box 1: ════════════
Box 2:              ════════════  (tính delay thủ công)
Box 3:                           ════════════

With Timeline:
Box 1: ════════════
Box 2: ════════════  (auto sequence)
Box 3: ════════════
```

---

## 1. Timeline Cơ Bản

```typescript
// Tạo timeline
const tl = gsap.timeline();

// Thêm animations vào timeline (tự sequence)
tl.to(".box1", { duration: 0.8, x: 100, ease: "power2.out" })
  .to(".box2", { duration: 0.8, y: -50, ease: "power2.out" })
  .to(".box3", { duration: 0.8, rotation: 360, ease: "back.out" });

// Timeline tự động play theo thứ tự
// Box 1 chạy xong → Box 2 bắt đầu → Box 3 bắt đầu
```

---

## 2. Position Parameter - Khác Biệt Cốt Lõi

Position parameter xác định **chính xác** animation được đặt vào đâu trong timeline.

### Các Position Cơ Bản

```typescript
const tl = gsap.timeline();

// Default: ">" - Sau animation trước
tl.to(".a", { x: 100 })
  .to(".b", { x: 200 }); // Chạy sau .a

// "<" - Cùng lúc với animation trước
tl.to(".a", { x: 100 })
  .to(".b", { x: 200 }, "<"); // Chạy cùng lúc .a

// Absolute time: "1.5" - Tại 1.5 giây
tl.to(".a", { x: 100 })
  .to(".b", { x: 200 }, 1.5); // Chạy tại 1.5s

// Offset từ end: "+=0.5" - 0.5s sau khi trước kết thúc
tl.to(".a", { x: 100 })
  .to(".b", { x: 200 }, "+=0.5"); // 0.5s sau .a

// Overlap: "-=0.3" - 0.3s trước khi trước kết thúc
tl.to(".a", { x: 100 })
  .to(".b", { x: 200 }, "-=0.3"); // Overlap 0.3s
```

### Visual Position Parameters

```
None or ">":   [A] → [B]
"<":           [A]
               [B]   (parallel)

"+=0.5":       [A]    →  [B]
                    ^0.5s gap

"-=0.5":       [A]
              [B]      (overlap 0.5s)

1.5:           [A]    [B]
                   ^at 1.5s
```

---

## 3. Labels - Đánh Dấu Thời Điểm

```typescript
const tl = gsap.timeline();

tl.addLabel("start", 0)
  .to(".box", { x: 100 }, "start")
  .addLabel("middle", 1)
  .to(".box", { rotation: 180 }, "middle")
  .addLabel("end", 2)
  .to(".box", { scale: 2 }, "end");

// Jump đến label
tl.seek("middle");
tl.play("end");
```

---

## 4. Nested Timelines

```typescript
// Tạo sub-timeline
const childTL = gsap.timeline();
childTL
  .to(".child1", { x: 50 })
  .to(".child2", { x: 50 })
  .to(".child3", { x: 50 });

// Tạo main timeline
const mainTL = gsap.timeline();

mainTL
  .to(".header", { y: -100 })
  .add(childTL, "-=0.3") // Thêm childTL với overlap
  .to(".footer", { y: 100 });
```

---

## 5. Timeline Controls

```typescript
const tl = gsap.timeline({ paused: true });

tl.to(".box", { x: 200, duration: 2 });

// Playback controls
tl.play();           // Play từ đầu
tl.pause();          // Pause
tl.resume();         // Resume từ pause point
tl.reverse();        // Play ngược
tl.restart();        // Play lại từ đầu

// Seek & Progress
tl.seek(1.5);        // Jump đến 1.5s
tl.progress(0.5);    // Jump đến 50%
tl.totalDuration();  // Lấy tổng duration

// Kill
tl.kill();           // Dừng và xóa timeline
```

---

## 6. Timeline Callbacks

```typescript
const tl = gsap.timeline({
  onStart: () => console.log("Timeline bắt đầu"),
  onUpdate: () => console.log(`Progress: ${tl.progress()}`),
  onComplete: () => console.log("Timeline hoàn thành"),
  onReverseComplete: () => console.log("Reverse xong"),
  onRepeat: () => console.log("Repeat lần nữa"),
});

tl.to(".box", { x: 200 })
  .call(() => console.log("Animation 1 xong")) // Callback tại thời điểm
  .to(".box", { rotation: 360 })
  .call(() => console.log("Animation 2 xong"));
```

---

## 7. TimeScale - Tốc Độ

```typescript
const tl = gsap.timeline();

tl.to(".box", { x: 200, duration: 2 });

tl.timeScale(2);    // 2x nhanh hơn
tl.timeScale(0.5);  // 0.5x chậm hơn
tl.timeScale(1);    // Bình thường
```

---

## 8. React Pattern với Timeline

```typescript
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.from(".hero-title", {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "power2.out",
        },
        "-=0.5" // Overlap
      )
      .from(
        ".hero-cta",
        {
          duration: 0.6,
          scale: 0.8,
          opacity: 0,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    tlRef.current = tl;
  }, { scope: containerRef });

  const handlePlay = () => tlRef.current?.play();
  const handleReverse = () => tlRef.current?.reverse();

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">Hello GSAP</h1>
      <p className="hero-subtitle">Animation made easy</p>
      <button className="hero-cta" onClick={handlePlay}>Play</button>
    </div>
  );
}
```

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Loading Sequence

```typescript
// Tạo loading animation:
// 1. Logo scale từ 0 lên 1 (back.out)
// 2. Text fade in từ dưới (0.3s overlap)
// 3. Progress bar animate width (0.2s overlap)
// 4. Fade out tất cả
const tl = gsap.timeline();
tl.from(".logo", { scale: 0, duration: 0.8, ease: "back.out(1.7)" })
  .from(".text", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
  .from(".progress", { width: 0, duration: 1 }, "-=0.2")
  .to(".loader", { opacity: 0, duration: 0.5 });
```

### Bài 2: Menu Animation

```typescript
// Tạo hamburger menu animation:
// 1. Bar 1 rotate -45deg + translateY
// 2. Bar 2 fade out
// 3. Bar 3 rotate 45deg + translateY
// 4. Menu items stagger từ trên xuống
```

### Bài 3: Page Transition

```typescript
// Tạo page transition:
// 1. Current page slide out
// 2. Loading spinner appear
// 3. New page slide in
// Dùng timeline với labels
```

---

*Bài tiếp theo: [05-SCROLL-TRIGGER.md](./05-SCROLL-TRIGGER.md) - ScrollTrigger Plugin*
