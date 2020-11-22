const db = require('../db-secure');

module.exports ={
	
	registrationRequest: function(data , callback){
		var sql = "INSERT INTO `registrationrequest` VALUES (?,?,?,?,?,?,?,?,?)";
		db.execute(sql, ['', data.guid , data.name , data.email, data.gender , data.dob , data.address , '' , data.userstatus] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}