const express 	= require('express');
const acAdminModel = require.main.require('./models/accountControlManeger/acAdminModel');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const acGUModel = require.main.require('./models/accountControlManeger/acGUModel');
const acTextModel = require.main.require('./models/accountControlManeger/acTextModel');
const router 	= express.Router();

router.get('/CreateText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data= [req.cookies['uname']];
		res.render('accountControlManager/CreateText', {acid: data});
	}else{
		res.redirect('/login');
	}
})

router.post('/CreateText', (req, res)=>{
	let data = {
		acid : req.body.acid,
		text : req.body.text,
		receiverid : req.body.receiverid
	};
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		
		acTextModel.createText(data, function(status){
		if(status){
			 res.status(200).send({ status : 'Text Send Successfully!!' });
		}else{
			 res.status(200).send({ status : 'Fail to send Text!!'});
		}
	});
	}else{
		res.redirect('/login');
	}
})

router.get('/Text', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
			res.render('accountControlManager/Text');
	}else{
		res.redirect('/login');
	}

})

router.get('/TextGU', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		acTextModel.getAllTextOfGU(req.cookies['uname'] , function(results){
			res.render('accountControlManager/TextGU',{gutext:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/TextCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		acTextModel.getAllTextOfCC(req.cookies['uname'] , function(results){
			res.render('accountControlManager/TextCC', {cctext:results});
		});

	}else{
		res.redirect('/login');
	}

})

module.exports = router;