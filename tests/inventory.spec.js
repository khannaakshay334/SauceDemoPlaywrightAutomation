//@ts-check
const { test, expect } = require('@playwright/test'); //imported test and expect from playwright test
const {LoginPage} = require('../pages/LoginPage'); //imported login page from pages folder
const {Inventory} = require('../pages/Inventory'); //imported inventory page from pages folder
const users = require('../data/users'); //imported users data from data folder
const constants = require('../data/constants'); //imported constants data from data folder


/** @type {LoginPage} */
let loginPage; //declared loginPage variable

/** @type {Inventory} */
let inventory; 


test.beforeEach(async ({ page }) => { //before each test will run every time before the test case
  loginPage = new LoginPage(page); //initialize loginPage with the current page
  inventory = new Inventory(page); //initialize inventoryPage with the current page
  await loginPage.open(); //open the login page before each test
  await loginPage.login(users.standard_user.username, users.standard_user.password); // Use the login method from LoginPage
});

test('cart badge should be visible when user adds a product to the cart', async ({ page }) => {
  await inventory.isCartBadgeVisible(); // Check if the cart badge is visible
  await inventory.addProductToCart(constants.productNames.backpack); // Add a product to the cart
  await inventory.addProductToCart(constants.productNames.bikeLight); // Add another product to the cart
  const cartBadgeCount = await inventory.getCartBadgeCount(); // Get the cart badge count
  expect(cartBadgeCount).toBe(2); // Assert that the cart badge count is 2
});

test('Products can be sorted by price low to high', async ({ page }) => {
  await inventory.sortProductsBy(constants.sortOptions.pricelowhi); // Sort products by price low to high
  const prices = await inventory.getProductPrices(); // Get the product prices after sorting
  const sortedPrices = [...prices].sort((a,b) => a - b); // Create a sorted copy of the prices array
  expect(prices).toEqual(sortedPrices); // Assert that the prices are sorted correctly

});

test('Products can be sorted by price high to low', async ({ page }) => {
  await inventory.sortProductsBy(constants.sortOptions.pricehilow); // Sort products by price high to low
  const prices = await inventory.getProductPrices(); // Get the product prices after sorting
  const sortedPrices = [...prices].sort((a,b) => b - a); // Create a sorted copy of the prices array in descending order
  expect(prices).toEqual(sortedPrices); // Assert that the prices are sorted correctly
});


  
