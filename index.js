const { normalize } = require('path');

module.exports = {
    log(msg) {
        if (skip()) return;
    
        console.log(msg);
    },
    info(msg) {
        if (skip()) return;
    
        console.info(msg);
    },
    error(msg) {
        if (skip()) return;
    
        console.error(msg);
    },
    warn(msg) {
        if (skip()) return;
    
        console.warn(msg);
    },
    debug(msg) {
        if (skip()) return;

        console.debug(msg);
    }
};

function skip() {
    if (!process.env.ENABLE_LOG) {
        return true;
    }

    const loggables = process.env.ENABLE_LOG.split(';');

    for (let i = 0; i < loggables.length; i++) {
        if (module.parent.filename.indexOf(normalize(loggables[i])) != -1) {
            return false;
        }
    }

    return true;
}
