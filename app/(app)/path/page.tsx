"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getState, getLessonsDone, markLessonDone, type AppState } from "@/lib/store";
import { LESSONS } from "@/lib/lessons";

export default function Path() {
  const r = useRouter();
  const [s, setS] = useState<AppState | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => { getState().then(setS); setDone(getLessonsDone()); }, []);

  const hd = s?.hd;
  const doneCount = done.length;
  // next unlocked = first not-done (sequential); everything up to it is open
  const firstUndone = LESSONS.findIndex((l) => !done.includes(l.key));
  const unlockedIdx = firstUndone === -1 ? LESSONS.length - 1 : firstUndone;
  const lesson = open != null ? LESSONS[open] : null;

  function complete(i: number) {
    const d = markLessonDone(LESSONS[i].key);
    setDone([...d]);
    if (i + 1 < LESSONS.length) setOpen(i + 1); else setOpen(null);
  }

  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>The path</p>
      <h1 className="font-display text-2xl mt-2">Understand your design, step by step.</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>Ten short lessons, each building on the last. By the end, every number in your chart means something.</p>

      <div className="prog-line mt-5"><div className="prog-fill" style={{ width: `${(doneCount / LESSONS.length) * 100}%` }} /></div>
      <p className="prog-meta">{doneCount} OF {LESSONS.length} LESSONS</p>

      <div className="mt-2 space-y-3">
        {LESSONS.map((l, i) => {
          const isDone = done.includes(l.key);
          const isOpen = i <= unlockedIdx;
          return (
            <button key={l.key} disabled={!isOpen} onClick={() => setOpen(i)}
              className="gcard w-full text-left flex items-center gap-3"
              style={{ opacity: isOpen ? 1 : 0.4, borderColor: i === unlockedIdx && !isDone ? "rgba(34,229,255,.4)" : undefined }}>
              <span className="lesson-num" style={{
                background: isDone ? "var(--teal)" : i === unlockedIdx ? "transparent" : "transparent",
                borderColor: isDone ? "var(--teal)" : i === unlockedIdx ? "var(--cyan)" : "rgba(245,251,255,.2)",
                color: isDone ? "var(--navy)" : "var(--cyan)" }}>
                {isDone ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <b className="font-display text-sm block">{l.title}</b>
                <span className="text-[11px]" style={{ color: "var(--faint)" }}>{l.kicker}</span>
              </span>
              {!isOpen && <span className="text-[10px]" style={{ color: "var(--faint)" }}>locked</span>}
            </button>
          );
        })}
      </div>

      {lesson && hd && (
        <div className="scene">
          <button className="scene-close" onClick={() => setOpen(null)}>✕</button>
          <div className="aurora"><div className="blob b1" /><div className="blob b2" /></div>
          <p className="kicker">Lesson {String((open ?? 0) + 1).padStart(2, "0")} · {lesson.kicker}</p>
          <h2>{lesson.title}</h2>
          <p>{lesson.teach}</p>
          <div className="pull">{lesson.forYou(hd)}</div>
          <p style={{ color: "var(--gold)", marginTop: 20 }}>{lesson.takeaway}</p>
          {lesson.coachSeed && (
            <a href={`/coach?q=${encodeURIComponent(lesson.coachSeed)}`} className="block mt-6 text-sm" style={{ color: "var(--violet)" }}>
              Talk this through with your coach →
            </a>
          )}
          <button onClick={() => complete(open!)} className="cta w-full mt-6">
            {done.includes(lesson.key) ? "Next lesson" : "Got it — next lesson"}
          </button>
        </div>
      )}
      {lesson && !hd && (
        <div className="scene">
          <button className="scene-close" onClick={() => setOpen(null)}>✕</button>
          <p className="kicker mt-10">First, your chart</p>
          <h2>Let&apos;s get your design first.</h2>
          <p>The Path teaches using your real chart. Add your birth details and it all comes alive.</p>
          <button onClick={() => r.push("/welcome/birth")} className="cta w-full mt-6">Get my chart</button>
        </div>
      )}
    </main>
  );
}
