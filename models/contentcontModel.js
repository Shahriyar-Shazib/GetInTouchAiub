const db = require('./db');

module.exports ={

    getAllContentCont: function(callback){
		var sql = "select * from contentcontrolmanager";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
}