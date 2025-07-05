// tests/inventory.spec.ts

import { test, expect } from "@playwright/test"; // Import Playwright test runner and assertion library

import { PageFactory } from "../utils/pageFactory"; // Our Page Object Factory

import users from "../data/users.json"; // Test data for users

import products from "../data/products.json"; // Test data for products

import { logger } from "../utils/logging"; // Our Logger Facade

import { LoginPage } from "../pages/loginPage"; // LoginPage Page Object

import { InventoryPage } from "../pages/inventoryPage"; // InventoryPage Page Object

// Define a test suite for inventory functionalities

test.describe("Inventory Functionality Tests", () => {
  let loginPage: LoginPage; // Instance of LoginPage

  let inventoryPage: InventoryPage; // Instance of InventoryPage

  /** 

  * `test.beforeEach` hook: Runs before each test in this describe block. 

  * It sets up the browser context, navigates to login, and logs in a standard user 

  * as a prerequisite for inventory actions. 

  */

  test.beforeEach(async () => {
    // Get instances of both LoginPage and InventoryPage via PageFactory.

    loginPage = PageFactory.getPage("LoginPage") as LoginPage;

    inventoryPage = PageFactory.getPage("InventoryPage") as InventoryPage;

    // Initialize both Page Objects to ensure they have the Playwright Page instance.

    await loginPage.init();

    await inventoryPage.init(); // Both will use the same singleton Page instance.

    logger.info("Inventory test setup: Navigating to login and logging in.");

    // Navigate to login page and perform login as a standard user.

    await loginPage.navigate("/");

    await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // After successful login, the URL should automatically be the inventory page.

    // expect(await loginPage.page.url()).toContain('/inventory.html'); // Could assert URL here

    logger.info("Inventory test setup complete: Logged in as standard user.");
  });

  // Test case 1: Verify adding and then removing an item from the cart.

  test("Should add and remove an item from the cart", async () => {
    // Use `test.step` for better reporting granularity in Playwright HTML reports.

    await test.step("Add item to cart", async () => {
      // Add the first product from our products.json data to the cart.

      await inventoryPage.addItemToCart(products[0].name);

      // Assert that the cart item count is now 1.

      expect(await inventoryPage.getCartItemCount()).toBe(1);

      logger.info(
        `Successfully added "${products[0].name}" to cart. Cart count: 1.`
      );
    });

    await test.step("Remove item from cart", async () => {
      // Remove the same product from the cart.

      await inventoryPage.removeItemFromCart(products[0].name);

      // Assert that the cart item count is now 0.

      expect(await inventoryPage.getCartItemCount()).toBe(0);

      logger.info(
        `Successfully removed "${products[0].name}" from cart. Cart count: 0.`
      );
    });
  });

  // Test case 2: Verify adding multiple items to the cart.

  test("Should add multiple items to the cart", async () => {
    await inventoryPage.addItemToCart(products[0].name);

    expect(await inventoryPage.getCartItemCount()).toBe(1);

    await inventoryPage.addItemToCart(products[1].name);

    expect(await inventoryPage.getCartItemCount()).toBe(2);

    await inventoryPage.addItemToCart(products[2].name);

    expect(await inventoryPage.getCartItemCount()).toBe(3);

    logger.info("Successfully added multiple items to cart. Cart count: 3.");
  });

  /** 

  * `test.afterEach` hook: Runs after each test in this describe block. 

  * It closes the Playwright Page and Browser instances, ensuring a clean state. 

  */

  test.afterEach(async () => {
    // Close the Page and Browser instances via the methods inherited from BasePage.

    await loginPage.closeBrowser(); // Or inventoryPage.closeBrowser() - both refer to the same singleton.

    logger.info("Inventory test teardown: Browser and Page closed.");
  });
});
