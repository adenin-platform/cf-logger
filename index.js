const { normalize } = require('path');

module.exports = {
    log(msg) {
        if (!skip()) console.log(msg);
    },
    info(msg) {
        if (!skip()) console.info(msg);
    },
    error(msg) {
        if (process.env.NODE_ENV == 'production' && !process.env.ENABLE_LOG) {
            console.error(msg);
        } else if (!skip()) {
            console.error(msg);
        }
    },
    warn(msg) {
        if (!skip()) console.warn(msg);
    },
    debug(msg) {
        if (!skip()) console.debug(msg);
    }
};

function skip() {
    if (process.env.ENABLE_LOG) {
        const loggables = process.env.ENABLE_LOG.split(';');

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
