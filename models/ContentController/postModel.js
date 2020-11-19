const db = require('../db-secure');

module.exports = {

    insertPost: function(post, callback){
		var sql = "insert into gupost(guid, text, file, approvedby) VALUES (?, ?, ?, ?)";
		db.execute(sql, [ post.guid, post.text, post.file, post.approvedBy], function(status){
			callback(status);
		});
    }
};