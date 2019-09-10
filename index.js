/* eslint-disable no-console */
'use strict';

const chalk = require('chalk');
const got = require('got');

const date = () => chalk.grey(new Date().toISOString() + ':');

module.exports = {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') console.log(...[date(), chalk.blue.bold('LOG:')].concat(args));
  },
  info: (...args) => {
    if (process.env.NODE_ENV === 'development') console.info(...[date(), chalk.green.bold('INFO:')].concat(args));
  },
  error: (...args) => {
    console.error(...[date(), chalk.red.bold('ERROR:')].concat(args));
    sendCloudLog(args);
  },
  warn: (...args) => {
    if (process.env.NODE_ENV === 'development') console.warn(...[date(), chalk.yellow.bold('WARN:')].concat(args));
  },
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') console.debug(...[date(), chalk.magenta.bold('DEBUG:')].concat(args));
  }
};

function sendCloudLog(args) {
  if (!process.env.LOG_SERVER_URL) return;

  const payload = {
    host: process.env.HOST
  };

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'string' && !payload.message) {
      payload.message = args[i];
      continue;
    }

    if (args[i] instanceof Error) {
      payload.message = args[i].message;
      payload.stack = args[i].stack;
      break;
    }
  }

  const promise = got.post(process.env.LOG_SERVER_URL, {
    method: 'POST',
    json: true,
    body: payload
  });

  promise.catch((error) => {
    console.error(date(), chalk.red.bold('ERROR: when sending logs to cloud'), error);
    promise.cancel();
  });
}
