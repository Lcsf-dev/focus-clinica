import { test, expect } from "./fixtures.js";

const VIEWPORTS = [
  { width: 360, columns: 1 },
  { width: 390, columns: 1 },
  { width: 768, columns: 2 },
  { width: 1440, columns: 12 },
];

for (const { width, columns } of VIEWPORTS) {
  test(`fits the viewport at ${width}px without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.screenshot({ path: `tmp/showcase-${width}.png` });

    const overflow = await page.evaluate(
      () =>
        Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth,
        ) - document.documentElement.clientWidth,
    );

    expect(overflow).toBeLessThanOrEqual(1);

    const gridColumns = await page
      .locator(".feature-grid")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns
            .split(" ")
            .filter(Boolean).length,
      );

    expect(gridColumns).toBe(columns);

    const headerHeight = await page.locator(".header").evaluate((element) => element.getBoundingClientRect().height);
    expect(headerHeight).toBeLessThanOrEqual(85);

    for (const screen of ["dashboard", "appointments", "consultation-types", "settings"]) {
      await page.locator(`#${screen}-tab`).click();
      const image = page.locator(`#${screen}-panel img`);
      await expect(image).toBeVisible();
      await expect(image).toHaveJSProperty("complete", true);
      expect(await image.evaluate((element) => element.naturalWidth)).toBeGreaterThan(0);
      const currentSource = await image.evaluate((element) => element.currentSrc);
      expect(currentSource).toContain(width <= 540 ? `${screen}-preview.png` : `${screen}-showcase.webp`);
    }
    await page.locator("#demo").scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/showcase-demo-${width}.png` });
    if (width === 390 || width === 1440) {
      for (const section of ["features", "benefits", "faq"]) {
        await page.locator(`#${section}`).screenshot({ path: `tmp/showcase-${section}-${width}.png` });
      }
      await page.locator(".footer").screenshot({ path: `tmp/showcase-footer-${width}.png` });
    }
  });
}
