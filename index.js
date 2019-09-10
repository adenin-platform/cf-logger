/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const {promisify} = require('util');

const readFile = promisify(fs.readFile);

const chalk = require('chalk');
const got = require('got');
const yaml = require('js-yaml');

const date = () => chalk.grey(new Date().toISOString() + ':');

module.exports = {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development') console.log(...[date(), chalk.blue.bold('LOG:')].concat(args));
  },
  info: (...args) => {
    if (process.env.NODE_ENV === 'development') console.info(...[date(), chalk.green.bold('INFO:')].concat(args));
  },
  error: async (...args) => {
    console.error(...[date(), chalk.red.bold('ERROR:')].concat(args));

    if (process.env.LOG_SERVER_URL) {
      const payload = {};

      for (let i = 0; i < args.length; i++) {
        if (args[i] instanceof String && !payload.message) {
          payload.message = args[i];
          continue;
        }

        if (args[i] instanceof Error) {
          payload.message = args[i].message;
          payload.stack = args[i].stack;
        }
      }

      const definition = yaml.safeLoad(await readFile('./_definition.yaml'));

      payload.connector = definition.ConnectorTitle;

      got.post(process.env.LOG_SERVER_URL, {
        method: 'POST',
        json: true,
        body: payload
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
