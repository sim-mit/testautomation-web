/**
 * HomePage model for the home page of the application.
 */
export class HomePage {

  constructor(page) {
    this.page = page;
    this.userIcon = page.locator("section#user");
    this.navBar = page.locator("nav#navigation");
    this.logoutMenu = page.locator("div#logout");
    this.pageContent = page.locator("section#content");
    this.background = page.locator("section#content");
  }

  /**
   * Function for user log out.
   * This function simulates clicking on the circle user icon and clicking on 'sign out'.
   */
  async logout() {
    await this.userIcon.click();
    await this.logoutMenu.click();
  }
}