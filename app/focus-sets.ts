export type Drill = {
  kana: string;
  answer: string;
  options: [string, string, string, string];
  tip: string;
};

export type FocusSet = {
  id: string;
  title: string;
  description: string;
  drills: Drill[];
};

const drills: Drill[] = [
  { kana: "シ", answer: "shi", options: ["shi", "tsu", "so", "n"], tip: "Strokes look sideways, like a smile." },
  { kana: "ツ", answer: "tsu", options: ["shi", "tsu", "so", "n"], tip: "Strokes fall from above, like rain." },
  { kana: "ソ", answer: "so", options: ["n", "so", "ri", "tsu"], tip: "The short stroke points downward." },
  { kana: "ン", answer: "n", options: ["so", "n", "shi", "ri"], tip: "The short stroke sweeps upward." },
  { kana: "ヌ", answer: "nu", options: ["me", "nu", "ne", "ma"], tip: "Look for the final crossing flick." },
  { kana: "ネ", answer: "ne", options: ["ho", "ne", "nu", "wa"], tip: "A little branch grows on the right." },
  { kana: "メ", answer: "me", options: ["nu", "ne", "me", "ma"], tip: "Two clean strokes cross without a loop or branch." },
  { kana: "フ", answer: "fu", options: ["wa", "fu", "u", "ra"], tip: "One clean, airy stroke." },
  { kana: "ワ", answer: "wa", options: ["fu", "u", "wa", "ku"], tip: "A vertical start with a hooked roof." },
  { kana: "ウ", answer: "u", options: ["wa", "u", "fu", "ku"], tip: "The short top stroke sits above a wide roof." },
  { kana: "ク", answer: "ku", options: ["ke", "ku", "wa", "ta"], tip: "It is an open angle with no inner stroke." },
  { kana: "ケ", answer: "ke", options: ["ku", "ke", "ta", "ya"], tip: "Look for the extra stroke through the left side." },
  { kana: "チ", answer: "chi", options: ["te", "chi", "sa", "ra"], tip: "The long curve begins beneath a short horizontal line." },
  { kana: "テ", answer: "te", options: ["chi", "te", "ni", "to"], tip: "Two horizontal strokes sit above a downward sweep." },
  { kana: "ロ", answer: "ro", options: ["ro", "ru", "ko", "o"], tip: "It forms a box, unlike the two open strokes of コ." },
  { kana: "コ", answer: "ko", options: ["ro", "ko", "ni", "e"], tip: "Two parallel strokes stay open on the left." },
  { kana: "レ", answer: "re", options: ["re", "ri", "ru", "n"], tip: "A single stroke drops, then sweeps upward." },
  { kana: "リ", answer: "ri", options: ["i", "ri", "re", "n"], tip: "Two separate vertical strokes lean toward each other." },
  { kana: "ヤ", answer: "ya", options: ["a", "ya", "ka", "se"], tip: "Its long diagonal crosses a short central stroke." },
];

function selectDrills(kana: string[]) {
  return kana.map((character) => {
    const drill = drills.find((candidate) => candidate.kana === character);
    if (!drill) throw new Error(`Missing drill for ${character}`);
    return drill;
  });
}

export const focusSets: FocusSet[] = [
  {
    id: "look-alikes",
    title: "シ・ツ・ソ・ン",
    description: "Look-alikes",
    drills: selectDrills(["シ", "ツ", "ソ", "ン"]),
  },
  {
    id: "hooks-strokes",
    title: "フ・ワ・ウ",
    description: "Hooks & strokes",
    drills: selectDrills(["フ", "ワ", "ウ"]),
  },
  {
    id: "crossed-lines",
    title: "ヌ・ネ・メ",
    description: "Crossed lines",
    drills: selectDrills(["ヌ", "ネ", "メ"]),
  },
  {
    id: "mixed-review",
    title: "Mixed review",
    description: "All challenge cards",
    drills,
  },
];

export type Session = {
  index: number;
  score: number;
  answeredCount: number;
  picked: string | null;
  completed: boolean;
};

export type SessionAction =
  | { type: "answer"; option: string; answer: string }
  | { type: "next"; cardCount: number }
  | { type: "reset" };

export function createSession(): Session {
  return { index: 0, score: 0, answeredCount: 0, picked: null, completed: false };
}

export function sessionReducer(session: Session, action: SessionAction): Session {
  if (action.type === "reset") return createSession();

  if (action.type === "answer") {
    if (session.picked || session.completed) return session;
    return {
      ...session,
      score: session.score + Number(action.option === action.answer),
      answeredCount: session.answeredCount + 1,
      picked: action.option,
    };
  }

  if (!session.picked || session.completed) return session;
  if (session.index + 1 >= action.cardCount) return { ...session, completed: true };
  return { ...session, index: session.index + 1, picked: null };
}

export function calculateAccuracy(score: number, answeredCount: number) {
  return answeredCount === 0 ? 100 : Math.round((score / answeredCount) * 100);
}

export function parseStoredCount(value: string | null) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

export function parseStoredMixups(value: string | null) {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((item): item is string => typeof item === "string" && item.length > 0))];
  } catch {
    return [];
  }
}
