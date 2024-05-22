// pages/home.page.js
const { th } = require('@faker-js/faker');
const { expect } = require('@playwright/test');


class UserHomePage {
    constructor(page) {
      this.page = page;
      this.notLogged=page.locator('span.not-logged-in');
      this.loggedInLocator='span.logged-in';
      this.loggedIn=page.locator('span.logged-in');
     
    this.profileDropdown = this.page.locator('button.action.switch:has-text("Change")').first();
      this.womenLink='#ui-id-4'
      this.womenTopsLink='#ui-id-9'
    this.dropDownBox = page.locator('.header.links');
      this.signOutLink = this.dropDownBox.locator('a:has-text("Sign Out")');
      this.infoBox='.box.box-information';
        }
  
    
  
    async clickSignIn() {
      await this.signInLink.click();
    }
    async clickCreateAnAccount(){
      await this.createAccount.click()
      
    }
  
    async verifyUserHome() {

        await expect(this.profileDropdown).toBeVisible();

        
    }
async clickCategoryAndSubCategory(){
  await this.page.locator(this.womenLink).hover();
  await this.page.locator(this.womenTopsLink).click();

}
async logOut(){
    try {
        // Locate the span element wrapping the button
        const dropdownToggleSpan = this.page.locator('.customer-name');

        // Locate the nested button inside the span element
        const dropdownToggleButton = dropdownToggleSpan.locator('button.action.switch').nth(0);

        // Wait for the dropdown toggle button to be visible
        await dropdownToggleButton.waitFor({ state: 'visible', timeout: 5000 });

        // Click the dropdown toggle button
        await dropdownToggleButton.click();

        // Wait for the sign-out link to be visible within the dropdown
        const signOutLink = this.page.locator('.header.links a:has-text("Sign Out")');
        await signOutLink.waitFor({ state: 'visible', timeout: 5000 });

        // Click the sign-out link
        await signOutLink.click();

        console.log('User logged out successfully!');
    } catch (error) {
        console.error('Error occurred during logout:', error);
    }
}
  }
  
  module.exports = { UserHomePage };
  