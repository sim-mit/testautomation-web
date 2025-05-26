import { expect } from '@playwright/test';

export class HomePage {

  constructor(page) {
    this.page = page;
    this.userIcon = page.locator("section#user");
    this.navBar = page.locator("nav#navigation");
  }
}