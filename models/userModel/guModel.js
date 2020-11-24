const db = require('../db-secure');

module.exports ={
	
	ajaxSearchGU: function(data,callback){
		var sql = "select * from generaluser where guid LIKE '%"+data.text+"%'";
		db.getResults(sql, null ,function(results){
			console.log(results);
			callback(results);
		});
	}
}