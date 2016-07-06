'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.route('/')
  .get(function(req, res) {
    User
      .fetchAll()
      .then(function(users) {
        res.json(users);
      })
  });

router.route('/:id')
  .get(function(req, res) {
    //fetch the user by id
    User
      .where({id: req.params.id})
      .fetch({
        withRelated: ['emails']
      })
      .then(function(user) {
        //serialize
        user = user.serialize({shallow:false});
        user.emails = user.emails.map(obj => obj.email).sort();
        res.json(user);
      });
  });

module.exports = router;
