# Cloud Function Filtered Logger

A lightweight wrapper for `console` with added timestamp, log level indicator, and styling - for use with adenin cloud functions.

## Installation

Use npm:

```bash
npm install @adenin/cf-logger
```

## Usage

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

If `NODE_ENV=development`, all statements will be logged, if `NODE_ENV=production`, only error statements will be logged.