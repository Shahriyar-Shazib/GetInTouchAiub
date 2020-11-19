const db = require('../db');

module.exports = {
    insertpost: function(post, approveby,callback){
		var sql = "INSERT INTO `gupost` Values ('','"+post.guid+"','"+post.text+"','"+post.file+"','"+approveby+"')";
		db.execute(sql, function(results){
			
			callback(results);
		});
    },
    /*getAllpostreq: function(callback){
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
	},*/
}