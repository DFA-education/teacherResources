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

app.get('/',function(request,response) {
  console.log("appget");
  response.header('Access-Control-Allow-Origin', "*");

  if (request.query.type === "emailRequest") {
    findEmail(request.query.user, response);
  } else if (request.query.type === "passwordRequest") {
    findPassword(request.query.user, response);
  } else if (request.query.type === "userInfoRequest") {
    findUserInfo(request.query.user, response);
  } else if (request.query.type === "allProblemsRequest") {
    findAllProblemContents(response);
  } else if (request.query.type == "problemRequest") {
    findProblemContent(request.query.problem, response);
  } else if (request.query.type === "problemTagsRequest") {
    findProblemTags(request.query.problem, response);
  } else if (request.query.type === "allProblemsRequest") {
    findAllProblemContents(response);
  } else if (request.query.type === "savedProblemsRequest") {
    findSavedProblems(request.query.user, response);
  } else if (request.query.type === "customWorksheetsRequest") {
    findCustomWorksheets(request.query.user, response);
  } else if (request.query.type === "accountDateRequest") {
    findAccountDate(request.query.user, response);
  } else if (request.query.type === "problemTopicRequest") {
    findProblemTopic(request.query.problem, response);
  } else if (request.query.type === "problemCreatorRequest") {
    findProblemCreator(request.query.problem, response);
  } else if (request.query.type === "problemDateRequest") {
    findProblemDate(request.query.problem, response);
  } else if (request.query.type === "problemSolutionRequest") {
    findSolution(request.query.problem, response);
  } else if (request.query.type == "tagRequest") {
    findTag(request.query.tag, response);
  }
});

app.listen(1337);
console.log('Listening on port 1337');

/////////////// DATABASE QUERY FUNCTIONS ////////////////

/**
Get contents of all problems in database.

@param response NodeJS data handler
@return string[] contents of all problemss
*/
function findAllProblemContents(response) {
  console.log("findProblems");
  db.all('SELECT problemContent FROM Problems', function(err, contents) {
    response.send(contents);
  });
}

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
with fields: name, school, bio, dateCreated.

@param int userID
@param response NodeJS data handler
@return object with biographical info
*/
function findUserInfo(userID, response) {
  console.log("findUserInfo");
  info = {teacher:null, school:null, bio:null, dateCreated:null};
  db.all('SELECT name AS teacher, school, bio, dateCreated FROM Users WHERE userID = ' + userID,
  function(err, data) {
    info.teacher = data.teacher;
    info.school = data.school;
    info.bio = data.bio;
    info.dateCreated = data.dateCreated;
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
  dateInfo = {dateCreated : null, dateModified : null};
  db.all('SELECT dateCreated, dateModified FROM Users WHERE userID = ' + userID.toString(),
  function(err, data) {
    dateInfo.dateCreated = data.dateCreated;
    dateInfo.dateModified = data.dateModified;
    response.send(dateInfo);
  });
}

/**
Get a problem's content.

@param int problemID
@param response NodeJS data handler
@return string problem content
*/
function findProblemContent(problemID, response) {
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
function findProblemTopic(problemID, response) {
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
  db.all('SELECT * FROM Problem_Tags WHERE problemID = ' + problemID.toString(),
  function(err, data) {
    //get tagIDs
    for (var i = 0; i < data.length; i++) {
      tagIDs.push(data[i][1]);
    }
    //get tag contents for each tagID
    for (var i = 0; i < tagIDs.length; i++) {
      db.all('SELECT tagContent FROM Tags_all WHERE tagID = ' + tagID[i].toString(),
      function(err, tagContent) {
        tags.push(tagContent);
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
function findProblemCreator(problemID, response) {
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
  dateInfo = {dateCreated : null, dateModified : null};
  db.all('SELECT dateCreated, dateModified FROM Problems WHERE problemID = ' + problemID.toString(),
  function(err, data) {
    dateInfo.dateCreated = data.dateCreated;
    dateInfo.dateModified = data.dateModified;
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
  console.log("findTag");
  db.all('SELECT tagContent FROM Tags_all WHERE tagID = ' + tagID[i].toString(),
  function(err, tagContent) {
    response.send(tagContent);
  });
}
