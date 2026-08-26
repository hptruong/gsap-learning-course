/**
 * App — root composition + routing (FSD: app layer)
 * Chỉ chứa router, không chứa logic page.
 *
 * BrowserRouter (không HashRouter) để anchor href="#section"
 * hoạt động native — hash không ảnh hưởng route matching.
 * Vite dev + preview đều SPA-fallback nên deep link /scroll-trigger vẫn chạy.
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TweenTimelinePage } from "@/pages/tween-timeline/TweenTimelinePage";
import { ScrollTriggerPage } from "@/pages/scroll-trigger/ScrollTriggerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TweenTimelinePage />} />
        <Route path="/scroll-trigger" element={<ScrollTriggerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
