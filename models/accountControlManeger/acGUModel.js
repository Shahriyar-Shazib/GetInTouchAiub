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
		var sql = "select * from registrationrequest where id=?";
		db.getResults(sql, [data.id], function(results){
			callback(results);
		});
	},
	getByIdGeneralUser: function(data , callback){
		console.log(data.id);
		var sql = "select * from `generaluser` where id=?";
		db.getResults(sql, [data.id], function(results){
			callback(results);
		});
	},
	deleteRegistrationRequest: function(data , callback){
		var sql = "DELETE FROM `registrationrequest` WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},
	CreateGU: function(data , callback){
		var sql = "insert into generaluser VALUES (?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['',data.guid,data.name,data.email,data.gender,data.dob,data.address,'',data.userstatus,'Active'], function(status){
			callback(status);
		});
	},
	DeleteUser: function(data , callback){
		var sql = "insert into user VALUES (?,?,?,?,?)";
		db.execute(sql, ['',data.guid,data.guid,'General User','Active'], function(status){
			callback(status);
		});
	},
	deleteUserFromGU: function(data , callback){
		var sql = "DELETE FROM `generaluser` WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},

	tbUserFromGU: function(data , callback){
		var sql = "UPDATE `generaluser` SET `accountstatus`='Temporarily Blocked' WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},

	bannedUserFromGU: function(data , callback){
		var sql = "UPDATE `generaluser` SET `accountstatus`='Banned' WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	},

	
	GUSearch: function(data , callback){
		var sql = "SELECT * FROM `generaluser` WHERE guid LIKE '%"+data.key+"%' "
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
}