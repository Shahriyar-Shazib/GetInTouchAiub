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
	DeleteAccCont: function(user, callback){
		var sql="DELETE FROM `accountcontrolmanager` WHERE acid='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	BlockAC: function(AC,callback){
		var sql="UPDATE `accountcontrolmanager` SET accountstatus='Blocked' WHERE acid='"+AC.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	GetAllblockAC: function(callback){
		var sql = "select * from accountcontrolmanager Where accountstatus='Blocked'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	unBlockAC: function(AC,callback){
		var sql="UPDATE `accountcontrolmanager` SET accountstatus='Active' WHERE acid='"+AC.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

	GetAllblockACbykey: function(user,callback){
		var sql = "select * from accountcontrolmanager Where accountstatus='Blocked' and acid like '"+user.key+"'or name like '%"+user.key+"%'or email like '%"+user.key+"%'or gender like '%"+user.key+"%'or dob like '%"+user.key+"%'or address like '%"+user.key+"%'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	GetAllACbykey: function(user,callback){
		var sql = "select * from accountcontrolmanager Where accountstatus='Active' and acid like '"+user+"'or name like '%"+user+"%'or email like '%"+user+"%'or gender like '%"+user+"%'or dob like '%"+user+"%'or address like '%"+user+"%'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },
	GetAllAC: function(callback){
		var sql = "select * from accountcontrolmanager";
		//console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },
}