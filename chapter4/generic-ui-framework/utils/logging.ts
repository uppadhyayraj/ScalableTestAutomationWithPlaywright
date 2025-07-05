// utils/logging.ts

import { createLogger, format, transports } from "winston"; // Import necessary components from winston

// Create and configure the logger instance

const logger = createLogger({
  level: "info", // Set the default logging level to 'info'. Logs at this level and above will be displayed.

  format: format.combine(
    // Combine multiple log formats

    format.simple() // Simple format: displays message, level, and timestamp
  ),

  transports: [
    // Define where logs should be transported (e.g., console, file, HTTP)

    new transports.Console({
      // Transport logs to the console

      format: format.combine(
        // Combine formats specifically for console output

        format.colorize(), // Add colors to log levels (e.g., info: green, warn: yellow, error: red)

        format.simple() // Keep console output simple
      ),
    }),

    // Add other transports here, e.g., to write logs to a file:

    // new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export { logger }; // Export the configured logger for use throughout the framework
