// utils/exampleErrorHandling.ts

import { BasePage } from "../pages/basePage";
import { logger } from "./logging";

/**
 * ExamplePage demonstrates how to use robust error handling and logging in a page object.
 */
export class ExamplePage extends BasePage {
  async performActions() {
    try {
      await this.init();
      await this.navigate("https://example.com");
      await this.waitForSelector("#login");
      await this.fill("#username", "testuser");
      await this.fill("#password", "password");
      await this.click("#login");
      const welcomeText = await this.getText("#welcome");
      logger.info(`Welcome text: ${welcomeText}`);
    } catch (error) {
      logger.error(`Test failed in ExamplePage.performActions: ${error}`);
      // Optionally rethrow or handle further
    } finally {
      await this.closeBrowser();
    }
  }
}
