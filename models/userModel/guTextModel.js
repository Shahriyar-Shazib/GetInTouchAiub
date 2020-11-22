const db = require('../db-secure');

module.exports ={
	
	getAllTextForMe: function(data , callback){
		var sql = "select * from gutext WHERE receiverid= ? ";
		db.getResults(sql, [data.guid] ,function(results){
			console.log(results);
			callback(results);
		});
	},
	sendtext: function(data , callback){
		var sql = "INSERT INTO `gutext` VALUES (?,?,?,?)";
		db.execute(sql, ['', data.guid , data.text , data.receiverid] ,function(status){
			console.log(status);
			callback(status);
		});
	}
}