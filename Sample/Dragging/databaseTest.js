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

app.get('/',function(request,response) {
  console.log("appget");
  response.header('Access-Control-Allow-Origin', "*");

  if (request.query.type === "emailRequest") {
    console.log("request");
    findEmail(request.query.user, response);
  }

  if (request.query.type === "passwordRequest") {
    console.log("request");
    findPassword(request.query.user, response);
  }
});

app.listen(1337);
console.log('Listening on port 1337');

/**
Get a user's email.

@param int userID
@param response NodeJS data handler
@return string user's email
*/
function findEmail(user, response) {
  console.log("findemail");
  db.all('SELECT email FROM Users WHERE userID = ' + user, function(err, email) {
    console.log("email" + email);
    response.send(email);
  });
}

/**
Get a user's password.

@param int userID
@param response NodeJS data handler
@return string user's hashed password
*/
function findPassword(userID, response) {
  console.log("findpassword");
  db.all('SELECT password FROM Users WHERE userID = ' + userID, function(err, pw) {
    console.log("pw" + pw);
    response.send(pw);
  });
}

/**
Get a user's biographical info as an object
with fields: name, school, bio, date_created.

@param userID
@return object with biographical info
*/
function findUserInfo(user, response) {find

/**
Get a user's saved problems.

@param userID
@return array of problem id's
*/
function findSavedProblems(user, response) {
  //get name of saved table
  //get questions matching
}

/**
Get a user's custom worksheets.

@param userID
@return object mapping worksheet id's to arrays of problem id's
*/
function findCustomWorksheets(user, response) {

}

/**
Get the date and time of a user's account creation or modification.

@param int userID
@return Date object with fields: created, modified.
*/
function findDate(userID, response) {

}

/**
Get a problem's content.

@param int problemID
@param response NodeJS data handler
@return string problem content
*/
function findContent(problemID, response) {
  console.log("getContent");
  db.all('SELECT content FROM Problems WHERE problemID = ' + problemID, function(err, content) {
    console.log("content" + content);
    response.send(content);
  });
}

/**
Get a problem's associated topic.

@param int problemID
@param response NodeJS data handler
@return string topic of problem
*/
function findTopic(problem, response) {
  console.log("getTopic");
  db.all('SELECT topic FROM Problems WHERE problemID = ' + problemID, function(err, topic) {
    console.log("topic" + topic);
    response.send(topic);
  });
}

/**
Get a problem's associated tags.

@param problem's ID
@param response NodeJS data handler
@return array of tags
*/
function findProblemTags(problemID, response) {

}

/**
Get the user who uploaded a problem.

@param int problemID
@param response NodeJS data handler
@return int userID
*/
function findCreator(problem, response) {
  console.log("getCreator");
  db.all('SELECT creator FROM Problems WHERE problemID = ' + problemID, function(err, creator) {
    console.log("creator" + creator);
    response.send(creator);
  });
}

/**
Get the date and time of a problem's creation or modification.

@param userID
@param response NodeJS data handler
@return Date object with fields: created, modified.
*/
function findDate(problem, response) {

}

/**
Get a problem's associated solution.

@param int problem's ID
@param response NodeJS data handler
@return string solution
*/
function findSolution(problemID, response) {
  console.log("getSolution");
  db.all('SELECT solution FROM Problems WHERE problemID = ' + problemID, function(err, solution) {
    console.log("solution" + solution);
    response.send(solution);
  });
}

/**
Get a tag by ID from table of all tags.

@param tagID
@param response NodeJS data handler
@return tag contents
*/
function findTag(tag, response) {

}
