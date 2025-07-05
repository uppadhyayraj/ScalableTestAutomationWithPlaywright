// playwright.config.ts

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Specifies the directory where your test files are located.

  testDir: "./tests",

  // Configures the number of retries for flaky tests.

  // In CI environments (e.g., Jenkins, GitHub Actions), it's common to allow 1-2 retries.

  // Locally, you might set it to 0 for faster feedback.

  retries: process.env.CI ? 2 : 0,

  // Defines the number of workers (parallel processes) to run tests.

  // In CI, you might specify a fixed number; locally, `undefined` lets Playwright decide.

  workers: process.env.CI ? 1 : undefined, // Example: run with 1 worker in CI, default (based on CPU cores) locally.

  // Configures the test reporter. 'html' generates an interactive HTML report.

  reporter: "html",

  // Defines global settings for all tests and projects.

  use: {
    // Configures trace collection for debugging. 'on-first-retry' captures a trace if a test fails on its first attempt.

    trace: "on-first-retry", // Options: 'off', 'on', 'on-first-retry', 'retain-on-failure'

    // Sets the base URL for all page navigations. This allows you to use relative paths in your tests.

    baseURL: "https://www.saucedemo.com",

    // Sets the maximum time (in milliseconds) for navigation actions to complete.

    navigationTimeout: 5000, // 5 seconds

    // Sets the maximum time for an action (e.g., click, fill) to complete. (Uncomment if needed)

    // actionTimeout: 5000, // 5 seconds
  },

  // Defines different "projects" (configurations) for running tests across various browsers or environments.

  projects: [
    {
      name: "chromium", // Project name for Chrome/Chromium browser

      use: {
        // Spreads Playwright's default desktop Chrome device settings.

        ...devices["Desktop Chrome"],

        // Explicitly specifies the 'chrome' channel for the browser.

        channel: "chrome",

        // Sets the browser to run in non-headless mode (browser UI is visible). Set to true for CI.

        headless: false,

        // Configures launch options for the browser. (Uncomment if needed)

        launchOptions: {
          // slowMo: 50, // Slows down operations by 50ms for visual debugging
        },

        // Optional: Path to a state file for authenticated sessions.

        // storageState: 'auth.json',
      },
    },

    // Example for other browsers (uncomment and configure as needed):

    /* 

    { 

      name: 'firefox', 

      use: { 

        ...devices['Desktop Firefox'], 

        headless: false, 

      }, 

    }, 

    { 

      name: 'webkit', 

      use: { 

        ...devices['Desktop Safari'], 

        headless: false, 

      }, 

    }, 

    */
  ],
});
