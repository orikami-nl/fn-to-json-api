# fn-to-json-api

Convert a function to an json rest api. With response and request params.

## Install
```
npm install --save @orikami/fn-to-json-api
```

## Usage

Given a micro function in `index.js`
```
module.exports = (json) => ({ return json; })
```

Convert it to a lambda function in `handler.js`:
```
var fnToJsonApi = require('fn-to-json-api');
var index = require('./index');
module.exports.json = fnToJsonApi(json);
```