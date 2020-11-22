const db = require('../db-secure');

module.exports ={
	
	getAllTextForMe: function(data , callback){
		var sql = "select * from gutext WHERE receiverid= ? ";
		db.getResults(sql, [data.guid] ,function(results){
			console.log(results);
			callback(results);
		});
	}
}