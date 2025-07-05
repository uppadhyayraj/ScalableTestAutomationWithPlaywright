import { test, expect } from "@playwright/test";
// Import or define userApi
import { UserApi } from "../apis/userApi"; // Adjust the path as needed
import { ApiFactory } from "../utils/apiFactory"; // Adjust the path as needed
import { logger } from "../utils/logger";

test.describe("Validate User Schema without Data Models", () => {
    let userApi: UserApi; // Declare our UserApi instance
  test.beforeAll(async ({ playwright }) => {
    userApi = ApiFactory.getUserApi(await playwright.request.newContext());
  });
    test("Should list users with pagination", async () => {
        const page = 1;

        const response = await userApi.listUsers(page);

        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        // 😰 MANUAL VALIDATION NIGHTMARE - What you'd need without the framework:

        // Check basic structure

        expect(responseBody).toHaveProperty("page");

        expect(responseBody).toHaveProperty("per_page");

        expect(responseBody).toHaveProperty("total");

        expect(responseBody).toHaveProperty("total_pages");

        expect(responseBody).toHaveProperty("data");

        expect(responseBody).toHaveProperty("support");

        // Type checking

        expect(typeof responseBody.page).toBe("number");

        expect(typeof responseBody.per_page).toBe("number");

        expect(typeof responseBody.total).toBe("number");

        expect(typeof responseBody.total_pages).toBe("number");

        expect(Array.isArray(responseBody.data)).toBeTruthy();

        // Support object validation

        expect(responseBody.support).toHaveProperty("url");

        expect(responseBody.support).toHaveProperty("text");

        expect(typeof responseBody.support.url).toBe("string");

        expect(typeof responseBody.support.text).toBe("string");

        // Business logic validation

        expect(responseBody.page).toBeGreaterThan(0);

        expect(responseBody.per_page).toBeGreaterThan(0);

        expect(responseBody.total).toBeGreaterThanOrEqual(0);

        expect(responseBody.total_pages).toBeGreaterThanOrEqual(0);

        if (responseBody.total_pages > 0) {
            expect(responseBody.page).toBeLessThanOrEqual(responseBody.total_pages);
        }

        // Validate each user in the array - THIS IS THE WORST PART

        responseBody.data.forEach((user, index) => {
            expect(user).toHaveProperty("id");

            expect(user).toHaveProperty("email");

            expect(user).toHaveProperty("first_name");

            expect(user).toHaveProperty("last_name");

            expect(user).toHaveProperty("avatar");

            expect(typeof user.id).toBe("number");

            expect(typeof user.email).toBe("string");

            expect(typeof user.first_name).toBe("string");

            expect(typeof user.last_name).toBe("string");

            expect(typeof user.avatar).toBe("string");

            expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            expect(user.avatar).toMatch(/^https?:\/\/.+/);
        });

        // Finally your actual test logic

        expect(responseBody.page).toBe(page);

        expect(responseBody.data.length).toBeGreaterThan(0);

        logger.info(`Users listed for page: ${page}`);
    });
});
