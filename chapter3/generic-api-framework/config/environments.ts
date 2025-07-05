/** 

* Represents the configuration settings for a specific environment. 

* 

* @property baseURL - The base URL for the API endpoints. 

* @property apiKey - (Optional) The API key used for authentication. 

* @property timeout - The request timeout duration in milliseconds. 

* @property retries - The number of retry attempts for failed requests. 

*/

export interface Environment {
  baseURL: string;

  apiKey?: string;

  timeout: number;

  retries: number;
}

export const // Define a type-safe object to store configuration for different environments.

  // Each environment (dev, staging, prod) has its own settings.

  environments: Record<string, Environment> = {
    // Development environment settings

    dev: {
      // Base URL for API requests in development

      baseURL: "https://reqres.in",

      // Maximum time (in milliseconds) to wait for a response

      timeout: 30000,

      // Number of times to retry a failed request

      retries: 2,
    },

    // Staging environment settings (used for pre-production testing)

    staging: {
      baseURL: "https://staging.reqres.in",

      timeout: 45000,

      retries: 3,
    },

    // Production environment settings (used in the live app)

    prod: {
      baseURL: "https://reqres.in",

      timeout: 60000,

      retries: 1,
    },
  };

// This structure helps you easily switch between environments

// and ensures consistent configuration management.;

/** 

* Retrieves the current environment configuration based on the `TEST_ENV` environment variable. 

* If `TEST_ENV` is not set, defaults to the 'dev' environment. 

* Falls back to the 'dev' environment configuration if the specified environment is not found. 

* 

* @returns {Environment} The configuration object for the current environment. 

*/

export const getEnvironment = (): Environment => {
  const env = process.env.TEST_ENV || "dev";

  return environments[env] || environments.dev;
};
