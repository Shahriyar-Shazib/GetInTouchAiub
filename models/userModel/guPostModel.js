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
	}
}