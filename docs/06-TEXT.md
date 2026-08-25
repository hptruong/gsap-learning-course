# 06. Text Animation

## Tổng Quan

GSAP có nhiều cách để animate text, từ đơn giản đến phức tạp.

| Plugin | Use case | License |
|--------|----------|---------|
| `SplitText` | Character/word/line animation | Club GreenSock |
| `TextPlugin` | Text replacement | Free |
| `ScrambleTextPlugin` | Scramble/reveal text | Club GreenSock |
| Manual split | Custom character animation | Free |

---

## 1. TextPlugin - Text Replacement

```typescript
import { TextPlugin } from "gsap/TextPlugin";
gsap.registerPlugin(TextPlugin);

// Thay đổi text với typing effect
gsap.to(".text", {
  duration: 2,
  text: {
    value: "Hello World!",
    delimiter: "",  // "" = character by character
  },
  ease: "none",
});

// Word by word
gsap.to(".text", {
  duration: 2,
  text: {
    value: "Hello World!",
    delimiter: " ",  // " " = word by word
  },
});
```

---

## 2. SplitText (Club Plugin)

```typescript
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

// Split text thành characters, words, lines
const split = new SplitText(".text", {
  type: "chars,words,lines",
  charsClass: "char",
  wordsClass: "word",
  linesClass: "line",
});

// Animate characters
gsap.from(split.chars, {
  duration: 0.6,
  y: 50,
  opacity: 0,
  stagger: 0.02,
  ease: "power3.out",
});

// Animate words
gsap.from(split.words, {
  duration: 0.8,
  y: 30,
  opacity: 0,
  stagger: 0.1,
});

// Animate lines
gsap.from(split.lines, {
  duration: 1,
  y: 50,
  opacity: 0,
  stagger: 0.15,
});

// Cleanup
split.revert();
```

---

## 3. Manual Split (Free Alternative)

```typescript
// Tách text thủ công không cần SplitText
function splitText(element: HTMLElement) {
  const text = element.textContent || "";
  element.innerHTML = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.style.display = "inline-block";
    element.appendChild(span);
  });

  return element.querySelectorAll("span");
}

// Dùng
const chars = splitText(document.querySelector(".text")!);

gsap.from(chars, {
  duration: 0.5,
  y: 20,
  opacity: 0,
  stagger: 0.03,
});
```

---

## 4. Text Reveal Animation

```typescript
// Typewriter effect
function typewriter(text: string, element: HTMLElement, speed = 50) {
  let i = 0;
  element.textContent = "";

  const timer = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// GSAP version
gsap.to(".text", {
  duration: 2,
  text: "Hello World!",
  ease: "none",
});
```

---

## 5. Scroll-Linked Text

```typescript
// Text reveal on scroll
const split = new SplitText(".scroll-text", { type: "chars" });

gsap.from(split.chars, {
  opacity: 0.2,
  stagger: 0.05,
  scrollTrigger: {
    trigger: ".scroll-text",
    start: "top center",
    end: "bottom center",
    scrub: true,
  },
});
```

---

## 6. Text Gradient Animation

```typescript
// Animated gradient text
gsap.to(".gradient-text", {
  backgroundPosition: "200% center",
  duration: 3,
  repeat: -1,
  ease: "none",
});

// CSS
// .gradient-text {
//   background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
//   background-size: 200% auto;
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// }
```

---

## 7. ScrambleText Effect

```typescript
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
gsap.registerPlugin(ScrambleTextPlugin);

// Scramble reveal
gsap.to(".text", {
  duration: 2,
  text: {
    value: "Hello World!",
    type: "chars",     // "chars", "words", "new"
    chars: "!@#$%^&*",
    delimiter: "",
  },
  ease: "none",
});
```

---

## 8. Kinetic Typography

Text bounce, wiggle, rotate một cách năng động.

```typescript
const split = new SplitText(".kinetic-text", { type: "chars" });

// Random rotation + position
gsap.from(split.chars, {
  y: 100,
  rotation: 90,
  stagger: {
    each: 0.03,
    from: "random",
  },
  ease: "back.out(1.7)",
});

// Sine wave undulation
gsap.to(split.chars, {
  y: -20,
  duration: 0.5,
  stagger: {
    each: 0.05,
    repeat: -1,
    yoyo: true,
  },
  ease: "sine.inOut",
});
```

