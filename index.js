const { normalize } = require('path');
const chalk = require('chalk');

const date = () => chalk.grey(new Date().toISOString() + ': ');

module.exports = {
    log(msg) {
        if (!skip()) {
            console.log(
                date() + chalk.blue(chalk.bold('LOG:   ') + msg)
            );
        }
    },
    info(msg) {
        if (!skip()) {
            console.info(
                date() + chalk.green(chalk.bold('INFO:  ') + msg)
            );
        }
    },
    error(msg) {
        if (!process.env.LOG_FILTER || !skip()) {
            console.error(
                date() + chalk.red(chalk.bold('ERROR: ') + msg)
            );
        }
    },
    warn(msg) {
        if (!skip()) {
            console.warn(
                date() + chalk.yellow(chalk.bold('WARN:  ') + msg)
            );
        }
    },
    debug(msg) {
        if (!skip()) {
            console.debug(
                date() + chalk.magenta(chalk.bold('DEBUG: ') + msg)
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
