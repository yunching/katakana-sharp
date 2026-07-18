import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateAccuracy,
  createSession,
  focusSets,
  parseStoredCount,
  parseStoredMixups,
  sessionReducer,
} from "../app/focus-sets.ts";

test("focus sets contain valid recognition drills", () => {
  assert.equal(new Set(focusSets.map((set) => set.id)).size, focusSets.length);

  for (const set of focusSets) {
    assert.ok(set.drills.length > 0, `${set.id} must contain at least one drill`);

    for (const drill of set.drills) {
      assert.equal(drill.options.length, 4, `${drill.kana} must have four options`);
      assert.equal(new Set(drill.options).size, 4, `${drill.kana} options must be distinct`);
      assert.equal(
        drill.options.filter((option) => option === drill.answer).length,
        1,
        `${drill.kana} must contain its answer exactly once`,
      );
    }
  }
});

test("named focus sets match their advertised characters", () => {
  const namedSets = focusSets.slice(0, 3).map((set) => ({
    id: set.id,
    kana: set.drills.map((drill) => drill.kana),
  }));

  assert.deepEqual(namedSets, [
    { id: "look-alikes", kana: ["シ", "ツ", "ソ", "ン"] },
    { id: "hooks-strokes", kana: ["フ", "ワ", "ウ"] },
    { id: "crossed-lines", kana: ["ヌ", "ネ", "メ"] },
  ]);
});

test("accuracy includes the answer that was just selected", () => {
  let session = createSession();
  session = sessionReducer(session, { type: "answer", option: "shi", answer: "shi" });
  session = sessionReducer(session, { type: "next", cardCount: 2 });
  session = sessionReducer(session, { type: "answer", option: "n", answer: "tsu" });

  assert.equal(session.answeredCount, 2);
  assert.equal(session.score, 1);
  assert.equal(calculateAccuracy(session.score, session.answeredCount), 50);
});

test("a focus set completes instead of wrapping to its first card", () => {
  let session = createSession();
  session = sessionReducer(session, { type: "answer", option: "shi", answer: "shi" });
  session = sessionReducer(session, { type: "next", cardCount: 1 });

  assert.equal(session.completed, true);
  assert.equal(session.index, 0);
});

test("session ignores a second answer for the same card and resets cleanly", () => {
  let session = createSession();
  session = sessionReducer(session, { type: "answer", option: "shi", answer: "shi" });
  session = sessionReducer(session, { type: "answer", option: "tsu", answer: "shi" });

  assert.equal(session.answeredCount, 1);
  assert.equal(session.score, 1);
  assert.deepEqual(sessionReducer(session, { type: "reset" }), createSession());
});

test("stored progress parsers reject malformed values", () => {
  assert.equal(parseStoredCount("12"), 12);
  assert.equal(parseStoredCount("-4"), 0);
  assert.equal(parseStoredCount("not-a-number"), 0);
  assert.deepEqual(parseStoredMixups('["シ","シ","","ツ",4]'), ["シ", "ツ"]);
  assert.deepEqual(parseStoredMixups("not-json"), []);
  assert.deepEqual(parseStoredMixups('{"kana":"シ"}'), []);
});
