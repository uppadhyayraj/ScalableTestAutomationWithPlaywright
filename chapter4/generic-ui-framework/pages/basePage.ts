import BrowserContext from "../utils/browserContext"; // Import the BrowserContext utility for managing browser instances

import { logger } from "../utils/logging";

import { Page } from "@playwright/test";

/** 

* Represents a base page class that provides common functionalities for interacting with a web page. 

* This class includes methods for initializing the page, navigating to URLs, interacting with elements, 

* and taking screenshots. 

*/

export class BasePage {
  public page: Page;

  constructor() {}

  /** 

    * Initializes the base page by setting up the page instance. 

    * This method retrieves the singleton instance of the BrowserContext 

    * and assigns it to the `page` property. 

    * 

    * @returns {Promise<void>} A promise that resolves when the initialization is complete. 

    */

  async init() {
    this.page = await BrowserContext.getInstance();
  }

  /** 

    * Closes the browser instance. 

    * 

    * This method will close the current browser context instance. 

    * It is an asynchronous operation and should be awaited to ensure 

    * the browser is properly closed before proceeding. 

    * 

    * @returns {Promise<void>} A promise that resolves when the browser instance is closed. 

    */

  async closeBrowser() {
    await BrowserContext.closeInstance();
  }

  /** 

    * Navigates to the specified URL. 

    * 

    * @param url - The URL to navigate to. 

    * @returns A promise that resolves when the navigation is complete. 

    */

  async navigate(url: string) {
    await this.page.goto(url);
  }

  /** 

    * Clicks on an element specified by the selector. 

    * 

    * @param {string} selector - The CSS selector of the element to be clicked. 

    * @returns {Promise<void>} A promise that resolves when the click action is completed. 

    */

  async click(selector: string) {
    await this.page.click(selector);
  }

  /** 

    * Fills the input field identified by the given selector with the provided text. 

    * 

    * @param selector - The CSS selector of the input field to fill. 

    * @param text - The text to input into the field. 

    * @returns A promise that resolves when the input field has been filled. 

    */

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  /** 

    * Waits for the specified selector to appear in the DOM. 

    * 

    * @param selector - The CSS selector to wait for. 

    * @returns A promise that resolves when the selector is found. 

    */

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector);
  }

  /** 

    * Retrieves the text content of an element specified by the given selector. 

    * 

    * @param {string} selector - The CSS selector of the element to retrieve text from. 

    * @returns {Promise<string | null>} A promise that resolves to the text content of the element, 

    * or null if the element is not found. 

    */

  async getText(selector: string): Promise<string | null> {
    const element = await this.page.$(selector);

    if (!element) {
      return null;
    }

    const text = await element.textContent();

    return text;
  }

  /** 

    * Checks if the element specified by the selector is visible on the page. 

    * 

    * @param selector - The CSS selector of the element to check visibility for. 

    * @returns A promise that resolves to a boolean indicating whether the element is visible. 

    */

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /** 

    * Takes a screenshot of the current page and saves it to the specified path. 

    * 

    * @param name - The name of the screenshot file (without extension). 

    * @returns A promise that resolves when the screenshot has been taken and saved. 

    */

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });

    logger.info(`Screenshot taken: ${name}`);
  }
}
