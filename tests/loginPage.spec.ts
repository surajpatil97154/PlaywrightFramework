import { LoginPage } from "../pages/loginPage";
import {test,expect} from "../fixures/baseFixures"

test("Login to application", async({homePage})=>{
   expect(homePage.page).toHaveTitle("My Account")
});


test("Negative testcase for login ", async ({page,baseURL}) =>{
  let loginPage = new LoginPage(page);
  await loginPage.goToLoginPage(baseURL);
  await loginPage.doLogin("mks@gmail.com","test@123");
  let text = await loginPage.validateErrorMsg();
  expect(text).toContain("Warning: No match for E-Mail Address and/or Password.")

})