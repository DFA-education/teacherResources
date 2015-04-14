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
//   createUser.run("blahblahblbah");
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
  } else if (request.query.type === "passwordRequest") {
    console.log("request");
    findPassword(request.query.user, response);
  } else if (request.query.type === "userInfoRequest") {
    console.log("request");
    findUserInfo(request.query.user, response);
  } else if (request.query.type === "")
});

app.listen(1337);
console.log('Listening on port 1337');

/**
Get a user's email.

@param int userID
@param response NodeJS data handler
@return string user's email
*/
function findEmail(userID, response) {
  console.log("findemail");
  db.all('SELECT email FROM Users WHERE userID = ' + userID, function(err, email) {
    console.log("email " + email);
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

@param int userID
@param response NodeJS data handler
@return object with biographical info
*/
function findUserInfo(userID, response) {
  console.log("findUserInfo");
  info = {name:null, school:null, bio:null, date_created:null};
  db.all('SELECT fullName, school, bio, dateCreated FROM Users WHERE userID = ' + userID,
  function(err, data) {
    info.fullName = data.fullName;
    info.school = data.school;
    info.bio = data.bio;
    info.date_created = data.dateCreated;
    response.send(info);
  });
}

/**
Get a user's saved problems.

@param int userID
@param response NodeJS data handler
@return int[] array of problem id's
*/
function findSavedProblems(userID, response) {
  console.log("findSavedProblems");
  problems = [];
  db.all('SELECT * FROM Saved_' + userID.toString(), function(err, data) {
    for (var i = 0; i < data.length; i++) {
      problems.push(data[i][[0]]);
    }
    response.send(problems);
  });
}

/**
Get a user's custom worksheets.

@param int userID
@param response NodeJS data handler
@return object mapping worksheet id's to arrays of problem id's
*/
function findCustomWorksheets(userID, response) {
  console.log("findCustomWorksheets");
  worksheets = {};
  db.all('SELECT * FROM Custom_' + userID.toString(), function(err, data) {
    for (var i = 0; i < data.length; i++) {
      wID = data[i][1];
      asdf
      worksheets.wID = data[i][0]; //map problem
    }
    response.send(worksheets);
  });
}

/**
Get the date and time of a user's account creation or most recent modification.

@param int userID
@param response NodeJS data handler
@return Date object with fields: created, modified.
*/
function findAccountDate(userID, response) {
  console.log("findAccountDate");
  dateInfo = {date_created : null, date_modified : null};
  db.all('SELECT date_created, date_modified FROM Users WHERE userID = ' + userID.toString(),
  function(err, data) {
    dateInfo.date_created = data.date_created;
    dateInfo.date_modified = data.data_modified;
    response.send(dateInfo);
  });
}

/**
Get a problem's content.

@param int problemID
@param response NodeJS data handler
@return string problem content
*/
function findContent(problemID, response) {
  console.log("findContent");
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
function findTopic(problemID, response) {
  console.log("findTopic");
  db.all('SELECT topic FROM Problems WHERE problemID = ' + problemID, function(err, topic) {
    console.log("topic" + topic);
    response.send(topic);
  });
}

/**
Get a problem's associated tags.

@param int problemID
@param response NodeJS data handler
@return string[] array of tags
*/
function findProblemTags(problemID, response) {
  console.log("findProblemTags");
  tagIDs = [];
  tags = [];
  //There's probably a better way to do this...
  db.all('SELECT * FROM Problem_tags WHERE problemID = ' + problemID.toString(),
  function(err, data) {
    //get tagIDs
    for (var i = 0; i < data.length; i++) {
      tagIDs.push(data[i][1]);
    }
    //get tag contents for each tagID
    for (var i = 0; i < tagIDs.length; i++) {
      db.all('SELECT tag_content FROM Tags_all WHERE tagID = ' + tagID[i].toString(),
      function(err, tag_content) {
        tags.push(tag_content);
      });
    }
    response.send(tags);
  });
}

/**
Get the user who uploaded a problem.

@param int problemID
@param response NodeJS data handler
@return int userID
*/
function findCreator(problemID, response) {
  console.log("findCreator");
  db.all('SELECT creator FROM Problems WHERE problemID = ' + problemID.toString(),
  function(err, creator) {
    console.log("creator" + creator);
    response.send(creator);
  });
}

/**
Get the date and time of a problem's creation and most recent modification.

@param int problemID
@param response NodeJS data handler
@return Date object with fields: created, modified.
*/
function findProblemDate(problemID, response) {
  console.log("findProblemDate");
  dateInfo = {date_created : null, date_modified : null};
  db.all('SELECT date_created, date_modified FROM Problems WHERE problemID = ' + problemID.toString(),
  function(err, data) {
    dateInfo.date_created = data.date_created;
    dateInfo.date_modified = data.data_modified;
    response.send(dateInfo);
  });
}

/**
Get a problem's associated solution.

@param int problem's ID
@param response NodeJS data handler
@return string solution
*/
function findSolution(problemID, response) {
  console.log("findSolution");
  db.all('SELECT solution FROM Problems WHERE problemID = ' + problemID, function(err, solution) {
    console.log("solution" + solution);
    response.send(solution);
  });
}

/**
Get a tag by ID from table of all tags.

@param int tagID
@param response NodeJS data handler
@return string tag contents
*/
function findTag(tagID, response) {

}
