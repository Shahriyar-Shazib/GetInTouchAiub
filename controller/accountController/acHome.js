const express 	= require('express');
const acModel = require.main.require('./models/accountControlManeger/acModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data={
			acid : req.cookies['uname']  
		};
		acModel.getMyInfo(data , function(results){
			res.render('accountControlManager/acHome', {user: results});
		});
	}else{
		res.redirect('/login');
	}
})

module.exports = router;