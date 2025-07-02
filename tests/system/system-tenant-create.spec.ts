import { test, expect } from "@playwright/test";

test("System user - can create tenant", async ({ page }) => {
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

  await page.getByRole("link", { name: " Tenant" }).click();
  await page.getByRole("link", { name: "Add New" }).click();
  await page.getByRole("textbox", { name: "Enter Client Name" }).click();
  await page.getByRole("textbox", { name: "Enter Client Name" }).fill("IT Tenant 1");
  await page.getByRole("textbox", { name: "Enter Client Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Enter Street Name" }).fill("Mays Lane");
  await page.getByRole("textbox", { name: "Enter Street Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Enter City Name" }).fill("Barnet");
  await page.getByRole("textbox", { name: "Enter City Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Enter Country Name" }).fill("UK");
  await page.getByRole("textbox", { name: "Enter Country Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Enter Postcode Name" }).fill("EN5 3RL");
  await page.getByRole("textbox", { name: "Enter Postcode Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("tenant1@kpys.co.uk");
  await page.getByRole("textbox", { name: "Email" }).press("Tab");
  await page.getByRole("textbox", { name: "Phone" }).fill("1213545452");
  await page.getByRole("textbox", { name: "Phone" }).press("Tab");
  await page.getByRole("list").nth(1).click();
  await page.getByRole("option", { name: "TrackHub" }).click();
  await page.getByRole("list").filter({ hasText: /^$/ }).click();
  await page.getByRole("option", { name: "System Admin" }).click();
  await page.getByRole("list").filter({ hasText: "×TrackHub" }).getByRole("searchbox").click();
  await page.getByRole("option", { name: "System" }).click();
  await page.getByRole("list").filter({ hasText: "×System Admin" }).click();
  await page.getByRole("option", { name: "Track Hub" }).click();
  await page.getByRole("textbox", { name: "Start Date" }).click();
  await page.getByRole("cell", { name: "2", exact: true }).first().click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.locator("h2")).toContainText("Done");
  await expect(page.locator("#kt_body")).toContainText("Your tenant has been added successfully....!!!");
  await page.getByRole("button", { name: "OK" }).click();
  await expect(page.locator("h5")).toContainText("Tenant Details");
  await expect(page.locator("tbody")).toContainText("tenant1@kpys.co.uk");
  await expect(page.locator("tbody")).toContainText("02-07-2025");
  await page.getByRole("link", { name: " Role & Permission" }).click();
  await page.getByRole("link", { name: " System Users" }).click();
});
