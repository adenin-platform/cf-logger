/* eslint-disable no-console */
'use strict';

const {normalize} = require('path');
const chalk = require('chalk');

const date = () => chalk.grey(new Date().toISOString() + ':');

module.exports = {
  log(...args) {
    if (!skip()) {
      console.log(...[date(), chalk.blue.bold('LOG:')].concat(args));
    }
  },
  info(...args) {
    if (!skip()) {
      console.info(...[date(), chalk.green.bold('INFO:')].concat(args));
    }
  },
  error(...args) {
    if (!process.env.LOG_FILTER || !skip()) {
      console.error(...[date(), chalk.red.bold('ERROR:')].concat(args));
    }
  },
  warn(...args) {
    if (!skip()) {
      console.warn(...[date(), chalk.yellow.bold('WARN:')].concat(args));
    }
  },
  debug(...args) {
    if (!skip()) {
      console.debug(...[date(), chalk.magenta.bold('DEBUG:')].concat(args));
    }
  }
};

function skip() {
  if (process.env.LOG_FILTER) {
    const loggables = process.env.LOG_FILTER.split(';');

    for (let i = 0; i < loggables.length; i++) {
      if (module.parent.filename.indexOf(normalize(loggables[i])) !== -1) {
        return false;
      }
    }

    return true;
  }

  if (process.env.NODE_ENV === 'development') {
    return false;
  }

  return true;
}
