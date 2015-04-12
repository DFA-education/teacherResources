var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('testQuery.db');

var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

//var check;
// db.serialize(function() {
//
//   db.run("CREATE TABLE if not exists Bob (email Text)");
//   var createUser = db.prepare("INSERT INTO Users Values (?)");
//
//   createUser.run("blahblahblah");
//   createUser.finalize();
//
// });

//db.close();

//DATABASE QUERY FUNCTIONS

/**
Get a user's email.

@param userID
@return user's email
*/
function findEmail(user, response) {
  console.log("findemail");
  db.all('select email from Users where userID = ' + user, function(err, email) {
    console.log("email" + email);
    response.send(email)
  });
}

app.get('/',function(request,response) {
  console.log("appget");
  response.header('Access-Control-Allow-Origin', "*");

  if (request.query.type === "emailRequest") {
    console.log("request");
    findEmail(request.query.user, response);
  }
});

app.listen(1337);
console.log('Listening on port 1337');
/**
Get a user's password.

@param userID
@return user's hashed password
*/
function getPassword(user) {

}

/**
Get a user's biographical info as an object
with fields: name, school, bio, date_created.

@param userID
@return object with biographical info
*/
function getUserInfo(user) {

}

/**
Get the name of the table containing a user's saved problems.

@param userID
@return table name
*/
function getSavedProblems(user) {
  //get name of saved table
  //get questions matching
}

/**
Get the name of the table containing a user's custom worksheets.

@param userID
@return table name
*/
function get(user) {

}

/**
Get the date and time of a user's account creation or modification.

@param userID
@return Date object with fields: created, modified.
*/
function getDate(user) {

}

/**
Get a problem's content.

@param problemID
@return problem content
*/
function getContent(problem) {

}

/**
Get a problem's associated topic.

@param problemID
@return topic of problem
*/
function getTopic(problem) {

}

/**
Get a problem's associated tags.

@param problem's ID
@return array of tags
*/
function getProblemTags(problemID) {

}

/**
Get the user who uploaded a problem.

@param problemID
@return userID
*/
function getCreator(problem) {

}

/**
Get the date and time of a problem's creation or modification.

@param userID
@return Date object with fields: created, modified.
*/
function getDate(problem) {

}

/**
Get a problem's associated solution.

@param problem's ID
@return solution
*/
function getSolution(problemID) {

}

/**
Get a tag by ID from table of all tags.

@param tagID
@return tag contents
*/
function getTag(tag) {

}
