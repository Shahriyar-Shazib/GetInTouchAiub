const db = require('../db-secure');

module.exports ={
	
	getAllNotices: function(callback){
		var sql = "select * from adminnotice";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
}