import { Locator, Page } from "@playwright/test";
import { ElementUtils } from "../utils/ElementUtil";
import { LoginPage } from "./loginPage";
import { ResultPage } from "./ResultPage";


export class HomePage {

    private readonly elementUtil: ElementUtils;
    readonly page:Page;
    private readonly lnkLogout: Locator;
    private readonly drpMyAccount: Locator
    private readonly btnContinue:Locator;
    private readonly txtBoxSearch : Locator;
    private readonly searchIcon : Locator



    constructor(page:Page) {
        this.page = page;
        this.elementUtil = new ElementUtils(page)
        this.lnkLogout = page.getByRole("link",{name:"Logout"});
        this.drpMyAccount = page.locator(`//span[text()='My Account']`);
        this.btnContinue = page.locator(`//a[text()="Continue"]`);
        this.txtBoxSearch = page.getByRole(`textbox`,{name:"Search"})
        this.searchIcon = page.locator(`div[id='search'] button[type=button]`);
    }

    async verifyUserLoggedIn(): Promise<boolean>{

       return await this.elementUtil.isVisible(this.lnkLogout,1)

    }


    async logOut() :Promise<LoginPage> {
        await this.elementUtil.click(this.drpMyAccount);
        await this.elementUtil.click(this.lnkLogout,0)
        await this.elementUtil.click(this.btnContinue);
        return new LoginPage(this.page);

    }


    async doSearch(text:string ) {
        console.log("search text :"+ text);
        await this.elementUtil.fill(this.txtBoxSearch,text)
        await this.elementUtil.click(this.searchIcon)
        return new ResultPage(this.page);
    }


}