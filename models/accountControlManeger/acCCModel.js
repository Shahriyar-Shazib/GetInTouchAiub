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

	insertCC: function(data , callback){
		var sql = "INSERT INTO `contentcontrolmanager` VALUES (?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['',data.ccid,data.name,data.email,data.gender,data.dob,data.address,'','Active'] ,function(status){
			console.log(status);
			callback(status);
		});
	},

	UpdateCC: function(data , callback){
		var sql = "UPDATE `contentcontrolmanager` SET `name`=?,`email`=?,`dob`=?,`address`=? WHERE id=?";
		db.execute(sql, [data.name,data.email,data.dob,data.address,data.id] ,function(status){
			console.log(status);
			callback(status);
		});
	},

	deleteUserFromCC: function(data , callback){
		var sql = "DELETE FROM `contentcontrolmanager` WHERE id=?";
		db.execute(sql, [data.id], function(status){
			callback(status);
		});
	}


	/*,
	
	CCSearch: function(data,callback){
		var sql = "select * from contentcontrolmanager where ccid like '% ? %'"
		db.getResults(sql, [data.key], function(results){
			callback(results);
		});
	}*/
}