const db = require('../db-secure');

module.exports ={
	
	postNewContent: function(data , callback){
		var sql = "INSERT INTO `gupostrequest` VALUES (?,?,?,?)";
		db.execute(sql, ['', data.guid , data.text , data.file] ,function(status){
			console.log(status);
			callback(status);
		});
	},
	ajaxSearchPost: function(data , callback){
		var sql = "select * from gupost where text LIKE '%"+data.text+"%'";
		db.getResults(sql, null ,function(results){
			console.log(results);
			callback(results);
		});
	},
	pendingPostList: function(data , callback){
		var sql = "select * from gupostrequest where guid=?";
		db.getResults(sql, [data.guid] ,function(results){
			console.log(results);
			callback(results);
		});
	},
	myPostList: function(data , callback){
		var sql = "select * from gupost where guid=?";
		db.getResults(sql, [data.guid] ,function(results){
			console.log(results);
			callback(results);
		});
	},
	requestToApprove: function(data , callback){
		var sql = "INSERT INTO `gurequestforaction` VALUES (?,?,?,?,?)";
		db.execute(sql, ['', data.guid , data.towhom , data.actiontype , data.text] ,function(status){
			console.log(status);
			callback(status);
		});
	},
	myPostById: function(data , callback){
		var sql = "select * from gupost where id=?";
		db.getResults(sql, [data.id] ,function(results){
			console.log(results);
			callback(results);
		});
	},
	myPostDelete: function(data , callback){
		var sql = "DELETE FROM `gupost` WHERE id=?";
		db.execute(sql, [data.id] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}