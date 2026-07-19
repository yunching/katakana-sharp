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

const challengeDrills: Drill[] = [
  { kana: "シ", answer: "shi", options: ["shi", "tsu", "so", "n"], tip: "Strokes look sideways, like a smile." },
  { kana: "ツ", answer: "tsu", options: ["shi", "tsu", "so", "n"], tip: "Strokes fall from above, like rain." },
  { kana: "ソ", answer: "so", options: ["n", "ri", "so", "tsu"], tip: "The short stroke points downward." },
  { kana: "ン", answer: "n", options: ["so", "shi", "ri", "n"], tip: "The short stroke sweeps upward." },
  { kana: "ヌ", answer: "nu", options: ["nu", "me", "ne", "ma"], tip: "Look for the final crossing flick." },
  { kana: "ネ", answer: "ne", options: ["ho", "ne", "nu", "wa"], tip: "A little branch grows on the right." },
  { kana: "メ", answer: "me", options: ["nu", "ne", "me", "ma"], tip: "Two clean strokes cross without a loop or branch." },
  { kana: "フ", answer: "fu", options: ["fu", "wa", "u", "ra"], tip: "One clean, airy stroke." },
  { kana: "ワ", answer: "wa", options: ["fu", "wa", "u", "ku"], tip: "A vertical start with a hooked roof." },
  { kana: "ウ", answer: "u", options: ["wa", "fu", "u", "ku"], tip: "The short top stroke sits above a wide roof." },
  { kana: "ク", answer: "ku", options: ["ke", "wa", "ta", "ku"], tip: "It is an open angle with no inner stroke." },
  { kana: "ケ", answer: "ke", options: ["ke", "ku", "ta", "ya"], tip: "Look for the extra stroke through the left side." },
  { kana: "チ", answer: "chi", options: ["te", "chi", "sa", "ra"], tip: "The long curve begins beneath a short horizontal line." },
  { kana: "テ", answer: "te", options: ["chi", "ni", "te", "to"], tip: "Two horizontal strokes sit above a downward sweep." },
  { kana: "ロ", answer: "ro", options: ["ru", "ko", "o", "ro"], tip: "It forms a box, unlike the two open strokes of コ." },
  { kana: "コ", answer: "ko", options: ["ko", "ro", "ni", "e"], tip: "Two parallel strokes stay open on the left." },
  { kana: "レ", answer: "re", options: ["ri", "re", "ru", "n"], tip: "A single stroke drops, then sweeps upward." },
  { kana: "リ", answer: "ri", options: ["i", "re", "ri", "n"], tip: "Two separate vertical strokes lean toward each other." },
  { kana: "ヤ", answer: "ya", options: ["a", "ka", "se", "ya"], tip: "Its long diagonal crosses a short central stroke." },
];

const remainingBasicDrills: Drill[] = [
  { kana: "ア", answer: "a", options: ["a", "ma", "ya", "se"], tip: "The right stroke bends down from a short crossbar." },
  { kana: "イ", answer: "i", options: ["i", "ri", "to", "ni"], tip: "Two strokes angle apart instead of running parallel." },
  { kana: "エ", answer: "e", options: ["e", "ko", "ni", "mi"], tip: "A centered vertical joins two horizontal bars." },
  { kana: "オ", answer: "o", options: ["o", "ho", "ne", "mu"], tip: "Look for the small diagonal flick on the right." },
  { kana: "カ", answer: "ka", options: ["ka", "ya", "se", "ke"], tip: "The right stroke drops beside a hooked left stroke." },
  { kana: "キ", answer: "ki", options: ["ki", "sa", "mo", "mi"], tip: "Two horizontal bars cross one long diagonal." },
  { kana: "サ", answer: "sa", options: ["sa", "ki", "se", "chi"], tip: "The short vertical cuts through the upper bar only." },
  { kana: "ス", answer: "su", options: ["su", "nu", "mu", "ma"], tip: "An angular bend ends with a crossing diagonal." },
  { kana: "セ", answer: "se", options: ["se", "ya", "sa", "hi"], tip: "The horizontal stroke passes through a hooked vertical." },
  { kana: "タ", answer: "ta", options: ["ta", "ku", "ke", "ya"], tip: "A short slash sits inside the larger outer angle." },
  { kana: "ト", answer: "to", options: ["to", "i", "ri", "na"], tip: "A small diagonal mark rests beside one vertical stroke." },
  { kana: "ナ", answer: "na", options: ["na", "me", "ta", "nu"], tip: "A long diagonal crosses beneath a short horizontal." },
  { kana: "ニ", answer: "ni", options: ["ni", "ko", "e", "mi"], tip: "Two horizontal strokes are short and fully separate." },
  { kana: "ノ", answer: "no", options: ["no", "re", "i", "he"], tip: "A single diagonal falls cleanly from right to left." },
  { kana: "ハ", answer: "ha", options: ["ha", "he", "no", "fu"], tip: "Two strokes spread apart like an open roof." },
  { kana: "ヒ", answer: "hi", options: ["hi", "se", "bi", "mi"], tip: "The lower line turns upward at the right edge." },
  { kana: "ヘ", answer: "he", options: ["he", "ha", "ku", "no"], tip: "Two diagonals meet in one simple peak." },
  { kana: "ホ", answer: "ho", options: ["ho", "o", "mo", "ne"], tip: "A vertical crosses two bars with flicks on both sides." },
  { kana: "マ", answer: "ma", options: ["ma", "mu", "a", "me"], tip: "The angular top ends in a short inward diagonal." },
  { kana: "ミ", answer: "mi", options: ["mi", "ni", "shi", "sa"], tip: "Three parallel strokes step downward to the right." },
  { kana: "ム", answer: "mu", options: ["mu", "ma", "su", "mo"], tip: "The bottom stroke sweeps right from a triangular bend." },
  { kana: "モ", answer: "mo", options: ["mo", "ki", "mi", "ho"], tip: "Two bars cross a vertical that hooks left at the bottom." },
  { kana: "ユ", answer: "yu", options: ["yu", "ko", "yo", "ro"], tip: "Two horizontal strokes join along the right side." },
  { kana: "ヨ", answer: "yo", options: ["yo", "e", "yu", "ro"], tip: "Three horizontal strokes connect on the right." },
  { kana: "ラ", answer: "ra", options: ["ra", "fu", "u", "chi"], tip: "A short top dash floats above a broad curve." },
  { kana: "ル", answer: "ru", options: ["ru", "re", "ro", "u"], tip: "Two strokes finish with a sharp rightward hook." },
  { kana: "ヲ", answer: "wo", options: ["wo", "o", "yo", "ko"], tip: "Three bars are crossed by a sweeping diagonal." },
];

