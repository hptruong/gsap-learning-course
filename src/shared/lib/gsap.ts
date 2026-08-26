/**
 * GSAP shared setup — đăng ký plugins tập trung.
 * Theo GSAP docs: luôn registerPlugin trước khi dùng.
 * @layer shared
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Đăng ký 1 lần duy nhất ở entry — mọi feature import từ đây
// (theo gsap-react skill: register useGSAP; gsap-scrolltrigger skill: register ScrollTrigger)
gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };
