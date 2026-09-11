import { films } from "./films.js?v=9";
import { questions, matchFilm } from "./quiz.js?v=9";
import { images } from "./assets/images/manifest.js?v=9";

/* Inline SVG icons so arrows render identically on every platform. */
const icon = (name) =>
  `<svg class="arrow" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;

/* Build a responsive <img> from the WebP variants listed in the manifest. */
function picture(name, sizes, attrs = "") {
  const base = name.replace(/\.[^.]+$/, "");
  const meta = images[base];
  if (!meta) throw new Error(`No image variants listed for ${name}`);
  const file = (w) => `./assets/images/${base}-${w}.webp`;
  const srcset = meta.widths.map((w) => `${file(w)} ${w}w`).join(", ");
  return `<img src="${file(meta.widths[0])}" srcset="${srcset}" sizes="${sizes}" width="${meta.width}" height="${meta.height}" ${attrs}>`;
}
const dialog = document.querySelector("#experience");
const stage = document.querySelector("#experience-content");
const credits = document.querySelector("#credits");
let answers = [null, null, null];
let questionIndex = 0;
let mode = "quiz";

document.querySelector("#film-panels").innerHTML = films
  .map(
    (film, index) => `
  <button class="film-panel ${index === 0 ? "is-featured" : ""}" data-film="${index}" style="--accent:${film.accent};--position:${film.position}" aria-label="Explore ${film.title}, ${film.place}">
    ${picture(film.image, "(max-width: 760px) 90vw, 28vw", `alt="${film.alt}" ${index === 0 ? 'fetchpriority="high"' : index === 1 ? "" : 'loading="lazy"'}`)}
    <span class="panel-info"><small>${film.place}</small><strong>${film.title}</strong><span class="panel-arrow" aria-hidden="true">${icon("ne")}</span></span>
  </button>`,
  )
  .join("");

document.querySelector("#hero-film-tabs").innerHTML = films
  .map(
    (film, index) =>
      `<button data-featured="${index}" aria-pressed="${index === 0}" aria-label="${film.place}: feature ${film.title}">${film.place}</button>`,
  )
  .join("");

document.querySelector("#film-grid").innerHTML = films
  .map(
    (film, index) => `
  <article class="film-card" style="--accent:${film.accent}">
    <a class="film-card-button" href="#film/${film.id}" aria-labelledby="film-title-${film.id}" aria-describedby="film-hook-${film.id}">
      <span class="row-index" aria-hidden="true">0${index + 1}</span>
      <span class="row-image">${picture(film.poster, "(max-width: 760px) 88px, 120px", `alt="${film.posterAlt}" loading="lazy"`)}</span>
      <span class="row-text"><span class="card-meta"><span>${film.place}</span><span>${film.year}</span></span><h3 id="film-title-${film.id}">${film.title}</h3><p class="card-style">${film.styleDetail || film.style} <span>· ${film.theme}</span></p><p class="card-hook" id="film-hook-${film.id}">${film.hook}</p></span>
      <span class="row-action">Open the film <span aria-hidden="true">${icon("ne")}</span></span>
    </a>
  </article>`,
  )
  .join("");

document.querySelector("#credits-list").innerHTML = films
  .map(
    (film) => `
  <section class="credit-item"><h3>${film.title} (${film.year})</h3><p>${film.credit}</p><a href="${film.creditUrl}" target="_blank" rel="noopener noreferrer">Image source ${icon("ne")}</a><a href="${film.source}" target="_blank" rel="noopener noreferrer">Story source ${icon("ne")}</a><a href="${film.trailer}" target="_blank" rel="noopener noreferrer">Official trailer ${icon("ne")}</a></section>`,
  )
  .join("");

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Mobile hero strip: tabs scroll to a film, and scrolling updates the tabs. */
const filmPanels = document.querySelector("#film-panels");
function setFeatured(selected) {
  filmPanels
    .querySelectorAll(".film-panel")
    .forEach((panel, index) =>
      panel.classList.toggle("is-featured", index === selected),
    );
  document
    .querySelectorAll("[data-featured]")
    .forEach((tab, index) =>
      tab.setAttribute("aria-pressed", String(index === selected)),
    );
}
let stripTimer;
filmPanels.addEventListener("scroll", () => {
  clearTimeout(stripTimer);
  stripTimer = setTimeout(() => {
    const origin =
      filmPanels.getBoundingClientRect().left +
      parseFloat(getComputedStyle(filmPanels).paddingLeft);
    let nearest = 0;
    let distance = Infinity;
    filmPanels.querySelectorAll(".film-panel").forEach((panel, index) => {
      const gap = Math.abs(panel.getBoundingClientRect().left - origin);
      if (gap < distance) {
        distance = gap;
        nearest = index;
      }
    });
    setFeatured(nearest);
  }, 80);
});

function lockPage() {
  document.body.classList.add("dialog-open");
}
function unlockPage() {
  if (!dialog.open && !credits.open)
    document.body.classList.remove("dialog-open");
}
function showStage() {
  if (!dialog.open) dialog.showModal();
  lockPage();
  dialog.scrollTo(0, 0);
}
function focusHeading() {
  stage.querySelector("h2").focus({ preventScroll: true });
}

function startQuiz() {
  answers = [null, null, null];
  questionIndex = 0;
  renderQuestion();
  showStage();
  focusHeading();
  setHash("#quiz");
}

function renderQuestion() {
  mode = "quiz";
  const question = questions[questionIndex];
  const artwork = films[questionIndex === 0 ? 1 : questionIndex === 1 ? 3 : 4];
  dialog.setAttribute(
    "aria-label",
    `Find your film — question ${questionIndex + 1} of 3`,
  );
  stage.innerHTML = `
    <div class="experience-bar"><button class="back-button" data-back><span aria-hidden="true">${icon("left")}</span> ${questionIndex === 0 ? "Back to festival" : "Previous question"}</button><span class="eyebrow">Question ${questionIndex + 1} of 3</span><button class="close-button" data-close aria-label="Close quiz">${icon("close")}</button></div>
    <div class="quiz-layout"><div class="quiz-copy">
      <div class="quiz-progress" aria-hidden="true">${questions.map((_, index) => `<span class="${index <= questionIndex ? "done" : ""}"></span>`).join("")}</div>
      <h2 id="question-title" tabindex="-1">${question.title}</h2><p class="quiz-cue">${question.cue}</p>
      <form id="quiz-form"><fieldset class="answer-options" aria-labelledby="question-title"><legend class="sr-only">Choose one answer</legend>
      ${question.answers.map((answer, index) => `<label class="answer-choice"><input type="radio" name="answer" value="${index}" ${answers[questionIndex] === index ? "checked" : ""} required><span class="answer-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span><span class="answer-text">${answer}</span></label>`).join("")}
      </fieldset><div class="quiz-actions"><span class="selection-hint" aria-live="polite">${answers[questionIndex] === null ? "Choose what feels most like you." : `Answer ${String.fromCharCode(65 + answers[questionIndex])} selected.`}</span><button class="button primary" type="submit" ${answers[questionIndex] === null ? "disabled" : ""}>${questionIndex === 2 ? "Reveal my film" : "Continue"} <span aria-hidden="true">${icon("right")}</span></button></div></form>
    </div><aside class="quiz-art" aria-hidden="true" style="--position:${artwork.position}">${picture(artwork.image, "45vw", 'class="quiz-art-image" alt="" loading="lazy"')}<span class="quiz-art-marker">0${questionIndex + 1}</span><div class="quiz-art-caption"><span class="eyebrow">${artwork.title} · ${artwork.year}</span><p>${["Trust the<br>first instinct.", "Feel the<br>movement.", "See beyond<br>the fight."][questionIndex]}</p><small>Three questions. A new way into cinema.</small></div></aside></div>`;

  stage.querySelector("#quiz-form").addEventListener("change", (event) => {
    answers[questionIndex] = Number(event.target.value);
    stage.querySelector('[type="submit"]').disabled = false;
    stage.querySelector(".selection-hint").textContent =
      `Answer ${String.fromCharCode(65 + answers[questionIndex])} selected.`;
  });
  stage.querySelector("#quiz-form").addEventListener("submit", (event) => {
    event.preventDefault();
    if (answers[questionIndex] === null) return;
    if (questionIndex < 2) {
      questionIndex++;
      renderQuestion();
      dialog.scrollTo(0, 0);
      focusHeading();
    } else {
      renderFilm(matchFilm(answers), true);
      dialog.scrollTo(0, 0);
      focusHeading();
    }
  });
}

function renderFilm(index, isResult = false) {
  mode = isResult ? "result" : "film";
  const film = films[index];
  setHash(`#${isResult ? "result" : "film"}/${film.id}`);
  dialog.setAttribute(
    "aria-label",
    isResult ? `Your film match: ${film.title}` : `Explore ${film.title}`,
  );
  stage.innerHTML = `
    <article class="film-view" style="--accent:${film.accent};--position:${film.position}" data-film-id="${film.id}">
      <div class="experience-bar"><button class="back-button" data-${isResult ? "edit-answers" : "close"}><span aria-hidden="true">${icon("left")}</span> ${isResult ? "Change my answers" : "Back to festival"}</button><span class="eyebrow">${isResult ? "Your film match" : "The selection"} · ${film.place}</span><button class="close-button" data-close aria-label="Close film details">${icon("close")}</button></div>
      <div class="film-reveal">${picture(film.image, "100vw", `class="film-reveal-image" alt="${film.alt}"`)}<div class="reveal-copy">
        <span class="eyebrow">${isResult ? "Your fighting style is" : film.theme}</span><h2 tabindex="-1">${isResult ? film.style : film.title}</h2>
        <p class="reveal-film-title">${isResult ? film.title : film.styleDetail || film.style} <span>${film.year}</span></p><p class="film-original"><span lang="${film.originalLang}">${film.original}</span> &nbsp; / &nbsp; ${film.place}</p>
        <p class="reveal-description">${film.result}</p><div class="traits" role="group" aria-label="Themes">${film.traits.map((trait) => `<span>${trait}</span>`).join("")}</div>
        <div class="reveal-actions"><a class="button primary" href="${film.trailer}" target="_blank" rel="noopener noreferrer" aria-label="Preview ${film.title} — official trailer, opens in a new tab">Preview film <span aria-hidden="true">${icon("ne")}</span></a><button class="text-button" data-story>Explore the combat style <span aria-hidden="true">${icon("down")}</span></button></div><p class="trailer-source">Official trailer · ${film.trailerSource} · Opens in a new tab</p>
      </div></div>
      <section class="film-story" id="film-story" aria-labelledby="story-title"><div><span class="eyebrow">Beyond the fight / ${film.styleDetail || film.style}</span><h3 id="story-title" tabindex="-1">${film.storyTitle}</h3></div><div class="story-body">${film.story.map((paragraph) => `<p>${paragraph}</p>`).join("")}<a class="story-source" href="${film.source}" target="_blank" rel="noopener noreferrer">${film.sourceName} ${icon("ne")}</a></div></section>
      <div class="film-info"><dl><div><dt>Directed by</dt><dd>${film.director}</dd></div><div><dt>Original release</dt><dd>${film.year} · ${film.place}</dd></div></dl><details class="screening"><summary>Festival screening details ${icon("plus")}</summary><p><strong>Dates and venue to be announced.</strong></p><p>This is a coursework festival concept. Screenings and ticket booking are not currently scheduled.</p></details></div>
      <div class="film-bottom"><p class="film-credit">${film.credit} <a href="${film.creditUrl}" target="_blank" rel="noopener noreferrer">View source ${icon("ne")}</a></p><div class="film-bottom-actions"><button class="text-button" data-start>${isResult ? "Retake the quiz" : "Find your film"} <span aria-hidden="true">${icon("ne")}</span></button><button class="text-button" data-lineup>All five films <span aria-hidden="true">${icon("right")}</span></button></div></div>
    </article>`;
}

