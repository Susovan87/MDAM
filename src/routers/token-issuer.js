var express = require('express');
var router = express.Router();
var UserDAL = require('../dal/user-dal');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var moment = require('moment');

var userDAL = new UserDAL();

router.post('/', function (req, res) {
    userDAL.matchCredential({email: req.body.email, password: req.body.password}, function(err, userId) {
        if (err) {
            res.status(400).json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (userId) {
            	var expires = moment().add(7,'days').valueOf();
				var token = jwt.encode({
				  iss: userId,
				  expires: expires
				}, secret.jwtTokenSecret);

            	res.json({
                    type: true,
                    token: token,
                    expires: expires
                }); 
            } else {
                res.status(403).json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
});

module.exports = router;