import { test, expect } from "@playwright/test";

test("tenant user - can login ", async ({ page }) => {
  const username = process.env.TENANT1_USERNAME;
  if (!username) {
    throw new Error("TENANT1_USERNAME environment variable is not set");
  }
  const password = process.env.TENANT1_PASSWORD;
  if (!password) {
    throw new Error("TENANT1_PASSWORD environment variable is not set");
  }

  await page.goto(process.env.BASE_URL || "https://google.com");
  await page.getByRole("textbox", { name: "Username" }).click();

  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("textbox", { name: "Username" }).fill(username);

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("strong")).toContainText("TrackHub Dashboard");
  await expect(page.getByRole("list")).toContainText("Branch");
  await expect(page.getByRole("list")).toContainText("Customer");
  await expect(page.getByRole("list")).toContainText("Role & Permission");
  await expect(page.getByRole("list")).toContainText("System Users");
});
