var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/google',
  passport.authenticate('google', {
    scope: 'profile email'
  }));

router.get('/google/return',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
