import { Locator, Page } from "@playwright/test";
import { ElementUtils } from "../utils/ElementUtil";

export class RegisterPage {

    private readonly page: Page;
    private readonly elementUtils: ElementUtils;
    private readonly firstName: Locator
    private readonly lastName: Locator
    private readonly email: Locator
    private readonly telephone: Locator
    private readonly password: Locator
    private readonly confirmPassword: Locator
    private readonly subscribeRedioYes: Locator
    private readonly subscribeRedioNo: Locator
    private readonly privacyPolicychk: Locator
    private readonly btnContinue: Locator
    private readonly successMsg: Locator


    constructor(page: Page) {
        this.page = page;
        this.elementUtils = new ElementUtils(page)
        this.firstName = page.locator(`//input[@id="input-firstname"]`)
        this.lastName = page.locator(`//input[@id="input-lastname"]`)
        this.email = page.locator(`//input[@id="input-email"]`)
        this.telephone = page.locator(`//input[@id="input-telephone"]`)
        this.password = page.locator(`//input[@id="input-password"]`)
        this.confirmPassword = page.locator(`//input[@id="input-confirm"]`)
        this.subscribeRedioYes = page.getByRole("radio", { name: 'Yes' })
        this.subscribeRedioNo = page.getByRole("radio", { name: "No" })
        this.privacyPolicychk = page.locator(`//input[@name="agree"]`)
        this.btnContinue = page.getByRole("button", { name: "Continue" })
        this.successMsg = page.locator(`//p[text()="Congratulations! Your new account has been successfully created!"]`)
    }


    async registerUser(firstName: string, lastName: string, email: string,
        telephone: string, password: string, subscribeRedio: string): Promise<boolean> {
        await this.elementUtils.fill(this.firstName, firstName)
        await this.elementUtils.fill(this.lastName, lastName)
        await this.elementUtils.fill(this.email, email)
        await this.elementUtils.fill(this.telephone, telephone)
        await this.elementUtils.fill(this.password, password)
        await this.elementUtils.fill(this.confirmPassword, password)
        if (subscribeRedio = "Yes") {
            await this.elementUtils.click(this.subscribeRedioYes)
        } else {
            await this.elementUtils.click(this.subscribeRedioNo);
        }
        await this.elementUtils.click(this.privacyPolicychk);
        await this.elementUtils.click(this.btnContinue);
        return await this.elementUtils.isVisible(this.successMsg)



    }

}