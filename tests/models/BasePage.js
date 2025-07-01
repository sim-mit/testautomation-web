/**
 * BasePage class for shared functionality.
 */
export class BasePage {

    constructor(page) {
        this.page = page;
        this.footerText = page.locator("//p[text()='Demo project for test automation. No real accounts. © 2025 Test Bank']");
    }

    /**
     * Function for navigating to the base page.
     */
    async goto() {
        await this.page.goto("/");
    }
}