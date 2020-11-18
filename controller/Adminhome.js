const express 	= require('express');
const AdminModel = require.main.require('./models/Admin/adminModel');
const accContModel = require.main.require('./models/Admin/accContModel');
const contentcontModel = require.main.require('./models/Admin/contentcontModel');
const userModel = require.main.require('./models/Admin/userModel');
const GuserModel = require.main.require('./models/Admin/GeneraluserModel');
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
	accContModel.getAllActiveAccCont(function(results){
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
	contentcontModel.getAllActiveContentCont(function(results){
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
  

   router.get('/deleteContentCont/:id', (req, res)=>{
	//res.render('Adminhome/PendingSignUpAd');
	users ={
		id: req.params.id	
	};
	contentcontModel.DeleteContentCont(users ,function(results){
		if (results)
		{
			userModel.deleteUser(users ,function(result){
				if (result)
				{
					res.redirect('/Adminhome/ContentControllerList');
				}
				  
			   });
		
		}
		  
	   });


   
   })

   router.get('/deleteAccCont/:id', (req, res)=>{
	//res.render('Adminhome/PendingSignUpAd');
	users ={
		id: req.params.id	
	};
	contentcontModel.DeleteContentCont(users ,function(results){
		if (results)
		{
			userModel.deleteUser(users ,function(result){
				if (result)
				{
					res.redirect('/Adminhome/AccountControllerList');
				}
				  
			   });
		
		}
		  
	   });
	})
   

	
	router.get('/deleteuser/:id', (req, res)=>{
		//res.render('Adminhome/PendingSignUpAd');
		users ={
			id: req.params.id	
		};
		GuserModel.deleteUser(users ,function(results){
			if (results)
			{
				userModel.deleteUser(users ,function(status){
					if (status)
					{
						res.redirect('/Adminhome/userlist');
					}
					  
				   });
			
			}
			  
		   });
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
		   type: req.body.type,
		   status: "Active"
	   }
	   if(req.body.type=="Admin"){
		AdminModel.insertAdmin(user,function(results){
			if (results){
				userModel.insertUser(user,function(status){
					if (status)
					{
						res.redirect('/Adminhome/AdminList');
					}
				})

				}
			});
		

	   }else if(req.body.type=="Account Control Manager"){

		accContModel.insertAccCont(user,function(results){
			if (results){
				userModel.insertUser(user,function(status){
					if (status)
					{
						res.redirect('/Adminhome/AccountControllerList');
					}
				})

				}
			});

	   }else if(req.body.type=="Content Control Manager"){

		contentcontModel.insertContentCont(user,function(results){
			if (results){
				userModel.insertUser(user,function(status){
					if (status)
					{
						res.redirect('/Adminhome/ContentControllerList');
					}
					

				})

				}
			//res.redirect('Adminhome/Mynotification', {userlist: results});
			});
	   }
   })
   router.get('/Insert', (req, res)=>{

		   res.render('Adminhome/Insert');
	  
   })
   

router.get('/userlist', (req, res)=>{
 
	GuserModel.getAllActiveUser(function(results){
		res.render('Adminhome/UserList', {userlist: results});
	});

});

module.exports = router;