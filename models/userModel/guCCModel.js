const db = require('../db-secure');

module.exports ={
	
	getAllNotificationOfCC: function(callback){
		var sql = "select * from ccnotice";
		db.getResults(sql, null ,function(results){
			console.log(results);
			callback(results);
		});
	}
}