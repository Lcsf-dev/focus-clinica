import { test, expect } from "./fixtures.js";

const screens = ["dashboard", "appointments", "consultation-types", "settings"];

test.beforeEach(async ({ page }) => { await page.goto("/"); });

test("selects the overview and keeps the other panels hidden", async ({ page }) => {
  await expect(page.locator(".tabs")).toBeVisible();
  await expect(page.getByRole("tab")).toHaveCount(4);
  for (const screen of screens) {
    const selected = screen === "dashboard";
    await expect(page.locator(`#${screen}-tab`)).toHaveAttribute("aria-selected", String(selected));
    await expect(page.locator(`#${screen}-panel`)).toBeVisible({ visible: selected });
  }
});

test("switches to each screenshot on click", async ({ page }) => {
  for (const screen of screens) {
    await page.locator(`#${screen}-tab`).click();
    await expect(page.locator(`#${screen}-tab`)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(`#${screen}-panel`)).toBeVisible();
    await expect(page.locator(`#${screen}-panel [data-zoom]`)).toHaveAttribute("href", `/img/${screen}.png`);
    await expect(page.locator('[role="tabpanel"]:visible')).toHaveCount(1);
  }
});

test("supports arrows, wraparound, Home and End", async ({ page }) => {
  await page.locator("#dashboard-tab").focus();
  for (const screen of screens.slice(1).concat("dashboard")) {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator(`#${screen}-tab`)).toBeFocused();
    await expect(page.locator(`#${screen}-tab`)).toHaveAttribute("aria-selected", "true");
  }
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#settings-tab")).toBeFocused();
  await page.keyboard.press("Home");
  await expect(page.locator("#dashboard-tab")).toBeFocused();
  await page.keyboard.press("End");
  await expect(page.locator("#settings-tab")).toBeFocused();
});

test("feature links reveal and focus the corresponding panel", async ({ page }) => {
  for (const link of await page.locator("[data-demo-target]").all()) {
    const screen = (await link.getAttribute("data-demo-target")).replace(/-tab$/, "");
    await link.click();
    await expect(page.locator(`#${screen}-tab`)).toHaveAttribute("aria-selected", "true");
    await expect(page.locator(`#${screen}-panel`)).toBeFocused();
    await expect(page).toHaveURL(new RegExp(`#${screen}-panel$`));
  }
});

test("opens a linked panel directly", async ({ page }) => {
  await page.goto("/#settings-panel");
  await expect(page.locator("#settings-panel")).toBeVisible();
  await expect(page.locator("#settings-tab")).toHaveAttribute("aria-selected", "true");
});
