const express 	= require('express');
const guAdminModel = require.main.require('./models/userModel/guAdminModel');
const guACModel = require.main.require('./models/userModel/guACModel');
const guCCModel = require.main.require('./models/userModel/guCCModel');
const guTextModel = require.main.require('./models/userModel/guTextModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/guHome', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})

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

module.exports = router;