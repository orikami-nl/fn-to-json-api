const request = require("micro-test-request");
const { postJsonApi } = require("./index");

const { json } = require("micro");

test("200 sync function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handler)
    });

    expect(res.statusCode).toBe(200);
});

test("200 async function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handlerAsync)
    });

    expect(res.statusCode).toBe(200);
});

test("500 error function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handlerError)
    });

    expect(res.statusCode).toBe(500);
});

test("500 error asycn function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handlerAsyncError)
    });

    expect(res.statusCode).toBe(500);
});

test("401 error function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handlerError401)
    });

    expect(res.statusCode).toBe(401);
});

test("401 error asycn function", async () => {
    const res = await request({
        method: "POST",
        url: "/",
        headers: {
            authorization: "Bearer OK"
        },
        body: { hello: "world" },
        handler: postJsonApi(handlerAsyncError401)
    });

    expect(res.statusCode).toBe(401);
});

const waitOneSecond = () => {
    return new Promise(resolve => setTimeout(() => resolve(), 1000));
};

const handler = data => {
    return "Hello world!";
};

const handlerAsync = async data => {
    data = await waitOneSecond();
    return data;
};

const handlerError = data => {
    throw new Error("Goes wrong");
};

const handlerAsyncError = async data => {
    data = await waitOneSecond();
    throw new Error("Goes wrong");
};

const handlerError401 = data => {
    throw new Error("401: Goes wrong");
};

const handlerAsyncError401 = async data => {
    await waitOneSecond();
    throw new Error("401: Goes wrong");
};