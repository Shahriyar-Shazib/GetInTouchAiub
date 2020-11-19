const db = require('../db-secure');

module.exports = {

    insertNotice: function(notice, callback){
		var sql = "insert into ccnotice(ccid, guid, subject, body) VALUES (?,?,?,?)";
		db.execute(sql, [ notice.ccid, notice.guid, notice.subject, notice.body], function(status){
			callback(status);
		});
    }
};