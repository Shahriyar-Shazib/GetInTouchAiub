const db = require('./db');

module.exports = {

    validate: function(user, callback){
		var sql = "select * from user where userid='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
	},
}