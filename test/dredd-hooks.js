'use strict';

const hooks = require('hooks');
const jwt = require('jsonwebtoken');
const config = require('config');

const superuserToken = jwt.sign({id: 42}, config.get('secret'), {expiresIn: '1h'});

const supplyAuthToken = function(authorization) {
  let token;
  switch(authorization) {
    case 'Superuser':
      token = 'JWT ' + superuserToken;
      break;
    default:
      token = 'NONE';
      break;
  }
  return token;
};

hooks.beforeEach(function (transaction) {
  if(typeof(transaction.request.headers) === 'object' &&
    transaction.request.headers.Authorization !== undefined) {
    transaction.request.headers.Authorization = supplyAuthToken(transaction.request.headers.Authorization);
    hooks.log(supplyAuthToken(transaction.request.headers.Authorization))
  }
});
