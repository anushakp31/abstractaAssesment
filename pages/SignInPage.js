
import { faker } from '@faker-js/faker/locale/en';


class SignInPage {
  constructor(page) {
    
    this.page = page;
    this.firstName = page.locator('#firstname');
    this.lastName=page.locator('#lastname');
    this.emailField=page.locator('#email_address');
    this.password=page.locator('#password');
    this.confirmPassword=page.locator('#password-confirmation');
    this.createAccountButton=page.locator('button[type="submit"].action.submit')
    this.PersonalInfo='legend.legend';


}

async verifySignInPage() {
    await this.firstName.waitFor({ state: 'visible' });
    console.log('First name field is visible.');
  }
  generatePassword() {
    return faker.internet.password({ 
      length: 12, // Adjust the length as needed
      pattern: /[a-zA-Z0-9!@#$%^&*_+-]+/ // Include characters from multiple character classes
    });
}
async fillRegistrationForm() {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: this.generatePassword()
    };

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.emailField.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    console.log(user.email+"   "+user.password)
  }

  async submitRegistrationForm() {
    await this.createAccountButton.click();
    
  }

 




}


module.exports = { SignInPage };
