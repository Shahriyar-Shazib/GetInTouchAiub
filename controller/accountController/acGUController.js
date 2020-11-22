const express 	= require('express');
const acGUModel = require.main.require('./models/accountControlManeger/acGUModel');
const acUserModel = require.main.require('./models/accountControlManeger/acUserModel');
const router 	= express.Router();

router.get('/GUlist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('/GUlist');
		acGUModel.getAllGeneralUser(function(results){
			//console.log('results');
			res.render('accountControlManager/acGUList', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/registrationrequest', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('/registrationrequest');
		acGUModel.getAllRegistrationRequest(function(results){
			//console.log('results');
			res.render('accountControlManager/verifyUser', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/GUDecline/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.getByIdRegistrationRequest(data, function(results){
			console.log(results);
			res.render('accountControlManager/declineUserRequst', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/GURemove/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.getByIdGeneralUser(data, function(results){
			console.log(results);
			res.render('accountControlManager/deleteUser', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/GURemove/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id,
			guid: req.body.guid
		};
		acGUModel.deleteUserFromGU(data, function(status){
			if(status)
			{
				acUserModel.deleteUserFromUser(data, function(status){
					if(status)
					{
						res.redirect('/acGUController/GUlist');
					}
				});
			}
			else
			{
				res.redirect('/acGUController/GUlist');
			}
		});
		
	}else{
		res.redirect('/login');
	}
})

router.post('/GUDecline/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.deleteRegistrationRequest(data, function(status){
			if(status)
			{
				res.redirect('/acGUController/registrationrequest');	
			}
			else
			{
				res.redirect('/acGUController/GUDecline/:id');
			}
			
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/GUApprove/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.getByIdRegistrationRequest(data, function(results){
			if(results.count>0)
			{
				var info ={
					id: results[0].id,
					guid: results[0].guid,
					name: results[0].name,
					email: results[0].email,
					dob: results[0].dob,
					address: results[0].address,
					profilepicture: results[0].profilepicture,
					userstatus: results[0].userstatus
				};
				console.log(info);
				console.log('step1');
				acGUModel.CreateGU(info , function(status){
					if(status)
					{	
						console.log("step2");
						acUserModel.CreateUser(info,function(status){
							if(status)
							{
								console.log("Success");
								res.redirect('/acGUController/registrationrequest');
							}
							else
							{
								console.log("failed1");
								res.redirect('/acGUController/registrationrequest');
							}
						});
					}
					else
					{
						console.log("failed2");
						res.redirect('/acGUController/registrationrequest');
					}
				});
			}
			else
			{
				console.log("failed3");
				res.redirect('/acGUController/registrationrequest');
			}
		});
	}else{
		res.redirect('/login');
	}
})

/*router.get('/searchadmin', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			key : req.query.key
		};
		//console.log(data.key);
		acAdminModel.adminSearch(data, function(results){
			res.send(results);
		});
	}else{
		res.redirect('/login');
	}

})*/

module.exports = router;