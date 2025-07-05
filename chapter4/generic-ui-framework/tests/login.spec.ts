// tests/login.spec.ts

import { test, expect } from "@playwright/test"; // Import Playwright test runner and assertion library

import { PageFactory } from "../utils/pageFactory"; // Our Page Object Factory

import users from "../data/users.json"; // Test data for users

import { logger } from "../utils/logging"; // Our Logger Facade

import { LoginPage } from "../pages/loginPage"; // The LoginPage Page Object

// Define a test suite for login functionalities

test.describe("Login Functionality Tests", () => {
  let loginPage: LoginPage; // Declare an instance of our LoginPage

  /** 

  * `test.beforeEach` hook: Runs before each test in this describe block. 

  * It ensures a fresh LoginPage instance and browser context for every test, 

  * isolating test states. 

  */

  test.beforeEach(async () => {
    // Obtain an instance of LoginPage via our PageFactory.

    // This uses our Factory Pattern to create the Page Object.

    loginPage = PageFactory.getPage("LoginPage") as LoginPage;

    // Initialize the Page Object, which retrieves the Playwright Page instance

    // from our Singleton BrowserContext.

    await loginPage.init();

    logger.info("Login test setup: LoginPage initialized.");
  });

  // Test case 1: Verify that a standard user can log in successfully.

  test("Standard user can login successfully", async () => {
    // Navigate to the base URL (defined in playwright.config.ts)

    // This uses the navigate method inherited from BasePage.

    await loginPage.navigate("/");

    logger.info("Navigated to login page.");

    // Perform the login action using the LoginPage's high-level method.

    // This encapsulates fill and click actions.

    const loginSuccess = await loginPage.login(
      users.standardUser.username,
      users.standardUser.password
    );

    // Assertions:

    expect(loginSuccess).toBeTruthy(); // Verify the login method reported success

    // Verify the URL indicates a successful navigation to the inventory page.

    expect(await loginPage.page.url()).toContain("/inventory.html");

    logger.info(
      "Login test passed: Standard user successfully logged in and navigated to inventory."
    );
  });

  // Test case 2: Verify that a "Performance Glitch" user can log in successfully.

  test("Performance Glitch user can login successfully", async () => {
    await loginPage.navigate("/");

    logger.info("Navigated to login page for Performance Glitch user test.");

    const loginSuccess = await loginPage.login(
      users.performance_glitch_user.username,
      users.performance_glitch_user.password
    );

    // Assertions:

    expect(loginSuccess).toBeTruthy();

    expect(await loginPage.page.url()).toContain("/inventory.html");

    logger.info(
      "Login test passed: Performance Glitch user successfully logged in."
    );
  });

  // Test case 3 (Negative Scenario): Verify a locked-out user cannot log in.

  test("Locked out user should not be able to login", async () => {
    await loginPage.navigate("/");

    logger.info("Navigated to login page for locked out user test.");

    const loginSuccess = await loginPage.login(
      users.locked_out_user.username,
      users.locked_out_user.password
    );

    // Assertions:

    expect(loginSuccess).toBeFalsy(); // The login method should report failure or throw an error

    // Verify the URL remains on the login page (or redirects back).

    expect(await loginPage.page.url()).toContain("saucedemo.com"); // Still on login or redirected back

    // Verify specific error message is visible and its content.

    expect(await loginPage.isErrorMessageVisible()).toBeTruthy();

    expect(await loginPage.getErrorMessage()).toContain(
      "Epic sadface: Sorry, this user has been locked out."
    );

    logger.info(
      "Login test passed: Locked out user correctly blocked with error message."
    );
  });

  /** 

  * `test.afterEach` hook: Runs after each test in this describe block. 

  * It closes the Playwright Page and Browser instances, ensuring a clean state 

  * for the next test run or suite. 

  */

  test.afterEach(async () => {
    // Close the Page instance managed by the Page Object.

    // This also triggers the closing of the Browser instance via the Singleton BrowserContext.

    await loginPage.closeBrowser();

    logger.info("Login test teardown: Browser and Page closed.");
  });
});
