const { normalize } = require('path');
const chalk = require('chalk');

module.exports = {
    log(msg) {
        if (!skip()) console.log(new Date().toISOString() + ': ' + chalk.green(msg));
    },
    info(msg) {
        if (!skip()) console.info(new Date().toISOString() + ': ' + chalk.green('INFO: ' + msg));
    },
    error(msg) {
        if (!process.env.LOG_FILTER) {
            console.error(new Date().toISOString() + ': ' + chalk.red('ERROR: ' + msg));
        } else if (!skip()) {
            console.error(new Date().toISOString() + ': ' + chalk.red('ERROR: ' + msg));
        }
    },
    warn(msg) {
        if (!skip()) console.warn(new Date().toISOString() + ': ' + chalk.orange('WARN: ' + msg));
    },
    debug(msg) {
        if (!skip()) console.debug(new Date().toISOString() + ': ' + chalk.magenta('DEBUG: ' + msg));
    }
};

function skip() {
    if (process.env.LOG_FILTER) {
        const loggables = process.env.LOG_FILTER.split(';');

        for (let i = 0; i < loggables.length; i++) {
            if (module.parent.filename.indexOf(normalize(loggables[i])) != -1) {
                return false;
            }   
        }

        return true;
    }

    if (process.env.NODE_ENV == 'development') {
        return false;
    }

    return true;
}
