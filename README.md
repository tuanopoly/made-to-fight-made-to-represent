# Made to Fight, Made to Represent

An interactive film-festival concept exploring Asian culture through screen combat. A three-question quiz matches visitors to one of five films, then opens a cinematic result with a short cultural story, a sourced official trailer link, and screening information.

**[Open the live website](https://tuanopoly.github.io/made-to-fight/)**

## Run locally

Requires Node.js 20 or newer. No runtime packages or build step are needed.

```sh
npm start
```

Open `http://127.0.0.1:4173`.

## Edit

- `films.js`: film metadata, cultural stories, trailer destinations, image references, and credits.
- `quiz.js`: original quiz questions and scoring.
- `app.js`: quiz state, dialogs, result rendering, and mobile film selection.
- `style.css`: responsive layout, design tokens, type, and motion.
- `index.html`: festival opening and editorial sections.
- `assets/`: local film imagery and self-hosted fonts. Images are served as WebP variants listed in `assets/images/manifest.js`; `app.js` builds `srcset` from that manifest. To replace an image, regenerate its variants (any resizer that writes `<name>-<width>.webp`) and update the manifest entry.

Each answer contributes one point to its associated film. The largest total wins. If all three choices differ, Question 1 breaks the tie. Changing an answer replaces the earlier choice; restarting clears the quiz.

## Verify

```sh
npm test
```

Checks all 125 answer combinations, invalid input, and film mapping integrity.

`tests/browser-check.cjs` tests the website on desktop and mobile using Playwright with Chrome. Install Playwright in a development environment or set `PLAYWRIGHT_MODULE` to an existing installation, then run it while the local server is running:

```sh
node tests/browser-check.cjs
```

Set `TEST_URL` to run the same checks against the published site. Browser screenshots are written to the ignored `tmp/qa/` directory.

## Publish

This is a static GitHub Pages site. When deploying changes, bump the `?v=` query on the stylesheet, script, and module imports so cached copies refresh together. Publish the root of the `main` branch; `.nojekyll` preserves the site as authored. All internal asset URLs are relative so project-site paths work correctly. No credentials or server configuration are required in the website.

## Sources

The five featured films are Hero (2002), Ip Man (2008), The Rebel (2007), The Protector (2005), and 13 Assassins (2010). Original release years are retained even where US trailer or distribution dates differ.

Film imagery is credited in the website and in [the asset source record](docs/film-assets-research.md). Cultural stories link directly to film-institute, festival, studio, or distributor sources. Trailers open official studio or distributor YouTube uploads in a separate tab. The site does not embed or host video.

This is an independent coursework/portfolio concept. Festival dates and venue are not scheduled. Film imagery belongs to its respective rights holders; attribution is not a claim of ownership or an open reuse license. Anton and Manrope are distributed under their included SIL Open Font Licenses.
