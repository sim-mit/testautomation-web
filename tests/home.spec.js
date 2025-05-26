import test, { expect } from "playwright/test";
import { BasePage } from "./models/BasePage";
import { HomePage } from "./models/HomePage";
import { LoginPage } from "./models/LoginPage";
import { users } from "./test-data/users";

test.describe("nav bar", async () => {
    let base;
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
        await login.fillCredentials(users[0].email, users[0].password);
        await login.clickLogin();
    })

    test("verify nav bar is visible", async () => {
        await expect(home.navBar).toBeVisible();
    })

    test("verify nav bar elements", async ({ page }) => {
        const homeIcon = await page.locator("div.home i");
        const homeText = await page.locator("div.home").textContent();
        const productsIcon = await page.locator("div.products i");
        const productsText = await page.locator("div.products").textContent();
        const contactIcon = await page.locator("div.contact i");
        const contactText = await page.locator("div.contact").textContent();

        expect(homeIcon).toHaveClass(/fa-home/);
        expect(homeText.trim()).toEqual("Home");
        expect(productsIcon).toHaveClass(/fa-tag/);
        expect(productsText.trim()).toEqual("Products");
        expect(contactIcon).toHaveClass(/fa-envelope/);
        expect(contactText.trim()).toEqual("Contact");
    })

})