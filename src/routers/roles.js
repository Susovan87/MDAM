var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	res.send('Roles '+req.user.name+'.. OK');
})

module.exports = router;