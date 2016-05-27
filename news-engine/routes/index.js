var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { user : req.user, title: 'Very cool news engine.' });
});

router.get('/users/register', function(req, res) {
  res.render('users/register', { });
});

router.post('/users/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.render('users/register', { user : user, message: err.message });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/users/home');
    });
  });
});

router.get('/users/login', function(req, res) {
  res.render('users/login', { user : req.user });
});

router.post('/users/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/users/home');
});

router.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.status(200).send("pong!");
});

router.get('/users/home', function(req, res) {
  res.render('users/home', { user : req.user });
});

module.exports = router;