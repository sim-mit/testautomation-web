/**
 * BasePage class for shared functionality.
 */
export class BasePage {

    constructor(page) {
        this.page = page;
        this.footerText = page.locator("//p[text()='Thank you for participating!']");
    }

    /**
     * Function for navigating to the base page.
     */
    async goto() {
        await this.page.goto("/");
    }
}