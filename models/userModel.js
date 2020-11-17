const db = require('./db');

module.exports = {

    validate: function(user, callback){
		var sql = "select * from user where userid='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results,true);
			}else{
				callback(results,false);
			}
		});
    },
    getByIdUser: function(user,callback){
		var sql="SELECT * FROM `user` WHERE id='"+user.id+"'";
		db.getResults(sql,function (result){
			callback(result);
		});

    },
    insertUser: function(user, callback){
		var sql = "insert into user(userid, password, usertype) VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		db.execute(sql, function(status){
			callback(status);
		});
    },
    updateUser: function(user, callback){
		var sql="UPDATE `user` SET `userid`='"+user.username+"',`password`='"+user.password+"',`usertype`='"+user.type+"', accountstatus='"+user.accountstatus+"' WHERE `id`='"+user.id+"' ";
		db.execute(sql, function(status){
			callback(status);
		});
    },
    deleteUser: function(user, callback){
		var sql="DELETE FROM `user` WHERE id='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	}
};