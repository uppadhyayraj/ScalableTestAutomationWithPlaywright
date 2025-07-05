// utils/browserContext.ts

import { chromium, Browser, Page } from "@playwright/test"; // Import Playwright's core browser components

/** 

 * A singleton class that manages the browser and page instances for UI tests. 

 * This class ensures that only one instance of the browser and page is created and reused 

 * across tests, promoting efficiency and consistent state. 

 */

class BrowserContext {
  // Static variables to hold the single instances of Browser and Page

  private static browserInstance: Browser | null = null;

  private static pageInstance: Page | null = null;

  // Private constructor to prevent direct instantiation of the class from outside.

  private constructor() {}

  /** 

   * Retrieves the singleton instance of the Playwright Page object. 

   * If a browser instance doesn't exist, it launches a new Chromium browser. 

   * If a page instance doesn't exist within that browser, it creates a new page. 

   * @returns A promise that resolves to the Playwright Page instance. 

   */

  public static async getInstance(): Promise<Page> {
    // Step 1: Ensure a single browser instance exists

    if (!BrowserContext.browserInstance) {
      // Launch Chromium browser. Default is headless: false for visible UI during local execution.

      BrowserContext.browserInstance = await chromium.launch({
        headless: false,
      });
    }

    // Step 2: Ensure a single page instance exists within the launched browser

    if (!BrowserContext.pageInstance) {
      // Create a new page context within the browser

      BrowserContext.pageInstance =
        await BrowserContext.browserInstance.newPage();
    }

    // Return the unique page instance

    return BrowserContext.pageInstance;
  }

  /** 

   * Closes the current browser and page instances if they exist, 

   * cleaning up resources after test execution. 

   * This method should typically be called after a test suite completes. 

   * @returns A promise that resolves when both instances are closed. 

   */

  public static async closeInstance(): Promise<void> {
    // First, close the page instance if it's open

    if (BrowserContext.pageInstance) {
      await BrowserContext.pageInstance.close();

      BrowserContext.pageInstance = null; // Reset the static variable
    }

    // Then, close the browser instance if it's open

    if (BrowserContext.browserInstance) {
      await BrowserContext.browserInstance.close();

      BrowserContext.browserInstance = null; // Reset the static variable
    }
  }
}
export default BrowserContext; 