const { json } = require("micro");
const query = require("micro-query");
module.exports = handler => async (req, res) => {
  const postData = req.method === "POST" ? await json(req) : {};
  const queryParams = query(req);
  const data = Object.assign(queryParams, postData);
  return await handler(data, req, res);
};