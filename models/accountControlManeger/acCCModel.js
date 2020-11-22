const db = require('../db-secure');

module.exports ={
	
	getAllContentControlManager: function(callback){
		var sql = "select * from contentcontrolmanager";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},

	getByIdCC: function(data , callback){
		var sql = "select * from `contentcontrolmanager` where id=?";
		db.getResults(sql, [data.id], function(results){
			callback(results);
		});
	},

	deleteUserFromCC: function(data , callback){
		var sql = "DELETE FROM `contentcontrolmanager` WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},


	/*,
	
	CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}