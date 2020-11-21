const express 	= require('express');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const router 	= express.Router();

router.get('/CClist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('check2');
		acCCModel.getAllContentControlManager(function(results){
			console.log('results');
			res.render('accountControlManager/acCCList', {userlist: results});
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