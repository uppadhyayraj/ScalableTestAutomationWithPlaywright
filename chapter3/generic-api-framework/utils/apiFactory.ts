// utils/apiFactory.ts

import { APIRequestContext } from "@playwright/test";

import { UserApi } from "../apis/userApi";

// Import other API classes as they are created (e.g., import { RegisterApi } from '../apis/registerApi';)

/** 

 * A factory class for creating instances of various API classes. 

 * This factory handles the creation and initialization of API instances, 

 * ensuring they are properly configured with the necessary APIRequestContext. 

 */

export class ApiFactory {
  /** 

   * Retrieves an instance of the UserApi. 

   * It obtains the singleton APIRequestContext and uses it to create a new UserApi instance. 

   * @param requestContext The APIRequestContext to use for the API instance. 

   * @returns A promise that resolves to an instance of UserApi. 

   */

  public static getUserApi(requestContext: APIRequestContext): UserApi {
    // Note: In Playwright tests, 'request' fixture directly provides APIRequestContext,

    // so we pass it from the test instead of calling ApiContext.getInstance() every time.

    // However, ApiContext.getInstance() is used at a higher level (e.g., in a test's global setup or hook)

    // to ensure the 'requestContext' itself is a singleton or managed.

    return new UserApi(requestContext);
  }

  // Example: How you would add a new API to the factory

  /* 

  public static getRegisterApi(requestContext: APIRequestContext): RegisterApi { 

      return new RegisterApi(requestContext); 

  } 

  */

  /** 

   * A more generic factory method for illustration, if desired. 

   * @param apiName The name of the API class to retrieve. 

   * @param requestContext The APIRequestContext to use. 

   * @returns An instance of the requested API. 

   * @throws Will throw an error if the API name is not found. 

   */

  public static getApi(apiName: string, requestContext: APIRequestContext) {
    switch (apiName) {
      case "UserApi":
        return new UserApi(requestContext);

      // case 'RegisterApi': // Example for a new API

      //   return new RegisterApi(requestContext);

      default:
        throw new Error(`API "${apiName}" not found in ApiFactory.`);
    }
  }
}
