const express 	= require('express');
const AdminModel = require.main.require('./models/adminModel');
const accContModel = require.main.require('./models/accContModel');
const contentcontModel = require.main.require('./models/contentcontModel');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		res.render('Adminhome/HomeAdmin');
		console.log('uname');
	}else{
		res.redirect('/login');
	}
})



router.get('/AccountControllerList', (req, res)=>{
	//res.render('Adminhome/AccContList');
	accContModel.getAllAccCont(function(results){
		   res.render('Adminhome/AccContList', {userlist: results});
	   });
   
   })
   router.post('/NotificationAd/:id', (req, res)=>{
	//res.render('Adminhome/AccContList');

	notify={
		id: req.params.id,
		userid: req.cookies['uname'],
		subject: req.body.subject,
		body: req.body.body
	}
	   AdminModel.AddNotification(notify,function(status){
		//userModel.validate( req.params.id,function(result)){
		
		//}
		   if(status){
			res.redirect('/Adminhome');
		   }else {
			res.redirect('/Adminhome');
		   }
		   
	   });
   
   })

   router.get('/ContentControllerList', (req, res)=>{
	//res.render('Adminhome/ContentContList');
	contentcontModel.getAllContentCont(function(results){
		res.render('Adminhome/ContentContList', {userlist: results});
	});
   
   })
   router.get('/AdminList', (req, res)=>{
	//res.render('Adminhome/ContentContList');
	AdminModel.getAllAdmin(function(results){
		res.render('Adminhome/AdminList', {userlist: results});
	});
   
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
   router.get('/NotificationAd/:id', (req, res)=>{
	 users ={
		id: req.params.id,
		userid: req.cookies['uname']
	};
	//res.render('Adminhome/PendingSignUpAd');
	  // userModel.getByIdAccCont(user,function(results){
		   res.render('Adminhome/NotificationAd', users);
	  // });
   
   })
   
   router.get('/BlockAccCont', (req, res)=>{
	res.render('Adminhome/PendingSignUpAd');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/deleteAccCont', (req, res)=>{
	res.render('Adminhome/PendingSignUpAd');
	   //userModel.getAll(function(results){
		   //res.render('/Adminhome/UserList', {userlist: results});
	   //});
   
   })
   router.get('/Notification', (req, res)=>{
	//res.render('Adminhome/Mynotification');
	
	   AdminModel.MyNotification(req.cookies['uname'],function(results){
		   res.render('Adminhome/Mynotification', {userlist: results});
	   });
   
   })
   router.post('/Insert',(req,res)=>{
	  var user={
		   img:req.body.img,
		   name: req.body.name,
		   username: req.body.username,
		   password: "",
		   email:req.body.email,
		   gender:req.body.gender,
		   dob:req.body.dob,
		   add:req.body.address,
		   status: "Active"
	   }
	   if(req.body.type=="Admin"){
		userModel.insertAdmin(user,function(results){
			if (results){
				usermodel.insertUser(user,function(status){
					res.redirect('/Adminhome/AdminList')

				})

			}
			//res.redirect('Adminhome/Mynotification', {userlist: results});
		});

	   }else if(req.body.type=="Account Control Manager"){

	   }else if(req.body.type=="Content Control Manage"){

	   }
   })
   router.get('/Insert', (req, res)=>{

		   res.render('Adminhome/Insert');
	  
   })
   

router.get('/userlist', (req, res)=>{
 
	userModel.getAllUser(function(results){
		res.render('Adminhome/UserList', {userlist: results});
	});

});

module.exports = router;