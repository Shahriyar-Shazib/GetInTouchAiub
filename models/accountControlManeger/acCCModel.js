const db = require('../db-secure');

module.exports ={
	
	getAllContentControlManager: function(callback){
		var sql = "select * from contentcontrolmanager";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}/*,
	
	CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}