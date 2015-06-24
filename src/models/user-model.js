var jwt = require('jwt-simple');
var secret = require('../config/secret');
var moment = require('moment');

var UserModel = function () {
}

UserModel.prototype.findByEmail = function(email, callback) {
	var user;
	var err = ''
	if(email){
		if(email == 'a'){	// mock
			user = { email:'a', name: 'A', id: 1 }
		}
	}else{
		err = 'email can\'t be empty';
	}
	callback(err, user)
}

UserModel.prototype.findById = function(id, callback) {
	var user;
	var err = ''
	if(id){
		if(id == 1){	// mock
			user = { email:'a', name: 'A', id: 1 }
		}
	}else{
		err = 'id can\'t be empty';
	}
	callback(err, user)
}

UserModel.prototype.validCredentials = function(authObj, callback) {
	var result = null;
	var err = ''
	if(authObj.email && authObj.password){
		this.findByEmail(authObj.email, function(err, user){
			var expires = moment().add('days', 7).valueOf();
			var token = jwt.encode({
			  iss: user.id,
			  expires: expires
			}, jwtTokenSecret);

			result = {
					  token : token,
					  expires: expires,
					  user: user.toJSON()
					};
		});
	}else{
		err = 'email and password can\'t be empty';
	}
	callback(err, result);
}

module.exports = UserModel;