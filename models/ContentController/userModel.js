const db = require('../db-secure');

module.exports = {

    validate: function(user, callback){
		var sql = "select * from user where userid=? and password=?";
		db.getResults(sql,[user.username, user.password], function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
	},
	
    getByIdUser: function(user,callback){
		var sql="SELECT * FROM `user` WHERE id=?";
		db.getResults(sql,[user.id],function (result){
			callback(result);
		});

    },
    updateUser: function(user, callback){
		var sql="UPDATE `user` SET `userid`=?,`password`=?,`usertype`=?, accountstatus=? WHERE `id`='?";
		db.execute(sql, [user.userId, user.password, user.type, user.accountstatus, user.id], function(status){
			callback(status);
		});
    }
};