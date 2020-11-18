const db = require('../db');

module.exports ={
    getAllActiveAccCont: function(callback){
		var sql = "SELECT * FROM `accountcontrolmanager` where accountstatus='Active'";
		db.getResults(sql, function(results){
			
			callback(results);
		});

	},
	insertAccCont: function(user, callback){
		var sql = "insert into accountcontrolmanager VALUES ('', '"+user.username+"' , '"+user.name+"' , '"+user.email+"', '"+user.gender+"' , '"+user.dob+"' , '"+user.add+"','','"+user.status+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	DeleteContentCont: function(user, callback){
		var sql="DELETE FROM `accountcontrolmanager` WHERE acid='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}

}