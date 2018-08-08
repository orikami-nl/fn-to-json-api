const { json } = require("micro");

// const getJsonApi = (handler = (req, res) => {});

const postJsonApi = handler => async (req, res) => {
    try {
        const data = await json(req);
        const result = await handler(data);

        return result;
    } catch (err) {
        let statusCode = 500;
        const match = err.message.match(/^([4-5][0-9]{2}): /);
        if (match) {
            statusCode = parseInt(match[1]);
        }
        res.statusCode = statusCode;
        return {
            statusCode,
            message: err.message,
            // MAGIC!!!! WHat will it do? Run to figure out...
            stack: err.stack
                .replace(/^\s+at\s+/gm, "")
                .split("\n")
                .splice(1)
        };
    }
};

module.exports.postJsonApi = postJsonApi;


// const businessFunction = (opts) => {
//     return opts.a + opts.b;
// }


// // Native
// const naiveApiFunction = async (req, res) => {
//     const opts = await json(req);
//     try {
//         const result = opts.a + opts.b;
//         return result;
//     } catch(err) {
//         sendError(err); // DRY, created utility function!
//     }
// }

// // Wait a minute... still repeating yourself with all the boilerplate!
// // Isn't it possible to automate myself? MORE DRY!!!

// // Better:
// const automateMyselfAndAddStuffAroundMyBusinessFunction = (myBusinessFunction) => {
//     const myApiFunction = (req, res) => {
//         const data = await json(req);
//         try {
//             const result = await myBusinessFunction(data);
//         } catch(err) {
//             sendError(err);
//         }
//     }
    
//     return myApiFunction;
// }

// // Now use it:
// const myAwesomeApiFunction = automateMyselfAndAddStuffAroundMyBusinessFunction(businessFunction);

