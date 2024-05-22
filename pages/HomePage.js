// pages/home.page.js
const { expect } = require('@playwright/test');
// require('dotenv').config();

class HomePage {
    constructor(page) {
      this.page = page;
      this.panelHeader = page.locator('.panel.header');
      this.signInLink = this.panelHeader.locator('a:has-text("Sign In")');
      this.createAccount=this.panelHeader.locator('a:has-text("Create an Account")');
    }
  
    async goTo() {
      await this.page.goto(process.env.TESTURL);
    }
  
    async clickSignIn() {
      await this.signInLink.click();
    }
    async clickCreateAnAccount(){
      await this.createAccount.click()
      
    }
  
    async verifySignInLink() {
      await expect(this.signInLink).toContainText('Sign In');
    }
  }
  
  module.exports = { HomePage };
  