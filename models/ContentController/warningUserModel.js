const db = require('../db-secure');

module.exports = {

    getByCId: function(cid,callback){
		var sql="SELECT * FROM `warninguser` WHERE ccid=?";
		db.getResults(sql,[cid], function (result){
			callback(result);
		});

    },
    insert: function(warning, callback){
		var sql = "insert into warninguser(ccid, guid, warningtext) VALUES ( ?, ?, ?)";
		db.execute(sql, [  warning.ccid, warning.guid, warning.warningtext], function(status){
			callback(status);
		});
    },
    getAll: function(callback){
		var sql = "select * from warninguser";
		db.getResults(sql, null, function(results){
			callback(results);
		});
    },
    getByGId: function(gid,callback){
		var sql="SELECT * FROM `warninguser` WHERE guid=?";
		db.getResults(sql,[gid], function (result){
			callback(result);
		});

    }
};