const db = require('../db');

module.exports = {
    getAllregreq: function(callback){
		var sql = "SELECT * FROM `registrationrequest`";
		db.getResults(sql, function(results){
			
			callback(results);
		});
    },
    getregreqbyID: function(Guser,callback){
		var sql = "SELECT * FROM `registrationrequest` Where guid='"+Guser.id+"'";
		db.getResults(sql, function(results){
			
			callback(results);
		});
    },
    RemoveregReq: function(Guser,callback){
        var sql = "DELETE FROM `registrationrequest` WHERE guid='"+Guser.id+"'";
        db.execute(sql, function(results){
            
            callback(results);
        });
    },

}