# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: productInfo.spec.ts >> verify product meta data
- Location: tests\productInfo.spec.ts:40:5

# Error details

```
Error: locator.fill: Target page, context or browser has been closed
Call log:
  - waiting for locator('#input-email').first()

```

# Test source

```ts
  1   | import { Locator, Page } from "@playwright/test";
  2   | 
  3   | type flexibleLocator = string | Locator;
  4   | export class ElementUtils {
  5   |     private page: Page;
  6   |     private defaultTimeout = 30000;
  7   |     constructor(page: Page, timeout: number =30000) {
  8   |         this.page = page;
  9   |         this.defaultTimeout = timeout;
  10  |     }
  11  | 
  12  | 
  13  |     private getLocator(locator: flexibleLocator, index?: number): Locator {
  14  |         if (typeof locator == 'string') {
  15  |             if (index) {
  16  |                 return this.page.locator(locator).nth(index);
  17  |             } else {
  18  |                 return this.page.locator(locator).first()
  19  |             }
  20  | 
  21  |         } else {
  22  |             if (index) {
  23  |                 return locator.nth(index);
  24  |             } else {
  25  |                 return locator.first();
  26  |             }
  27  |         }
  28  |     }
  29  | 
  30  |     async click(locator: flexibleLocator,index?:number, options?: { force?: boolean; timeout?: number }): Promise<void> {
  31  |         let clickOptions: any = {};
  32  | 
  33  |         if (options?.force != undefined) {
  34  |             clickOptions.force = options?.force;
  35  |         }
  36  |         clickOptions.timeout = options?.timeout || this.defaultTimeout;
  37  | 
  38  | 
  39  |         await this.getLocator(locator,index).click({
  40  |             force: clickOptions?.force,
  41  |             timeout: clickOptions?.timeout
  42  |         });
  43  |         console.log(`Clicked on element : ${locator}`);
  44  |     }
  45  | 
  46  |     async fill(locator:flexibleLocator,text:string){
> 47  |         await this.getLocator(locator).fill(text);
      |                                        ^ Error: locator.fill: Target page, context or browser has been closed
  48  | 
  49  |     }
  50  | 
  51  |     async doubleClick(locator: flexibleLocator): Promise<void> {
  52  | 
  53  |         await this.getLocator(locator).dblclick();
  54  |         console.log(`double clicked on element ${locator}`);
  55  | 
  56  |     }
  57  | 
  58  |     async rightClick(locator: flexibleLocator): Promise<void> {
  59  |         await this.getLocator(locator).click({ button: "right" })
  60  |         console.log(`right clicked on element ${locator}`);
  61  |     }
  62  | 
  63  |     async pressSequencially(locator: flexibleLocator, text: string, delay: number = 500): Promise<void> {
  64  |         await this.getLocator(locator).pressSequentially(text, { delay: delay })
  65  |     }
  66  | 
  67  |     async clear(locator: flexibleLocator): Promise<void> {
  68  | 
  69  |         await this.getLocator(locator).clear({ timeout: this.defaultTimeout });
  70  |         console.log(`cleared the element : ${locator}`);
  71  |     }
  72  | 
  73  |     async isVisible(locator: flexibleLocator,index?:number): Promise<boolean> {
  74  |         try {
  75  |             await this.getLocator(locator,index).isVisible();
  76  |             return true;
  77  |         }
  78  |         catch {
  79  |             return false;
  80  |         }
  81  | 
  82  |     }
  83  | 
  84  |     async isHidden(locator: flexibleLocator): Promise<boolean> {
  85  |         return await this.getLocator(locator).isHidden();
  86  |     }
  87  | 
  88  |     async isEnabled(locator: flexibleLocator): Promise<boolean> {
  89  | 
  90  |         return await this.getLocator(locator).isEnabled({ timeout: this.defaultTimeout });
  91  |     }
  92  | 
  93  | 
  94  |     async isDisabled(locator: flexibleLocator): Promise<boolean> {
  95  | 
  96  |         return await this.getLocator(locator).isDisabled();
  97  |     }
  98  | 
  99  |     async waitForElementToVisible(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
  100 |         try {
  101 |             await this.getLocator(locator).waitFor({ state: 'visible' });
  102 |             console.log('waited for element to be visible');
  103 |             return true;
  104 |         } catch {
  105 |             return false;
  106 |         }
  107 |     }
  108 | 
  109 |     async waitForElementAttached(locator: flexibleLocator, timeout: number = 5000): Promise<boolean> {
  110 | 
  111 |         try {
  112 |             await this.getLocator(locator).waitFor({ state: "attached" });
  113 |             console.log('waited for element to attached');
  114 |             return true;
  115 |         } catch {
  116 |             return false;
  117 |         }
  118 | 
  119 |     }
  120 | 
  121 |     async getText(locator: flexibleLocator): Promise<string> {
  122 |         let text = await this.getLocator(locator).innerText({ timeout: this.defaultTimeout });
  123 |         return text;
  124 |     }
  125 | 
  126 |     async getAttribute(locator: flexibleLocator, attributeName: string): Promise<string | null> {
  127 |         return await this.getLocator(locator).getAttribute(attributeName)
  128 |     }
  129 | 
  130 |     async getInputValue(locator: flexibleLocator): Promise<String | null> {
  131 |         return await this.getLocator(locator).inputValue();
  132 |     }
  133 | 
  134 |     async getAllInnerTexts(locator: flexibleLocator): Promise<string[]> {
  135 |         return await this.getLocator(locator).allInnerTexts()
  136 |     }
  137 | 
  138 |     async selectByText(locator: flexibleLocator, text: string) {
  139 |         await this.getLocator(locator).selectOption({ label: text }, { timeout: this.defaultTimeout })
  140 |         console.log(`selected option ${text} from dropdown ${locator}`);
  141 |     }
  142 | 
  143 |     async selectByValue(locator: flexibleLocator, value: string) {
  144 |         await this.getLocator(locator).selectOption({ value: value }, { timeout: this.defaultTimeout })
  145 |         console.log(`selected option ${value} from dropdown ${locator}`);
  146 |     }
  147 | 
```