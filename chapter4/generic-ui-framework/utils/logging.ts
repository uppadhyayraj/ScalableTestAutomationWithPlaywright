// utils/logging.ts

import { createLogger, format, transports } from "winston"; // Import necessary components from winston

// Create and configure the logger instance
import * as fs from "fs";
// Ensure logs directory exists
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
      ),
    }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ],
});

export { logger }; // Export the configured logger for use throughout the framework
