const db = require('../db-secure');

module.exports = {

    getByCId: function(cid,callback){
		var sql="SELECT * FROM `contribution` WHERE ccid=?";
		db.getResults(sql,[cid], function (result){
			callback(result);
		});

    },
    update: function(contribution, callback){
		var sql="UPDATE `contribution` set postapproved=? , postdeclined=?, announcements=? WHERE ccid=?";
		//console.log(sql);
		db.execute(sql, [contribution.postapproved, contribution.postdeclined, contribution.announcements, contribution.ccid], function(status){
			callback(status);
		});
	},
    getAll: function(callback){
		var sql = "select * from contribution";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	countAllApprovedPosts: function(callback){
		var sql = "select sum(postapproved) as counter from contribution";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	countAllDeclinedPosts: function(callback){
		var sql = "select sum(postdeclined) as counter from contribution";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	countAllAnnouncements: function(callback){
		var sql = "select sum(announcements) as counter from contribution";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	}
};