import { test as base, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/loginPage";



type myFixure = {
    homePage: HomePage;
    loginPage: LoginPage
}

export const test = base.extend<myFixure>({

    homePage: async ({ page, baseURL }, use, testInfo) => {
        const loginPage = new LoginPage(page)
        loginPage.goToLoginPage(baseURL)

        const username = testInfo.project.metadata.appUserName
        const password = testInfo.project.metadata.appPassword

        const homePage = await loginPage.doLogin(username, password);
        expect(await homePage.verifyUserLoggedIn()).toBeTruthy();

        await use(homePage)
    },

     loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page)
        await use(loginPage);
    }
})

export { expect }
