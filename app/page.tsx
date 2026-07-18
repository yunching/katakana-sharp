"use client";

import { useCallback, useEffect, useReducer, useState } from "react";

import {
  calculateAccuracy,
  createSession,
  focusSets,
  parseStoredCount,
  parseStoredMixups,
  sessionReducer,
} from "./focus-sets";

const prompts = [
  "What sound does this make?",
  "Read this character.",
  "Choose the matching romaji.",
  "How is this pronounced?",
  "Name this katakana.",
  "Which reading is correct?",
];

const words = [
  { jp: "コーヒー", en: "coffee" }, { jp: "ホテル", en: "hotel" },
  { jp: "スマートフォン", en: "smartphone" }, { jp: "コンビニ", en: "convenience store" },
];

const basicKana = [
  ["ア", "a"], ["イ", "i"], ["ウ", "u"], ["エ", "e"], ["オ", "o"],
  ["カ", "ka"], ["キ", "ki"], ["ク", "ku"], ["ケ", "ke"], ["コ", "ko"],
  ["サ", "sa"], ["シ", "shi"], ["ス", "su"], ["セ", "se"], ["ソ", "so"],
  ["タ", "ta"], ["チ", "chi"], ["ツ", "tsu"], ["テ", "te"], ["ト", "to"],
  ["ナ", "na"], ["ニ", "ni"], ["ヌ", "nu"], ["ネ", "ne"], ["ノ", "no"],
  ["ハ", "ha"], ["ヒ", "hi"], ["フ", "fu"], ["ヘ", "he"], ["ホ", "ho"],
  ["マ", "ma"], ["ミ", "mi"], ["ム", "mu"], ["メ", "me"], ["モ", "mo"],
  ["ヤ", "ya"], ["", ""], ["ユ", "yu"], ["", ""], ["ヨ", "yo"],
  ["ラ", "ra"], ["リ", "ri"], ["ル", "ru"], ["レ", "re"], ["ロ", "ro"],
  ["ワ", "wa"], ["", ""], ["", ""], ["", ""], ["ヲ", "wo"],
  ["ン", "n"],
];

const extraKana = [
  ["ガ", "ga"], ["ギ", "gi"], ["グ", "gu"], ["ゲ", "ge"], ["ゴ", "go"],
  ["ザ", "za"], ["ジ", "ji"], ["ズ", "zu"], ["ゼ", "ze"], ["ゾ", "zo"],
  ["ダ", "da"], ["ヂ", "ji"], ["ヅ", "zu"], ["デ", "de"], ["ド", "do"],
  ["バ", "ba"], ["ビ", "bi"], ["ブ", "bu"], ["ベ", "be"], ["ボ", "bo"],
  ["パ", "pa"], ["ピ", "pi"], ["プ", "pu"], ["ペ", "pe"], ["ポ", "po"],
];

const combos = [["キャ", "kya"], ["キュ", "kyu"], ["キョ", "kyo"], ["シャ", "sha"], ["シュ", "shu"], ["ショ", "sho"], ["チャ", "cha"], ["チュ", "chu"], ["チョ", "cho"], ["ニャ", "nya"], ["ニュ", "nyu"], ["ニョ", "nyo"], ["リャ", "rya"], ["リュ", "ryu"], ["リョ", "ryo"]];

