import test from "node:test";
import assert from "node:assert/strict";
import { matchFilm } from "../quiz.js";
import { films } from "../films.js";
import { images } from "../assets/images/manifest.js";

test("all 125 answer combinations follow majority or Question 1 tie-break", () => {
  for (let first = 0; first < 5; first++) {
    for (let second = 0; second < 5; second++) {
      for (let third = 0; third < 5; third++) {
        const expected = second === third ? second : first;
        assert.equal(
          matchFilm([first, second, third]),
          expected,
          `${first},${second},${third}`,
        );
      }
    }
  }
});

test("reject incomplete, missing, or out-of-range answers", () => {
  for (const answers of [
    [],
    [0, 1],
    [0, null, 2],
    [0, undefined, 2],
    [0, 1, 5],
    [-1, 2, 3],
    [0, 1.5, 2],
    ["0", 1, 2],
    new Array(3),
    null,
  ]) {
    assert.throws(() => matchFilm(answers), TypeError);
  }
});

test("brief mappings and all result destinations are complete", () => {
  assert.deepEqual(
    films.map((film) => [film.title, film.year]),
    [
      ["Hero", 2002],
      ["Ip Man", 2008],
      ["The Rebel", 2007],
      ["The Protector", 2005],
      ["13 Assassins", 2010],
    ],
  );
  for (const film of films) {
    assert.equal(
      matchFilm(Array(3).fill(films.indexOf(film))),
      films.indexOf(film),
    );
    assert.equal(new URL(film.trailer).protocol, "https:");
    assert.equal(new URL(film.source).protocol, "https:");
    assert.ok(film.story.length >= 2 && film.result && film.credit);
    assert.ok(film.posterAlt && film.hook && film.originalLang);
    for (const name of [film.image, film.poster]) {
      const entry = images[name.replace(/\.[^.]+$/, "")];
      assert.ok(entry && entry.widths.length, `manifest entry for ${name}`);
    }
  }
});
