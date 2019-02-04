/* eslint-disable no-console */
'use strict';

const {normalize} = require('path');
const chalk = require('chalk');

const date = () => chalk.grey(new Date().toISOString() + ': ');

module.exports = {
    log(msg) {
        if (!skip()) {
            if (typeof msg === 'object') {
                console.log(date() + chalk.blue.bold('LOG:'));
                console.log(msg);
            } else {
                console.log(date() + chalk.blue.bold('LOG: ') + msg);
            }
        }
    },
    info(msg) {
        if (!skip()) {
            if (typeof msg === 'object') {
                console.info(date() + chalk.green.bold('INFO:'));
                console.info(msg);
            } else {
                console.info(date() + chalk.green.bold('INFO: ') + msg);
            }
        }
    },
    error(msg) {
        if (!process.env.LOG_FILTER || !skip()) {
            if (typeof msg === 'object') {
                console.error(date() + chalk.red.bold('ERROR:'));
                console.error(msg);
            } else {
                console.error(date() + chalk.red.bold('ERROR: ') + msg);
            }
        }
    },
    warn(msg) {
        if (!skip()) {
            if (typeof msg === 'object') {
                console.warn(date() + chalk.yellow.bold('WARN:'));
                console.warn(msg);
            } else {
                console.warn(date() + chalk.yellow.bold('WARN: ') + msg);
            }
        }
    },
    debug(msg) {
        if (!skip()) {
            if (typeof msg === 'object') {
                console.debug(date() + chalk.magenta.bold('DEBUG:'));
                console.debug(msg);
            } else {
                console.debug(date() + chalk.magenta.bold('DEBUG: ') + msg);
            }
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
