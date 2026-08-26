/**
 * CodeBlock — hiển thị code snippet với style monospace.
 * Dùng cho mọi demo để show code GSAP tương ứng.
 */
export function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-[#0a0a14] border border-white/10 rounded-xl p-4 text-[13px] leading-6 overflow-x-auto text-zinc-300 font-mono">
      <code>{code}</code>
    </pre>
  );
}
