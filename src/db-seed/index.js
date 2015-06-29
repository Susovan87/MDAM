module.exports = function(models) {

	models.Role.findOrCreate({
		where: {
			roleType: 'Admin'
		}
	}).spread(function(adminRole, created) {
		models.Role.findOrCreate({
			where: {
				roleType: 'PoolUser'
			}
		}).spread(function (poolUserRole, created) {
			models.User.findOrCreate({
				where: {
					userName: 'admin'
				},
				defaults: {
					name: 'Admin',
					password: 'admin'
	    		}
			}).spread(function(user, created){
				user.addRoles([adminRole,poolUserRole]);
			});
		});
	});
	
};