const db = require('../db-secure');

module.exports ={
	
	getAllGeneralUser: function(callback){
		var sql = "select * from generaluser";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},

	getAllRegistrationRequest: function(callback){
		var sql = "select * from `registrationrequest`";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	getByIdRegistrationRequest: function(data , callback){
		console.log(data.id);
		var sql = "select * from `registrationrequest` where id=?";
		db.getResults(sql, [data.id], function(results){
			callback(results);
		});
	},
	deleteRegistrationRequest: function(data , callback){
		var sql = "DELETE FROM `registrationrequest` WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	}

	
	/*CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}