// pages/CartPage.js
const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartProductNameLocator = '#shopping-cart-table .product-item-details .product-item-name a';
    this.cartSizeLocator = '#shopping-cart-table .product-item-details dt:has-text("Size") + dd';
    this.cartColorLocator = '#shopping-cart-table .product-item-details dt:has-text("Color") + dd';
    this.cartPriceLocator = '#shopping-cart-table .col.price .cart-price .price';
    this.checkoutMethod = page.locator('.checkout.methods');
    this.proceedToCheckoutButton=this.checkoutMethod.locator('.action.primary.checkout');
    this.cartPageSummary='.cart-summary .summary.title';
    this.cartItemSelector = '.cart.item'; // Adjust the selector according to your cart item element
    this.removeItemButtonSelector = '.action.action-delete'; // Adjust the selector according to your remove button element

}

  async navigateToCart() {
    await this.page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
  }

  async verifyCartPage(){
    
    await this.page.waitForSelector(this.cartPageSummary);
    const isCartSummaryVisible = await this.page.isVisible(this.cartPageSummary);
    expect(isCartSummaryVisible).toBeTruthy();
  }

  async getCartProductDetails() {
    const productRows = await this.page.$$('#shopping-cart-table tbody.cart.item');
    const productsDetails = [];

    for (const row of productRows) {
        const productName = await row.$eval('.product-item-name a', node => node.innerText.trim());
        const productSize = await row.$eval('.item-options dd:nth-child(2)', node => node.innerText.trim());
        const productColor = await row.$eval('.item-options dd:nth-child(4)', node => node.innerText.trim());
        const productPrice = await row.$eval('.price .price', node => node.innerText.trim());

        productsDetails.push({ name: productName, size: productSize, color: productColor, price: productPrice });
    }

    return productsDetails;
}


async verifyCartProductDetails(expectedDetails) {
    const actualDetails = await this.getCartProductDetails();
    console.log('Cart Product Details:', actualDetails);

     // Sort both arrays based on a unique identifier before comparison
  const sortedExpected = expectedDetails.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const sortedActual = actualDetails.slice().sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  expect(sortedActual).toEqual(sortedExpected);
    
}
async removeAllItems() {
  const cartItems = await this.page.$$(this.cartItemSelector);

  if (cartItems.length > 0) {
    for (const item of cartItems) {
      const removeButton = await item.$(this.removeItemButtonSelector);
      await removeButton.click();
      await this.page.waitForTimeout(1000); // Wait for the item to be removed. Adjust the timeout as needed.
    }
    console.log('All items have been removed from the cart.');
  } else {
    console.log('Cart is already empty.');
  }
}



  async proceedToCheckout(){
    
    
    await this.proceedToCheckoutButton.click();
}


}


module.exports = { CartPage };
