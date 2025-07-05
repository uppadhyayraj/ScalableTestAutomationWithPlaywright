import { expect } from "@playwright/test";

import { User, UserListResponse } from "../models/user"; //Using the models

/** 

* ResponseValidator - Validates API response data against TypeScript interfaces. 

* Ensures API contracts are maintained and catches breaking changes early. 

*/

export class ResponseValidator {
  /** 

  * Validates User object structure and data types. 

  * Checks required properties, types, and formats (email, URL). 

  */

  static validateUser(user: any): asserts user is User {
    // Property existence checks

    expect(user).toHaveProperty("id");

    expect(user).toHaveProperty("email");

    expect(user).toHaveProperty("first_name");

    expect(user).toHaveProperty("last_name");

    expect(user).toHaveProperty("avatar");

    // Type validations

    expect(typeof user.id).toBe("number");

    expect(typeof user.email).toBe("string");

    expect(typeof user.first_name).toBe("string");

    expect(typeof user.last_name).toBe("string");

    expect(typeof user.avatar).toBe("string");

    // Format validations

    expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Valid email format

    expect(user.avatar).toMatch(/^https?:\/\/.+/); // Valid URL format
  }

  /** 

  * Validates UserListResponse structure including pagination metadata. 

  * Validates each user in the data array and pagination constraints. 

  */

  static validateUserList(response: any): asserts response is UserListResponse {
    // Pagination properties

    expect(response).toHaveProperty("page");

    expect(response).toHaveProperty("per_page");

    expect(response).toHaveProperty("total");

    expect(response).toHaveProperty("total_pages");

    expect(response).toHaveProperty("data");

    expect(response).toHaveProperty("support");

    // Data structure validation

    expect(Array.isArray(response.data)).toBeTruthy();

    expect(response.support).toHaveProperty("url");

    expect(response.support).toHaveProperty("text");

    // Type checks for pagination

    expect(typeof response.page).toBe("number");

    expect(typeof response.per_page).toBe("number");

    expect(typeof response.total).toBe("number");

    expect(typeof response.total_pages).toBe("number");

    expect(typeof response.support.url).toBe("string");

    expect(typeof response.support.text).toBe("string");

    // Business logic validation

    expect(response.page).toBeGreaterThan(0);

    expect(response.per_page).toBeGreaterThan(0);

    expect(response.total).toBeGreaterThanOrEqual(0);

    expect(response.total_pages).toBeGreaterThanOrEqual(0);

    // Page bounds check

    if (response.total_pages > 0) {
      expect(response.page).toBeLessThanOrEqual(response.total_pages);
    }

    // Validate each user in the array

    response.data.forEach((user: any, index: number) => {
      try {
        this.validateUser(user);
      } catch (error) {
        throw new Error(
          `User validation failed at index ${index}: ${error.message}`
        );
      }
    });
  }

  /** 

  * Validates authentication response (login/register). 

  * Checks for required token and optional user ID. 

  */

  static validateAuthResponse(response: any): void {
    expect(response).toHaveProperty("token");

    expect(typeof response.token).toBe("string");

    expect(response.token.length).toBeGreaterThan(0);

    // Optional ID field (present in registration)

    if (response.hasOwnProperty("id")) {
      expect(typeof response.id).toBe("number");

      expect(response.id).toBeGreaterThan(0);
    }
  }

  /** 

  * Validates error response structure. 

  * Ensures consistent error message format. 

  */

  static validateErrorResponse(response: any): void {
    expect(response).toHaveProperty("error");

    expect(typeof response.error).toBe("string");

    expect(response.error.length).toBeGreaterThan(0);
  }

  /** 

  * Validates user creation/update response. 

  * Checks user data and timestamps (createdAt/updatedAt). 

  */

  static validateUserMutationResponse(response: any): void {
    // User data fields

    expect(response).toHaveProperty("name");

    expect(response).toHaveProperty("job");

    expect(typeof response.name).toBe("string");

    expect(typeof response.job).toBe("string");

    // Timestamp validation

    const hasCreatedAt = response.hasOwnProperty("createdAt");

    const hasUpdatedAt = response.hasOwnProperty("updatedAt");

    const hasId = response.hasOwnProperty("id");

    expect(hasCreatedAt || hasUpdatedAt).toBeTruthy();

    if (hasCreatedAt) {
      expect(typeof response.createdAt).toBe("string");

      expect(new Date(response.createdAt).getTime()).not.toBeNaN();
    }

    if (hasUpdatedAt) {
      expect(typeof response.updatedAt).toBe("string");

      expect(new Date(response.updatedAt).getTime()).not.toBeNaN();
    }

    if (hasId) {
      expect(typeof response.id).toBe("string");

      expect(response.id.length).toBeGreaterThan(0);
    }
  }
}
