const db = require('../db-secure');

module.exports = {

    getByCId: function(cid,callback){
		var sql="SELECT * FROM `contribution` WHERE ccid=?";
		db.getResults(sql,[cid], function (result){
			callback(result);
		});

    },
    update: function(contribution, callback){
		var sql="UPDATE `contribution` set postapproved=? , postdeclined=? WHERE ccid=?";
		//console.log(sql);
		db.execute(sql, [contribution.postapproved, contribution.postdeclined, contribution.ccid], function(status){
			callback(status);
		});
	},
    getAll: function(callback){
		var sql = "select * from contribution";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};