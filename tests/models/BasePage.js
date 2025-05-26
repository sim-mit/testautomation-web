import { expect } from '@playwright/test';

export class BasePage {

    constructor(page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto("/");
    }

}