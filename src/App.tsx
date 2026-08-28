import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register once before using the hook.
gsap.registerPlugin(useGSAP);

export default function App() {
  const root = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Your first GSAP tween — edit this freely while practising.
    gsap.to(box.current, {
      x: 160,
      rotation: 180,
      duration: 1,
      ease: "power2.out",
    });
  }, { scope: root });

  return (
    <main className="practice" ref={root}>
      <p className="eyebrow">GSAP + React</p>
      <h1>Your practice canvas</h1>
      <p className="intro">
        Start with this single tween. Change one value at a time, refresh, and observe the result.
      </p>
      <div className="stage" aria-label="GSAP animation stage">
        <div className="box" ref={box}>GSAP</div>
      </div>
    </main>
  );
}
