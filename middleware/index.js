// Error handling middleware
function generalErrorHandling(err, req, res, next) {
    res.status(500).send("General error. Stop now!");
}

function errorHandling(err, req, res, next) {
    const errorCode = err.message;

    switch (errorCode) {
        case "c520":
            res.status(500).send('Something broke! Error code - Custom error: c520 - System error: 500');
            break;

        default:
            res.status(500).send('Oj error is found!')
            break;
    }
}

// Normal middleware
function requestTime(req, res, next) {
    req.requestTime = Date.now();
    next();
}

module.exports = function (options = { handling: ''}) {
    switch (options.handling) {
        case "errorHandling":
            return errorHandling;
    
        case "requestTimeHandling":
            return requestTime;

        default:
            return generalErrorHandling;
    }
}