---

## 9. Glitch Text

Digital distortion effect. Tech/cyberpunk themes.

```typescript
// Glitch với RGB split
function createGlitch(element: HTMLElement) {
  const text = element.textContent || "";

  element.style.position = "relative";

  // Create glitch layers
  const glitchTop = document.createElement("span");
  const glitchBottom = document.createElement("span");

  glitchTop.textContent = text;
  glitchBottom.textContent = text;

  glitchTop.style.cssText = `
    position: absolute; top: 0; left: 0;
    clip-path: inset(0 0 60% 0);
    color: #ff0000;
    animation: glitch-top 1s infinite;
  `;

  glitchBottom.style.cssText = `
    position: absolute; top: 0; left: 0;
    clip-path: inset(60% 0 0 0);
    color: #0000ff;
    animation: glitch-bottom 1.5s infinite;
  `;

  element.appendChild(glitchTop);
  element.appendChild(glitchBottom);
}
```

---

## 10. Liquid Text Wave

Characters undulate trong sine wave ripple.

```typescript
const split = new SplitText(".wave-text", { type: "chars" });

split.chars.forEach((char, i) => {
  gsap.to(char, {
    y: -20,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    delay: i * 0.05,
    ease: "sine.inOut",
  });
});
```

---

## 11. 3D Letter Flip

Each character flips in trên Y-axis với perspective.

```typescript
const split = new SplitText(".flip-text", { type: "chars" });

gsap.from(split.chars, {
  rotationX: 90,
  opacity: 0,
  stagger: 0.05,
  ease: "back.out(1.7)",
  transformOrigin: "center bottom",
});
```

---

## 12. Gradient Text Reveal

Text fills với gradient color sweep.

```typescript
gsap.fromTo(".gradient-text", {
  backgroundPosition: "200% center",
}, {
  backgroundPosition: "-200% center",
  duration: 3,
  ease: "power2.inOut",
});
```

```css
.gradient-text {
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Text Animation Comparison

| Effect | Best For | Difficulty | Plugin |
|--------|----------|------------|--------|
| Character Reveal | Headlines, hero text | ⭐⭐ | SplitText |
| Line Mask Reveal | Subheadings, labels | ⭐⭐ | CSS + GSAP |
| Typewriter | Tech themes, code | ⭐ | TextPlugin |
| Scramble/Decode | Tech, security themes | ⭐⭐ | ScrambleText |
| Kinetic Typography | Playful, creative | ⭐⭐⭐ | SplitText |
| Glitch | Cyberpunk, tech | ⭐⭐⭐ | CSS + GSAP |
| Liquid Wave | Organic, artistic | ⭐⭐⭐ | SplitText |
| 3D Flip | Dramatic reveals | ⭐⭐ | SplitText |
| Gradient Sweep | Modern, premium | ⭐ | CSS + GSAP |

---

## 🏋️ Bài Tập Thực Hành

### Bài 1: Character Reveal

```typescript
// Tạo heading với hiệu ứng reveal từng character
// Dùng manual split hoặc SplitText
// Characters animate từ dưới lên với stagger
// Thêm scroll trigger để reveal khi scroll vào view
```

### Bài 2: Scramble Decode

```typescript
// Tạo text scramble effect
// Random chars cycle → resolve to final text
// Trigger trên scroll hoặc page load
// Thêm cursor effect
```

### Bài 3: Kinetic Typography Hero

```typescript
// Tạo hero section với kinetic text
// Mỗi character có rotation + position riêng
// Random timing cho mỗi character
// Kết hợp với background animation
```

### Bài 4: Multi-Effect Text

```typescript
// Tạo section với nhiều text effects:
// - Headline: Character reveal
// - Subheading: Line mask reveal
// - Description: Word-by-word fade
// - CTA: Gradient sweep
// Tất cả sequence trong timeline
```

---

*Bài tiếp theo: [07-SVG.md](./07-SVG.md) - SVG Animation*
