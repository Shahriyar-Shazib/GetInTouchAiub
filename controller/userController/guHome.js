const express 	= require('express');
const guAdminModel = require.main.require('./models/userModel/guAdminModel');
const guACModel = require.main.require('./models/userModel/guACModel');
const guCCModel = require.main.require('./models/userModel/guCCModel');
const guTextModel = require.main.require('./models/userModel/guTextModel');
const guRegistrationModel = require.main.require('./models/userModel/guRegistrationModel');
const guProfileModel = require.main.require('./models/userModel/guProfileModel');
const router 	= express.Router();

//Home

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/guHome', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})

//Notice

router.get('/Notifications', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/Notifications');
	}else{
		res.redirect('/login');
	}
})

router.get('/NotificationAdmin', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guAdminModel.getAllNotificationOfAdmin(function(results){
			res.render('userController/NotificationAdmin',{notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/NotificationCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guCCModel.getAllNotificationOfCC(function(results){
			res.render('userController/NotificationCC', {notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/NotificationAC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guACModel.getAllNotificationOfAC(function(results){
			res.render('userController/NotificationAC', {notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

//Text

router.get('/received', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guTextModel.getAllTextForMe(data , function(results){
			res.render('userController/ReceivedText',{text:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/SendText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/SendText');
	}else{
		res.redirect('/login');
	}
})

router.post('/SendText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
			var data = {
			receiverid : req.body.receiverid,
			text : req.body.text,
			guid : req.cookies['uname']
		};
		guTextModel.sendtext(data , function(status){
			if(status) 
			{
				res.status(200).send({ result : 'Message Sent Successfully!' });
			}
			else
			{
				res.status(200).send({ result : 'Failed To Sent Message!' });
			}
		});

	}else{
		res.redirect('/login');
	}
})

//registration

router.get('/registrationform' , (req, res)=>{
	res.render('userController/registrationForm');
})

router.post('/registrationrequest' , (req, res)=>{
	var data = {
		guid : req.body.guid,
		name : req.body.name,
		email : req.body.email,
		gender: req.body.gender,
		dob : req.body.dob,
		address : req.body.address,
		userstatus : req.body.userstatus
	};
	console.log(data);
	guRegistrationModel.registrationRequest(data , function(status){
		if(status)
		{
			res.status(200).send({ result : 'Registration request submited Successfully!' });
		}
		else
		{
			res.status(200).send({ result : 'Failed to submit registration request!' });	
		}
	})
})

//profile

router.get('/getmyprofile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.getMyProfile(data, function(results){
			res.render('userController/Profile', {value:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.getMyProfile(data, function(results){
			res.render('userController/UpdateProfile', {value:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.post('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname'],
			name : req.body.name,
			email : req.body.email,
			dob : req.body.dob,
			address : req.body.address
		};
		guProfileModel.updateMyProfile(data, function(status){
			if(status)
			{
				res.status(200).send({ result : 'Profile updated Successfully!' });
			}
			else
			{
				res.status(200).send({ result : 'Failed to update profile!' });
			}
		});

	}else{
		res.redirect('/login');
	}

})


module.exports = router;