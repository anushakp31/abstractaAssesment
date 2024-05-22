// pages/CartPage.js
const { expect } = require('@playwright/test');
const { CheckoutPage } = require('./CheckoutPage');

class PaymentPage {
  constructor(page) {
    
    this.checkoutPage = new CheckoutPage(page);
    this.page = page;
    this.paymentTitle = '.step-title[data-role="title"]';
    this.clickPlacOrderbutton='.action.primary.checkout';

}

  async navigateToPayment() {
    await this.page.goto('https://magento.softwaretestingboard.com/checkout/#payment');
  }
  async verifyPaymentPage(){
    await this.page.waitForSelector(this.paymentTitle, { state: 'visible' });
    console.log('Payment Method is visible.');
  }
  async verifyPrice(productDetails) {
    // Extract prices from productDetails array
    let totalPrice = 0;

    for (const product of productDetails) {
        const price = parseFloat(product.price.replace('$', ''));
        totalPrice += price;
    }
    console.log("Total Price: "+totalPrice);
    const shippingCost = await this.checkoutPage.getShippingCost();
    console.log("Shipping Cost: " + shippingCost);
    // Find and extract the displayed total price
    const totalPriceElement = await this.page.waitForSelector('.grand.totals .amount .price');
    const displayedTotalPriceText = await totalPriceElement.innerText();
   
    // Extract the numeric value from the displayed total price text
    const displayedTotalPrice = parseFloat(displayedTotalPriceText.replace('$', ''));
    console.log("Displayed Price:"+displayedTotalPrice)

    const totalPriceWithShipping = totalPrice + shippingCost;
    console.log("Total Price with Shipping: " + totalPriceWithShipping);
    
    // Compare the displayed total price with the expected total price
    expect(displayedTotalPrice).toBe(totalPriceWithShipping);
}

  

 

 
async clickPlacOrder() {
  const clickPlacOrderOption = await this.page.waitForSelector(this.clickPlacOrderbutton);
  await clickPlacOrderOption.click();
  
}
async verifyPurchaseConfirmation() {
    // Wait for the purchase confirmation message to appear
    const confirmationMessage = await this.page.waitForSelector('span.base[data-ui-id="page-title-wrapper"]', { state: 'visible' });

    // Get the text content of the confirmation message
    const messageText = await confirmationMessage.innerText();

    // Verify that the message matches the expected text
    expect(messageText).toBe("Thank you for your purchase!");
    console.log('Placed an Order');
}


}


module.exports = { PaymentPage };
