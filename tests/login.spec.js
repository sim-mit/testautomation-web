import test, { expect } from "playwright/test";
import { users } from "./test-data/users";
import { BasePage } from "./models/BasePage";
import { LoginPage } from "./models/LoginPage";
import { HomePage } from "./models/HomePage";

test('verify heading content', async ({ page }) => {
    const base = new BasePage(page);
    const login = new LoginPage(page);
    const headingTextContent = await login.heading.textContent();

    await base.goto();
    expect(login.heading).toBeVisible();
    expect(headingTextContent).toEqual("Automation doesn't stop at testing, it's just a beginning!");
})


test.describe("valid logins", () => {
    users.forEach((user) => {
        test("verify login with valid credentials " + user.email, async ({ page }) => {
            const base = new BasePage(page);
            const login = new LoginPage(page);
            const home = new HomePage(page);

            await base.goto();
            await login.fillCredentials(user.email, user.password);
            await login.clickLogin();
            expect(home.userIcon).toBeVisible();
        })
    })
})