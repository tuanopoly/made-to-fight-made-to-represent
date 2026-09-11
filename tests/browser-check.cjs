const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
let browser;

(async () => {
  browser = await chromium.launch({ channel: "chrome", headless: true });
  const base = process.env.TEST_URL || "http://127.0.0.1:4173/";
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await fs.mkdir("tmp/qa", { recursive: true });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.locator(".film-panel").last().waitFor();
  await page.screenshot({
    path: "tmp/qa/home-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  assert.equal(await page.locator(".film-panel").count(), 5);
  assert.equal(await page.locator(".film-card").count(), 5);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    "Desktop overflow",
  );

  await page.locator(".hero-bottom [data-start]").click();
  assert.equal(await page.locator("#quiz-form button").isDisabled(), true);
  await page.locator('input[value="0"]').check();
  await page.locator("#quiz-form button").click();
  await page.locator('input[value="1"]').check();
  await page.locator("#quiz-form button").click();
  await page.locator("[data-back]").click();
  assert.equal(
    await page.locator('input[value="1"]').isChecked(),
    true,
    "Back preserves answer",
  );
  await page.locator("#quiz-form button").click();
  await page.locator('input[value="1"]').check();
  await page.screenshot({
    path: "tmp/qa/quiz-desktop.png",
    animations: "disabled",
  });
  await page.locator("#quiz-form button").click();
  assert.equal(
    await page.locator(".film-view").getAttribute("data-film-id"),
    "ip-man",
  );
  assert.equal(
    await page.locator(".reveal-copy h2").textContent(),
    "Wing Chun",
  );
  await page.screenshot({
    path: "tmp/qa/result-desktop.png",
    animations: "disabled",
  });
  await page.locator("[data-edit-answers]").click();
  await page.locator('input[value="0"]').check();
  await page.locator("#quiz-form button").click();
  assert.equal(
    await page.locator(".film-view").getAttribute("data-film-id"),
    "hero",
    "Editing replaces previous answer",
  );
  await page.locator(".film-bottom [data-start]").click();
  assert.equal(
    await page.locator("input:checked").count(),
    0,
    "Retake clears choices",
  );
  assert.equal(await page.locator("#quiz-form button").isDisabled(), true);
  for (const answer of [3, 0, 2]) {
    await page.locator(`input[value="${answer}"]`).check();
    await page.locator("#quiz-form button").click();
  }
  assert.equal(
    await page.locator(".film-view").getAttribute("data-film-id"),
    "the-protector",
    "Question 1 breaks a tie",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page.locator("#experience").evaluate((element) => element.open),
    false,
  );

  for (let index = 0; index < 5; index++) {
    await page.locator(".film-card-button").nth(index).click();
    assert.ok(await page.locator(".reveal-actions a").getAttribute("href"));
    assert.equal(
      await page.locator(".reveal-actions a").getAttribute("target"),
      "_blank",
    );
    await page.locator("[data-story]").click();
    assert.equal(await page.locator(".story-body p").count(), 3);
    await page.locator(".screening summary").click();
    assert.equal(await page.locator(".screening").getAttribute("open"), "");
    await page.keyboard.press("Escape");
  }

  await page.locator("#credits-open").click();
  assert.equal(await page.locator(".credit-item").count(), 5);
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .locator("body")
      .evaluate((element) => element.classList.contains("dialog-open")),
    false,
  );
  assert.equal(
    await page
      .locator("#credits-open")
      .evaluate((element) => element === document.activeElement),
    true,
    "Dialog restores focus",
  );
  const broken = await page
    .locator("img")
    .evaluateAll((images) =>
      images
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.src),
    );
  assert.deepEqual(broken, []);

  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  mobile.on("pageerror", (error) => errors.push(error.message));
  await mobile.goto(base);
  await mobile.evaluate(() => document.fonts.ready);
  await mobile.screenshot({
    path: "tmp/qa/home-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await mobile.locator('[data-featured="1"]').click();
  assert.equal(
    await mobile.locator(".film-panel.is-featured").getAttribute("data-film"),
    "1",
    "Mobile film selector",
  );
  assert.equal(
    await mobile.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    "Mobile home overflow",
  );
  await mobile.locator(".hero-bottom [data-start]").click();
  for (const answer of [4, 4, 4]) {
    await mobile.locator(`input[value="${answer}"]`).check();
    if (answer === 4)
      await mobile.screenshot({
        path: "tmp/qa/quiz-mobile.png",
        animations: "disabled",
      });
    await mobile.locator("#quiz-form button").click();
  }
  assert.equal(
    await mobile.locator(".film-view").getAttribute("data-film-id"),
    "13-assassins",
  );
  assert.equal(
    await mobile
      .locator("#experience")
      .evaluate((element) => element.scrollWidth <= element.clientWidth),
    true,
    "Mobile result overflow",
  );
  await mobile.screenshot({
    path: "tmp/qa/result-mobile.png",
    animations: "disabled",
  });
  const animation = await mobile
    .locator(".film-reveal-image")
    .evaluate((element) => getComputedStyle(element).animationName);
  assert.equal(animation, "none", "Reduced motion is honored");
  await mobile.locator("[data-close]").click();
  await mobile.locator(".header-cta").click();
  await mobile.keyboard.press("Tab");
  await mobile.keyboard.press("ArrowRight");
  await mobile.keyboard.press("Space");
  assert.equal(
    await mobile.locator("input:checked").count(),
    1,
    "Keyboard selects an answer",
  );
  assert.deepEqual(errors, [], "Browser errors");
  console.log(
    "Browser checks passed: desktop/mobile, majority/tie, editing/restart, five films, sources, dialogs, images, keyboard, reduced motion.",
  );
  await browser.close();
})().catch(async (error) => {
  console.error(error);
  await browser?.close();
  process.exitCode = 1;
});
