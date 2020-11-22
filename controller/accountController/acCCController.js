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