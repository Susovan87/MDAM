var express    = require("express");
var bodyParser = require("body-parser");

var app        = express();

var port = process.env.PORT || 3001;
var ErrorHandler = require('./error-handler');

var errorHandler =  new ErrorHandler();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    next();
});

app.use(errorHandler.logErrors);
app.use(errorHandler.clientErrorHandler);
app.use(errorHandler.errorHandler);

var router = require('./routers/router')(app);

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "server listening on port " + port);
});