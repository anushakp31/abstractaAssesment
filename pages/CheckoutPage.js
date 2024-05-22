// pages/CartPage.js
const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    
    this.shippingAddressTitle = '.step-title[data-role="title"]';
    // this.orderCount = '';
    // this.orderList = '';
    // this.shippingMethods = '';
    this.page = page;
    this.radioButtonsLocator = '.table-checkout-shipping-method';
    this.expandSelectionLocator='.title[data-role="title"][role="tab"]'
    this.nextButtonLocator = 'button[data-role="opc-continue"]';
    this.productItemsLocator='.content.minicart-items'
    this.miniCartProductNameLocator = '.product-item-name';
    this.miniCartSizeLocator = '.item-options dt:contains("Size") + dd';
    this.miniCartColorLocator = '.item-options dt:contains("Color") + dd';
    this.miniCartPriceLocator = '.price-excluding-tax .price';
}


  async verifyCheckoutPage(){
    await this.page.waitForSelector(this.shippingAddressTitle, { state: 'visible' });
    console.log('Shipping Address is visible.');
  }
  async getMiniCartProductDetails() {
    const minicartProducts = [];
    await this.page.waitForSelector('.minicart-items .product-item'); // Ensure that the product items are loaded
    const productItems = await this.page.$$('.minicart-items .product-item');

    for (const item of productItems) {
        try {
            const productName = await item.$eval('.product-item-name', node => node.innerText.trim());
            const productPrice = await item.$eval('.cart-price .price', node => node.innerText.trim());
            minicartProducts.push({ name: productName, price: productPrice });
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    }

    return minicartProducts;
  }
  async expandSelection(){
    const expandSelectionbutton= await this.page.waitForSelector(this.expandSelectionLocator)
    await expandSelectionbutton.click();
  }

  async verifyMiniCartProductDetails(expectedDetails) {
    const actualDetails = await this.getMiniCartProductDetails();
    // console.log('Mini Cart Product Details:', actualDetails);

    // Filter out the relevant fields (name and price) from the expected details
    const filteredExpectedDetails = expectedDetails.map(detail => ({
        name: detail.name,
        price: detail.price
    }));

    // Sort both arrays based on the name field before comparison
    const sortedExpected = filteredExpectedDetails.slice().sort((a, b) => a.name.localeCompare(b.name));
    const sortedActual = actualDetails.slice().sort((a, b) => a.name.localeCompare(b.name));

    // Use a deep comparison method to compare the arrays
    expect(sortedActual).toEqual(sortedExpected);
  }

  async getCheckoutDetails() {
    const shippingAdress = await this.page.locator(this.cartProductNameLocator).textContent();
    const orderCount = await this.page.locator(this.cartSizeLocator).textContent();
    const shippingMethod = await this.page.locator(this.cartColorLocator).textContent();
    const orderList = await this.page.locator(this.cartPriceLocator).textContent();
    // return { name: productName.trim(), size: size.trim(), color: color.trim(), price: price.trim() };
  }

  async verifyCartProductDetails(expectedDetails) {
    const actualDetails = await this.getCartProductDetails();
    // console.log('Cart Product Details:', JSON.stringify(actualDetails, null, 2));

    expect(actualDetails.name).toBe(expectedDetails.name);
    expect(actualDetails.size).toBe(expectedDetails.size);
    expect(actualDetails.color).toBe(expectedDetails.color);
    expect(actualDetails.price).toBe(expectedDetails.price);
  }

  async proceedToCheckout(){
    const checkoutBtn = await this.page.locator(this.checkoutLocator);
    await checkoutBtn.click();
}
async selectRandomShippingMethod() {
   // Wait for the shipping method radio buttons to appear
   await this.page.waitForSelector('.table-checkout-shipping-method .row input[type="radio"]');

   // Get all radio button inputs for shipping methods
   const shippingMethodInputs = await this.page.$$('.table-checkout-shipping-method .row input[type="radio"]');

   // Choose a random shipping method input
   const randomIndex = Math.floor(Math.random() * shippingMethodInputs.length);

   const randomShippingMethodInput = shippingMethodInputs[randomIndex];
// console.log('obj',randomShippingMethodInput);

   // Cclick the random shipping method input
   await randomShippingMethodInput.click();
  console.log('Random shipping method selected.');
}

async getShippingCost() {
  
  
  // Wait for the shipping method radio buttons to appear
  await this.page.waitForSelector('.table-checkout-shipping-method .row input[type="radio"]:checked');

  // Execute JavaScript code to get the value of the checked radio button
  const selectedShippingPrice = await this.page.evaluate(() => {
    // Find the checked radio button
    const checkedRadio = document.querySelector('.table-checkout-shipping-method .row input[type="radio"]:checked');
    
    // Check if the radio button is found
    if (checkedRadio) {
        // Find the corresponding price element
        const priceElement = checkedRadio.closest('tr').querySelector('.col-price .price');
        
        // Check if the price element is found
        if (priceElement) {
            // Get the text content of the price element
            const priceText = priceElement.innerText.trim();
            
            // Extract the numeric value from the price text
            // Remove the dollar sign and convert to a number
            const numericValue = parseFloat(priceText.replace('$', ''));
            
            // Return the numeric value
            return numericValue;
        }
    }
    // Return null if no price is found
    return null;
});

// Return the extracted price
return selectedShippingPrice;
}

async clickNextButton() {
  const nextButton = await this.page.waitForSelector(this.nextButtonLocator);
  await nextButton.click();
  console.log('Clicked on the Next button.');
}

}


module.exports = { CheckoutPage };
