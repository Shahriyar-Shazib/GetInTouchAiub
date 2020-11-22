const db = require('../db-secure');

module.exports ={

	getMyProfile: function(data , callback){
		var sql = "select * from `generaluser` WHERE guid=?";
		db.getResults(sql, [data.guid], function(results){
			console.log(results);
			callback(results);
		});
	},

	updateMyProfile: function(data , callback){
		var sql = "UPDATE `generaluser` SET `name`=?,`email`=?,`dob`=?,`address`=? WHERE guid=?";
		db.execute(sql, [data.name,data.email,data.dob,data.address,data.guid] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}