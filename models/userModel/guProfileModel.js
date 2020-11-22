const db = require('../db-secure');

module.exports ={

	getMyProfile: function(data , callback){
		var sql = "select * from `generaluser` WHERE guid=?";
		db.getResults(sql, [data.guid], function(results){
			console.log(results);
			callback(results);
		});
	},

	UpdateMyProfile: function(data , callback){
		var sql = "UPDATE `generaluser` SET `name`=?,`email`=?,`dob`=?,`address`=? WHERE id=?";
		db.execute(sql, [data.name,data.email,data.dob,data.address,data.id] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}