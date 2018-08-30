const { json, text } = require("micro");
const query = require("micro-query");
const { parse } = require("qs");

module.exports = handler => async (req, res) => {
  let postData = {};
  if (req.method === "POST") {
    try {
      postData = await json(req);
    } catch (err) {
      postData = await text(req);
      postData = parse(postData);
    }
  }
  const queryParams = query(req);
  const data = Object.assign(queryParams, postData);
  return await handler(data, req, res);
};
