var newSession = require('client-sessions');

exports.do_work = function(request, res){
  res.render('invalidatecoupon.jade', {
	  title: 'Urban Beats'
  });
};
