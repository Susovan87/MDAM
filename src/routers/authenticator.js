var models = require('../models');
var jwt = require('jwt-simple');
var secret = require('../config/secret');
var debug = require('debug')('MDAM:router:authenticator');

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	if (token) {
		try {
			var decoded = jwt.decode(token, secret.jwtTokenSecret);

			if (decoded.expires <= Date.now()) {
				res.status(400).send('Access token has expired');
			}

			models.User.find({
				where: {
					id: decoded.iss
				},
				include: [{
					model: models.Role,
					required: false,
					attributes: ['roleType']
				}]
				,attributes: ['id', 'name', 'userName', 'email']
			}).then(function(user) {
				if(user){
					user = user.toJSON();
					for (var i = 0; i < user.Roles.length; i++) {
						user['is'+user.Roles[i].roleType]=true;
					};
					req.user = user;
					return next();
				}else{
					return res.status(400).send('Invalid token.');
				}
			}).catch;
		} catch (err) {
			debug(err);
			return res.status(400).send(err.message);
		}
	}else{
		return res.status(401).send('Authentication required');
	}
};