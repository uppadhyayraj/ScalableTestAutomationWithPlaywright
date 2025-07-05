
import { test, expect } from "@playwright/test";
import { ExamplePage } from "../pages/examplePage";
import { logger } from "../utils/logging";

// This test demonstrates error handling and logging in action

test("Example error handling and logging", async () => {
  const examplePage = new ExamplePage();
  try {
    await examplePage.performActions();
    logger.info("Test completed successfully.");
  } catch (error) {
    logger.error(`Test failed: ${error}`);
    expect(error).toBeFalsy(); // Fails the test if error is thrown
  }
});
