const db = require('../db');

module.exports ={

    getAllActiveContentCont: function(callback){
		var sql = "select * from contentcontrolmanager Where accountstatus='Active'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insertContentCont: function(user, callback){
		var sql = "insert into contentcontrolmanager VALUES ('', '"+user.username+"' , '"+user.name+"' , '"+user.email+"', '"+user.gender+"' , '"+user.dob+"' , '"+user.add+"','','"+user.status+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	DeleteContentCont: function(user, callback){
		var sql="DELETE FROM `contentcontrolmanager` WHERE ccid='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}
}