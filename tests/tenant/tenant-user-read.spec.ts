import { test, expect } from "@playwright/test";

test("tenant - can see only own users]", async ({ page }) => {
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

  await expect(page.getByRole("list")).toContainText("Role & Permission");
  await page.getByRole("link", { name: " Role & Permission" }).click();
  await expect(page.locator("h5")).toContainText("Role & Permission Details");
  await expect(page.locator("#kt_subheader")).toContainText("Add New");
  await page.getByRole("link", { name: "Add New" }).click();
  await expect(page.locator("legend")).toContainText("Permission Info");
  await page.getByRole("textbox", { name: "Enter Permission Name" }).click();
  await page.getByRole("textbox", { name: "Enter Permission Name" }).fill("Branch Mnager");
  await page.getByRole("textbox", { name: "Enter Permission Name" }).press("Tab");
  await page.getByRole("option", { name: "TrackHub" }).click();
  await expect(page.locator("#permission-table-body")).toContainText("Branch");
  await page.getByRole("row", { name: "Branch" }).getByRole("checkbox").first().check();
  await page.getByRole("row", { name: "Branch" }).getByRole("cell").nth(2).click();
  await page.getByRole("row", { name: "Branch" }).getByRole("checkbox").nth(2).check();
  await page.getByRole("row", { name: "Branch" }).getByRole("checkbox").nth(3).check();
  await expect(page.locator("#permission-table-body")).toContainText("Customer");
  await page.getByRole("row", { name: "Customer" }).getByRole("checkbox").first().check();
  await page.getByRole("row", { name: "Customer" }).getByRole("checkbox").nth(1).check();
  await page.getByRole("row", { name: "Customer" }).getByRole("checkbox").nth(2).check();
  await page.getByRole("row", { name: "Customer" }).getByRole("checkbox").nth(3).check();
  await page.getByText("Status").click();
  await expect(page.locator("#signupForm")).toContainText("Status");
  await page.locator(".radio > span").first().click();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.locator("h2")).toContainText("Done");
  await expect(page.locator("#kt_body")).toContainText("Your role & permission has been added successfully....!!!");
  await page.getByRole("button", { name: "OK" }).click();
  //await expect(page.locator("tbody")).toContainText("System Admin");
});
