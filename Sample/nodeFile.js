var bodyParser = require('body-parser')
var express = require('express');
var path = require('path');

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// XXX we should really change this to a proper sql library that prevents against injection attacks
//Load modules
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('WTE/wle.db');

app.use(express.static(__dirname));

function sqlSelect(query, response) {
	var wheres = [];
	var filters = JSON.parse(query.filters);
	for (column in filters) {
		wheres.push(column+"='"+filters[column]+"'");
	}
	var query = 'select * from ' + query.table + ' where ' + wheres.join(' and ');
	db.all(query, function(err, list) {
		response.send(list);
	});
}

//buttons to add to database
app.post('/', function(req, res){
  res.header('Access-Control-Allow-Origin', "*");
  console.log(req.body.type);
  if (req.body.type === 'save_question'){
    addToDatabase(req.body , res)
  }
});

function addToDatabase(data,res){
	
  var createCurrent = db.prepare("INSERT INTO Saved_1 Values (?)");
  createCurrent.run(data.problemID);

  db.all("SELECT * From Saved_1", function(err, dataInTable) {
      console.log("data in table " + dataInTable);
      res.send(dataInTable);
  });
}

// handle requests from client
app.get('/',function(request, response){
	response.header('Access-Control-Allow-Origin', "*");

	if (request.query.type == "select") {
		sqlSelect(request.query, response);
	}

});

app.listen(1337);
console.log('Listening on port 1337');
