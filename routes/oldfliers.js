var newSession = require('client-sessions');
var mysql      = require('mysql');
var connection = {
	host     : 'urbanbeats.czeuio4ikmlz.us-east-1.rds.amazonaws.com',
	user     : 'urbanbeatsdb',
	password : 'urbanbeatsdbpwd',
	database : 'UrbanBeatsDB'
}

exports.do_work = function(req, res){
	query_db(req,res);
};

function query_db(req,response) {
	var connection_pool = mysql.createPool(connection);
	connection_pool.getConnection(function(err, connection){
	//connection.connect (function(err, connection) {
		if(!err) {
			console.log("Connected DB");
			var business_id = req.newSession.business_id;
			connection.query("SELECT flyer_coupon FROM Flyer WHERE business_id='" + business_id + "'", function(err, rows, fields) {
				//connection.end(); // connection close
				if (!err) {
					console.log("Results fetched");
					if (rows.length > 0 ) {
						console.log("Logged in Users fetched");
						// do the required redirect - function call 
						var array_names = [];
						var count = 0;
						for (var row in rows){
							array_names.push(String(rows[row].flyer_coupon));
							count++;
						}
						console.log("data pushed + " + count + "	" + array_names);					
						output_render(response,count,array_names);
					} 
					else {
						// display error msg for unauthenticated user
						console.log("No Logged in Users");
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

function output_render(res,count,names){
	console.log("data captured + " + count + "	" + names);
  res.render('oldfliers.jade', { variables:{
	  title: 'Urban Beats', arrnames:names, arrcount: count
	}
 });
};