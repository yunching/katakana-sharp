"use client";

import { useEffect, useMemo, useState } from "react";

const drills = [
  { kana: "シ", answer: "shi", options: ["shi", "tsu", "so", "n"], tip: "Strokes look sideways, like a smile." },
  { kana: "ツ", answer: "tsu", options: ["shi", "tsu", "so", "n"], tip: "Strokes fall from above, like rain." },
  { kana: "ソ", answer: "so", options: ["n", "so", "ri", "tsu"], tip: "The short stroke points downward." },
  { kana: "ン", answer: "n", options: ["so", "n", "shi", "ri"], tip: "The short stroke sweeps upward." },
  { kana: "ヌ", answer: "nu", options: ["me", "nu", "ne", "ma"], tip: "Look for the final crossing flick." },
  { kana: "ネ", answer: "ne", options: ["ho", "ne", "nu", "wa"], tip: "A little branch grows on the right." },
  { kana: "フ", answer: "fu", options: ["wa", "fu", "u", "ra"], tip: "One clean, airy stroke." },
  { kana: "ワ", answer: "wa", options: ["fu", "u", "wa", "ku"], tip: "A vertical start with a hooked roof." },
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
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [best, setBest] = useState(0);
  const [mixups, setMixups] = useState<string[]>([]);
  const [mode, setMode] = useState<"focus" | "words" | "reference">("focus");
  const current = drills[index % drills.length];
  const accuracy = useMemo(() => index ? Math.round((score / index) * 100) : 100, [index, score]);

  useEffect(() => {
    setBest(Number(localStorage.getItem("kana-best") || 0));
    setStreak(Number(localStorage.getItem("kana-current-streak") || 0));
    try { setMixups(JSON.parse(localStorage.getItem("kana-mixups") || "[]")); } catch { setMixups([]); }
  }, []);

  function saveMixups(next: string[]) {
    setMixups(next);
    localStorage.setItem("kana-mixups", JSON.stringify(next));
  }

  function toggleMixup(kana: string) {
    if (!kana) return;
    saveMixups(mixups.includes(kana) ? mixups.filter((item) => item !== kana) : [...mixups, kana]);
  }

  function choose(option: string) {
    if (picked) return;
    setPicked(option);
    if (option === current.answer) {
      setScore((v) => v + 1);
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
      if (!mixups.includes(current.kana)) saveMixups([...mixups, current.kana]);
    }
  }

  function next() { setIndex((v) => v + 1); setPicked(null); }

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
          <p className="section-label">TODAY'S SESSION</p>
          <div className="stat"><span>Accuracy</span><strong>{accuracy}<small>%</small></strong><div className="meter"><i style={{width: `${accuracy}%`}} /></div></div>
          <div className="stat row"><span>Best streak</span><strong>{best}</strong></div>
          <div className="sets"><p>FOCUS SET</p><button className="selected"><span>シ・ツ・ソ・ン</span><small>Look-alikes · 8 cards</small></button><button><span>フ・ワ・ウ</span><small>Hooks & strokes · next</small></button><button><span>ヌ・ネ・メ</span><small>Crossed lines · next</small></button></div>
          <div className="my-mixups"><p>MY MIX-UPS <span>{mixups.length}</span></p>{mixups.length ? <div>{mixups.map((kana) => <button key={kana} onClick={() => toggleMixup(kana)} title={`Unmark ${kana}`} aria-label={`Unmark ${kana} as a mix-up`}>{kana}<small>×</small></button>)}</div> : <small>Wrong answers and characters you mark will appear here.</small>}</div>
          <p className="hint">⌨ Use keys 1–4 to answer</p>
        </aside>

        <div className="drill-card">
          <div className="card-top"><span>RECOGNITION</span><span>{(index % drills.length) + 1} / {drills.length}</span></div>
          <div className="progress"><i style={{width: `${((index % drills.length) + 1) / drills.length * 100}%`}} /></div>
          <p className="prompt">What sound does this make?</p>
          <div className="kana">{current.kana}</div>
          <div className="options">{current.options.map((o, i) => <button key={o} onClick={() => choose(o)} className={picked ? (o === current.answer ? "correct" : o === picked ? "wrong" : "muted") : ""}><kbd>{i+1}</kbd>{o}</button>)}</div>
          {picked && <div className={`feedback ${picked === current.answer ? "yes" : "no"}`}><b>{picked === current.answer ? "Nice catch." : `Not quite — it’s “${current.answer}”.`}</b><span>{current.tip}</span><button onClick={next}>Next →</button></div>}
        </div>
      </section> : mode === "words" ? <section className="wordlab"><p className="section-label">REAL-WORLD READING</p><h2>Loanwords, at speed.</h2><p>Say each word aloud before revealing its meaning.</p><div className="word-grid">{words.map(w => <article key={w.jp}><span>{w.jp}</span><button onClick={(e) => (e.currentTarget.textContent = w.en)}>Reveal meaning</button></article>)}</div></section> : <section className="reference">
        <div className="reference-head"><div><p className="section-label">QUICK REFERENCE</p><h2>Katakana at a glance.</h2><p>Read top to bottom by row. Keep this open whenever a character slips your mind.</p></div><div className="micro-note"><b>Small ッ</b><span>doubles the next consonant</span><b>ー</b><span>extends the vowel sound</span></div></div>
        <div className="mark-help"><b>Tap any character</b> to mark or unmark it. Your choices are saved on this device.</div>
        <div className="reference-layout"><div><h3>Basic sounds <span>46 characters · {mixups.length} marked</span></h3><div className="kana-chart">{basicKana.map(([kana, romaji], i) => kana ? <button type="button" key={i} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b><small>{romaji}</small>{mixups.includes(kana) && <i>✓</i>}</button> : <div key={i} className="blank" />)}</div></div>
        <aside><h3>Voiced sounds</h3><div className="extra-chart">{extraKana.map(([kana, romaji]) => <button type="button" key={kana} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b><small>{romaji}</small>{mixups.includes(kana) && <i>✓</i>}</button>)}</div><h3>Common combinations</h3><div className="combo-chart">{combos.map(([kana, romaji]) => <button type="button" key={kana} onClick={() => toggleMixup(kana)} aria-pressed={mixups.includes(kana)} className={mixups.includes(kana) ? "marked" : ""}><b>{kana}</b> {romaji}{mixups.includes(kana) && <i>✓</i>}</button>)}</div></aside></div>
        <div className="confusion-strip"><div><p className="section-label">DON'T MIX THESE UP</p><h3>シ <i>shi</i> ・ ツ <i>tsu</i></h3><span>shi looks sideways; tsu falls from above</span></div><div><p className="section-label">STROKE DIRECTION</p><h3>ソ <i>so</i> ・ ン <i>n</i></h3><span>so points down; n sweeps upward</span></div></div>
      </section>}

      <footer><span>今日の一歩 • one clear step today</span><span>Built for deliberate practice, not endless scrolling.</span></footer>
    </main>
  );
}
