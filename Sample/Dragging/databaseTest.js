var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {



  db.run("CREATE TABLE if not exists Bob (email Text)");
  var createUser = db.prepare("INSERT INTO Users Values (?)");

  createUser.run("blahblahblah");
  createUser.finalize();

});

db.close();