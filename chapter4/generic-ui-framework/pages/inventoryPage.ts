// pages/inventoryPage.ts

import { BasePage } from "./basePage"; // Import the foundational BasePage

import { logger } from "../utils/logging"; // Import our Logger Facade

/** 

 * Represents the Inventory Page of the application after successful login. 

 * This Page Object encapsulates elements and actions specific to managing inventory items and the shopping cart. 

 */

export class InventoryPage extends BasePage {
  // Page-specific selectors (locators) are defined here.

  private readonly shoppingCartBadge = ".shopping_cart_badge";

  private readonly shoppingCartIcon = "#shopping_cart_container"; // Example: if we need to click it

  /** 

   * Constructor for the InventoryPage. 

   * It calls the BasePage constructor for proper setup. 

   */

  constructor() {
    super(); // Call the constructor of the BasePage
  }

  /** 

   * Adds a specific item to the shopping cart. 

   * This method locates the item by its name and then clicks its associated "Add to cart" button. 

   * It demonstrates interaction with dynamically identified elements. 

   * @param itemName The visible name of the product to add (e.g., "Sauce Labs Backpack"). 

   * @returns A promise that resolves when the item has been added to the cart. 

   */

  async addItemToCart(itemName: string): Promise<void> {
    // Locating the item's name and then its "Add to cart" button relative to it, or directly.

    // For simplicity, we assume clicking the item name might take us to its detail page,

    // and then we click its 'Add to cart' button. Or, we target the button directly.

    // The provided source used `text=${itemName}` which Playwright handles very well.

    // Assuming the "Add to cart" button is right next to the item name on the product listing.

    // More robust selectors might involve parent/child relationships or data attributes.

    // Playwright's `:has-text()` selector is powerful for this.

    const addButtonSelector = `button:has-text("Add to cart"):below(:text("${itemName}"))`; // Button below the item name

    // Or simpler if button is specific to product: `[data-test="add-to-cart-${kebabCase(itemName)}"]`

    await this.click(addButtonSelector);

    logger.info(`Added item to cart: "${itemName}"`);
  }

  /** 

   * Removes a specific item from the shopping cart. 

   * This method locates the item by its name and then clicks its associated "Remove" button. 

   * @param itemName The visible name of the product to remove (e.g., "Sauce Labs Backpack"). 

   * @returns A promise that resolves when the item has been removed from the cart. 

   */

  async removeItemFromCart(itemName: string): Promise<void> {
    // Similar to adding, locate the remove button.

    const removeButtonSelector = `button:has-text("Remove"):below(:text("${itemName}"))`;

    await this.click(removeButtonSelector);

    logger.info(`Removed item from cart: "${itemName}"`);
  }

  /** 

   * Retrieves the current count of items displayed in the shopping cart badge. 

   * @returns A promise that resolves to the numerical count of items in the cart, or 0 if not found. 

   */

  async getCartItemCount(): Promise<number> {
    const countText = await this.getText(this.shoppingCartBadge);

    // Parse the text content to an integer. If null or empty, default to 0.

    const count = parseInt(countText ?? "0", 10);

    logger.info(`Current cart item count: ${count}`);

    return count;
  }
}
