const express 	= require('express');
const userModel = require.main.require('./models/adminModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		res.render('Adminhome/HomeAdmin');
		console.log('uname');
	}else{
		res.redirect('/login');
	}
})


router.post('/', (req, res)=>{
	if (req.body.userlist=='userlist')
	get.redirect('/Adminhome/userlist');
})
router.get('/AccountControllerList', (req, res)=>{
	res.render('Adminhome/AccContList');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })

   router.get('/ContentControllerList', (req, res)=>{
	res.render('Adminhome/ContentContList');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/Adminprofile', (req, res)=>{
	res.render('Adminhome/AdminProfile');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/editAccount', (req, res)=>{
	res.render('Adminhome/editAccount');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/PendingPost', (req, res)=>{
	res.render('Adminhome/PendingPostAd');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/PendingSignup', (req, res)=>{
	res.render('Adminhome/PendingSignUpAd');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })

router.get('/userlist', (req, res)=>{
 res.render('Adminhome/UserList');
	//userModel.getAll(function(results){
		//res.render('/Adminhome/UserList', {userlist: results});
	//});

});

module.exports = router;