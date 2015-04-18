
var express = require('express');
var app = express();
var path = require('path');

//Load modules
var sqlite3         =       require('sqlite3').verbose();
// var db              =       new sqlite3.Database('./Data/chicago.sqlite');
var db              =       new sqlite3.Database('./Dragging/mydb.db');

app.use(express.static(__dirname));

// function findRouteNumber(routeNumber, response){
// 	// logs the routeNumber in the console
// 	// to see the console, look at your terminal window where you ran nodeFile.js
// 	console.log(routeNumber);
// 	// selects the relevant variable "on_street" from the table in the database, called "Bus",
// 	// where the route is equal to the routeNumber

// 	//!!!!!!! THIS: 'select on_street from Bus where routes = 44" IS A SQL QUERY

// 	db.all('select on_street from Bus where routes = "'+routeNumber+'"', function(err, streets){
// 		// send the first street name back to the browser
// 		response.send(streets[0]);
// 	})
// }

function getTableValue(tableType, response){
	// logs the routeNumber in the console
	// to see the console, look at your terminal window where you ran nodeFile.js
	console.log('tabletype ',tableType);
	// selects the relevant variable "on_street" from the table in the database, called "Bus", 
	// where the route is equal to the routeNumber

	//!!!!!!! THIS: 'select on_street from Bus where routes = 44" IS A SQL QUERY
	
	db.all('select * from ' + tableType, function(err, list){
		// send the first street name back to the browser
		response.send(list);
		
	})
}

//buttons to add to database
app.post('/', function(req, res){
  res.header('Access-Control-Allow-Origin', "*");
  console.log(req);
  if (req.type === 'save_question'){
    addToDatabase(req , res)
    console.log(req.type);
  }
});

function addToDatabase(data,res){

  var createCurrent = db.prepare("INSERT INTO savedQuestions Values (?)");
  createCurrent.run(data.questionID);

  db.all("SELECT * From savedQuestions", function(err, dataInTable) {
      console.log("data in table " + dataInTable);
      res.send(dataInTable);
  });
}

// handle requests from client
app.get('/',function(request,response){
	response.header('Access-Control-Allow-Origin', "*");

	// !!!!! HERE IS THE NODE/EXPRESS MAGIC
	if (request.query.type == "getTableValue"){
		var output = getTableValue(request.query.tableType, response);
	}

	if (request.query.type == "routeStreetRequest"){
		var output = findRouteNumber(request.query.routeNumber, response);
	}

});



app.listen(1337);
console.log('Listening on port 1337');
