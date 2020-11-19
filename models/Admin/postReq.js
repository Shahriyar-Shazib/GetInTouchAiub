const db = require('../db');

module.exports = {
    getAllpostreq: function(callback){
		var sql = "SELECT * FROM `gupostrequest`";
		db.getResults(sql, function(results){
			
			callback(results);
		});
    },
    getpostreqbyID: function(post,callback){
			var sql = "SELECT * FROM `gupostrequest` Where id='"+post.id+"'";
			db.getResults(sql, function(results){
				
				callback(results);
			});
		},
		deletePost: function(post,callback){
			var sql = "DELETE FROM `gupostrequest` WHERE id='"+post.id+"'";
			db.execute(sql, function(results){
				
				callback(results);
			});
		},
}