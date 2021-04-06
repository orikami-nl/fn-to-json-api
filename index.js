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

    const { token, ...filteredPostData} = postData

    postData = filteredPostData
  } else if(req.method === "OPTIONS") {
    // Empty response on an OPTIONS request (CORS)
    return "OK";
  }

  let headerParams = {}

  if (
    req.headers.authorization &&
    req.headers.authorization.match(/bearer /i)
  ) {
    headerParams['token'] = req.headers.authorization.substr(7);
  }

  const queryParams = query(req);
  const data = {
    ...queryParams,
    ...postData,
    ...headerParams
  }

  return await handler(data, req, res);
};
