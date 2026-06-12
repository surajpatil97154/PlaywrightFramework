import { Locator, Page } from "@playwright/test";
import { ElementUtils } from "../utils/ElementUtil";
import {ProductInfoPage} from "./ProductInfo"



export class ResultPage{

    private readonly page :Page
    private readonly elementUtil: ElementUtils
    private readonly productCount: Locator
    
    constructor(page:Page) {
        this.page = page;
        this.elementUtil = new ElementUtils(page);
        this.productCount = page.locator(`div[class *= 'product-layout']`);
    }

    async verifyProductCount() :Promise<number>{
        let count = await this.productCount.count();
        return count;
    }

    async selectProduct(productName:string) {
        await this.elementUtil.click(this.page.getByRole('link',{name:`${productName}`}))
        return new ProductInfoPage(this.page)
    }







}