
var express = require('express');
var app = express();
var path = require('path');

//Load modules
var sqlite3         =       require('sqlite3').verbose();
var db              =       new sqlite3.Database('mydb.db');

app.use(express.static(__dirname)); 

function getTableValue(tableType, response){
	// logs the routeNumber in the console
	// to see the console, look at your terminal window where you ran nodeFile.js
	console.log(tableType);
	// selects the relevant variable "on_street" from the table in the database, called "Bus", 
	// where the route is equal to the routeNumber

	//!!!!!!! THIS: 'select on_street from Bus where routes = 44" IS A SQL QUERY
	
	db.all('select * from ' + tableType, function(err, list){
		// send the first street name back to the browser
		response.send(list);
	})
}


// handle requests from client
app.get('/',function(request,response){
	response.header('Access-Control-Allow-Origin', "*");
	
	// !!!!! HERE IS THE NODE/EXPRESS MAGIC
	
	if (request.query.type == "getTableValue"){
		var output = getTableValue(request.query.tableType, response);
	}

});

app.listen(1337);
console.log('Listening on port 1337');


