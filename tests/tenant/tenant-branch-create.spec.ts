import { test, expect } from "@playwright/test";
const branches = process.env.BRANCHES?.split(",") || [];

test("tanant - create branch", async ({ page }) => {

  
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
  await expect(page.getByRole("strong")).toContainText("Dashboard");

  for (let index = 0; index < branches.length; index++) {
    console.log("Creating branch: " + branches[index]);
    await expect(page.getByRole("list")).toContainText("Branch");
    await page.getByRole("link", { name: " Branch" }).click();
    await expect(page.locator("#kt_subheader")).toContainText("Add New");
    await expect(page.locator("h5")).toContainText("Branch Details");

    await page.getByRole("link", { name: "Add New" }).click();
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("textbox", { name: "Enter Branch Name" }).click();
    await page.getByRole("textbox", { name: "Enter Branch Name" }).fill(branches[index] + " Branch");
    await page.getByRole("textbox", { name: "Enter Branch Name" }).press("Tab");

    await page.getByRole("textbox", { name: "Enter Street Name" }).fill("Bandra");
    await page.getByRole("textbox", { name: "Enter Street Name" }).press("Tab");

    await page.getByRole("textbox", { name: "Enter City Name" }).fill(branches[0]);
    await page.getByRole("textbox", { name: "Enter City Name" }).press("Tab");

    await page.getByRole("textbox", { name: "Enter Country Name" }).fill("India");
    await page.getByRole("textbox", { name: "Enter Country Name" }).press("Tab");

    await page.getByRole("textbox", { name: "Enter Postcode Name" }).fill("567866");
    await page.getByRole("textbox", { name: "Enter Postcode Name" }).press("Tab");

    await page.getByRole("textbox", { name: "Email" }).fill("mumbai@tech.co.uk");
    await page.getByRole("textbox", { name: "Email" }).press("Tab");

    await page.getByRole("textbox", { name: "Phone" }).fill("1321545454");
    await page.locator(".radio > span").first().click();
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.locator("h2")).toContainText("Done");
    await expect(page.locator("#kt_body")).toContainText("Your branch has been added successfully....!!!");
    await page.getByRole("button", { name: "OK" }).click();
    await page.waitForLoadState("domcontentloaded");
  }
});
