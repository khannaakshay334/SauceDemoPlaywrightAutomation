// write down business validation for login page

class LoginPage {
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL; // Use the base URL from the .env file

    // Define locators for the login page elements
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open(){
    console.log(`Navigating to base URL: ${this.baseURL}`); // Log the base URL for debugging
    await this.page.goto(this.baseURL); // Navigate to the base URL
    console.log(`Current URL after navigation: ${this.page.url()}`); // Log the current URL for debugging
  }

  async login(username, password) {
    await this.usernameInput.fill(username); // Fill in the username
    await this.passwordInput.fill(password); // Fill in the password
    await this.loginButton.click(); // Click the login button
  }

}

module.exports = { LoginPage };