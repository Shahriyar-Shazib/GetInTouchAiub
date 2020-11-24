const db = require('../db-secure');

module.exports ={
	
	getAllTextOfGU: function(acid, callback){
		var sql = "select * from gurequestforaction where towhom=?";
		db.getResults(sql, ['Account Control Manager'] ,function(results){
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