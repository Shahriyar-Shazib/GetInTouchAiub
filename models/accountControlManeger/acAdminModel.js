const db = require('../db-secure');

module.exports ={
	
	getAllAdmin: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}/*,
	
	adminSearch: function(data,callback){
		var sql = "select * from admin where adminid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}