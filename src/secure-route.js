var UserModel = require('./models/user-model');
var jwt = require('jwt-simple');
var secret = require('./config/secret');

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, jwtTokenSecret);

			if (decoded.expires <= Date.now()) {
			  res.end('Access token has expired', 400);
			}

			UserModel.findById(decoded.iss, function(err, user) {
			  req.user = user;
			});

		} catch (err) {
			return next();
		}
	} else {
		next();
	}
};