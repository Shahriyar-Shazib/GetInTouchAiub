const express 	= require('express');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const acNoticeModel = require.main.require('./models/accountControlManeger/acNoticeModel');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');

router.get('/CreateNotice', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data= [req.cookies['uname']];
		res.render('accountControlManager/CreateNotice', {acid: data});
	}else{
		res.redirect('/login');
	}
})

router.post('/CreateNotice', [

		check('towhom', 'Must need to be selected')
			.notEmpty()
		,
		check('subject', 'Must need to be filled')
			.notEmpty()
		,
		check('body', 'Must need to be filled')
			.notEmpty()
	
	], (req, res)=>{
	let data = {
		acid : req.body.acid,
		towhom : req.body.towhom,
		subject : req.body.subject,
		body : req.body.body
	};
	
	const errors = validationResult(req);
	if(errors.isEmpty())
	{
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
	}
	else
	{
		console.log(errors.array());
		var em = errors.array();
		var errormassage = ``;

		for(i=0 ; i<em.length ; i++)
		{
			errormassage=errormassage+ em[i].param + " : " + em[i].msg +"<br/>"
		}

		res.status(200).send({ status : errormassage });
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