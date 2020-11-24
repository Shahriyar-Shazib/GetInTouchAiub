const express 	= require('express');
const acModel = require.main.require('./models/accountControlManeger/acModel');
const acUserModel = require.main.require('./models/accountControlManeger/acUserModel');
const router 	= express.Router();

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

router.post('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			acid : req.body.acid,
			name : req.body.name,
			email : req.body.email,
			dob : req.body.dob,
			address : req.body.address
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