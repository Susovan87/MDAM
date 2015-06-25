module.exports = function (app) {
	app.use('/authenticate', require('./token-issuer'))

	// authenticator middleware
	app.all('/api/*', require('./authenticator'));

    app.use('/api/users', require('./users'));
    app.use('/api/roles', require('./roles'));
    app.use('/api/devices', require('./devices'));
};