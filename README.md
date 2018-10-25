# Cloud Function Filtered Logger

A wrapper for `console` which allows you to turn execution of console statements on or off per file or per directory through an environment variable. Was built for use within cloud functions to enable logging when required without having to alter source code.

## Installation

Use npm:

```bash
npm install @adenin/cf-logger
```

## Usage

Due to the internal use of `module.parent` to resolve file paths, every file which wishes to use this logger must require it (i.e., it will not function if passed between files).

The environment variable it will search for is `ENABLE_LOG`, which should contain a `;` delimited list of file names or directories for which you want to enable logging. 

For example, an entry `index.js` would enable logging in all files called `index.js`, an entry `mymodule/` would enable logging in all files in the directory `mymodule` and below, and an entry `mymodule/dosomething.js` would enable logging only for that one file.

A file which wishes to use the logger simply needs to import it, then use its methods, as follows:

```js
const logger = require('@adenin/cf-logger');

const msg = 'Hello world!';

logger.log(msg);
logger.info(msg);
logger.warn(msg);
logger.debug(msg);
logger.error(msg);
```
