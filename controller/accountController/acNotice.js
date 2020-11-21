const express 	= require('express');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const acNoticeModel = require.main.require('./models/accountControlManeger/acNoticeModel');
const router 	= express.Router();

router.get('/CreateNotice', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		res.render('accountControlManager/CreateNotice');
	}else{
		res.redirect('/login');
	}
})

router.get('/Notices', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		acNoticeModel.getAllNotices(function(results){
			res.render('accountControlManager/Notices', {notices:results});
		});

	}else{
		res.redirect('/login');
	}

})

module.exports = router;