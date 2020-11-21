const express 	= require('express');
const acGUModel = require.main.require('./models/accountControlManeger/acGUModel');
const router 	= express.Router();

router.get('/GUlist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('check3');
		acGUModel.getAllGeneralUser(function(results){
			console.log('results');
			res.render('accountControlManager/acGUList', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

/*router.get('/searchadmin', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			key : req.query.key
		};
		//console.log(data.key);
		acAdminModel.adminSearch(data, function(results){
			res.send(results);
		});
	}else{
		res.redirect('/login');
	}

})*/

module.exports = router;