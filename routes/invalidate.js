var newSession = require('client-sessions');
var mysql      = require('mysql');
var connection = {
	host     : 'urbanbeats.czeuio4ikmlz.us-east-1.rds.amazonaws.com',
	user     : 'urbanbeatsdb',
	password : 'urbanbeatsdbpwd',
	database : 'UrbanBeatsDB'
}

exports.do_work = function(request, res){
  res.render('invalidatecoupon.jade', {
	  title: 'Urban Beats'
  });
};
