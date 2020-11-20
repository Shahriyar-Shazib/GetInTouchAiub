const db = require('../db-secure');

module.exports = {

    getById: function(id,callback){
		var sql="SELECT * FROM `contentcontrolmanager` WHERE id=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

    },
    getByCId: function(ccid,callback){
		var sql="SELECT * FROM `contentcontrolmanager` WHERE ccid=?";
		db.getResults(sql,[ccid], function (results){
			callback(results);
		});

    },
    update: function(cc, callback){
		var sql="UPDATE `contentcontrolmanager` set name=? , email=? , gender=?, dob=?, address=?, profilepicture=?, accountstatus=? WHERE ccid=?";
		//console.log(sql);
		db.execute(sql, [ cc.name , cc.email , cc.gender, cc.dob, cc.address, cc.profilepicture, cc.accountstatus, cc.ccid ], function(status){
			callback(status);
		});
    },
    getAll: function(callback){
		var sql = "select * from contentcontrolmanager";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};