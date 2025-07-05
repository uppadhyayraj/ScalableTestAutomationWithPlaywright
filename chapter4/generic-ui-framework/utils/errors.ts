/**
 * Represents an error that occurs when performing an action on a DOM element.
 *
 * This error is thrown when a specific action (such as click, type, etc.) fails on a given selector.
 * It wraps the original error and provides additional context about the action and selector involved.
 *
 * @extends Error
 *
 * @example
 * throw new ElementActionError('click', '#submit-button', error);
 *
 * @param action - The action attempted on the element (e.g., 'click', 'type').
 * @param selector - The selector of the element on which the action was attempted.
 * @param originalError - The original error that was thrown during the action.
 */
export class ElementActionError extends Error {
  constructor(action: string, selector: string, originalError: any) {
    super(`Failed to ${action} on selector: ${selector}. Error: ${originalError?.message || originalError}`);
    this.name = 'ElementActionError';
  }
}

/**
 * Represents an error that occurs during navigation to a specified URL.
 *
 * @extends Error
 * @remarks
 * This error is thrown when navigation to a given URL fails for any reason.
 * It includes the target URL and the original error message for easier debugging.
 *
 * @example
 * ```typescript
 * try {
 *   await page.goto('https://example.com');
 * } catch (err) {
 *   throw new NavigationError('https://example.com', err);
 * }
 * ```
 *
 * @param url - The URL that failed to load.
 * @param originalError - The original error encountered during navigation.
 */
export class NavigationError extends Error {
  constructor(url: string, originalError: any) {
    super(`Failed to navigate to URL: ${url}. Error: ${originalError?.message || originalError}`);
    this.name = 'NavigationError';
  }
}

// Add more custom errors as needed
