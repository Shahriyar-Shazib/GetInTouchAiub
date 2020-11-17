const db = require('./db');

module.exports ={
    getAllAccCont: function(callback){
		var sql = "SELECT * FROM `accountcontrolmanager`";
		db.getResults(sql, function(results){
			
			callback(results);
		});

	},

}