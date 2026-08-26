/**
 * GSAP shared setup — đăng ký plugins tập trung.
 * Theo GSAP docs: luôn registerPlugin trước khi dùng.
 */
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Đăng ký useGSAP để dùng gsap.context + auto cleanup trong React
// (theo gsap-react skill: scope + cleanup)
gsap.registerPlugin(useGSAP);

export { gsap, useGSAP };
