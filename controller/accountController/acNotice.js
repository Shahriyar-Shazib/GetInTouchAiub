const express 	= require('express');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const acNoticeModel = require.main.require('./models/accountControlManeger/acNoticeModel');
const router 	= express.Router();

router.get('/CreateNotice', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data= [req.cookies['uname']];
		res.render('accountControlManager/CreateNotice', {acid: data});
	}else{
		res.redirect('/login');
	}
})

router.post('/CreateNotice', (req, res)=>{
	let data = {
		acid : req.body.acid,
		towhom : req.body.towhom,
		subject : req.body.subject,
		body : req.body.body
	};
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		acNoticeModel.createNotice(data, function(status){
		if(status){
			 res.status(200).send({ status : 'Notice Uploaded!!' });
		}else{
			 res.status(200).send({ status : 'Fail to send notice!!'});
		}
	});
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