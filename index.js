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

    if (process.env.LOG_SERVER_URL) {
      got.post(process.env.LOG_SERVER_URL, {
        method: 'POST',
        json: true,
        body: {
          error: args
        }
      });
    }
  },
  warn: (...args) => {
    if (process.env.NODE_ENV === 'development') console.warn(...[date(), chalk.yellow.bold('WARN:')].concat(args));
  },
  debug: (...args) => {
    if (process.env.NODE_ENV === 'development') console.debug(...[date(), chalk.magenta.bold('DEBUG:')].concat(args));
  }
};
