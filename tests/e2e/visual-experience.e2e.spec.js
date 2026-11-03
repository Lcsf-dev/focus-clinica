import { test, expect } from "./fixtures.js";

for (const width of [360, 390, 768, 1440]) {
  test(`loads the doctor and preserves the composition at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const doctor = page.locator(".hero-doctor");
    await expect(doctor).toBeVisible();
    await expect(doctor).toHaveJSProperty("complete", true);
    expect(await doctor.evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
    const composition = await page.locator(".hero-stage").boundingBox();
    const portrait = await doctor.boundingBox();
    expect(await doctor.evaluate((image) => image.naturalWidth)).toBeGreaterThanOrEqual(Math.floor(portrait.width));
    const copy = await page.locator(".hero__text").boundingBox();
    expect(portrait.x).toBeGreaterThanOrEqual(composition.x - 1);
    expect(portrait.x + portrait.width).toBeLessThanOrEqual(composition.x + composition.width + 1);
    expect(portrait.y).toBeGreaterThanOrEqual(composition.y - 1);
    expect(portrait.y + portrait.height).toBeLessThanOrEqual(composition.y + composition.height);
    expect(copy.y + copy.height <= portrait.y || copy.x + copy.width <= portrait.x).toBe(true);
    await expect(page.locator(".hero-card")).toHaveCount(2);
    const frame = page.locator(".hero-stage .product-frame");
    await expect(frame).toBeVisible();
    await expect(frame.locator("img")).toHaveJSProperty("complete", true);
    await page.screenshot({ path: `tmp/experience-${width}.png` });
    await page.locator(".hero__visual").screenshot({ path: `tmp/experience-composition-${width}.png` });
  });
}

test("keeps the demonstration height stable while changing screens", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const heights = [];
    for (const screen of ["dashboard", "appointments", "consultation-types", "settings"]) {
      await page.locator(`#${screen}-tab`).click();
      const panel = page.locator(`#${screen}-panel`);
      await expect(panel.locator("img")).toHaveJSProperty("complete", true);
      await expect(panel.locator(".demo-panel__focus li").first()).toBeVisible();
      heights.push((await page.locator(".demo-showcase").boundingBox()).height);
    }
    expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(2);
    await page.locator("#demo").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/experience-demo-${width}.png` });
  }
});

test("uses finite motion and exposes controls while entering", async ({ page }) => {
  await page.goto("/");
  const access = page.locator('.hero__text a[href="https://focus-clinica.netlify.app/"]');
  await access.focus();
  await expect(access).toBeFocused();
  await expect(access.locator("..")).toHaveCSS("opacity", "1");
  const card = page.locator(".hero-card").first();
  await expect(card).toHaveClass(/is-revealed/);
  await expect(card.locator(".hero-card__inner")).toHaveCSS("animation-iteration-count", "1");
  await page.locator("#features").scrollIntoViewIfNeeded();
  await expect(page.locator(".feature-card").first()).not.toHaveClass(/reveal-pending/);
  await page.locator("#home").scrollIntoViewIfNeeded();
  await page.locator("#features").scrollIntoViewIfNeeded();
  await expect(page.locator(".feature-card").first()).toHaveClass(/is-revealed/);
});

test("disables nonessential motion for reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#main-title")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero-card__inner").first()).toHaveCSS("animation-name", "none");
  await page.locator("#settings-tab").click();
  await expect(page.locator("#settings-panel")).toHaveCSS("animation-name", "none");
});

test("keeps the content and image links available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".hero-doctor")).toBeVisible();
  for (const screen of ["dashboard", "appointments", "consultation-types", "settings"]) {
    await expect(page.locator(`#${screen}-panel`)).toBeVisible();
    await expect(page.locator(`#${screen}-panel [data-zoom]`)).toHaveAttribute("href", `/img/${screen}.png`);
  }
  await context.close();
});
