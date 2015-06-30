var models = require('../models');
var express = require('express');
var router = express.Router();
var debug = require('debug')('MDAM:router:users');

router.get('/', function(req, res) {
  models.User.findAll({
    attributes: ['id','name','userName','email']
  })
    .then(function(users) {
      res.send(users);
    });
});

router.get('/:userId', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
    }
  }).then(function(user) {
      res.send(user.getJsonData());
    });
});

router.post('/', function(req, res) {
  if(req.user['isAdmin']){
    models.User.create({
      userName: req.body.userName,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function(user) {
      if(user){
        user = user.getJsonData();
        res.status(201).send(user);
      }else{
        res.status(400).send('Failed to create user, please try after some time.');
      }
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin can do this operation.');
  }
});

router.put('/:userId', function(req, res) {
  debug(req.user)
  if(req.user['isAdmin'] || req.user['id']==req.params.userId){
    models.User.update({
      email: req.body.email,
      userName: req.body.userName,
      name: req.body.name
    }, {
      where: {
        id: req.params.userId
      }
    }).then(function() {
      res.status(204).end();
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin or same user can do this operation.');
  }
});

router.delete('/:userId', function(req, res) {
  if(req.user['isAdmin'] || req.user['id']==req.params.userId){
    models.User.destroy({
      where: {
        id: req.params.userId
      }
    }).then(function(affectedRows) {
      res.status(204).end();
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
  }else{
    res.status(401).send('Only admin or same user can do this operation.');
  }
});


router.get('/:userId/devices', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
     }
  }).then(function(user) {
     user.getDevices({
      joinTableAttributes: ['allocatedAt']
     }).then(function(devices){
        if(!devices)
            res.status(404).send("No devices allocated")
        else
          res.send(devices);
      })
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
});


router.get('/:userId/devices/history', function(req, res) {
  models.User.find({
    where: {
      id: req.params.userId
     }
  }).then(function(user) {
     user.getDevices({
      joinTableAttributes: ['allocatedAt']
     }).then(function(devices){
        if(!devices)
            res.status(404).send("No devices allocated")
        else
          res.send(devices);
      })
    }).catch(function(err) {
      res.status(400).send(err.message);
    });
});

module.exports = router;