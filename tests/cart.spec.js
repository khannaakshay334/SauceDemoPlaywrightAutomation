//@ts-check
const { test, expect } = require('@playwright/test'); //imported test and expect from playwright test
const {LoginPage} = require('../pages/LoginPage'); //imported login page from pages folder
const {Inventory} = require('../pages/Inventory'); //imported inventory page from pages folder
const {Cart} = require('../pages/Cart'); //imported cart page from pages folder
const {Checkout} = require('../pages/Checkout'); //imported checkout page from pages folder
const users = require('../data/users'); //imported users data from data folder
const constants = require('../data/constants'); //imported constants data from data folder

/** @type {LoginPage} */
let loginPage; //declared loginPage variable

/** @type {Cart} */
let cart; //declared cart variable

/** @type {Inventory} */
let inventory; 

/** @type {Checkout} */
let checkout; //declared checkout variable

test.beforeEach(async ({ page }) => { //before each test will run every time before the test case
  loginPage = new LoginPage(page); //initialize loginPage with the current page
  inventory = new Inventory(page); //initialize inventoryPage with the current page
  cart = new Cart(page); //initialize cart with the current page
  checkout = new Checkout(page); //initialize checkout with the current page
  await loginPage.open(); //open the login page before each test
  await loginPage.login(users.standard_user.username, users.standard_user.password); // Use the login method from LoginPage
});

test('added products appear correctly in the cart', async ({ page }) => {
    
    await inventory.addProductToCart(constants.productNames.backpack); // Add a product to the cart
    await inventory.addProductToCart(constants.productNames.bikeLight); // Add another product to the cart
    await cart.gotoCartPage(); // Navigate to the cart page
    //await expect(page).toHaveURL(constants.urls.cart); // Assert that the current URL is the cart page URL
    const cartItems = await cart.getAllCartNames(); // Get all product names in the cart
    expect(cartItems).toEqual([constants.productNames.backpack, constants.productNames.bikeLight]); // Assert that the cart contains the correct products
});

test('removing a product from the cart updates the cart correctly', async ({ page }) => {
    await inventory.addProductToCart(constants.productNames.backpack); // Add a product to the cart
    await inventory.addProductToCart(constants.productNames.bikeLight); // Add another product to the cart
    await cart.gotoCartPage(); // Navigate to the cart page
    await cart.removeProductFromCart(constants.productNames.backpack); // Remove a product from the cart
    const cartItems = await cart.getAllCartNames(); // Get all product names in the cart after removal
    expect(cartItems).toEqual([constants.productNames.bikeLight]); // Assert that the cart contains only the remaining product
});

test('add products to cart and proceed to checkout', async ({ page }) => {
    await inventory.addProductToCart(constants.productNames.backpack); // Add a product to the cart
    await inventory.addProductToCart(constants.productNames.bikeLight); // Add another product to the cart
    await cart.gotoCartPage(); // Navigate to the cart page
    await cart.clickCheckout(); // Click the checkout button
    await checkout.fillCheckoutInformation(constants.checkoutInfo.firstName, constants.checkoutInfo.lastName, constants.checkoutInfo.postalCode); // Fill in checkout information
    await checkout.clickContinue(); // Click the continue button
    
});