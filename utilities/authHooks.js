// tests/homepage.spec.js
const { test, expect } = require('@playwright/test');
// Load environment variables from .env file
require('dotenv').config();

const { HomePage } = require('../pages/HomePage.js');

const { UserHomePage } = require('../pages/UserHomePage.js');
const { LoginPage } = require('../pages/LoginPage.js');
// const { credentials } = require('../utils/helpers');


// Define test.beforeEach hook
test.beforeEach(async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  // Navigate to the home page and verify the sign-in link
  await homePage.goTo();
  await homePage.verifySignInLink();

  // Click the sign-in link and log in
  await homePage.clickSignIn();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

  // Verify the login was successful
  await loginPage.verifyLoginSuccessful();
//   await page.waitForTimeout(5000);
//   const userHomePage= new UserHomePage(page);

//   userHomePage.logOut();

const dropdownToggleSpan = page.locator('.customer-name');
const dropdownToggleButton = dropdownToggleSpan.locator('button.action.switch').nth(0);

// Wait for the dropdown toggle button to be visible
await dropdownToggleButton.waitFor({ state: 'visible', timeout: 5000 });

// Click the dropdown toggle button
await dropdownToggleButton.click();
await page.waitForTimeout(1000);


// Wait for the dropdown menu to be fully expanded
// await page.waitForSelector('.customer-menu.active', { state: 'visible', timeout: 10000 });
await page.waitForSelector('.panel.header .header .customer-welcome span.customer-name', { state: 'visible', timeout: 10000 });
await page.waitForTimeout(1000);

// Locate the "Sign Out" link within the dropdown menu
await page.waitForSelector('ul .header.links a:has-text("Sign Out")',{ state: 'visible', timeout: 5000 });
const signOutLink = page.locator('ul .header.links a:has-text("Sign Out")').nth(0);
await page.waitForTimeout(1000);

// Wait for the "Sign Out" link to be visible and clickable within the dropdown menu

await signOutLink.click();


});
test.afterEach(async( {page})=>{
    // const userHomePage= new UserHomePage(page);

    // // await clickLogo(page);
    // // userHomePage.verifyUserHome();
    // userHomePage.logOut();

})

module.exports = { test };