import test, { expect } from "playwright/test";
import { BasePage } from "./models/BasePage";
import { HomePage } from "./models/HomePage";
import { LoginPage } from "./models/LoginPage";
import { users } from "./test-data/users";

test.describe("nav bar", async () => {
    let base;
    let login;
    let home;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
        await login.fillCredentials(users[0].email, users[0].password);
        await login.clickLogin();
    })

    test("verify nav bar is visible", async () => {
        await expect(home.navBar).toBeVisible();
    })

    test("verify nav bar elements", async ({ page }) => {
        const homeIcon = await page.locator("div.home i");
        const homeText = await page.locator("div.home").textContent();
        const productsIcon = await page.locator("div.products i");
        const productsText = await page.locator("div.products").textContent();
        const contactIcon = await page.locator("div.contact i");
        const contactText = await page.locator("div.contact").textContent();

        await expect(homeIcon).toHaveClass(/fa-home/);
        await expect(homeText.trim()).toEqual("Home");
        await expect(productsIcon).toHaveClass(/fa-tag/);
        await expect(productsText.trim()).toEqual("Products");
        await expect(contactIcon).toHaveClass(/fa-envelope/);
        await expect(contactText.trim()).toEqual("Contact");
    })

    test("verify user circle element on nav bar - visible and interactable", async () => {
        await expect(home.userIcon).toBeVisible();

        await home.userIcon.click();
        await expect(home.logoutMenu).toBeVisible();
        await home.userIcon.click();
        await expect(home.logoutMenu).not.toBeVisible();
    })

    test("verify logout functionality", async () => {
        await home.logout();
        await expect(login.emailInputField).toBeVisible();
    })
})

test.describe("page content", async () => {
    let base;
    let home;
    let login;

    test.beforeEach(async ({ page }) => {
        base = new BasePage(page);
        login = new LoginPage(page);
        home = new HomePage(page);
        await base.goto();
        await login.fillCredentials(users[0].email, users[0].password);
        await login.clickLogin();
    })

    test("verify text structure", async () => {
        await expect(home.pageContent).toBeVisible();

        const paragraphs = await home.pageContent.locator('p');
        const paragraphNumber = await paragraphs.count();
        expect(paragraphNumber).toEqual(3);
    })

    test("verify page text", async () => {
        const paragraphs = await home.pageContent.locator('p');
        const paragraphContents = await paragraphs.allTextContents();

        const firstParagraph = `
                    Lorem ipsum egestas posuere vivamus neque facilisis augue cursus litora rhoncus aenean aptent eu quis, odio scelerisque curabitur rhoncus sociosqu velit curae ipsum duis porttitor rhoncus amet. 
                    consectetur nostra massa molestie sed imperdiet nulla mauris in cras mauris lobortis feugiat, quis sem sagittis tortor diam vehicula habitant primis ultricies platea et. 
                    amet aliquet nisi proin volutpat sapien eget, tincidunt nisl neque habitant tellus, mi commodo congue habitasse est. 
                    etiam imperdiet quisque sociosqu vivamus ut libero nibh fames, nullam eleifend adipiscing iaculis faucibus nulla dolor varius, curae sollicitudin habitant aliquet nam quis neque. 
                `;
        const secondParagraph = `
                    Tempus ultrices euismod eros libero posuere aliquam dui dictum hac integer, orci pretium aptent pellentesque aenean conubia vulputate orci rutrum neque phasellus, netus risus tellus nullam aenean tristique tempor donec nisl. 
                    habitant purus et luctus faucibus at pretium integer feugiat, felis pulvinar ut accumsan quisque fermentum non, curabitur purus egestas eu lobortis posuere feugiat. 
                    velit enim ultricies sollicitudin scelerisque sit vivamus nisi, tortor massa neque pretium cursus curabitur nullam dapibus, sem tristique elit adipiscing curabitur consequat. 
                    elit mi sagittis elit ad sociosqu erat vitae etiam curabitur platea, tincidunt pellentesque euismod quis feugiat sagittis vehicula rutrum inceptos, sociosqu donec imperdiet aenean eleifend auctor mauris arcu vestibulum. 
                `;

        const thirdParagraph = `
                    Mauris aptent nunc per sociosqu placerat nisi sociosqu accumsan fermentum, habitant lacus massa metus cras malesuada rhoncus ut, imperdiet et taciti malesuada mollis tincidunt etiam quis. 
                    est non laoreet dictum senectus fames velit nulla mi, nam ipsum scelerisque sodales tellus ligula enim leo proin, lectus sodales platea feugiat condimentum donec orci. 
                    nisi potenti cras curae sollicitudin fames semper at morbi magna aenean donec, sodales cursus justo phasellus consequat congue luctus leo proin. 
                    sagittis dapibus viverra maecenas porta gravida, fermentum quisque donec porttitor, sit posuere ullamcorper lacinia. 
                    ac odio et nulla nisi potenti aliquet tristique, ac netus accumsan quis tortor non arcu cubilia, ante nec varius pretium justo donec. 
                `;

        expect(paragraphContents[0]).toEqual(firstParagraph);
        expect(paragraphContents[1]).toEqual(secondParagraph);
        expect(paragraphContents[2]).toEqual(thirdParagraph);
    })

    test("verify footer visibility", async () => {
        await expect(base.footerText).toBeVisible();
    })

    test("verify background", async () => {
        // Using regex because the background css property has different values for different browsers
        const regex = /\/img\/bg2\.jpg/;

        await expect(home.background).toHaveCSS("background", regex);
    })
})
