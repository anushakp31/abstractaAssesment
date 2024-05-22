

// tests/addtocart.spec.js
const { test, expect } = require('@playwright/test');
require('dotenv').config();

const { HomePage } = require('../pages/HomePage.js');
const { LoginPage } = require('../pages/LoginPage.js');
const { ProductPage } = require('../pages/ProductPage.js');
const{ CartPage}=require('../pages/CartPage.js');
const { CheckoutPage}= require('../pages/CheckoutPage.js')
const {PaymentPage} =require('../pages/PaymentPage.js')
const {SuccessPage} =require('../pages/SuccessPage.js');
const { UserHomePage } = require('../pages/UserHomePage.js');
test('Add random products to cart and verify', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const paymentPage=new PaymentPage(page);
  const successPage=new SuccessPage(page);
  const userHomePage=new UserHomePage(page); 

  // Navigate to the home page and login
  await homePage.goTo();
  await homePage.verifySignInLink();
  await homePage.clickSignIn();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
  await loginPage.verifyLoginSuccessful();

  // Navigate to a product category page
  await userHomePage.clickCategoryAndSubCategory();
  // Select random products
  const randomProducts = await productPage.selectRandomProducts(2);

  // Initialize an array to store product details
 const allProductsDetails = [];

for (const randomProduct of randomProducts) {
  await randomProduct.hover();
  const productDetails = await productPage.getProductDetails(randomProduct);
  productDetails.size = await productPage.chooseRandomSize(randomProduct);
  productDetails.color = await productPage.chooseRandomColor(randomProduct);
  await productPage.addToCart(randomProduct);
  allProductsDetails.push(productDetails);
}
  // Print all product details as a JSON object
  // console.log('Products Chosen:', JSON.stringify(allProductsDetails, null, 2));


  // Navigate to the cart
  await productPage.goToCartPage();
  await cartPage.verifyCartPage();
  // Verify the product details in the cart match the added product details
  for (const productDetails of allProductsDetails) {
    await cartPage.verifyCartProductDetails(allProductsDetails);
  }

  // Proceed to checkout
  await cartPage.proceedToCheckout();

  // Verify checkout page and mini cart product details
  await checkoutPage.verifyCheckoutPage();
  await checkoutPage.expandSelection();
  for (const productDetails of allProductsDetails) {
    await checkoutPage.verifyMiniCartProductDetails(allProductsDetails);
  }
await checkoutPage.selectRandomShippingMethod();
await checkoutPage.clickNextButton();

await paymentPage.verifyPaymentPage();
await paymentPage.verifyPrice(allProductsDetails);
await paymentPage.clickPlacOrder();
await successPage.verifyPurchaseConfirmation();

 
});

