// pages/login.page.js
const { expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailField = page.locator('#email');
      this.passwordField = page.locator('#pass');
      this.signInButton = page.locator('#send2');
    }
  
    async login(email, password) {
      await this.emailField.fill(email);
      await this.passwordField.fill(password);
      await this.signInButton.click();
    }
  
    async verifyLoginSuccessful() {
      await expect(this.page.getByRole('banner')).toBeVisible();
    }
  }
  
  module.exports = { LoginPage };
  