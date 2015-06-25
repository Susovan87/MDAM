var UserDAL = function () {
}

UserDAL.prototype.findByEmail = function(email, callback) {
	var user;
	var err = ''
	
	if(email){
		if(email == 'a'){	// mock
			user = { email:'a', name: 'A', id: 1, password: 'aA' }
		}
	}else{
		err = 'email can\'t be empty';
	}
	callback(err, user)
}

UserDAL.prototype.findById = function(id, callback) {
	var user;
	var err = ''
	if(id){
		if(id == 1){	// mock
			user = { email:'a', name: 'A', id: 1, password: 'aA' }
		}
	}else{
		err = 'id can\'t be empty';
	}
	callback(err, user)
}

UserDAL.prototype.matchCredential = function(authObj, callback) {
	var result = null;
	var err = ''
	if(authObj.email && authObj.password){
		this.findByEmail(authObj.email, function(err, user){
			if(user && user.password == authObj.password){
				result = user.id;
			}else{
				err = 'wrong password';
			}

			callback(err, result);
		});
	}else{
		err = 'email and password can\'t be empty';
		callback(err, result);
	}
}

module.exports = UserDAL;