import { Locator, Page } from "@playwright/test";
import { ElementUtils } from "../utils/ElementUtil";
import { TIMEOUT } from "node:dns";
import { HomePage } from "./HomePage";
import { RegisterPage } from "./RegisterPage";

export class LoginPage {

    private readonly page: Page
    private readonly username:string;
    private readonly password:string;
    private readonly loginBtn:string;
    private readonly elementUtils: ElementUtils;
    private readonly loginErrMsg:string;
    private readonly lnkRegister:Locator;

    constructor(page : Page) {
        this.page = page;
        this.elementUtils = new ElementUtils(page);
        this.username = "#input-email";
        this.password = "#input-password";
        this.loginBtn  = "input[value='Login']"
        this.loginErrMsg = ".alert.alert-danger.alert-dismissible";
        this.lnkRegister = page.locator(`//a[contains(@href, "register")]`).last()
    }

    async goToLoginPage(baseURL:string | undefined){
        await this.page.goto(baseURL+"/opencart/index.php?route=account/login");
    }

    async doLogin(userName:string,password:string) : Promise<HomePage>{
        await this.elementUtils.fill(this.username,userName);
        console.log("username===>"+userName);
        await this.elementUtils.fill(this.password,password);
        console.log("username===>"+password);
        await this.elementUtils.click(this.loginBtn);
        return new HomePage(this.page);
    //    let title =  await this.elementUtils.getTitle();
    //    return title
    }

    async validateErrorMsg(): Promise<string>{
        let text = await this.elementUtils.getText(this.loginErrMsg);
        return text;
    }

    async navigateToRegisterPage() :Promise<RegisterPage>{
        await this.elementUtils.click(this.lnkRegister)
        return new RegisterPage(this.page)
    }

}