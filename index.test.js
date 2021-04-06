const request = require("micro-test-request");
const toJsonApi = require("./index");

const { json } = require("micro");

test("200 POST sync function", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/?a=query&b=query",
    body: { a: "post", c: "post" },
    handler: toJsonApi(echo)
  });

  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    a: "post", // POST body overwrites query params
    b: "query",
    c: "post"
  });
});

test("200 POST async function", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/?a=query&b=query",
    body: { a: "post", c: "post" },
    handler: toJsonApi(echoAsync)
  });

  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    a: "post", // POST body overwrites query params
    b: "query",
    c: "post"
  });
});

test("200 POST with formdata", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/?a=query&b=query",
    body: "a=post&c=post",
    handler: toJsonApi(echo)
  });

  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    a: "post", // POST body overwrites query params
    b: "query",
    c: "post"
  });
});

test("200 GET async function", async () => {
  expect.assertions(2);
  const res = await request({
    method: "GET",
    url: "/?a=query&b=query",
    handler: toJsonApi(echoAsync)
  });

  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    a: "query",
    b: "query"
  });
});

test("200 POST with bearer token passed within the header", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/?token=URL",
    body: "token=BODY",
    headers: {
      'Authorization': 'bearer HEADER'
    },
    handler: toJsonApi(echo)
  });

  expect(res.statusCode).toBe(200);
  // If the token is in the Authorization header, then it takes a precedence, the same as in the micro-auth0 package.
  // The body token is ignored.
  expect(JSON.parse(res.body)).toEqual({
    token: 'HEADER'
  });
});

test("200 POST with bearer token passed within only the header", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/",
    headers: {
      'Authorization': 'bearer HEADER'
    },
    handler: toJsonApi(echo)
  });

  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    token: 'HEADER'
  });
});

test("200 POST with bearer token passed within the query param", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    url: "/?token=URL",
    body: "token=BODY",
    handler: toJsonApi(echo)
  });

  // If token is in both URL and BODY, then the latter is ignored.
  expect(res.statusCode).toBe(200);
  expect(JSON.parse(res.body)).toEqual({
    token: 'URL'
  });
});

test("200 POST with bearer token passed within only the body", async () => {
  expect.assertions(2);
  const res = await request({
    method: "POST",
    body: "token=BODY",
    handler: toJsonApi(echo)
  });

  expect(res.statusCode).toBe(200);
  // Body token is omitted and ignored.
  expect(JSON.parse(res.body)).toEqual({});
});

const echo = data => data

const echoAsync = async data => {
  await new Promise(resolve => setImmediate(resolve));
  return data;
};
