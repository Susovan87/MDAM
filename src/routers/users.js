var models  = require('../models');
var express = require('express');
var router = express.Router();
var debug     = require('debug')('MDAM:router:users');

router.get('/', function(req, res) {
  models.User.findAll()
  .then(function(users) {
    res.send(users);
  });
});

router.post('/', function(req, res) {
  debug(req.body)
  models.User.create({
    userName: req.body.userName,
    name: req.body.name,
    email: req.body.email
  }).then(function(user) {
    res.status(201).send(user);
  }).catch(function(err) {
  	res.status(400).send(err.message);
  });
});

router.put('/:userId', function(req, res) {
  models.User.build({
  	id: req.params.userId,
  	email: req.body.email,
  	userName: req.body.userName,
	name: req.body.name
  }).save()
  .then(function() {
	res.status(204).end();
  }).catch(function(err) {
  	res.status(400).send(err.message);
  });
});

router.delete('/:userId', function(req, res) {
  models.User.destroy({
  	where: {
  		id: req.params.userId
  	}
  }).then(function(affectedRows) {
    res.status(204).end();
  }).catch(function(err) {
  	res.status(400).send(err.message);
  });
});

module.exports = router;