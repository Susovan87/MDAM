/*
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database(file);
 
db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS Users (email TEXT PRIMARY KEY,userName TEXT,password TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Devices (deviceId TEXT,Type TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS Devices_Users (deviceId TEXT,email TEXT,FOREIGN KEY(deviceId) REFERENCES Devices(deviceId), FOREIGN KEY(email) REFERENCES Users(email))");
  db.run("CREATE TABLE IF NOT EXISTS Roles (roleId INT,roleType TEXT )");
  db.run("CREATE TABLE IF NOT EXISTS Roles_Users (roleId INT,email TEXT )");
});
 
db.close();
*/
/*

................FOR DB RELATED EXPERIMENTATION ................


*/
var knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './data.db'
  }
});
var bookshelf = require('bookshelf')(knex);

// Create a table
knex.schema.createTable('users', function(table) {
  table.increments('id');
  table.string('user_name');
})

// ...and another
.createTable('accounts', function(table) {
  table.increments('id');
  table.string('account_name');
  table.integer('user_id').unsigned().references('users.id');
})

// Then query the table...
.then(function() {
  return knex.insert({user_name: 'Tim'}).into('users');
})

// ...and using the insert id, insert into the other table.
.then(function(rows) {
  return knex.table('accounts').insert({account_name: 'knex', user_id: rows[0]});
})

// Query both of the rows.
.then(function() {
  return knex('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.user_name as user', 'accounts.account_name as account');
})

// .map over the results
.map(function(row) {
  console.log(row);
})

// Finally, add a .catch handler for the promise chain
.catch(function(e) {
  console.error(e);
});
