var mysql      = require('mysql');
var connection = {
	host     : 'urbanbeats.czeuio4ikmlz.us-east-1.rds.amazonaws.com',
	user     : 'urbanbeatsdb',
	password : 'urbanbeatsdbpwd',
	database : 'UrbanBeatsDB'
}

/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('signin.jade', { 
	  title: 'Urban Beats' 
  });
};
exports.do_authenticate = function(request, response){
	console.log("do_work data + " + request.body.fname + "	+ " + request.body.pwd);
	query_db(response,request.body.fname,request.body.pwd);
};

function query_db(response,fname,pwd) {
	var connection_pool = mysql.createPool(connection);
	connection_pool.getConnection(function(err, connection){
	//connection.connect (function(err, connection) {
		if(!err) {
			console.log("Connected DB");
			connection.query("SELECT * FROM User WHERE user_id='" + fname + "' AND password='" + pwd + "'", function(err, rows, fields) {
				//connection.end(); // connection close
				if (!err) {
					console.log("Results fetched + " + rows[0].first_name);
					if (rows.length > 0 ) {
						console.log("User Authenticated");
						// do the required redirect - function call 
						output_useroptions(response);
					} 
					else {
						// display error msg for unauthenticated user
						console.log("User Authentication Failed");
						// display error msg // UI change
					}
				}
				else {
					console.log("Error while authenticating users through query + " + err);
				}
			});
		}
		else {
			console.log("Disconnected DB + " + err);
		}
		connection.release();
	});
}
function output_useroptions(res){
	console.log("inside function to display useroptions.jade");
  res.render('useroptions.jade', { 
	  title: 'Urban Beats' 
  });
};