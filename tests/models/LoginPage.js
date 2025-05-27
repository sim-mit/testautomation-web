/**
 * LoginPage model for the home page of the application.
 */
export class LoginPage {

  constructor(page) {
    this.page = page;
    this.heading = page.locator('section#login > h1')
    this.emailInputField = page.locator("input#email")
    this.passwordInputField = page.locator("input#password");
    this.loginButton = page.locator("input#login");
    this.userIcon = page.locator("section#user");
    this.background = page.locator("section#login");
  }

  /**
   * Function for inputing email address and password in the input fields.
   * @param {string} email 
   * @param {string} password 
   */
  async fillCredentials(email, password) {
    await this.emailInputField.fill(email);
    await this.passwordInputField.fill(password);
  }

  /**
   * Function for clicking on the login button.
   */
  async clickLogin() {
    await this.loginButton.click();
  }
}