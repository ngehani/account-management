var db = require('./database');
var User = db.Model.extend({
  tableName: 'users'
});
module.exports = User;
