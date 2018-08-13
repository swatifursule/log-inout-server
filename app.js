var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
var session = require('express-session');
var db = require('./models/db.js');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: true
}));// Body parser use JSON data

if(GLOBAL.SQLpool === undefined){
	GLOBAL.SQLpool = db.createPool(); //create a global sql pool connection
} 
app.use(require('./controllers'));
app.listen('3000', function(){
	console.log("Connected on port 3000.");
});

