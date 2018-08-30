const request = require("micro-test-request");
const toJsonApi = require("./index");

const { json } = require("micro");

test("200 POST sync function", async () => {
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

test("200 GET async function", async () => {
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

const echo = data => {
  return data;
};

const echoAsync = async data => {
  await new Promise(resolve => setImmediate(resolve));
  return data;
};
