const db = require('../db-secure');

module.exports ={
	
	getAllGeneralUser: function(callback){
		var sql = "select * from generaluser";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},

	getAllRegistrationRequest: function(callback){
		var sql = "select * from registrationrequest";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
	
	/*CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}