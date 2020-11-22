const db = require('../db-secure');

module.exports ={
	
	getAllAdmin: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	
	adminSearch: function(data , callback){
		var sql = "SELECT * FROM `admin` WHERE adminid LIKE '%"+data.key+"%' "
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
}