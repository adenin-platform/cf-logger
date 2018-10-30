const { normalize } = require('path');
const chalk = require('chalk');

module.exports = {
    log(msg) {
        if (!skip()) {
            console.log(
                chalk.grey(new Date().toISOString() + ': ') + 
                chalk.blue.bold('LOG: ') + chalk.blue(msg)
            );
        }
    },
    info(msg) {
        if (!skip()) {
            console.info(
                chalk.grey(new Date().toISOString() + ': ') + 
                chalk.green.bold('INFO: ') + chalk.green(msg)
            );
        }
    },
    error(msg) {
        if (!process.env.LOG_FILTER || !skip()) {
            console.error(
                chalk.grey(new Date().toISOString() + ': ') + 
                chalk.red.bold('ERROR: ') + chalk.red(msg)
            );
        }
    },
    warn(msg) {
        if (!skip()) {
            console.warn(
                chalk.grey(new Date().toISOString() + ': ') + 
                chalk.yellow.bold('WARN: ') + chalk.yellow(msg)
            );
        }
    },
    debug(msg) {
        if (!skip()) {
            console.debug(
                chalk.grey(new Date().toISOString() + ': ') + 
                chalk.magenta.bold('DEBUG: ') + chalk.magenta(msg)
            );
        }
    }
};

function skip() {
    if (process.env.LOG_FILTER) {
        const loggables = process.env.LOG_FILTER.split(';');

        for (let i = 0; i < loggables.length; i++) {
            if (module.parent.filename.indexOf(
                    normalize(loggables[i])
                ) != -1) {
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
