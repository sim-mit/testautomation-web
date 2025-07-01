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

    test("verify nav bar elements", async () => {
        await expect(home.homeBtn).toHaveText("Home");
        await expect(home.productsBtn).toHaveText("Products");
        await expect(home.contactBtn).toHaveText("Contact");
    })

    test("verify user circle element on nav bar - visible and interactable", async () => {
        await expect(home.userIcon).toBeVisible();
        await home.userIcon.click();
        await expect(home.logoutMenu).toBeVisible();
        await home.userIcon.click();
        await expect(home.logoutMenu).not.toBeVisible();
    })

    test("verify logout functionality", async () => {
        await home.logout();
        await expect(login.emailInputField).toBeVisible();
    })
})

test.describe("page content", async () => {
    let base;
    let home;
    let login;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
        await login.fillCredentials(users[0].email, users[0].password);
        await login.clickLogin();
    })

    test("verify logo visibility", async () => {
        await expect(home.logo).toBeVisible();
    })

    test("verify page heading - home tab", async () => {
        await expect(home.heading).toHaveText("Welcome to Test Bank");
    })

    test("verify text structure - home tab", async () => {
        await expect(home.pageContent).toBeVisible();

        const paragraphs = await home.pageContent.locator('p');
        const paragraphNumber = await paragraphs.count();
        expect(paragraphNumber).toEqual(2);
    })

    test("verify page text - home tab", async ({page}) => {
        const firstParagraph = await page.locator("div#content-container > p:nth-child(2)");
        const secondParagraph = await page.locator("div#content-container > p:nth-child(3)");

        await expect(firstParagraph).toHaveText("This is a demo single-page application for portfolio and test automation.")
        await expect(secondParagraph).toHaveText("Features: Login, content switching, Playwright-friendly selectors, modern design.")
    })

    test("verify page heading - products tab", async () => {
        await home.productsBtn.click();
        await expect(home.heading).toHaveText("Products");
    })

    test ("verify page text - products tab", async ({page}) => {
        await home.productsBtn.click();

        const firstBulletPoint = await page.locator("#content-container > ul > li:nth-child(1)");
        const secondBulletPoint = await page.locator("#content-container > ul > li:nth-child(2)");
        const thirdBulletPoint = await page.locator("#content-container > ul > li:nth-child(3)");
        const fourthBulletPoint = await page.locator("#content-container > ul > li:nth-child(4)");

        await expect(firstBulletPoint).toHaveText("Checking Accounts");
        await expect(secondBulletPoint).toHaveText("Savings");
        await expect(thirdBulletPoint).toHaveText("Demo Credit Cards");
        await expect(fourthBulletPoint).toHaveText("Test Loans");
    })

    test("verify page heading - contact tab", async () => {
        await home.contactBtn.click();
        await expect(home.heading).toHaveText("Contact Us");
    })

    test("verify 'Contact us' message input field", async ({page}) => {
        await home.contactBtn.click();
        const msgInputField = page.locator("textarea#msg");
        await expect(msgInputField).toBeVisible();
        await msgInputField.fill("Hello world!");
    })

    test("verify footer visibility", async () => {
        await expect(base.footerText).toBeVisible();
    })
})
