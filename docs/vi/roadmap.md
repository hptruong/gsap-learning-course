# Lộ Trình Học GSAP: Beginner Đến Advanced

Đây là lộ trình thực hành, không phải danh sách API để đọc một lần. Nó đi theo trình tự [GSAP Learning Resources](https://gsap.com/resources/), sau đó bổ sung cách dạy thực hành đã công khai của [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club) và [VWLAB Mastering Web Animations](https://vwlab.io/products/web-animations). GSAP Docs vẫn là nguồn quyết định khi course example và API hiện tại khác nhau.

## Nên học trong bao lâu?

Dành 3-5 buổi mỗi tuần, mỗi buổi 45-90 phút. Không chuyển module chỉ vì đã đọc xong. Chỉ chuyển khi bạn hoàn thành artifact ở cột cuối từ một file trống.

## Lộ trình bắt buộc

| Phase | Bài | Bạn học gì | Artifact phải hoàn thành |
| --- | --- | --- | --- |
| 0. Chuẩn bị | 00 | DOM, CSS transform, cài GSAP, tween đầu tiên | Một file HTML chạy được `gsap.to()` bằng CDN. |
| 1. Core grammar | 01-03 | Tween methods, state ban đầu, ease, stagger | Card entrance/hover/exit không nháy và grid reveal có reduced motion. |
| 2. Choreography | 04 | Timeline, labels, position parameter, playback | Menu hoặc modal mở/đóng không dùng chained `delay`. |
| 3. Safe scroll | 05 | Trigger lifecycle, start/end, scrub, pin, refresh, matchMedia | Story section pin trên desktop, flow dọc trên mobile. |
| 4. Specialization | 06-07 | Accessible text, SVG transforms, DrawSVG, MorphSVG, MotionPath | Một text reveal hoặc SVG illustration có cleanup và semantics. |
| 5. Framework branch | 08 | React `useGSAP`, scope, contextSafe, SSR | Component mount/unmount/update không duplicate animation. |
| 6. Production | 09, 14 | Performance, a11y, Flip, utilities, high-frequency input | Pointer interaction dùng `quickTo()` và reduced-motion fallback. |
| 7. Practice | 10-15 | Capstone, landing-page motion, creative patterns | Một project static-first có motion inventory và QA evidence. |

## Cách làm mỗi bài

1. **Chạy ví dụ:** không sửa gì trong lần chạy đầu.
2. **Dự đoán:** thay một value, ghi kết quả bạn nghĩ sẽ xảy ra.
3. **Phá có chủ đích:** tạo lỗi được mô tả trong phần pitfalls, sau đó sửa.
4. **Làm bài tập:** không nhìn lại code mẫu trong 15 phút đầu.
5. **Tự review:** kiểm tra keyboard, viewport 375px, `prefers-reduced-motion`, console và resize.

## Nhánh tùy chọn, chỉ học sau core

- **Scroll nâng cao:** horizontal `containerAnimation`, custom scroller, smooth scrolling. Học sau khi native ScrollTrigger và responsive flow đã ổn.
- **Creative patterns:** cursor, marquee, clip-path, page transition, carousel. Mỗi pattern phải có mục đích nội dung, fallback và cleanup.
- **Plugins UI:** Flip, Draggable, Inertia, Observer, ScrollTo. Không cần học tất cả để dùng GSAP hiệu quả.
- **Webflow:** là nhánh implementation riêng, không thay cho kiến thức core API.

## Cổng chất lượng trước capstone

- Không animate layout property nếu transform hoặc opacity đạt cùng kết quả.
- Không để animation quyết định state accessibility; code state và ARIA phải đúng cả khi animation bị tắt.
- Mọi ScrollTrigger được tạo trong lifecycle có cleanup/revert.
- Không có FOUC, console error, listener/ticker bị rò hoặc marker production.
- Có reduced-motion alternative cho motion lớn, scroll scrub, cursor follower và text split.

## Benchmark course có phí đang mở (đã kiểm tra catalog)

Đây là benchmark về **cấu trúc học**, không phải endorsement hay lý do để copy curriculum. Catalog và availability thay đổi; kiểm tra landing page trước khi mua.

| Course | Đã kiểm tra từ landing page | Nó bổ sung gì cho curriculum này | Giới hạn cần biết |
| --- | --- | --- | --- |
| [Creative Coding Club](https://www.creativecodingclub.com/bundles/creative-coding-club) | Bundle hiện công bố hơn 250 bài GSAP, gồm Core, ScrollTrigger và SVG. | Mô hình lesson ngắn → demo → challenge; sâu nhất cho vanilla JavaScript/creative patterns. | Không thay API authority của GSAP Docs; React + TypeScript không phải trọng tâm công bố của bundle. |
| [VWLAB — Mastering Web Animations](https://vwlab.io/products/web-animations) | Landing page hiện nêu HTML/CSS/JS & GSAP, kèm nhánh no-code Webflow và chapter index. | Cách đi từ motion principle, core grammar đến visual implementation/product page. | Cần tự đối chiếu API version và giữ native-scroll/reduced-motion baseline. |
| [Awwwards Academy — Animation System](https://www.awwwards.com/academy/course/design-meaningful-experiences-through-an-animation-system) | Catalog hiện ghi 7 lessons / 4 hours; chapter sample gồm motion thinking, CTA, logo và slideshow. | Art direction, storytelling và system thinking — nguồn bổ sung cho bài 12–13. | Không phải GSAP/React API curriculum; dùng để học decision design, không copy effect. |
| [Awwwards Academy — Creative Coding 2.0 in JS](https://www.awwwards.com/academy/course/creative-coding-2-0-in-js-animation-sound-color) | Catalog hiện ghi 7 lessons, với arcs, image data, particles, cursor interaction và color. | Creative JavaScript, input performance và visual experimentation sau khi đã vững core. | Không phải điểm bắt đầu cho beginner và không thay phần accessibility/product UI. |
| [Official GSAP React guide](https://gsap.com/resources/React/) + [`@gsap/react`](https://github.com/greensock/react) | Nguồn hiện hành cho `useGSAP`, scope, `contextSafe`, cleanup và SSR. | Baseline đáng tin nhất cho React + TypeScript; đã được đưa vào bài 08 và 12. | Đây là reference miễn phí, không phải video course; ưu tiên khi course thương mại dùng API cũ. |

**Về “viral”:** không dùng lượt view, TikTok clip hay danh sách Udemy biến động làm tiêu chí curriculum. Với GSAP, tín hiệu tốt hơn là catalog còn hoạt động, code sample có lifecycle/a11y, và syllabus đi từ DOM/CSS/JS core trước effect. Vì vậy course trên được chọn theo source/outline có thể kiểm tra, không theo hype.

## Nguồn dùng để thiết kế curriculum

| Nguồn | Đóng góp đã xác minh |
| --- | --- |
| [GSAP Resources](https://gsap.com/resources/) | Trình tự chính thức: installation, tween, easing, stagger, timeline, control/callback, plugins và chuyên sâu. |
| [GSAP Docs](https://gsap.com/docs/v3/) | API hiện tại cho core, plugins, utilities và framework integration. |
| [Creative Coding Club](https://www.creativecodingclub.com/pages/300-lessons-old) | Mô hình lesson nhỏ, visualizer, challenge/solution; core, SVG, advanced timeline, ScrollTrigger, project. Danh sách này được trang ghi là cũ, chỉ dùng để đối chiếu độ sâu. |
| [ScrollTrigger Express](https://www.creativecodingclub.com/courses/ScrollTrigger-Express) | Tiến trình basics, scrub/pin, parallax, responsive, matchMedia và horizontal scroll. |
| [VWLAB syllabus](https://vwlab.io/products/web-animations) | Setup, tween, stagger, easing, callbacks, timeline/control trước lookbook và effect thực hành. |

## Khi nào bạn đã sẵn sàng học advanced?

Bạn có thể tự giải thích `from()` khác `fromTo()` thế nào, dựng timeline không dùng delay chain, debug `start/end` bằng markers, và làm một page vẫn usable khi reduced motion. Nếu chưa, quay lại phase tương ứng. Advanced effect không bù được foundation yếu.
