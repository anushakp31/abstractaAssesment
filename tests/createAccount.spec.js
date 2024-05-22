// tests/homepage.spec.js
const { test } = require('@playwright/test');
// Load environment variables from .env file
require('dotenv').config();

const { HomePage } = require('../pages/HomePage.js');
const { SignInPage } = require('../pages/SignInPage.js');
// const { credentials } = require('../utils/helpers');

test('Login', async ({ page }) => {
  const homePage = new HomePage(page);
  const signInPage = new SignInPage(page);

  // Navigate to the home page and verify the sign-in link
  await homePage.goTo();
  await homePage.verifySignInLink();

  // Click the sign-in link and log in
  await homePage.clickCreateAnAccount();
 await signInPage.verifySignInPage();
  
 await signInPage.fillRegistrationForm();
 await signInPage.submitRegistrationForm();
 
});
