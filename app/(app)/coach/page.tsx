"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getState } from "@/lib/store";
import type { HD } from "@/lib/hd";

type Msg = { role: "user" | "assistant"; content: string };

function CoachInner() {
  const params = useSearchParams();
  const [hd, setHd] = useState<HD | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    getState().then((s) => {
      setHd(s.hd ?? null);
      const greet = s.hd?.hd_type
        ? `I know your design — you're a ${s.hd.hd_type} with ${s.hd.authority ?? "—"} authority. What's on your mind?`
        : "I'm your alignment coach. Add your chart and I can make this fully personal — but ask me anything.";
      setMsgs([{ role: "assistant", content: greet }]);
      const seed = params.get("q");
      if (seed && !seeded.current) { seeded.current = true; setTimeout(() => send(seed, s.hd ?? null), 250); }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, busy]);

  async function send(text: string, chart: HD | null = hd) {
    const t = text.trim();
    if (!t || busy) return;
    const next = [...msgs, { role: "user" as const, content: t }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m.role !== "assistant" || next.indexOf(m) > 0), hd: chart ?? {} }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply ?? "…" }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "I lost the thread for a second — try that again?" }]);
    }
    setBusy(false);
  }

  const prompts = hd?.authority
    ? ["Help me with a decision", "Why am I drained lately?", "How do I lead as my type?"]
    : ["What is Human Design?", "Help me reflect on my week"];

  return (
    <main className="flex flex-col" style={{ minHeight: "calc(100vh - 140px)" }}>
      <div className="flex items-center gap-2">
        <h1 className="font-display text-2xl">Coach</h1>
        <span style={{ color: "var(--violet)" }}>●</span>
      </div>
      <p className="text-xs mt-1" style={{ color: "var(--faint)" }}>Knows your chart · a mirror, not a therapist or doctor.</p>

      <div className="flex-1 mt-5 space-y-3">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "bubble-u" : "bubble-a"}>{m.content}</div>
        ))}
        {busy && <div className="bubble-a" style={{ opacity: 0.6 }}>thinking…</div>}
        <div ref={endRef} />
      </div>

      {msgs.length <= 1 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {prompts.map((p) => (
            <button key={p} onClick={() => send(p)} className="chip">{p}</button>
          ))}
        </div>
      )}

      <div className="sticky bottom-24 mt-4 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
          placeholder="Ask your coach…"
          className="flex-1 rounded-full bg-black/40 border border-white/12 px-4 py-3 text-sm outline-none focus:border-[--violet]" />
        <button onClick={() => send(input)} disabled={busy || !input.trim()} className="cta px-5 py-3"
          style={{ background: "linear-gradient(100deg,var(--violet),var(--cyan))" }}>↑</button>
      </div>
    </main>
  );
}

export default function Coach() {
  return <Suspense fallback={<main className="pt-20 text-center" style={{ color: "var(--faint)" }}>Loading…</main>}><CoachInner /></Suspense>;
}
