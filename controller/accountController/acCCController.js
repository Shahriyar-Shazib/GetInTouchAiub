const express 	= require('express');
const acCCModel = require.main.require('./models/accountControlManeger/acCCModel');
const acUserModel = require.main.require('./models/accountControlManeger/acUserModel');
const router 	= express.Router();

router.get('/CClist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('/CClist');
		acCCModel.getAllContentControlManager(function(results){
			console.log('results');
			res.render('accountControlManager/acCCList', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/CreateCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		res.render('accountControlManager/CreateCC');
	}else{
		res.redirect('/login');
	}

})

router.get('/CCEdit/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			id: req.params.id
		};
		acCCModel.getByIdCC(data , function(results){
			res.render('accountControlManager/EditCC', {value: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/CCEdit/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			id: req.params.id,
			name: req.body.name,
			email: req.body.email,
			dob: req.body.dob,
			address: req.body.address
		};
		acCCModel.UpdateCC(data , function(status){
			if (status) 
			{
				res.redirect('/acCCController/CClist');	
			}
			else
			{
				res.redirect('/acCCController/CCEdit/'+data.id);
			}
			
		});
	}else{
		res.redirect('/login');
	}

})

router.post('/CreateCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data=
		{
			ccid: req.body.ccid,
			name: req.body.name,
			email: req.body.email,
			gender: req.body.gender,
			dob: req.body.dob,
			address: req.body.address
		};
		console.log(data);
		acCCModel.insertCC(data, function(status){
			if(status)
			{
				acUserModel.insertUser(data, function(status){
					res.status(200).send({ status : 'Content Controller Added!!' });
				});
			}
			else
			{
				res.status(200).send({ status : 'Failed to add content controller!!' });
			}
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/CCdelete/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id
		};
		acCCModel.getByIdCC(data, function(results){
			console.log(results);
			res.render('accountControlManager/deleteCC', {value: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/CCdelete/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){	
		var data ={
			id: req.params.id,
			ccid: req.body.ccid
		};
		acCCModel.deleteUserFromCC(data, function(status){
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

router.get('/searchCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			key : req.query.key
		};
		console.log(data.key);
		acCCModel.CCSearch(data, function(results){
			var strign=`<table id="view">
						<tr>
							<td>CC ID</td>
							<td>Name</td>
							<td>Email</td>
							<td>Gender</td>
							<td>Date Of Birth</td>
							<td>Address</td>
							<td>Profile Picture</td>
							<td>Account Status</td>
						</tr>`;
			for(i=0; i<results.length ; i++)
			{
				strign=strign+"<tr>";
				strign=strign+"<td>"+results[i].ccid+"</td>";
				strign=strign+"<td>"+results[i].name+"</td>";
				strign=strign+"<td>"+results[i].email+"</td>";
				strign=strign+"<td>"+results[i].gender+"</td>";
				strign=strign+"<td>"+results[i].dob+"</td>";
				strign=strign+"<td>"+results[i].address+"</td>";
				strign=strign+"<td>"+results[i].profilepicture+"</td>";
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