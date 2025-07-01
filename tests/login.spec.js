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
        expect(headingTextContent).toEqual("Welcome to Test Bank");
    })

    test("verify login form", async () => {
        await expect(login.emailInputField).toBeVisible();
        await expect(login.passwordInputField).toBeVisible();
        await expect(login.loginButton).toBeVisible();
    })

    test("verify footer visibility", async () => {
        await expect(base.footerText).toBeVisible();
    })
})

test.describe("valid logins", () => {
    // Loops through the test users array, and attempts to log in with each one
    users.forEach((user) => {
        test("verify login with valid credentials " + user.email, async ({ page }) => {
            const base = new BasePage(page);
            const login = new LoginPage(page);
            const home = new HomePage(page);

            await base.goto();
            await login.fillCredentials(user.email, user.password);
            await login.clickLogin();
            await expect(home.userIcon).toBeVisible();
            await expect(login.userIcon).toContain.email;
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
        await expect(login.errorMessage).toHaveText("Incorrect email or password.");
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify login with invalid username and valid password", async () => {
        await login.fillCredentials("admin@demo.co", users[0].password);
        await login.clickLogin();
        await expect(login.errorMessage).toHaveText("Incorrect email or password.");
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify login with non-existent user", async () => {
        await login.fillCredentials("admin1@admin.com", "1234");
        await login.clickLogin();
        await expect(login.errorMessage).toHaveText("Incorrect email or password.");
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
        await expect(login.errorMessage).toHaveText("Please fill in both fields.");
        await expect(home.userIcon).not.toBeVisible();
    })

    // Emails are usually not case sensitive. This needs to be fixed.
    test("verify login with case sensitive username and password", async () => {
        test.fixme(true, "case sensitivity not implemented");
        await login.fillCredentials("Testuser@test.com", users[1].password);
        await login.clickLogin();
        await expect(home.userIcon).toBeVisible();
    })

    // Invalid special characters and empty spaces should not be accepted in the email field.
    // The input field should have a validation for invalid email addresses.
    test("verify login with special characters and empty spaces", async () => {
        await login.fillCredentials("adm!n@admin.com ", "1234");
        await login.clickLogin();
        await expect(login.errorMessage).toHaveText("Incorrect email or password.");
        await expect(home.userIcon).not.toBeVisible();
    })

    test("verify SQL injections in login form are not accepted", async () => {
        await login.fillCredentials("\" or \"\"=\"", "\" or \"\"=\"");
        await login.clickLogin();
        await expect(login.errorMessage).toHaveText("Incorrect email or password.");
        await expect(home.userIcon).not.toBeVisible();
    })
})