export default function Home() {
  const [session, dispatch] = useReducer(sessionReducer, undefined, createSession);
  const [selectedSetId, setSelectedSetId] = useState(focusSets[0].id);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [mixups, setMixups] = useState<string[]>([]);
  const [mode, setMode] = useState<"focus" | "words" | "reference">("focus");
  const activeSet = focusSets.find((set) => set.id === selectedSetId) ?? focusSets[0];
  const current = activeSet.drills[session.index];
  const accuracy = calculateAccuracy(session.score, session.answeredCount);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setBest(parseStoredCount(localStorage.getItem("kana-best")));
      setStreak(parseStoredCount(localStorage.getItem("kana-current-streak")));
      setMixups(parseStoredMixups(localStorage.getItem("kana-mixups")));
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function toggleMixup(kana: string) {
    if (!kana) return;
    setMixups((previous) => {
      const next = previous.includes(kana) ? previous.filter((item) => item !== kana) : [...previous, kana];
      localStorage.setItem("kana-mixups", JSON.stringify(next));
      return next;
    });
  }

  const choose = useCallback((option: string) => {
    if (session.picked || session.completed) return;
    dispatch({ type: "answer", option, answer: current.answer });
    if (option === current.answer) {
      setStreak((previous) => {
        const nextStreak = previous + 1;
        localStorage.setItem("kana-current-streak", String(nextStreak));
        setBest((previousBest) => {
          const nextBest = Math.max(previousBest, nextStreak);
          localStorage.setItem("kana-best", String(nextBest));
          return nextBest;
        });
        return nextStreak;
      });
    } else {
      setStreak(0);
      localStorage.setItem("kana-current-streak", "0");
      setMixups((previous) => {
        if (previous.includes(current.kana)) return previous;
        const nextMixups = [...previous, current.kana];
        localStorage.setItem("kana-mixups", JSON.stringify(nextMixups));
        return nextMixups;
      });
    }
  }, [current, session.completed, session.picked]);

  const next = useCallback(() => {
    dispatch({ type: "next", cardCount: activeSet.drills.length });
  }, [activeSet.drills.length]);

  function selectFocusSet(id: string) {
    setSelectedSetId(id);
    dispatch({ type: "reset" });
  }

  useEffect(() => {
    if (mode !== "focus" || session.completed) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "Enter" && session.picked) {
        next();
        return;
      }
      const slot = Number(event.key);
      if (slot >= 1 && slot <= 4) choose(current.options[slot - 1]);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [choose, current.options, mode, next, session.completed, session.picked]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="stamp">カ</span><span>KATAKANA<br/><b>SHARP</b></span></a>
        <nav><button className={mode === "focus" ? "active" : ""} onClick={() => setMode("focus")}>Focus drill</button><button className={mode === "words" ? "active" : ""} onClick={() => setMode("words")}>Word lab</button><button className={mode === "reference" ? "active" : ""} onClick={() => setMode("reference")}>Quick reference</button></nav>
        <div className="mini-streak"><span>🔥</span><b>{streak}</b><small>streak</small></div>
      </header>

      <section className="hero">
        <div><p className="eyebrow">600 days in. Time to sharpen the edges.</p><h1>Stop guessing.<br/><em>See</em> the difference.</h1><p className="sub">Short, high-focus drills for the katakana that still make you hesitate.</p></div>
        <div className="hero-mark" aria-hidden="true"><span>シ</span><span>ツ</span><i>confusion zone</i></div>
      </section>

      {mode === "focus" ? <section className="workspace">
        <aside>
          <p className="section-label">TODAY&apos;S SESSION</p>
          <div className="stat"><span>Accuracy</span><strong>{accuracy}<small>%</small></strong><div className="meter"><i style={{width: `${accuracy}%`}} /></div></div>
          <div className="stat row"><span>Best streak</span><strong>{best}</strong></div>
          <div className="sets"><p>FOCUS SET</p>{focusSets.map((set) => <button type="button" key={set.id} className={set.id === activeSet.id ? "selected" : ""} aria-pressed={set.id === activeSet.id} onClick={() => selectFocusSet(set.id)}><span>{set.title}</span><small>{set.description} · {set.drills.length} cards</small></button>)}</div>
          <div className="my-mixups"><p>MY MIX-UPS <span>{mixups.length}</span></p>{mixups.length ? <div>{mixups.map((kana) => <button key={kana} onClick={() => toggleMixup(kana)} title={`Unmark ${kana}`} aria-label={`Unmark ${kana} as a mix-up`}>{kana}<small>×</small></button>)}</div> : <small>Wrong answers and characters you mark will appear here.</small>}</div>
          <p className="hint">⌨ Use keys 1–4 to answer</p>
        </aside>

        <div className={`drill-card${session.completed ? " complete" : ""}`}>
          {session.completed ? <div className="completion"><p className="section-label">SET COMPLETE</p><h2>{activeSet.title}</h2><strong>{session.score} / {session.answeredCount}</strong><span>{accuracy}% accuracy</span><button type="button" onClick={() => dispatch({ type: "reset" })}>Practice again →</button></div> : <>
          <div className="card-top"><span>RECOGNITION</span><span>{session.index + 1} / {activeSet.drills.length}</span></div>
          <div className="progress"><i style={{width: `${((session.index + 1) / activeSet.drills.length) * 100}%`}} /></div>
          <p className="prompt">{prompts[session.index % prompts.length]}</p>
          <div className="kana">{current.kana}</div>
          <div className="options">{current.options.map((o, i) => <button type="button" key={o} onClick={() => choose(o)} className={session.picked ? (o === current.answer ? "correct" : o === session.picked ? "wrong" : "muted") : ""}><kbd>{i+1}</kbd>{o}</button>)}</div>
          {session.picked && <div className={`feedback ${session.picked === current.answer ? "yes" : "no"}`}><b>{session.picked === current.answer ? "Nice catch." : `Not quite — it’s “${current.answer}”.`}</b><span>{current.tip}</span><button type="button" onClick={next}>{session.index + 1 === activeSet.drills.length ? "Finish set →" : "Next →"}</button></div>}
          </>}
        </div>
      </section> : mode === "words" ? <section className="wordlab"><p className="section-label">REAL-WORLD READING</p><h2>Loanwords, at speed.</h2><p>Say each word aloud before revealing its meaning.</p><div className="word-grid">{words.map(w => <article key={w.jp}><span>{w.jp}</span><button onClick={(e) => (e.currentTarget.textContent = w.en)}>Reveal meaning</button></article>)}</div></section> : <section className="reference">
        <div className="reference-head"><div><p className="section-label">QUICK REFERENCE</p><h2>Katakana at a glance.</h2><p>Read top to bottom by row. Keep this open whenever a character slips your mind.</p></div><div className="micro-note"><b>Small ッ</b><span>doubles the next consonant</span><b>ー</b><span>extends the vowel sound</span></div></div>
        <div className="mark-help"><b>Tap any character</b> to mark or unmark it. Your choices are saved on this device.</div>
        <div className="reference-layout"><div><h3>Basic sounds <span>46 characters · {mixups.length} marked</span></h3><div className="kana-chart">{basicKana.map(([kana, romaji], i) => kana ? <button type="button" key={i} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b><small>{romaji}</small>{mixups.includes(kana) && <i>✓</i>}</button> : <div key={i} className="blank" />)}</div></div>
        <aside><h3>Voiced sounds</h3><div className="extra-chart">{extraKana.map(([kana, romaji]) => <button type="button" key={kana} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b><small>{romaji}</small>{mixups.includes(kana) && <i>✓</i>}</button>)}</div><h3>Common combinations</h3><div className="combo-chart">{combos.map(([kana, romaji]) => <button type="button" key={kana} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b> {romaji}{mixups.includes(kana) && <i>✓</i>}</button>)}</div></aside></div>
        <div className="confusion-strip"><div><p className="section-label">DON&apos;T MIX THESE UP</p><h3>シ <i>shi</i> ・ ツ <i>tsu</i></h3><span>shi looks sideways; tsu falls from above</span></div><div><p className="section-label">STROKE DIRECTION</p><h3>ソ <i>so</i> ・ ン <i>n</i></h3><span>so points down; n sweeps upward</span></div></div>
      </section>}

      <footer><span>今日の一歩 • one clear step today</span><span>Built for deliberate practice, not endless scrolling.</span></footer>
    </main>
  );
}
