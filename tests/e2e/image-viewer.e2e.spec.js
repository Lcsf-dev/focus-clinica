import { test, expect } from "./fixtures.js";

const dashboardZoom = (page) =>
  page.locator('#dashboard-panel [data-zoom]');

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("opens the dialog with the selected screenshot", async ({ page }) => {
  await dashboardZoom(page).click();

  await expect(page.locator("#image-dialog")).toBeVisible();
  await expect(page.locator("#expanded-image")).toHaveAttribute(
    "src",
    /dashboard\.png$/,
  );
  await expect(page.locator("#expanded-image")).toHaveAttribute(
    "alt",
    /Visão geral/,
  );
});

test("closes with the close button", async ({ page }) => {
  await dashboardZoom(page).click();
  await page.locator("#close-image").click();

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("closes with Escape", async ({ page }) => {
  await dashboardZoom(page).click();
  await page.keyboard.press("Escape");

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("closes when clicking the backdrop", async ({ page }) => {
  await dashboardZoom(page).click();
  await page.mouse.click(5, 5);

  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("returns focus to the link after closing", async ({ page }) => {
  const link = dashboardZoom(page);

  await link.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#image-dialog")).toBeVisible();

  await page.locator("#close-image").click();

  await expect(page.locator("#image-dialog")).toBeHidden();
  await expect(link).toBeFocused();
});

test("keeps native navigation for modified clicks", async ({ page }) => {
  const prevented = await dashboardZoom(page).evaluate((element) => {
    const event = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      ctrlKey: true,
    });

    return !element.dispatchEvent(event);
  });

  expect(prevented).toBe(false);
  await expect(page.locator("#image-dialog")).toBeHidden();
});

test("opens all complete originals and restores focus on Escape", async ({ page }) => {
  for (const screen of ["dashboard", "appointments", "consultation-types", "settings"]) {
    await page.locator(`#${screen}-tab`).click();
    const link = page.locator(`#${screen}-panel [data-zoom]`);
    await link.click();
    await expect(page.locator("#expanded-image")).toHaveAttribute("src", new RegExp(`/img/${screen}\\.png$`));
    await page.keyboard.press("Escape");
    await expect(page.locator("#image-dialog")).toBeHidden();
    await expect(link).toBeFocused();
  }
});

test("makes the full image readable at original size on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await dashboardZoom(page).click();
  const button = page.locator("#toggle-image-size");
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#expanded-image")).toHaveJSProperty("complete", true);
  const dimensions = await page.locator("#image-viewport").evaluate((element) => ({
    visible: element.clientWidth,
    content: element.scrollWidth,
    image: element.querySelector("img").getBoundingClientRect().width,
    original: element.querySelector("img").naturalWidth,
  }));
  expect(dimensions.content).toBeGreaterThan(dimensions.visible);
  expect(dimensions.image).toBe(dimensions.original);
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Escape");
  await dashboardZoom(page).click();
  await expect(button).toHaveAttribute("aria-pressed", "false");
});
