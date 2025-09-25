import { test, expect } from "@playwright/test";

const users: string[] = process.env.USERS?.split(",") || [];
const branches: string[] = process.env.BRANCHES?.split(",") || [];

test("tenant - create user for branch " + branches[0], async ({ page }) => {
  const username = process.env.TENANT1_USERNAME;
  if (!username) {
    throw new Error("TENANT1_USERNAME environment variable is not set");
  }
  const password = process.env.TENANT1_PASSWORD;
  if (!password) {
    throw new Error("TENANT1_PASSWORD environment variable is not set");
  }
  const branch_manager_role = process.env.BRANCH_MANAGER_ROLE;
  if (!branch_manager_role) {
    throw new Error("BRANCH_MANAGER_ROLE environment variable is not set");
  }


  await page.goto(process.env.BASE_URL || "https://google.com");
  await page.getByRole("textbox", { name: "Username" }).click();

  await page.getByRole("textbox", { name: "Password" }).fill(password);
  await page.getByRole("textbox", { name: "Username" }).fill(username);

  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByRole("strong")).toContainText("Dashboard");

  for (let index = 0; index < users.length; index++) {
    await page.getByRole("link", { name: " System Users" }).click();
    await page.getByRole("link", { name: "Add New" }).click();

    await page.getByRole("textbox", { name: "Enter Name" }).click();
    await page.getByRole("textbox", { name: "Enter Name" }).fill(users[index]);

    await page.getByRole("list").nth(1).click();
    await page.getByRole("option", { name: "TrackHub" }).click();

    await page.getByRole("list").nth(2).click();
    await page.getByRole("option", { name: branches[0] }).click();

    await page.getByRole("list").nth(3).click();
    await page.getByRole("option", { name: branch_manager_role }).click();

    await page.getByRole("textbox", { name: "Email" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill("gujju2@kpys.co.uk");
    await page.getByRole("textbox", { name: "Email" }).press("Tab");
    await page.getByRole("textbox", { name: "Enter Password" }).fill("1234");
    await page.locator(".radio > span").first().click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.locator("h2")).toContainText("Done");
    await expect(page.locator("#kt_body")).toContainText("Your user has been added successfully....!!!");
    await expect(page.locator("#kt_body")).toContainText("OK");
    await page.getByRole("button", { name: "OK" }).click();
  }
});
