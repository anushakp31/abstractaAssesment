const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.productItems = page.locator('.item.product.product-item');
    this.productNameLocator = 'a.product-item-link';
    this.productPriceLocator = 'span.price';
    this.sizeOptionsLocator = '.swatch-option.text';
    this.colorOptionsLocator = '.swatch-option.color';
    this.addToCartButtonLocator = '.action.tocart.primary';
    this.addToCartPageLocator='a.action.showcart'
    this.viewCartPageLocator='a.action.viewcart'
    this.addedToCartMessageSelector = 'div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]';

  }

  async selectRandomProducts(count) {
    const productElements = await this.productItems;
    const products = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * (await productElements.count()));
      const productElement = await productElements.nth(randomIndex);
      products.push(productElement);
    }
    return products;
  }

  async getProductDetails(productElement) {
    const productName = await productElement.locator(this.productNameLocator).textContent();
    const productPrice = await productElement.locator(this.productPriceLocator).textContent();
    return { name: productName.trim(), price: productPrice.trim() };
  }

  async chooseRandomSize(productElement) {
    const sizeElements = await productElement.locator(this.sizeOptionsLocator).elementHandles();
    const randomSizeElement = sizeElements[Math.floor(Math.random() * sizeElements.length)];
    const size = await randomSizeElement.getAttribute('option-label');
    await randomSizeElement.click();
    return size;
  }

  async chooseRandomColor(productElement) {
    const colorElements = await productElement.locator(this.colorOptionsLocator).elementHandles();
    const randomColorElement = colorElements[Math.floor(Math.random() * colorElements.length)];
    const color = await randomColorElement.getAttribute('option-label');
    await randomColorElement.click();
    return color;
  }

  async addToCart(productElement) {
    await productElement.locator(this.addToCartButtonLocator).click();
    // Wait for the message indicating the product was added to the cart
    await this.page.waitForSelector(this.addedToCartMessageSelector);
  }

  async goToCartPage(){
    const cartLink = await this.page.locator(this.addToCartPageLocator);
    await cartLink.click();
    const viewCartLink = await this.page.locator(this.viewCartPageLocator);
    await viewCartLink.click();
  }
}

module.exports = { ProductPage };
