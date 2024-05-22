// tests/homepage.spec.js
const { test } = require('@playwright/test');
// const { test :authTest} = require('../utilities/authHooks.js'); 
// Load environment variables from .env file
require('dotenv').config();

const { HomePage } = require('../pages/HomePage.js');
const { LoginPage } = require('../pages/LoginPage.js');
// const { credentials } = require('../utils/helpers');

test('LoginAndLogout', async ({ page }) => {

 

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  
  await homePage.goTo();
  await homePage.verifySignInLink();


  await homePage.clickSignIn();
  await loginPage.login(process.env.EMAIL, process.env.PASSWORD);


  await loginPage.verifyLoginSuccessful();

const dropdownToggleSpan = page.locator('.customer-name');
const dropdownToggleButton = dropdownToggleSpan.locator('button.action.switch').nth(0);

// Wait for the dropdown toggle button to be visible
await dropdownToggleButton.waitFor({ state: 'visible', timeout: 5000 });

// Click the dropdown toggle button
await dropdownToggleButton.click();
await page.waitForTimeout(1000);
console.log("Done Clicking")

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
