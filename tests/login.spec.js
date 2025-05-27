import test, { expect } from "playwright/test";
import { users } from "./test-data/users";
import { BasePage } from "./models/BasePage";
import { LoginPage } from "./models/LoginPage";
import { HomePage } from "./models/HomePage";

test.describe("login page content", () => {
    let base;
    let login;
    
    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        await base.goto();
    })

    test('verify heading content', async () => {
        const headingTextContent = await login.heading.textContent();

        await expect(login.heading).toBeVisible();
        expect(headingTextContent).toEqual("Automation doesn't stop at testing, it's just a beginning!");
    })

    test("verify login form", async () => {
        await expect(login.emailInputField).toBeVisible();
        await expect(login.passwordInputField).toBeVisible();
        await expect(login.loginButton).toBeVisible();
    })

    test("verify footer visibility", async () => {
        await expect(base.footerText).toBeVisible();
    })

    test("verify background", async () => {
        const regex = /\/img\/bg1\.jpg/;

        await expect(login.background).toHaveCSS("background", regex);
    })
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
            await expect(home.userIcon).toBeVisible();
        })
    })
})

test.describe("invalid credentials", () => {
    let base;
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
    })

    test("verify login with valid username and invalid password", async () => {
        await login.fillCredentials(users[0].email, "1234");
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify login with invalid username and valid password", async () => {
        await login.fillCredentials("admin@admin.co", users[0].password);
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify login with non-existent user", async () => {
        await login.fillCredentials("admin1@admin.com", "1234");
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })
})

test.describe("edge cases", () => {
    let base;
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
    })

    test("verify login with empty email and password fields", async () => {
        await expect(login.emailInputField).toBeEmpty();
        await expect(login.passwordInputField).toBeEmpty();
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify login with case sensitive username and password", async () => {
        test.fixme(true, "case sensitivity not implemented");
        await login.fillCredentials("Biancunha@gmail.com", users[1].password);
        await login.clickLogin();
        await expect(home.userIcon).toBeVisible();
    })

    test("verify login with special characters and empty spaces", async () => {
        await login.fillCredentials("adm!n@admin.com ", "123#");
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify SQL injections in login form are not accepted", async () => {
        await login.fillCredentials("\" or \"\"=\"", "\" or \"\"=\"");
        await login.clickLogin();
        await expect(home.userIcon).not.toBeVisible();
    })
})
