// Centralized logger utility for backend (Node.js)
// Usage: const logger = require('../utils/logger');
// logger.info('tag', 'message', meta)
// logger.error('tag', 'message', error)

const util = require('util');

const LEVELS = {
  INFO: 'INFO',
  ERROR: 'ERROR',
  WARN: 'WARN',
  DEBUG: 'DEBUG',
};

function formatLog(level, tag, message, meta) {
  const timestamp = new Date().toISOString();
  let log = `[${timestamp}] [${level}] [${tag}] ${message}`;
  if (meta) {
    if (meta instanceof Error) {
      log += `\n${meta.stack}`;
    } else if (typeof meta === 'object') {
      log += `\n${util.inspect(meta, { depth: 3, colors: false })}`;
    } else {
      log += `\n${meta}`;
    }
  }
  return log;
}

const logger = {
  info: (tag, message, meta) => {
    console.log(formatLog(LEVELS.INFO, tag, message, meta));
  },
  error: (tag, message, error) => {
    console.error(formatLog(LEVELS.ERROR, tag, message, error));
  },
  warn: (tag, message, meta) => {
    console.warn(formatLog(LEVELS.WARN, tag, message, meta));
  },
  debug: (tag, message, meta) => {
    console.debug(formatLog(LEVELS.DEBUG, tag, message, meta));
  },
};

module.exports = logger;
