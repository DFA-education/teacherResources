var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {



  db.run("CREATE TABLE if not exists Users (email Text)");
  var createUser = db.prepare("INSERT INTO Users Values (?)");
  // for (var i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  createUser.run("blahblahblah");
  createUser.finalize();

});

db.close();