const db = require('../db-secure');

module.exports ={
	
	ajaxSearchPost: function(data , callback){
		var sql = "select * from gupost where text LIKE '%"+data.text+"%'";
		db.getResults(sql, null ,function(results){
			console.log(results);
			callback(results);
		});
	}
}