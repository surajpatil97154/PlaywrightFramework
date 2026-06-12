import { ResultPage } from "../pages/ResultPage";
import { test, expect } from "../fixures/baseFixures"

let searchProduct = [
    { searchKey: "macbook", "resultCount": 3 },
    { searchKey: "samsung", "resultCount": 2 },
    { searchKey: "canon", "resultCount": 1 },
    { searchKey: "dummy", "resultCount": 0 }
]

for (let product of searchProduct) {

    test(`verify product search ${product.searchKey}`, async ({ homePage }) => {
        let resultPage: ResultPage = await homePage.doSearch(product.searchKey);
        let actualCount = await resultPage.verifyProductCount();
        expect(actualCount).toEqual(product.resultCount)
    })
}