import { expect } from '@playwright/test';

export class BasePage {

    constructor(page) {
        this.page = page;
        this.footerText = page.locator("//p[text()='Thank you for participating!']");
    }

    async goto() {
        await this.page.goto("/");
    }
}