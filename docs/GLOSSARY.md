# Animation Glossary 2026

> Thuật ngữ animation thường gặp trong thực tế, đặc biệt khi làm landing page, portfolio, và Awwwards-level websites.

---

## Core Concepts

| Term | Nghĩa | Ví dụ |
|------|-------|-------|
| **Tween** | Animation đơn lẻ - thay đổi properties từ A sang B | `gsap.to(".box", {x: 100})` |
| **Timeline** | Container quản lý và sequence nhiều tweens | `gsap.timeline()` |
| **Easing** | Hàm kiểm soát gia tốc/chuyển động | `power2.inOut`, `elastic.out` |
| **Stagger** | Delay offset giữa các elements khi animate nhóm | `stagger: 0.1` |
| **Scrub** | Link animation progress trực tiếp với scroll position | `scrub: true` |
| **Pin** | Giữ element cố định trong viewport khi scroll | `pin: true` |
| **Target** | Element (hoặc elements) được animate | `.box`, `ref.current` |
| **Duration** | Thời gian animation (giây) | `duration: 1` |
| **Delay** | Thời gian chờ trước khi animation bắt đầu | `delay: 0.5` |
| **Repeat** | Số lần lặp animation (-1 = vô hạn) | `repeat: -1` |
| **Yoyo** | Reverse animation sau mỗi repeat | `yoyo: true` |

---

## Scroll Animation Terms

| Term | Nghĩa | Khi nào dùng |
|------|-------|---------------|
| **Parallax** | Elements move at different speeds on scroll | Hero backgrounds, image layers |
| **Scroll Reveal** | Animation triggered khi element vào viewport | Cards, text, images |
| **Horizontal Scroll** | Scroll ngang trong pinned section | Portfolio galleries, timelines |
| **Scroll Storytelling** | Narrative unfolds through scroll interaction | Long-form articles, product pages |
| **Scrollspy** | Track which section is currently active | Navigation highlighting |
| **Velocity Skew** | Elements skew based on scroll speed/direction | Dynamic scroll effects |
| **Scroll Progress** | Visual indicator của scroll position | Progress bars |
| **Scroll Stack** | Elements stack/pile on scroll | Feature sections |
| **Sticky Scroll Story** | Content stays visible while animations play | Storytelling sections |
| **Scroll Linked Color** | Colors change based on scroll position | Section transitions |

---

## Interactive Terms

| Term | Nghĩa | Ví dụ |
|------|-------|-------|
| **Magnetic** | Element attracted toward/follows cursor | Magnetic buttons |
| **Micro Interaction** | Small animation cho user feedback | Button hover, form validation |
| **Hover Effect** | Animation triggered on mouse hover | Card lift, underline slide |
| **Cursor Effects** | Custom cursor animations | Trail, morph, spotlight |
| **Draggable** | Element có thể kéo bằng mouse/touch | Carousels, cards |
| **Inertia** | Momentum/drag sau khi release | Throw & snap |
| **Click Toggle** | Animation on click state change | Menu open/close |
| **Ripple Click** | Material-style ripple từ click point | Button feedback |

---

## Visual Effects

| Term | Nghĩa | Plugin/Method |
|------|-------|---------------|
| **Mask Reveal** | Content revealed qua animated clip-path | clip-path CSS |
| **Morphing** | Smooth transition giữa shapes/paths | MorphSVG |
| **Marquee** | Horizontally scrolling content (infinite loop) | GSAP timeline loop |
| **Ken Burns** | Slow cinematic pan + zoom on images | GSAP + ScrollTrigger |
| **Chromatic Aberration** | RGB color split/distortion effect | CSS filters + GSAP |
| **Glitch** | Digital distortion effect | CSS + GSAP |
| **Liquid/Viscous** | Fluid-like organic motion | MorphSVG + CustomEase |
| **Before After** | Drag comparison hai images | Draggable |
| **Image Trail** | Images follow cursor với decay | GSAP + mouse events |
| **Gradient Shift** | Background gradient animation | CSS + GSAP |

---

## Text Animation Terms

| Term | Nghĩa | Plugin |
|------|-------|--------|
| **Character Reveal** | Text xuất hiện từng character | SplitText |
| **Word Reveal** | Text xuất hiện từng word | SplitText |
| **Line Reveal** | Text xuất hiện từng line | SplitText |
| **Typewriter** | Text types out character by character | TextPlugin |
| **Scramble/Decode** | Random chars → resolve to final text | ScrambleText |
| **Kinetic Typography** | Text bounces, wiggles, rotates dynamically | SplitText + GSAP |
| **Text Gradient Sweep** | Gradient color fills text from left to right | CSS + GSAP |
| **Split Flap** | Characters flip like airport display | SplitText + 3D |
| **Per-Character Physics** | Each char drops with gravity/bounce | SplitText + Physics2D |
| **Liquid Text Wave** | Characters undulate in sine wave | SplitText + CustomWiggle |

