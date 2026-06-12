import { Locator, Page } from "@playwright/test";

type flexibleLocator = string | Locator;
export class ElementUtils {
    private page: Page;
    private defaultTimeout = 30000;
    constructor(page: Page, timeout: number =30000) {
        this.page = page;
        this.defaultTimeout = timeout;
    }


    private getLocator(locator: flexibleLocator, index?: number): Locator {
        if (typeof locator == 'string') {
            if (index) {
                return this.page.locator(locator).nth(index);
            } else {
                return this.page.locator(locator).first()
            }

        } else {
            if (index) {
                return locator.nth(index);
            } else {
                return locator.first();
            }
        }
    }

    async click(locator: flexibleLocator,index?:number, options?: { force?: boolean; timeout?: number }): Promise<void> {
        let clickOptions: any = {};

        if (options?.force != undefined) {
            clickOptions.force = options?.force;
        }
        clickOptions.timeout = options?.timeout || this.defaultTimeout;


        await this.getLocator(locator,index).click({
            force: clickOptions?.force,
            timeout: clickOptions?.timeout
        });
        console.log(`Clicked on element : ${locator}`);
    }

    async fill(locator:flexibleLocator,text:string){
        await this.getLocator(locator).fill(text);

    }

    async doubleClick(locator: flexibleLocator): Promise<void> {

        await this.getLocator(locator).dblclick();
        console.log(`double clicked on element ${locator}`);

    }

    async rightClick(locator: flexibleLocator): Promise<void> {
        await this.getLocator(locator).click({ button: "right" })
        console.log(`right clicked on element ${locator}`);
    }

    async pressSequencially(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
        await this.getLocator(locator).pressSequentially(text, { delay: delay })
    }

    async clear(locator: flexibleLocator): Promise<void> {

        await this.getLocator(locator).clear({ timeout: this.defaultTimeout });
        console.log(`cleared the element : ${locator}`);
    }

    async isVisible(locator: flexibleLocator,index?:number): Promise<boolean> {
        try {
            await this.getLocator(locator,index).isVisible();
            return true;
        }
        catch {
            return false;
        }

    }

    async isHidden(locator: flexibleLocator): Promise<boolean> {
        return await this.getLocator(locator).isHidden();
    }

    async isEnabled(locator: flexibleLocator): Promise<boolean> {

        return await this.getLocator(locator).isEnabled({ timeout: this.defaultTimeout });
    }


    async isDisabled(locator: flexibleLocator): Promise<boolean> {

        return await this.getLocator(locator).isDisabled();
    }

    async waitForElementToVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
        try {
            await this.getLocator(locator).waitFor({ state: 'visible' });
            console.log('waited for element to be visible');
            return true;
        } catch {
            return false;
        }
    }

    async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {

        try {
            await this.getLocator(locator).waitFor({ state: "attached" });
            console.log('waited for element to attached');
            return true;
        } catch {
            return false;
        }

    }

    async getText(locator: flexibleLocator): Promise<string> {
        let text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeout });
        return text;
    }

    async getAttribute(locator: flexibleLocator, attributeName: string): Promise<string | null> {
        return await this.getLocator(locator).getAttribute(attributeName)
    }

    async getInputValue(locator: flexibleLocator): Promise<String | null> {
        return await this.getLocator(locator).inputValue();
    }

    async getAllInnerTexts(locator: flexibleLocator): Promise<string[]> {
        return await this.getLocator(locator).allInnerTexts()
    }

    async selectByText(locator: flexibleLocator, text: string) {
        await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeout })
        console.log(`selected option ${text} from dropdown ${locator}`);
    }

    async selectByValue(locator: flexibleLocator, value: string) {
        await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeout })
        console.log(`selected option ${value} from dropdown ${locator}`);
    }

    async selectByIndex(locator: flexibleLocator, index: number) {
        await this.getLocator(locator).selectOption({ index: index }, { timeout: this.defaultTimeout })
        console.log(`selected option ${index} from dropdown ${locator}`);
    }

    async getTitle() :Promise<string>{
        let title = await this.page.title();
        return title;
    }

}