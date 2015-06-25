var knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './src/db/data.db'
  }
});
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'users'  
});

//User.set({first_name: "Joe", last_name: "Customer"});

User.where('id', 1).fetch().then(function(user) {

  console.log(user.attributes);

}).catch(function(err) {

  console.error(err);

});