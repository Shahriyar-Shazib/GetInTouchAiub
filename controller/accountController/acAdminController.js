const express 	= require('express');
const acAdminModel = require.main.require('./models/accountControlManeger/acAdminModel');
const router 	= express.Router();

router.get('/adminlist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('check1');
		acAdminModel.getAllAdmin(function(results){
			console.log('results');
			res.render('accountControlManager/acAdminList', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

module.exports = router;