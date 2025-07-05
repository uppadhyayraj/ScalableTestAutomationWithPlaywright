// playwright.config.ts

import { PlaywrightTestConfig } from "@playwright/test";

import { getEnvironment } from "./config/environments";

const config: PlaywrightTestConfig = {
  // Directory where test files are located

  testDir: "./tests",

  // Maximum time (in milliseconds) for a test to run

  timeout: getEnvironment().timeout, // This will use the timeout from the environment configuration

  // Configuration for all tests

  use: {
    // Base URL for API requests, simplifying endpoint paths

    baseURL: getEnvironment().baseURL, // This will use the base URL from the environment configuration

    // Common HTTP headers applied to all requests

    extraHTTPHeaders: {
      "Content-Type": "application/json",

      "x-api-key": "reqres-free-v1", //This is API key which we got from https://reqres.in/signup

      // 'Authorization': `Bearer ${process.env.API_TOKEN}`, // Example for dynamic token
    },

    // Optional: Trace collection upon test failure for debugging

    trace: "on-first-retry",

    // Optional: Context options for all requests (e.g., ignoreHTTPSErrors)

    // ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "api-tests",

      testMatch: "**/*.spec.ts",

      retries: getEnvironment().retries, // Number of retries for failed tests
    },
  ],

  // Reporter to use for test results (e.g., 'html', 'list', 'json', 'junit')

  reporter: "html",
};

export default config;
