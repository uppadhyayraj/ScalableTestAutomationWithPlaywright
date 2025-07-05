import { test, expect } from "@playwright/test";

import { ApiFactory } from "../utils/apiFactory";

import { logger } from "../utils/logger";

import { UserApi } from "../apis/userApi";

import { ResponseValidator } from "../validators/validators";

test.describe("User API Tests", () => {
  let userApi: UserApi;

  test.beforeAll(async ({ playwright }) => {
    userApi = ApiFactory.getUserApi(await playwright.request.newContext());
  });

  test("Should list users with pagination", async () => {
    const page = 1;

    const response = await userApi.listUsers(page);

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    ResponseValidator.validateUserList(responseBody); // 🎯 Single line validates entire structure

    expect(responseBody.page).toBe(page);

    expect(responseBody.data.length).toBeGreaterThan(0);

    logger.info(`Users listed for page: ${page}`);
  });
});