---

## Layout & Transition Terms

| Term | Nghĩa | Plugin |
|------|-------|--------|
| **FLIP** | First, Last, Invert, Play technique | Flip |
| **Shared Element Transition** | Element morphs từ thumbnail → full view | Flip |
| **Layout Morphing** | Container layout thay đổi mượt mà | Flip |
| **Page Transition** | Smooth animation giữa pages | GSAP Timeline |
| **Staggered Blinds** | Vertical slats slide away sequentially | GSAP |
| **Curtain Reveal** | Two panels slide apart | GSAP |
| **Circle Wipe** | Expanding circle reveals content | GSAP |

---

## Performance Terms

| Term | Nghĩa | Tại sao quan trọng |
|------|-------|---------------------|
| **GPU-Accelerated** | Using transform/opacity (compositor layer) | 60fps, không trigger layout |
| **Layout Thrashing** | Triggering reflow repeatedly | ❌ Slow, avoid |
| **will-change** | CSS hint cho browser optimize | Browser提前optimize |
| **RAF (requestAnimationFrame)** | Browser API cho animation timing | 60fps smooth |
| **LERP (Linear Interpolation)** | Smooth value transitions | Smooth scroll, cursor follow |
| **force3D** | Force GPU layer promotion | Prevent repaint |
| **Batch** | Group multiple animations để optimize | ScrollTrigger.batch() |
| **Compositor Layer** | GPU-accelerated rendering layer | Fast animations |

---

## GSAP Plugin Terms

| Term | Nghĩa | Use Case |
|------|-------|----------|
| **ScrollTrigger** | Animation linked to scroll position | Scroll reveals, parallax, scrub |
| **ScrollSmoother** | Smooth scroll library | iOS-like smooth scrolling |
| **SplitText** | Split text into animatable units | Text animations |
| **ScrambleText** | Random char cycling effect | Decode/scramble text |
| **DrawSVG** | Animate SVG stroke drawing | Logo reveals, illustrations |
| **MorphSVG** | Morph between SVG paths | Shape transitions |
| **MotionPath** | Animate element along SVG path | Orbits, trajectories |
| **Flip** | Animate layout changes smoothly | Grid filter, card expand |
| **Draggable** | Drag + throw interactions | Carousels, cards |
| **InertiaPlugin** | Momentum physics sau drag | Throw & snap |
| **Observer** | Unified scroll/wheel/touch detection | Custom scroll handling |
| **Physics2D** | Gravity, velocity, collision physics | Confetti, particles |
| **CustomEase** | Tạo custom easing curves | Unique motion feel |
| **CustomBounce** | Natural bounce easing | Bouncy animations |
| **CustomWiggle** | Wiggle/shake easing | Playful motion |
| **GSDevTools** | Visual timeline debugger | Development |
| **matchMedia** | Responsive animations | Breakpoint-specific |

---

## Motion Design Principles

| Principle | Nghĩa | Application |
|-----------|-------|-------------|
| **Timing** | Duration of animation | UI: 200-500ms, scroll: 1-3s |
| **Easing** | Acceleration curve | Entrance: .out, Exit: .in |
| **Staging** | directing attention | Highlight main element |
| **Anticipation** |预备动作 before main action | Button squish before bounce |
| **Follow-through** | Elements continue after main stops | Elastic settle |
| **Overlap** | Animations start before previous ends | Position parameter `-=0.3` |
| **Secondary Action** | Supporting animations | Particles, shadows |
| **Spacing** | Distance between keyframes | Smooth = even spacing |

---

## Industry Jargon (Interview Ready)

```
"Can you create scroll-triggered animations?"
→ ScrollTrigger với scrub/pin

"Need parallax on the hero section"
→ Multi-layer parallax với ScrollTrigger scrub

"Add micro-interactions to the buttons"
→ Hover effects, magnetic buttons, ripple clicks

"Implement page transitions"
→ GSAP Timeline + Flip hoặc custom

"Make it feel premium/polished"
→ Easing, stagger, subtle hover effects

"Optimize for performance"
→ GPU-accelerated transforms, batch, cleanup

"Ensure accessibility"
→ prefers-reduced-motion, ARIA labels
```

---

*Cập nhật: Tháng 8, 2026 | Nguồn: GSAP Vault Glossary (96 terms)*
