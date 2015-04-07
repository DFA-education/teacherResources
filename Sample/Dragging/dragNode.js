var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;


db.serialize(function() {
	// db.run("Delete from BobSaved");
	// db.run("Drop table BobCurrent if exists");
  // db.run("CREATE TABLE if not exists BobSaved (projectID Int, savedProjects Text )");
  db.run("CREATE TABLE if not exists BobCurrent (projectID Int, currentProject TEXT)");
  // var createSaved = db.prepare("INSERT INTO BobSaved Values (?, ?)");
  var createCurrent = db.prepare("INSERT INTO BobCurrent Values (?, ?)");


  // for (var i = 1; i <=3; i ++){
  // 	createSaved.run(i, "item "+i);
  // }
  // createSaved.finalize();

  for (var j = 4; j <=6; j ++){
  	createCurrent.run(j, "item "+j);
  }
  createCurrent.finalize();

  // db.each("SELECT * From BobSaved", function(err, data) {
  //     console.log(data);
  // });
  db.each("SELECT * From BobCurrent", function(err, data) {
      console.log(data);
  });

});

db.close();

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('mydb.db');
// var check;
// db.serialize(function() {

//   db.run("CREATE TABLE if not exists user_info (info TEXT)");
//   var stmt = db.prepare("INSERT INTO user_info VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM user_info", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();