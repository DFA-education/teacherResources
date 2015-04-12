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

/**
Get a user's saved problem from the database.

@param username
@return array of problem id's
*/
function getSavedProblems(user) {
  //get user ID from users table
  //get problem ID's from problems table
}

/**
Get a user's uploaded problem from the database

@param username
@return array of problem id's
*/
function getUploadedProblems(user) {

}

/**
Get a user's saved custom worksheets from the database.

@param username
@return array of worksheet id's
*/
function getCustomWorksheets(user) {

}

/**
Get a user's biographical info from the database.

@param username
@return object with biographical info
*/
function getUserInfo(user) {

}

/**
Get a problem's associated solution from the database.

@param problem's ID
@return solution
*/
function getSolution(problemID) {

}

/**
Get a problem's associated tags from the database.

@param problem's ID
@return array of tags
*/
function getProblemTags(problemID) {

}
