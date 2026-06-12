import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/HomePage";
import { ResultPage } from "../pages/ResultPage";
import { ProductInfoPage } from "../pages/ProductInfo";
import {test ,expect} from "../fixures/baseFixures"

let productDetials = [
    { searchKey: 'macbook', searchResultsCount: 3, selectProduct: 'MacBook Pro', productHeader: 'MacBook Pro', imgCount: 4 },
    { searchKey: 'samsung', searchResultsCount: 2, selectProduct: 'Samsung Galaxy Tab 10.1', productHeader: 'Samsung Galaxy Tab 10.1', imgCount: 7 },
    { searchKey: 'canon', searchResultsCount: 1, selectProduct: 'Canon EOS 5D', productHeader: 'Canon EOS 5D', imgCount: 3 },
]

for (let product of productDetials) {

    test(`verify product info page ${product.searchKey}`, async ({ homePage }) => {

        let resultPage: ResultPage = await homePage.doSearch(product.searchKey);
        expect(await resultPage.verifyProductCount()).toBe(product.searchResultsCount)
        let productInfoPage: ProductInfoPage = await resultPage.selectProduct(product.selectProduct);
        let productHeader = await productInfoPage.getProductHeader()
        expect(productHeader).toBe(product.productHeader);
        let productImgCount = await productInfoPage.getproductImageCount();
        expect(productImgCount).toBe(product.imgCount)

    })
}

test("verify product meta data", async ({ homePage }) => {
    let resultPage: ResultPage = await homePage.doSearch("macbook");
    expect(await resultPage.verifyProductCount()).toBe(3)
    let productInfoPage :ProductInfoPage = await resultPage.selectProduct("MacBook Pro")
    let productData : Map<string | undefined, string | number | undefined> = await productInfoPage.getProductData();
    expect.soft(productData.get("header")).toBe("MacBook Pro");
    expect.soft(productData.get("imageCount")).toBe(4);
    expect.soft(productData.get("Brand")).toBe("Apple");
    expect.soft(productData.get("Product Code")).toBe("Product 18");
    expect.soft(productData.get("Reward Points")).toBe("800");
    expect.soft(productData.get("Availability")).toBe("Out Of Stock");

})