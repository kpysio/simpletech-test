import { test, expect } from "@playwright/test";

test("system user - can login", async ({ page }) => {
  const username = process.env.SUPER_USERNAME;
  if (!username) {
    throw new Error("SUPER_USERNAME environment variable is not set");
  }
  const password = process.env.SUPER_PASSWORD;
  if (!password) {
    throw new Error("SUPER_ PASSWORD environment variable is not set");
  }

  await page.goto(process.env.BASE_URL || "https://google.com");
  await page.getByRole("textbox", { name: "Username" }).click();

  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("textbox", { name: "Username" }).fill(username);

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("strong")).toContainText("System Admin Dashboard");
  await expect(page.getByRole("list")).toContainText("Tenant");
  await expect(page.getByRole("list")).toContainText("Role & Permission");
  await expect(page.getByRole("list")).toContainText("System Users");
});
