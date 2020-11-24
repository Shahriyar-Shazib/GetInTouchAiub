const acModel = require.main.require('./models/accountControlManeger/acModel');
const acUserModel = require.main.require('./models/accountControlManeger/acUserModel');
const express 	= require('express');
const router 	= express.Router();
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');
var exSession 	= require('express-session');
var exUpload 	= require('express-fileupload');

router.get('/getmyinfo', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data={
			acid : req.cookies['uname']  
		};
		acModel.getMyInfo(data , function(results){
			res.render('accountControlManager/MyProfile', {user: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data={
			acid : req.cookies['uname']  
		};
		acModel.getMyInfo(data , function(results){
			res.render('accountControlManager/UpdateProfile', {user: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/UpdateProfile', [

		check('name')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 5 }).withMessage('Minimumm length must need to be 5')
		,
		check('email')
			.notEmpty().withMessage('Can not be empty')
			.isEmail().withMessage('Must need to be a valid email example@example.com')
		,
		check('dob')
			.notEmpty().withMessage('Can not be empty')
			.isDate().withMessage('Must need to be YYYY-MM-DD')
		,
		check('address')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 5 }).withMessage('Minimumm length must need to be 5')

	] ,(req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			console.log(req.files);
			if(req.files != null)
			{
				file = req.files.profilepicture;
				console.log(file);
				date = new Date();
				file.mv('./assets/accountControlManager/profilepicture/'+date.getTime()+file.name, function(error)
				{
					if(error == null)
					{	
						var data = {
							acid : req.body.acid,
							name : req.body.name,
							email : req.body.email,
							dob : req.body.dob,
							address : req.body.address,
							profilepicture : "/assets/accountControlManager/profilepicture/"+date.getTime()+file.name
						};
						console.log(data);
						acModel.updateMyInfo(data, function(status){
							if(status)
							{
								res.redirect('/acController/getmyinfo');
							}
							else
							{
								res.redirect('/acController/UpdateProfile')
							}
						});
					}
					else
					{
						res.status(200).send({ result : 'error!' });
					}
				});
			}
			else
			{
				var data = {
					acid : req.body.acid,
					name : req.body.name,
					email : req.body.email,
					dob : req.body.dob,
					address : req.body.address,
					profilepicture: null
				};
				console.log(data);
				acModel.updateMyInfo(data, function(status){
					if(status)
					{
						res.redirect('/acController/getmyinfo');
					}
					else
					{
						res.redirect('/acController/UpdateProfile')
					}
				});
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
	}else{
		res.redirect('/login');
	}

})

router.get('/DeactivateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data={
			acid : req.cookies['uname']  
		};
		acModel.getMyInfo(data , function(results){
			res.render('accountControlManager/DeactivateProfile', {user: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/DeactivateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			acid : req.body.acid
		};
		acModel.deactivateMyProfile(data, function(status){
			if(status)
			{
				acUserModel.deactivateACFromUser(data, function(status){
					if(status)
					{
						res.redirect('/login');
					}
					else
					{
						res.redirect('/acController/DeactivateProfile');
					}
				});
			}
		});

	}else{
		res.redirect('/login');
	}

})

module.exports = router;