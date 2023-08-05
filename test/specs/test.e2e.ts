import { expect, browser, $, $$ } from '@wdio/globals'

function open(path: string) {
    return browser.url(path)
}

async function getLocator(locator: string) {
    return await $(locator);
}

describe('Amazon search Laptop details from brand', () => {
    it('should navigate to amazon click on checkbox and filter and fetch technical details from Amazon', async () => {

       
        // Scenario 01: >> Navigate to https://www.amazon.in/

        await open('https://www.amazon.in/');
        await browser.pause(2000); // Wait for the page to load


        //To maximize the window 
        await browser.maximizeWindow();
     

        // Scenario 02 >> Search for Laptops 
        const inputElement = await getLocator('input[name="field-keywords"]');
        await inputElement.click();
        await browser.keys('Laptops');
        await browser.keys('\uE007'); // Press Enter
        await browser.pause(10000); // Wait for the search results to load



        // Scenario 03: Filters group - Select two brands ( Ex : Dell, HP )
        
        //Select Hp checkbox  from Brand checkbox 

        const hpBrandElement = await browser.$("//span[text()='HP']/..//i[@class='a-icon a-icon-checkbox']");
        await hpBrandElement.click();
        await browser.pause(2000);


        // Select Dell checkbox  from Brand checkbox 
        const dellBrandElement = await browser.$("//span[text()='Dell']/..//i[@class='a-icon a-icon-checkbox']");
        await dellBrandElement.click();
        await browser.pause(2000);



        // Scenario :04 Sort By drop down - Select "price high to low" >> clicking on Sort by price high to low from sort by feature
        await $('[data-action="a-dropdown-select"]').selectByVisibleText('Price: High to Low');
        await browser.pause(5000); // Wait for the sorting to apply



        // Scenario : 0d Customer review - Click 3 star >> Clicking on Filter of  3  stars & Up
        const starElement = await browser.$("//section[@aria-label='3 Stars & Up']");
        await starElement.click();
        await browser.pause(5000); // Wait for the filters to apply



        //Here I can Implement List for iterate the no of lapotp comes under 3 star 

        // Scenario :06 Results section - Open first search result in a new Tab >> Open first search result in a new tab
        const firstResultLink = await browser.$('[data-component-type="s-search-result"]');
        await firstResultLink.click({ button: 'middle' });
        await browser.pause(4000);

        await browser.saveScreenshot("wdio.png")

        // Switch to the new window
        const [originalWindowHandle, newWindowHandle] = await browser.getWindowHandles();
        await browser.switchToWindow(newWindowHandle);

        await browser.scroll(0, 4800);
        await browser.pause(2000);

        await browser.saveScreenshot("wdio2.png")


        // Senario :07 >> Fetch and print the Technical Details under 'Product information'

        const technicalDetailsHeader = await browser.$("//h1[contains(text(), 'Technical Details')]");
        console.log("value is :" + await technicalDetailsHeader.getText());
        expect(await technicalDetailsHeader.getText()).toHaveText('Technical Details');

        await browser.pause(5000);

        const productInformation = await $$('#productDetails_techSpec_section_1 tr td');

        productInformation.forEach(async element => {
            //const td=await element.$("td");
            console.log("Data is  ......:",+await element.getText())
        });

      

        //Tear down the browser >> End the browser session
        await browser.deleteSession();
    });

})
