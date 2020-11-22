const db = require('../db-secure');

module.exports = {

    insert: function(action, callback){
		var sql = "insert into ccrequestforaction(ccid, actiontype, text) VALUES (?, ?, ?)";
		db.execute(sql, [ action.ccid, action.actiontype, action.text], function(status){
			callback(status);
		});
    }
};