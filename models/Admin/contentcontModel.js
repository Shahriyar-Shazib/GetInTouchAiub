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
	},
	BlockCC: function(CC,callback){
		var sql="UPDATE `contentcontrolmanager` SET accountstatus='Blocked' WHERE ccid='"+CC.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	GetAllblockCC: function(callback){
		var sql = "select * from contentcontrolmanager Where accountstatus='Blocked'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	unBlockCC: function(CC,callback){
		var sql="UPDATE `contentcontrolmanager` SET accountstatus='Active' WHERE ccid='"+CC.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
}