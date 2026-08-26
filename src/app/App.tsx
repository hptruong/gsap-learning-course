/**
 * App — root composition (FSD: app layer)
 * Chỉ import page, không chứa logic demo.
 */
import { DemoPage } from "@/pages/demo/DemoPage";

export default function App() {
  return <DemoPage />;
}
