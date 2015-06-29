var models = require('../models');
var express = require('express');
var debug = require('debug')('MDAM:router:devices');
var router = express.Router();

router.get('/', function(req, res) {
  models.Device.findAll({
    include: [{
		model: models.User,
		required: false
	}]
  }).then(function(users) {
      res.send(users);
    });
});

router.get('/:deviceId', function(req, res) {
  models.Device.find({
    where: {
      id: req.params.deviceId
    }
  }).then(function(device) {
  	if(device){
  		res.send(device);
  	}else{
  		res.status(404).send('Device not found.');
  	}
  });
});

router.post('/', function(req, res) {
  if(req.user['isAdmin']){
    models.Device.create({
      identifier: req.body.identifier,
      model: req.body.model,
      os: req.body.os
    }).then(function(device) {
      if(device){
        res.status(201).send(device);
      }else{
        res.status(400).send('Failed to create device, please try after some time.');
      }
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin can do this operation.');
  }
});

router.put('/:deviceId', function(req, res) {
  if(req.user['isAdmin']){
    models.Device.update({
      identifier: req.body.identifier,
      model: req.body.model,
      os: req.body.os
    }, {
      where: {
        id: req.params.deviceId
      }
    }).then(function() {
      res.status(204).end();
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin can do this operation.');
  }
});

router.delete('/:deviceId', function(req, res) {
  if(req.user['isAdmin']){
    models.Device.destroy({
      where: {
        id: req.params.deviceId
      }
    }).then(function(affectedRows) {
      res.status(204).end();
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin can do this operation.');
  }
});


module.exports = router;