const db = require('../db-secure');

module.exports = {

    getById: function(id,callback){
		var sql="SELECT * FROM `ccannouncement` WHERE id=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

    },
    getByCId: function(ccid,callback){
		var sql="SELECT * FROM `ccannouncement` WHERE ccid=?";
		db.getResults(sql,[ccid], function (results){
			callback(results);
		});

    },
    insert: function(announcement, callback){
		var sql = "insert into ccannouncement(ccid, subject, body) VALUES (?, ?, ?)";
		db.execute(sql, [ announcement.ccid, announcement.subject, announcement.body], function(status){
			callback(status);
		});
    },
    update: function(announcement, callback){
		var sql="UPDATE `ccannouncement` set subject=? , body=? WHERE id=?";
		//console.log(sql);
		db.execute(sql, [ announcement.subject, announcement.body, announcement.id], function(status){
			callback(status);
		});
    },
    delete: function(id, callback){
		var sql="DELETE FROM `ccannouncement` WHERE id=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
    getAll: function(callback){
		var sql = "select * from ccannouncement";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};