document.addEventListener("click", (event) => {
  const row = event.target.closest("a.film-card-button");
  if (row) {
    event.preventDefault();
    renderFilm(films.findIndex((film) => film.id === row.hash.slice(6)));
    showStage();
    focusHeading();
    return;
  }
  const button = event.target.closest("button");
  if (!button) return;
  if (button.hasAttribute("data-start")) startQuiz();
  else if (button.hasAttribute("data-featured")) {
    const selected = Number(button.dataset.featured);
    const panel = filmPanels.querySelectorAll(".film-panel")[selected];
    const origin =
      filmPanels.getBoundingClientRect().left +
      parseFloat(getComputedStyle(filmPanels).paddingLeft);
    filmPanels.scrollTo({
      left:
        filmPanels.scrollLeft + panel.getBoundingClientRect().left - origin,
      behavior: reducedMotion() ? "instant" : "smooth",
    });
    setFeatured(selected);
  } else if (button.hasAttribute("data-film")) {
    renderFilm(Number(button.dataset.film));
    showStage();
    focusHeading();
  } else if (button.hasAttribute("data-close")) dialog.close();
  else if (button.hasAttribute("data-back")) {
    if (questionIndex === 0) dialog.close();
    else {
      questionIndex--;
      renderQuestion();
      dialog.scrollTo(0, 0);
      focusHeading();
    }
  } else if (button.hasAttribute("data-edit-answers")) {
    if (answers[0] === null) return startQuiz();
    questionIndex = 0;
    renderQuestion();
    dialog.scrollTo(0, 0);
    focusHeading();
    setHash("#quiz");
  } else if (button.hasAttribute("data-story")) {
    stage
      .querySelector("#film-story")
      .scrollIntoView({
        behavior: reducedMotion() ? "instant" : "smooth",
        block: "start",
      });
    stage.querySelector("#story-title").focus({ preventScroll: true });
  } else if (button.hasAttribute("data-lineup")) {
    dialog.close();
    document.querySelector("#films").scrollIntoView({
      behavior: reducedMotion() ? "instant" : "smooth",
    });
    document.querySelector(".film-card-button").focus({ preventScroll: true });
  } else if (button.id === "credits-open") {
    credits.showModal();
    lockPage();
  } else if (button.hasAttribute("data-close-credits")) credits.close();
});

