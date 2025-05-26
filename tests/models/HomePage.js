import { expect } from '@playwright/test';

export class HomePage {

  constructor(page) {
    this.page = page;
    this.userIcon = page.locator("section#user");
    this.navBar = page.locator("nav#navigation");
    this.logoutMenu = page.locator("div#logout");
    this.pageContent = page.locator("section#content");
    this.background = page.locator("section#content");
  }

  async logout() {
    await this.userIcon.click();
    await this.logoutMenu.click();
  }
}