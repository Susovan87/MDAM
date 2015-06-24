var express    = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var app        = express();

var port = process.env.PORT || 3001;
var UserModel = require('./models/user-model');
var SecureRoute = require('./secure-route');
var ErrorHandler = require('./error-handler');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

/*
app.use(ErrorHandler.logErrors);
app.use(ErrorHandler.clientErrorHandler);
app.use(ErrorHandler.errorHandler);
*/

app.post('/authenticate', function(req, res) {
    UserModel.authenticate({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
               res.json({
                    type: true,
                    data: user,
                    token: user.token
                }); 
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
});

//app.all('/api/*', [express.bodyParser(), SecureRoute]);

process.on('uncaughtException', function(err) {
    console.log(err);
});

// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});