/* Hash routing: #quiz, #film/<id>, #result/<id>.
   Opening the stage pushes one history entry. Moving between views inside it
   replaces that entry, and closing pops it, so Back and Close stay in step. */
let writingHash = false;
let pushedEntry = false;
let closingFromRoute = false;
function setHash(hash) {
  if (location.hash === hash) return;
  if (pushedEntry) {
    history.replaceState(null, "", location.pathname + location.search + hash);
  } else {
    writingHash = true;
    pushedEntry = true;
    location.hash = hash;
  }
}
function route() {
  const [kind, id] = location.hash.slice(1).split("/");
  const index = films.findIndex((film) => film.id === id);
  if (kind === "quiz") {
    if (answers[0] === null) return startQuiz();
    if (mode !== "quiz") questionIndex = 0;
    renderQuestion();
    showStage();
    focusHeading();
  } else if ((kind === "film" || kind === "result") && index > -1) {
    renderFilm(index, kind === "result");
    showStage();
    focusHeading();
  } else if (dialog.open) {
    closingFromRoute = true;
    dialog.close();
  }
}
window.addEventListener("hashchange", () => {
  if (writingHash) {
    writingHash = false;
    return;
  }
  route();
});
dialog.addEventListener("close", () => {
  unlockPage();
  if (closingFromRoute) {
    closingFromRoute = false;
    pushedEntry = false;
    return;
  }
  if (pushedEntry) {
    pushedEntry = false;
    writingHash = true;
    history.back();
  } else if (/^#(quiz|film|result)/.test(location.hash)) {
    history.replaceState(null, "", location.pathname + location.search);
  }
});
route();
credits.addEventListener("close", unlockPage);
credits.addEventListener("click", (event) => {
  if (event.target === credits) {
    const bounds = credits.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    )
      credits.close();
  }
});
