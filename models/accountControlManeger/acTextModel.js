const db = require('../db-secure');

module.exports ={
	
	getAllTextOfGU: function(acid, callback){
		var sql = "select * from gutext where receiverid=?";
		db.getResults(sql, [acid] ,function(results){
			callback(results);
		});
	},
	getAllTextOfCC: function(acid, callback){
		var sql = "select * from ccrequestforaction";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	createText: function(data, callback){
		var sql = "insert into actext VALUES (?, ? , ? , ?)";
		db.execute(sql, ['' , data.acid , data.text , data.receiverid] , function(status){
			callback(status);
		});
	},
}