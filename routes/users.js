'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');

/* GET users listing. */
// router.route('/')
//   .get(
//     passport.authenticate('jwt', { session: false}),
//     function(req, res) {
//       User
//         .fetchAll()
//         .then(function(users) {
//           res.json(users);
//         })
//   });

router.route('/')
  .get(function(req, res, next) {
    passport.authenticate('jwt', function(err, user, info) {
      if (err) {
        res.status(401).json({message: 'Unauthorized'});
        return next(err);
      }
      if (!user) {
        res.status(401).json({message: 'Unauthorized'});
      }
      User
        .fetchAll()
        .then(function(users) {
          res.json(users);
        })
    })(req, res, next)
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
