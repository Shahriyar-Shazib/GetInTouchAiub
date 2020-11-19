const db = require('../db-secure');

module.exports = {

    getByIdPostReq: function(id,callback){
		var sql="SELECT * FROM `gupostrequest` WHERE id=?";
		db.getResults(sql,[id], function (result){
			callback(result);
		});

    },
    deletePostReq: function(id, callback){
		var sql="DELETE FROM `gupostrequest` WHERE id=?";
		//console.log(sql);
		db.execute(sql, [id], function(status){
			callback(status);
		});
	},
    getAll: function(callback){
		var sql = "select * from gupostrequest";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};