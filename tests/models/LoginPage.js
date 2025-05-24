import { expect } from '@playwright/test';

export class LoginPage {

  constructor(page) {
    this.page = page;
    this.heading = page.locator('section#login > h1')
    this.emailInputField = page.locator("input#email")
    this.passwordInputField = page.locator("input#password");
    this.loginButton = page.locator("input#login");
    this.userIcon = page.locator("section#user");
  }

  async fillCredentials(email, password) {
    await this.emailInputField.fill(email);
    await this.passwordInputField.fill(password);
  }

  async clickLogin(){
    await this.loginButton.click();
  }
}