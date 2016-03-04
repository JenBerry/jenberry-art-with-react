var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'rosemary_jenb'
});

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected ... nn");
	} else {
		console.log("Error connecting database ... nn");
	}
});


connection.query('SELECT * from page', function(err, result, fields) {
	if (err) throw err;
	console.log('Data received from Db:\n');
	recieveData(result);
});


connection.end(function(err){
	if(!err) {
		console.log("Database connection terminated ... nn");
	} else {
		console.log("Error connection not terminated ... nn");
	}
});

var recieveData = function(data){
	console.log(data);
};