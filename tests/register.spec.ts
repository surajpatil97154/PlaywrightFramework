import { parse } from "csv-parse/sync";
import { test, expect } from "../fixures/baseFixures"
import { RegisterPage } from "../pages/RegisterPage";
import fs from "fs";


type regData = {
    firstName: string,
    lastName: string,
    telephone: string,
    password: string,
    subscribeNewsLetter: string
}

let fileConent = fs.readFileSync("./Data/registration.csv");
let registrationData: regData[] = parse(fileConent, {
    columns: true,  //treat the first row as column name 
    skip_empty_lines: true,
    relax_column_count: true //Allows rows with different numbers of columns
})

// registrationData.forEach((data, index) => {
//     const testName = `registration user ${data.firstName ?? 'unknown'} ${index + 1}`;
    for(let data of registrationData){
    test(`register user : ${data.firstName}`, async ({ loginPage, baseURL }) => {
        await loginPage.goToLoginPage(baseURL)
        let registerPage: RegisterPage = await loginPage.navigateToRegisterPage();
        let boolean = await registerPage.registerUser(data.firstName, data.lastName, randomEmailId(), data.telephone, data.password, data.subscribeNewsLetter)
        expect(boolean).toBeTruthy();
    })
}

function randomEmailId(): string {
    let ramdonString = Math.random().toString(36).substring(5, 10)
    return "Test" + ramdonString + "@auto.com"
}
