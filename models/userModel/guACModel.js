const db = require('../db-secure');

module.exports ={
	
	getAllNotificationOfAC: function(callback){
		var sql = "select * from acNotice where towhom=?";
		db.getResults(sql, ['General User'] ,function(results){
			console.log(results);
			callback(results);
		});
	}
}