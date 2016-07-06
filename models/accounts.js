var db = require('./database');
var UserAccountRole = require('./userAccountRoles');

var Account = db.Model.extend({
  tableName: 'accounts',
  userRoles: function() {
    return this.hasMany(UserAccountRole);
  }
});

module.exports = Account;
