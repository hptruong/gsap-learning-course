# 08. GSAP Trong React

> **Mục tiêu:** tạo animation React không leak, không match nhầm selector và không nhân đôi trong Strict Mode.

GSAP là imperative, React là declarative. React render DOM theo state; GSAP chỉ animate DOM sau khi React đã render. `@gsap/react` cung cấp `useGSAP()` để tạo context và revert animation khi component unmount.

## Component hoàn chỉnh

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function FeatureCard() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".card", { y: 24, autoAlpha: 0, duration: 0.45, ease: "power2.out" });
  }, { scope: root });

  return <div ref={root}><article className="card">Nội dung</article></div>;
}
```

`scope: root` giới hạn selector `.card` trong component. `useGSAP()` tự gọi `context.revert()` lúc unmount, gồm tween, ScrollTrigger, Draggable và SplitText được tạo trong callback.

## State và dependency

```tsx
useGSAP(() => {
  gsap.to(".card", { x: endX, duration: 0.3 });
}, { scope: root, dependencies: [endX], revertOnUpdate: true });
```

Mặc định `revertOnUpdate` là `false`: animation chỉ được revert khi unmount. Khi dependency tạo lại GSAP objects, dùng `true` để không chồng animation và listener cũ.

## Interaction sau khi hook chạy

```tsx
const { contextSafe } = useGSAP({ scope: root });
const onEnter = contextSafe(() => gsap.to(".card", { scale: 1.02 }));
const onLeave = contextSafe(() => gsap.to(".card", { scale: 1 }));

return <button ref={root} onPointerEnter={onEnter} onPointerLeave={onLeave}>Xem thêm</button>;
```

Animation được tạo trong click, timeout hoặc event handler sau `useGSAP()` cần `contextSafe()`. Nếu tự thêm DOM event listener, return cleanup để remove đúng function đó.

## Next.js và SSR

Đặt `"use client"` ở đầu client component. Không gọi `gsap.to()` trong render; chỉ gọi trong `useGSAP()` hoặc event handler client. `useGSAP()` dùng isomorphic layout effect nên an toàn cho SSR khi dùng trong client component.

## ScrollTrigger trong component TypeScript

Register plugin một lần ở module scope, nhưng chỉ **tạo trigger** bên trong `useGSAP()`. Scope giúp selector không match section của route khác; hook sẽ revert cả tween lẫn ScrollTrigger lúc unmount.

```tsx
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FeatureReveal() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".feature-card", {
      y: 28,
      autoAlpha: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 75%",
        once: true,
      },
    });
  }, { scope: root });

  return (
    <section ref={root}>
      <div className="feature-grid">
        <article className="feature-card">Nhanh</article>
        <article className="feature-card">Rõ</article>
        <article className="feature-card">Có cleanup</article>
      </div>
    </section>
  );
}
```

Nếu layout đổi vì data, ảnh hoặc font tải xong, gọi `ScrollTrigger.refresh()` **sau đúng thay đổi đó**, không gọi trong render hay mọi scroll event. Với desktop-only pin/scrub, dùng `gsap.matchMedia()` trong callback; context của `useGSAP` vẫn quản lý cleanup.

## Accordion: React giữ state, GSAP chỉ diễn đạt state đó

Không để animation là nguồn sự thật của aria state. React state điều khiển `aria-expanded` và `hidden`; GSAP animate panel sau mỗi state change.

```tsx
import { useRef, useState } from "react";

export function FAQItem() {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    gsap.to(panel.current, {
      height: open ? "auto" : 0,
      autoAlpha: open ? 1 : 0,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, { scope: root, dependencies: [open] });

  return (
    <div ref={root}>
      <button aria-expanded={open} aria-controls="answer" onClick={() => setOpen((value) => !value)}>
        GSAP cleanup là gì?
      </button>
      <div id="answer" ref={panel} aria-hidden={!open}>
        Animation và trigger được revert khi component unmount.
      </div>
    </div>
  );
}
```

`height` là một layout property, nhưng ở disclosure component chính layout mở/đóng là kết quả mong muốn; đừng thay nó bằng `scaleY` vì scale làm text méo và không thay layout. Dùng `overwrite: "auto"` để click nhanh không để tween cũ tranh cùng property. Nếu panel chứa control focus được, quản lý focus và `inert`/`hidden` theo state thay vì chỉ dựa vào opacity.

## Bài tập

Tạo accordion React: state quyết định `aria-expanded`, GSAP animate panel, click liên tục không tạo animation trùng. Sau đó thêm ScrollTrigger vào component và mount/unmount nhiều lần.

**Tiêu chí đạt:** không có selector ảnh hưởng component khác; Strict Mode không nhân đôi animation; không còn inline style cũ sau unmount.

## Đọc thêm

- [Official React guide](https://gsap.com/resources/React/)
