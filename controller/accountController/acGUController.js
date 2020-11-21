const express 	= require('express');
const acGUModel = require.main.require('./models/accountControlManeger/acGUModel');
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
		var id ={
			id: req.params.id
		};
		acGUModel.getByIdRegistrationRequest(id, function(results){
			console.log(results);
			res.render('accountControlManager/declineUserRequst', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})
router.post('/GUDecline/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var user ={
			id: req.params.id
		};
		acGUModel.deleteRegistrationRequest(user, function(status){
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