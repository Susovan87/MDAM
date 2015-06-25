var UserDAL = require('../dal/user-dal');
var jwt = require('jwt-simple');
var secret = require('../config/secret');

var userDAL = new UserDAL();

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, secret.jwtTokenSecret);

			if (decoded.expires <= Date.now()) {
			  res.status(400).send('Access token has expired');
			}

			userDAL.findById(decoded.iss, function(err, user) {
			  req.user = user;
			});

			return next();
		} catch (err) {
			
		}
	}

	return res.status(401).send('Authentication required');
};