import test, { expect } from "@playwright/test";
import { users } from "../test-data/users";
import { BasePage } from "../models/BasePage";
import { LoginPage } from "../models/LoginPage";
import { HomePage } from "../models/HomePage";

test("e2e: happy flow", async ({ page }) => {
    const base = new BasePage(page);
    const login = new LoginPage(page);
    const home = new HomePage(page);
    await base.goto();

    // logging in
    await login.fillCredentials(users[0].email, users[0].password);
    await login.clickLogin();

    // verify that the user is logged in
    await expect(home.userIcon).toBeVisible();

    // logging out
    await home.logout();
    
    // verify that the user is logged out
    await expect(login.emailInputField).toBeVisible();
})