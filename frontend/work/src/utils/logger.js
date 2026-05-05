/**
 * Client-side logger: prints to console and (in development) POSTs messages to server /api/logs
 */
import axios from "axios";

// Axios instance for sending logs to server
const logApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000",
});

// Client-side logger
export const clientLogger = {
  send: async (level, tag, message, context) => {
    try {
      // Browser console
      const msg = `[${tag}] ${message}`;
      if (level === "debug") console.debug(msg, context);
      else if (level === "info") console.info(msg, context);
      else if (level === "warn") console.warn(msg, context);
      else console.error(msg, context);

      // Forward to server for terminal logging in development
      if (import.meta.env.MODE === "development") {
        try {
          await logApi.post("/api/logs", { level, tag, message, context });
        } catch {
          // ignore network errors when forwarding logs
        }
      }
    } catch {
      // ignore
    }
  },
  debug: (tag, message, context) =>
    clientLogger.send("debug", tag, message, context),
  info: (tag, message, context) =>
    clientLogger.send("info", tag, message, context),
  warn: (tag, message, context) =>
    clientLogger.send("warn", tag, message, context),
  error: (tag, message, context) =>
    clientLogger.send("error", tag, message, context),
};

export default clientLogger;

// Log tags similar to Kotlin Log tags
export const LogTags = {
  // Auth operations
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  LOGOUT: "LOGOUT",
  SESSIONS: "SESSIONS",
  TOKEN_MANAGER: "TOKEN_MANAGER",

  // Task operations
  TASK_CREATE: "TASK_CREATE",
  TASK_UPDATE: "TASK_UPDATE",
  TASK_DELETE: "TASK_DELETE",
  TASK_FETCH: "TASK_FETCH",
  TASK_ASSIGN: "TASK_ASSIGN",
  TASK_STATUS: "TASK_STATUS",

  // Comment operations
  COMMENT_ADD: "COMMENT_ADD",
  COMMENT_FETCH: "COMMENT_FETCH",

  // API operations
  API_REQUEST: "API_REQUEST",
  API_ERROR: "API_ERROR",

  // General operations
  PAGE_LOAD: "PAGE_LOAD",
  ERROR_HANDLING: "ERROR_HANDLING",
};

// Logger class with methods similar to Log class
export class Logger {
  #isDevelopment = import.meta.env.MODE === "development";

  #formatMessage(level, message, context) {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
  }

  info(message, context) {
    if (this.#isDevelopment) {
      console.log(this.#formatMessage("info", message, context));
    }
  }

  warn(message, context) {
    if (this.#isDevelopment) {
      console.warn(this.#formatMessage("warn", message, context));
    }
  }

  error(message, error, context) {
    const errorContext =
      error instanceof Error
        ? { ...context, error: error.message, stack: error.stack }
        : { ...context, error };

    console.error(this.#formatMessage("error", message, errorContext));
  }

  debug(message, context) {
    if (this.#isDevelopment) {
      console.debug(this.#formatMessage("debug", message, context));
    }
  }

  static d(tag, message) {
    if (import.meta.env.MODE === "development") {
      console.debug(`[${tag}] ${message}`);
    }
  }

  static e(tag, message) {
    console.error(`[${tag}] ${message}`);
  }

  static i(tag, message) {
    if (import.meta.env.MODE === "development") {
      console.info(`[${tag}] ${message}`);
    }
  }

  static w(tag, message) {
    console.warn(`[${tag}] ${message}`);
  }

  static getStackTraceString(error) {
    return error.stack || "No stack trace available";
  }

  // Example API logging methods
  api = {
    request: (method, url, status) =>
      this.debug("API request", { method, url, status }),
    error: (method, url, status, error) =>
      this.error("API error", new Error(error), { method, url, status }),
  };

  // Mask tokens for safe logging
  maskToken(token) {
    if (!token || typeof token !== "string") return "";
    if (token.length <= 12) return token;
    return `${token.slice(0, 6)}...${token.slice(-6)}`;
  }

  static maskToken(token) {
    return new Logger().maskToken(token);
  }
}

export const logger = new Logger();
