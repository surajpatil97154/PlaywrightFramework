import { Locator, Page } from "@playwright/test";
import { ElementUtils } from "../utils/ElementUtil";


export class ProductInfoPage {

    private readonly page: Page;
    private readonly elementUtil: ElementUtils
    private readonly productImage: Locator
    private readonly prodcutMetaData: Locator
    private readonly productPrice: Locator;

    private  map = new Map<string | undefined, string | number | undefined>()

    constructor(page: Page) {
        this.page = page;
        this.elementUtil = new ElementUtils(page);
        this.productImage = page.locator(`ul[class = thumbnails] li`)
        this.prodcutMetaData = page.locator(`(//div[@id="content"]//ul[@class="list-unstyled"])[1]/li`)
        this.productPrice = page.locator(`(//div[@id="content"]//ul[@class="list-unstyled"])[2]/li`)

    }

    async getProductHeader(): Promise<string> {
        let headerText = await this.elementUtil.getText('h1');
        console.log('product header : ' + headerText);
        return headerText;
    }

    async getproductImageCount(): Promise<number> {
        let count: number = await this.productImage.count();
        return count;
    }

    async getProductData() : Promise<Map<string | undefined, string | number | undefined>> {
        this.map.set("header",await this.getProductHeader())
        this.map.set("imageCount",await this.getproductImageCount())
        this.getProductMetaData();
        await this.getProductPricingData();
        await this.printProductDetails();
        return this.map;
    }

    private async printProductDetails() {
        for(let [key,value] of this.map){
            console.log(key,value);
        }
    }

    private async getProductMetaData() {
        let metaData: string[] = await this.prodcutMetaData.allInnerTexts();

        for (let data of metaData) {
            let splitedData:string[] = data.split(':');
            let metaKey = splitedData[0]?.trim()
            let metaValue = splitedData[1]?.trim();
            this.map.set(metaKey, metaValue);
        }
    }
    private async getProductPricingData() {
        let price = await this.productPrice.allInnerTexts();
        let priceVal = price[0]        
        let taxPrice = price[1]?.trim()[1];
        this.map.set("productPrice", priceVal)
        this.map.set("taxPrice", taxPrice)


    }
}