const db = require('../db-secure');

module.exports = {

    getByIdGeneralUser: function(id,callback){
		var sql="SELECT * FROM `generaluser` WHERE id=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

    },
    getByGIdGeneralUser: function(userId,callback){
		var sql="SELECT * FROM `generaluser` WHERE guid=?";
		db.getResults(sql, [userId], function (result){
			callback(result);
		});

    },
    getAll: function(callback){
		var sql = "select * from generaluser";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};