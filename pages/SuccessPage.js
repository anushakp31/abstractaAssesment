// pages/CartPage.js
const { expect } = require('@playwright/test');


class SuccessPage {
  constructor(page) {
    
  
    this.page = page;
    this.orderSuccessMessage='.checkout-success';


}

  

 

 

async verifyPurchaseConfirmation() {
    // Wait for the purchase confirmation message to appear
  await this.page.waitForSelector(this.orderSuccessMessage);

    // // Get the text content of the confirmation message
    // const messageText = await confirmationMessage.innerText();

    // // Verify that the message matches the expected text
    // expect(messageText).toBe("Thank you for your purchase!");
    console.log('Placed an Order');
}


}


module.exports = { SuccessPage };
