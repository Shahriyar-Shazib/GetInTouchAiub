const db = require('../db-secure');

module.exports ={
	CreateUser: function(data , callback){
		var sql = "insert into user VALUES (?,?,?,?,?)";
		db.execute(sql, ['',data.guid,data.guid,'General User','Active'], function(status){
			callback(status);
		});
	},
	deleteUserFromUser: function(data , callback){
		var sql = "DELETE FROM `user` WHERE userid=?";
		console.log(data.guid);
		db.execute(sql, [data.guid], function(status){
			callback(status);
		});
	},

	tbUserFromUser: function(data , callback){
		var sql = "UPDATE `user` SET `accountstatus`='Temporarily Banned' WHERE userid=?";
		console.log(data.guid);
		db.execute(sql, [data.guid], function(status){
			callback(status);
		});
	},

	bannedUserFromUser: function(data , callback){
		var sql = "UPDATE `user` SET `accountstatus`='Blocked' WHERE userid=?";
		console.log(data.guid);
		db.execute(sql, [data.guid], function(status){
			callback(status);
		});
	},

	
	/*CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}