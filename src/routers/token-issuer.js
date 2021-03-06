var express = require('express');
var router = express.Router();
var models = require('../models');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var moment = require('moment');

router.post('/', function (req, res) {
    models.User.matchCredential(req.body.identity, req.body.password, function(err, user) {
        if (err) {
            res.status(400).json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
            	var expires = moment().add(7,'days').valueOf();
				var token = jwt.encode({
				  iss: user.id,
				  expires: expires
				}, secret.jwtTokenSecret);

                user['token'] = token;
                user['expires'] = expires;
                user['type'] = true;
            	res.json(user); 
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