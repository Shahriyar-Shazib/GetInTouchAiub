const db = require('../db-secure');

module.exports ={
	
	getAllNotificationOfAdmin: function(callback){
		var sql = "select * from adminnotice where towhom=?";
		db.getResults(sql, ['General User'] ,function(results){
			console.log(results);
			callback(results);
		});
	}
}