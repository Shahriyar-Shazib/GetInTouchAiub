const db = require('./db');

module.exports ={

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
			//if(results.length > 0){
				callback(result);
			//}else{
			//	callback ()
			//}
		});

	},
	getByIdAccCont: function(user,callback){
		/*var sql="SELECT * FROM `user` WHERE id='"+user.id+"'";
		db.getResults(sql,function (result){
			//if(results.length > 0){
				callback(result);
			//}else{
			//	callback ()
			//}
		});*/

	},
	getByIdContentCont: function(user,callback){
		/*var sql="SELECT * FROM `user` WHERE id='"+user.id+"'";
		db.getResults(sql,function (result){
			//if(results.length > 0){
				callback(result);
			//}else{
			//	callback ()
			//}
		});*/

	},
	getByIdAdmin: function(user,callback){
		/*var sql="SELECT * FROM `user` WHERE id='"+user.id+"'";
		db.getResults(sql,function (result){
			//if(results.length > 0){
				callback(result);
			//}else{
			//	callback ()
			//}
		});*/

	},
	getAllUser: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAllContentCont: function(callback){
		/*var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
*/
	},
	getAllAccCont: function(callback){
		/*var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
*/
	},
	getAllAdmin: function(callback){
		/*var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
*/
	},
	insertUser: function(user, callback){
		var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	insertContentCont: function(user, callback){
		/*var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});*/
	},
	insertAccCont: function(user, callback){
		/*var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});*/
	},
	insertAdmin: function(user, callback){
		/*var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});*/
	},
	updateAdmin: function(user, callback){
		var sql="UPDATE `user` SET `id`='"+user.id+"',`username`='"+user.username+"',`password`='"+user.password+"',`type`='"+user.type+"' WHERE `id`='"+user.id+"' "
		db.execute(sql, function(status){
			callback(status);
		});
	},
	blockUser: function(user,callback){
	/*	var sql="UPDATE `user` SET `id`='"+user.id+"',`username`='"+user.username+"',`password`='"+user.password+"',`type`='"+user.type+"' WHERE `id`='"+user.id+"' "
		db.execute(sql, function(status){
			callback(status);
		});*/
	},
	blockAccCont: function(user,callback){
		/*	var sql="UPDATE `user` SET `id`='"+user.id+"',`username`='"+user.username+"',`password`='"+user.password+"',`type`='"+user.type+"' WHERE `id`='"+user.id+"' "
			db.execute(sql, function(status){
				callback(status);
			});*/
	},
	blockcontentCont : function(user,callback){
		/*	var sql="UPDATE `user` SET `id`='"+user.id+"',`username`='"+user.username+"',`password`='"+user.password+"',`type`='"+user.type+"' WHERE `id`='"+user.id+"' "
			db.execute(sql, function(status){
				callback(status);
			});*/
	},
	deleteUser: function(user, callback){
		var sql="DELETE FROM `user` WHERE id='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	deleteAccCont: function(user, callback){
		/*var sql="DELETE FROM `user` WHERE id='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});*/
	},
	deleteContentCont: function(user, callback){
		/*var sql="DELETE FROM `user` WHERE id='"+user.id+"'";
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});*/
	}

}