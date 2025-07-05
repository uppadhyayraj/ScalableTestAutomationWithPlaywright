// pages/loginPage.ts

import { BasePage } from "./basePage"; // Import the foundational BasePage

import { logger } from "../utils/logging"; // Import our Logger Facade

/** 

 * Represents the Login Page of the application. 

 * This Page Object encapsulates all elements and actions specific to the login functionality, 

 * inheriting common web interaction methods from BasePage. 

 */

export class LoginPage extends BasePage {
  // Page-specific selectors (locators) are defined here.

  // Using 'readonly' for good practice, indicating these won't change after initialization.

  private readonly usernameInput = "#user-name";

  private readonly passwordInput = "#password";

  private readonly loginButton = "#login-button";

  private readonly errorMessage = ".error-message-container.error"; // Example for error message selector

  /** 

   * Constructor for the LoginPage. 

   * It calls the BasePage constructor to ensure proper initialization. 

   */

  constructor() {
    super(); // Call the constructor of the BasePage
  }

  /** 

   * Performs a login operation on the page using provided credentials. 

   * This method uses inherited `fill` and `click` methods from BasePage. 

   * It also includes logging for each step to provide clear execution trace. 

   * @param username The username string to enter into the username field. 

   * @param password The password string to enter into the password field. 

   * @returns A promise that resolves to a boolean indicating whether the login action appeared successful (e.g., no immediate error). 

   */

  async login(username: string, password: string): Promise<boolean> {
    try {
      await this.fill(this.usernameInput, username);

      logger.info(`Entered username: "${username}" on login page.`);

      await this.fill(this.passwordInput, password);

      logger.info(
        "Entered password on login page (value hidden for security)."
      );

      await this.click(this.loginButton);

      logger.info("Clicked login button.");

      // Optional: Add a wait for navigation or check for error message to confirm success/failure.

      // For this example, we assume success if no exception is thrown immediately.

      return true;
    } catch (error: any) {
      logger.error(`Login action failed: ${error.message}.`);

      return false; // Indicate failure
    }
  }

  /** 

   * Retrieves the text of the login error message, if present. 

   * @returns A promise that resolves to the error message text, or null if not found. 

   */

  async getErrorMessage(): Promise<string | null> {
    return await this.getText(this.errorMessage);
  }

  /** 

   * Checks if the login error message is visible on the page. 

   * @returns A promise that resolves to a boolean indicating visibility. 

   */

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
