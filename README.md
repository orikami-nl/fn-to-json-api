# fn-to-json-api

Transform business logic (`data => {}`) to a micro server handler (`(req,res) => {}`)

`data` will be the JSON POST body and GET query parameters.

## Install
```
npm install --save @orikami-nl/fn-to-json-api
```

## Usage

Given some business logic in `index.js`:
```
module.exports = (data, req, res) => { return data; }
```

Convert it to a micro server handler in `handler.js`:
```
var toJsonAPI = require('fn-to-json-api');
var fn = require('./index');

const handler = toJsonAPI(fn);
module.exports = handler;
```

`data` will contain the POST data and query parameters. POST will override query parameters.

## Changelog

- 0.3.3 - Taking the token either from URL or HEADER but never from BODY to make sure the token got verified
- 0.3.2 - Update/cleanup dependencies packages
- 0.3.1 - Return emptry response on OPTIONS request
- 0.2.0 - Add support for formencoded POST request
- 0.1.0 - Refactor
- 0.0.2 - Initial release
