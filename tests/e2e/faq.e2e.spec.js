import { test, expect } from "./fixtures.js";

test("opens and closes every answer with the keyboard", async ({ page }) => {
  await page.goto("/");
  const questions = page.locator("#faq details");
  await expect(questions).toHaveCount(4);
  for (const question of await questions.all()) {
    await question.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(question.locator("p")).toBeVisible();
    await page.keyboard.press("Space");
    await expect(question.locator("p")).toBeHidden();
  }
});

test("accepts repeated toggles while an answer is transitioning", async ({ page }) => {
  await page.goto("/");
  const question = page.locator("#faq details").first();
  await question.locator("summary").focus();
  for (let attempt = 0; attempt < 3; attempt++) {
    await page.keyboard.press("Enter");
    await expect(question).toHaveJSProperty("open", true);
    await page.keyboard.press("Enter");
    await expect(question).toHaveJSProperty("open", false);
  }
  await expect(question.locator("p")).toBeHidden();
  await expect(question.locator("summary")).toBeFocused();
});

test("uses consistent access and demonstration destinations", async ({ page }) => {
  await page.goto("/");
  for (const link of await page.getByRole("link", { name: "Acessar sistema", exact: false }).all()) {
    await expect(link).toHaveAttribute("href", "https://focus-clinica.netlify.app/");
    await expect(link).toHaveAttribute("target", "_blank");
  }
  for (const link of await page.getByRole("link", { name: "Ver demonstração", exact: false }).all()) {
    await expect(link).toHaveAttribute("href", "#demo");
  }
});
