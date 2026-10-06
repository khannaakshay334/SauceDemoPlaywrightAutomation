// @ts-check
const { test, expect } = require('@playwright/test'); //imported test and expect from playwright test
const {LoginPage} = require('../pages/LoginPage'); //imported login page from pages folder
const users = require('../data/users'); //imported users data from data folder
const constants = require('../data/constants'); //imported constants data from data folder

/** @type {LoginPage} */
let loginPage; //declared loginPage variable

test.beforeEach(async ({ page }) => { //before each test will run every time before the test case
  loginPage = new LoginPage(page); //initialize loginPage with the current page
  await loginPage.open(); //open the login page before each test
});


//testcase-1 Login Scenario
test('user can login with valid credentials @smoke', async({ page }) => {
  await loginPage.login(users.standard_user.username, users.standard_user.password); // Use the login method from LoginPage
  //await expect(page).toHaveURL(constants.urls.inventory); //assertion to verify successful login
  await expect(page.getByText(constants.text.productTitle)).toBeVisible(); //assertion to verify that the user is on the products page
  
});

