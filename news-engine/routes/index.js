var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var News = require('../models/news');
var router = express.Router();

/* Default routes */
router.get('/', function (req, res) {
  res.render('index', { user : req.user, title: 'Very cool news engine.' });
});

/* News routes */
router.get('/users/news/create', function(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
  }
  res.render('news/create', { user : req.user, message: req.flash('error') });
});

router.post('/users/news/create', function(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
  }
  var newsObject = new News({
    title: req.body.title,
    category: req.body.title,
    content: req.body.title
  });
  newsObject.save(function(err) {
    if (err) throw err;
  });
  res.redirect('/users/home');
});

/* User routes */
router.get('/users/home', function(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
  }
  res.render('users/home', { user : req.user });
});

router.get('/users/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/users/home');
  }
  res.render('users/login', { user : req.user, message: req.flash('error') });
});

router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/users/home',
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/users/register', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/users/home');
  }
  res.render('users/register', { user : req.user });
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

router.get('/users/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;