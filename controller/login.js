const express 	= require('express');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index')
})

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(result,status){
		if(status){
			console.log(req.body.username);
			if((result[0].accountstatus == "Active") && (result[0].usertype == "Admin")){
				req.session.type = result[0].usertype;
				res.cookie('uname', req.body.username);
				res.redirect('/Adminhome');
			}else if((result[0].accountstatus == "Active") && (result[0].usertype == "Content Control Manager")){
				req.session.type = result[0].usertype;
				res.cookie('uname', req.body.username);
				res.redirect('/contentcontroller');
			}else if((result[0].accountstatus == "Active") && (result[0].usertype == "Account Control Manager")){
				req.session.type = result[0].usertype;
				res.cookie('uname', result[0].userid);
				res.cookie('usertype', result[0].usertype);
				res.redirect('/achome');
			}else if((result[0].accountstatus == "Active") && (result[0].usertype == "General User")){
				req.session.type = result[0].usertype;
				res.cookie('uname', result[0].userid);
				res.cookie('usertype', result[0].usertype);
				res.redirect('/userController');
			}	
		}else{
			res.redirect('/login');
		}
	});

})

module.exports = router;