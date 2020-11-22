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

router.get('/GUTemporarilyBlock/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.getByIdGeneralUser(data, function(results){
			console.log(results);
			res.render('accountControlManager/temporarilyBlock', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.get('/GUBanned/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acGUModel.getByIdGeneralUser(data, function(results){
			console.log(results);
			res.render('accountControlManager/banned', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/GUTemporarilyBlock/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id,
			guid: req.body.guid
		};
		acGUModel.tbUserFromGU(data, function(status){
			if(status)
			{
				acUserModel.tbUserFromUser(data, function(status){
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

router.post('/GUBanned/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id,
			guid: req.body.guid
		};
		acGUModel.bannedUserFromGU(data, function(status){
			if(status)
			{
				acUserModel.bannedUserFromUser(data, function(status){
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

router.get('/searchGU', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			key : req.query.key
		};
		console.log(data.key);
		acGUModel.GUSearch(data, function(results){
			var strign=`<table id="view">
						<tr>
							<td>GU ID</td>
							<td>Name</td>
							<td>Email</td>
							<td>Gender</td>
							<td>Date Of Birth</td>
							<td>Address</td>
							<td>Profile Picture</td>
							<td>User Status</td>
							<td>Account Status</td>
						</tr>`;
			for(i=0; i<results.length ; i++)
			{
				strign=strign+"<tr>";
				strign=strign+"<td>"+results[i].guid+"</td>";
				strign=strign+"<td>"+results[i].name+"</td>";
				strign=strign+"<td>"+results[i].email+"</td>";
				strign=strign+"<td>"+results[i].gender+"</td>";
				strign=strign+"<td>"+results[i].dob+"</td>";
				strign=strign+"<td>"+results[i].address+"</td>";
				strign=strign+"<td>"+results[i].profilepicture+"</td>";
				strign=strign+"<td>"+results[i].userstatus+"</td>";
				strign=strign+"<td>"+results[i].accountstatus+"</td>";
				strign=strign+"</tr>";
			}
			strign=strign+`</table>`;
			console.log(strign);
			res.status(200).send({ status : strign });
		});
	}else{
		res.redirect('/login');
	}

})

module.exports = router;