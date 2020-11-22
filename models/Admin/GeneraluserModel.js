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
    },
    insertGU: function(Guser,callback){
        var sql = "INSERT INTO `generaluser` Values ('','"+Guser.guid+"','"+Guser.name+"','"+Guser.email+"','"+Guser.gender+"','"+Guser.dob+"','"+Guser.address+"','"+Guser.profilepicture+"','"+Guser.userstatus+"','Active')";

		db.execute(sql, function(results){
			
			callback(results);
		});
    },
    BlockGU: function(Guser,callback){
		var sql="UPDATE `generaluser` SET accountstatus='Blocked' WHERE guid='"+Guser.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},

    GetAllblockGU: function(callback){
		var sql = "select * from generaluser Where accountstatus='Blocked'";
		db.getResults(sql, function(results){
			callback(results);
		});
    },
    unBlockGU: function(Guser,callback){
		var sql="UPDATE `generaluser` SET accountstatus='Active' WHERE guid='"+Guser.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	GetAllblockGUbykey: function(user,callback){
		var sql = "select * from generaluser Where accountstatus='Blocked' and guid like '"+user.key+"'or name like '%"+user.key+"%'or email like '%"+user.key+"%'or gender like '%"+user.key+"%'or dob like '%"+user.key+"%'or address like '%"+user.key+"%'";
		//console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },
};