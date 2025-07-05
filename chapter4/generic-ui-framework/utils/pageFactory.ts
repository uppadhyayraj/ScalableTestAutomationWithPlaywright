// utils/pageFactory.ts

import { LoginPage } from "../pages/loginPage"; // Import specific Page Object classes

import { InventoryPage } from "../pages/inventoryPage";

// No direct import of Playwright's Page here, as it's passed via the Page Objects' init()

/** 

 * A factory class for creating instances of different Page Objects. 

 * This factory abstracts the instantiation logic of Page Objects, 

 * providing a centralized point of control for their creation. 

 */

export class PageFactory {
  /** 

   * Returns an instance of the requested Page Object. 

   * This method uses a switch statement to determine which Page Object to instantiate 

   * based on the provided page name string. 

   * @param pageName The string name of the Page Object to retrieve (e.g., 'LoginPage', 'InventoryPage'). 

   * @returns An instance of the requested Page Object. 

   * @throws Will throw an error if the page name provided does not match any known Page Object. 

   */

  public static getPage(pageName: string): LoginPage | InventoryPage | any {
    // Using union type for better type safety

    switch (pageName) {
      case "LoginPage":
        return new LoginPage(); // Returns an instance of LoginPage

      case "InventoryPage":
        return new InventoryPage(); // Returns an instance of InventoryPage

      // Add more cases here as you create new Page Objects (e.g., 'CheckoutPage', 'ProductDetailPage')

      default:
        throw new Error(
          `Page "${pageName}" not found in PageFactory. Ensure the name is correct and it's added to the factory.`
        );
    }
  }
}
