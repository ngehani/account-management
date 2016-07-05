var config = require('config');
var knex = require('knex')({
  client: 'pg',
  connection: config.get('db.url'),
  searchPath: 'knex,public'
});
module.exports = require('bookshelf')(knex);
