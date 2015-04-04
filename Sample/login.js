var express = require('express');
var app = express();
app.use(express.static(__dirname));
var path = require('path');
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {

    db.run("CREATE TABLE if not exists Users (email TEXT)");


  //testing db user insertion
  var createUser = db.prepare("INSERT INTO Users VALUES (?)");
  createUser.run("teacher@school.com");
  createUser.finalize();


});
