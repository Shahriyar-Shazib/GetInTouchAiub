const express 		= require('express');
const acAdminModel 	= require.main.require('./models/accountControlManeger/acAdminModel');
const acCCModel 	= require.main.require('./models/accountControlManeger/acCCModel');
const acGUModel		= require.main.require('./models/accountControlManeger/acGUModel');
const acTextModel	= require.main.require('./models/accountControlManeger/acTextModel');
const router 		= express.Router();
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');

router.get('/CreateText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data= [req.cookies['uname']];
		res.render('accountControlManager/CreateText', {acid: data});
	}else{
		res.redirect('/login');
	}
})

router.post('/CreateText' , [
		check('receiverid','Can not be empty')
			.notEmpty()
		,
		check('text','Can not be empty')
			.notEmpty()
	] , (req, res)=>{

	const errors = validationResult(req);
	if(errors.isEmpty())
	{
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