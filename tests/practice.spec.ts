import test from "@playwright/test";

test('demo test',async ({page})=>{
    await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/register")
    await page.getByLabel("First Name").fill("Suraj");
    await page.pause();
})