const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const { webServer } = require('./config/');
const customMiddleware = require('./middleware/');

// ------ SERVER LISTENING ------
app.listen(webServer.port, () => {
    console.log(`Express server is listening on port ${webServer.port}!`);
    console.log(`View your local server at\x1b[36m http://localhost:${webServer.port}\x1b[0m`);
});


app.use(cors()); // Using CORS
app.use(express.json()); // Using for POST - Getting body.data

// Add requestTime to every incomming HttpRequest
app.use(customMiddleware({ handling: 'requestTimeHandling'}));

// ------ ROUTE DEFINITION ------
// Home page
app.get('/', function (req, res, next) {
    res.status(200)
        .sendFile(path.join(__dirname + webServer.rootDir, webServer.defaultPage));
});

// About page
app.get('/about', function (req, res, next) {
    var responseText = 'Hello World!<br>';
    responseText += '<small>Requested at: ' + req.requestTime + '</small>';
    res.send(responseText);
});

// Product page
app.get('/product', function (req, res, next) {
    next(Error("c520")); // Using custom error code
});


// ------ ERROR HANDLING - middleware ------
app.use(customMiddleware({ handling: 'errorHandling'}));
