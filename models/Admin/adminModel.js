const db = require('../db');

module.exports ={

	
	AddNotification:function(notify,callback){
		var sql="INSERT INTO `adminnotice` values ('', '"+notify.userid+"' , '"+notify.subject+"' , '"+notify.body+"' , '"+notify.id+"')"
		console.log(sql);
		db.execute(sql, function(status){
			callback(status);
		});
	},
	MyNotification: function(id,callback){
		var sql = "SELECT * FROM `adminnotice` where towhom='"+id+"'";
		console.log(sql);
		db.getResults(sql, function(results){
			
			callback(results);
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

	getByIdAdmin: function(user,callback){
		var sql="SELECT * FROM `admin` WHERE adminid='"+user+"'";
		db.getResults(sql,function (result){
			if(result.length > 0){
				callback(result);
			}else{
				callback ()
			}
		});

	},


	
	getAllAdmin: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insertContentCont: function(user, callback){
		/*var sql = "insert into user VALUES ('', '"+user.username+"' , '"+user.password+"' , '"+user.type+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});*/
	},

	insertAdmin: function(user, callback){
		var sql = "insert into admin VALUES ('', '"+user.username+"' , '"+user.name+"' , '"+user.email+"', '"+user.gender+"' , '"+user.dob+"' , '"+user.add+"','"+user.img+"')";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	updateAdmin:function(user, callback){
		var sql = "UPDATE `admin` SET `name`='"+user.name+"',`email`='"+user.email+"',`gender`='"+user.gnder+"',`dob`='"+user.dob+"',`address`='"+user.address+"' WHERE `adminid`='"+user.adminid+"'";

		db.execute(sql, function(status){
			callback(status);
		});
	},

	GetAllAdminbykey: function(user,callback){
		var sql = "select * from admin Where  adminid like '"+user+"'or name like '%"+user+"%'or email like '%"+user+"%'or gender like '%"+user+"%'or dob like '%"+user+"%'or address like '%"+user+"%'";
		console.log(sql);
		db.getResults(sql, function(results){
			callback(results);
		});
    },

}