const db = require('../db-secure');

module.exports ={

	getMyInfo: function(data , callback){
		var sql = "select * from `accountcontrolmanager` WHERE acid=?";
		db.getResults(sql, [data.acid], function(results){
			console.log(results);
			callback(results);
		});
	},

	updateMyInfo: function(data , callback){
		if(data.profilepicture==null)
		{
			var sql = "UPDATE `accountcontrolmanager` SET `name`=?,`email`=?,`dob`=?,`address`=? WHERE acid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.address,data.acid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
		else
		{
			var sql = "UPDATE `accountcontrolmanager` SET `name`=?,`email`=?,`dob`=?,`address`=?,`profilepicture`=? WHERE acid=?";
			db.execute(sql, [data.name,data.email,data.dob,data.address,data.profilepicture,data.acid] ,function(status){
				console.log(status);
				callback(status);
			});
		}
			
	},

	deactivateMyProfile: function(data , callback){
		var sql = "UPDATE `accountcontrolmanager` SET `accountstatus`=? WHERE acid=?";
		db.execute(sql, ['Deactivated' , data.acid] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}