const voicedDrills: Drill[] = [
  { kana: "ガ", answer: "ga", options: ["ga", "ka", "za", "da"], tip: "It is カ with two dakuten marks at the upper right." },
  { kana: "ギ", answer: "gi", options: ["gi", "ki", "ji", "bi"], tip: "It is キ with two dakuten marks at the upper right." },
  { kana: "グ", answer: "gu", options: ["gu", "ku", "zu", "bu"], tip: "It is ク with two dakuten marks at the upper right." },
  { kana: "ゲ", answer: "ge", options: ["ge", "ke", "ze", "be"], tip: "It is ケ with two dakuten marks at the upper right." },
  { kana: "ゴ", answer: "go", options: ["go", "ko", "zo", "do"], tip: "It is コ with two dakuten marks at the upper right." },
  { kana: "ザ", answer: "za", options: ["za", "sa", "ga", "da"], tip: "It is サ with two dakuten marks at the upper right." },
  { kana: "ジ", answer: "ji", options: ["ji", "shi", "gi", "chi"], tip: "It is シ with dakuten; its main strokes still face sideways." },
  { kana: "ズ", answer: "zu", options: ["zu", "su", "gu", "bu"], tip: "It is ス with two dakuten marks at the upper right." },
  { kana: "ゼ", answer: "ze", options: ["ze", "se", "ge", "de"], tip: "It is セ with two dakuten marks at the upper right." },
  { kana: "ゾ", answer: "zo", options: ["zo", "so", "go", "do"], tip: "It is ソ with dakuten; the short stroke still points down." },
  { kana: "ダ", answer: "da", options: ["da", "ta", "ga", "za"], tip: "It is タ with two dakuten marks at the upper right." },
  { kana: "ヂ", answer: "ji", options: ["ji", "chi", "de", "zu"], tip: "It is チ with dakuten, a rare spelling also read ji." },
  { kana: "ヅ", answer: "zu", options: ["zu", "tsu", "do", "ji"], tip: "It is ツ with dakuten, a rare spelling also read zu." },
  { kana: "デ", answer: "de", options: ["de", "te", "ze", "ge"], tip: "It is テ with two dakuten marks at the upper right." },
  { kana: "ド", answer: "do", options: ["do", "to", "zo", "go"], tip: "It is ト with two dakuten marks at the upper right." },
  { kana: "バ", answer: "ba", options: ["ba", "ha", "pa", "da"], tip: "It is ハ with two dakuten marks at the upper right." },
  { kana: "ビ", answer: "bi", options: ["bi", "hi", "pi", "ji"], tip: "It is ヒ with two dakuten marks at the upper right." },
  { kana: "ブ", answer: "bu", options: ["bu", "fu", "pu", "zu"], tip: "It is フ with two dakuten marks at the upper right." },
  { kana: "ベ", answer: "be", options: ["be", "he", "pe", "ge"], tip: "It is ヘ with two dakuten marks at the upper right." },
  { kana: "ボ", answer: "bo", options: ["bo", "ho", "po", "do"], tip: "It is ホ with two dakuten marks at the upper right." },
  { kana: "パ", answer: "pa", options: ["pa", "ha", "ba", "pe"], tip: "It is ハ with a small handakuten circle at the upper right." },
  { kana: "ピ", answer: "pi", options: ["pi", "hi", "bi", "pe"], tip: "It is ヒ with a small handakuten circle at the upper right." },
  { kana: "プ", answer: "pu", options: ["pu", "fu", "bu", "po"], tip: "It is フ with a small handakuten circle at the upper right." },
  { kana: "ペ", answer: "pe", options: ["pe", "he", "be", "pi"], tip: "It is ヘ with a small handakuten circle at the upper right." },
  { kana: "ポ", answer: "po", options: ["po", "ho", "bo", "pu"], tip: "It is ホ with a small handakuten circle at the upper right." },
];

const basicDrills = [...challengeDrills, ...remainingBasicDrills];
const drills = [...basicDrills, ...voicedDrills];

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
    id: "basic-kana",
    title: "All basic kana",
    description: "46 core characters",
    drills: basicDrills,
  },
  {
    id: "voiced-kana",
    title: "Voiced sounds",
    description: "Dakuten & handakuten",
    drills: voicedDrills,
  },
  {
    id: "mixed-review",
    title: "Full review",
    description: "All 71 characters",
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

export function createShuffledOrder(
  cardCount: number,
  previousOrder: number[] = [],
  random: () => number = Math.random,
) {
  const order = Array.from({ length: cardCount }, (_, index) => index);

  for (let index = order.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  if (order.length > 1 && order.every((card, index) => card === previousOrder[index])) {
    order.push(order.shift()!);
  }

  return order;
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
