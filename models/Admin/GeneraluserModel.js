const db = require('../db');

module.exports = {

 
	getAllActiveUser: function(callback){
		var sql = "SELECT * FROM `generaluser` where accountstatus='Active'";
		db.getResults(sql, function(results){
			
			callback(results);
		});
	},

    deleteUser: function(user, callback){
		var sql="DELETE FROM `generaluser` WHERE guid='"+user.id+"'";
		//console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}
};