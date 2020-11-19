const { static } = require('express');
const express 	= require('express');
const AdminModel = require.main.require('./models/Admin/adminModel');
const accContModel = require.main.require('./models/Admin/accContModel');
const contentcontModel = require.main.require('./models/Admin/contentcontModel');
const userModel = require.main.require('./models/Admin/userModel');
const GuserModel = require.main.require('./models/Admin/GeneraluserModel');
const postreqModel = require.main.require('./models/Admin/postReq');
const regreqModel = require.main.require('./models/Admin/regreqModel');
const post = require.main.require('./models/Admin/post');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		
		post.getAllpost(function(results){
			res.render('Adminhome/HomeAdmin',{post:results});
		});
		
	}else{
		res.redirect('/login');
	}
})


/////// Admin

router.get('/AdminList', (req, res)=>{
	//res.render('Adminhome/ContentContList');
	AdminModel.getAllAdmin(function(results){
		res.render('Adminhome/AdminList', {userlist: results});
	});
   
   })
   router.get('/Adminprofile', (req, res)=>{
	//res.render('Adminhome/AdminProfile'{user:});
	   AdminModel.getByIdAdmin(req.cookies['uname'],function(results){
		   res.render('Adminhome/AdminProfile', {userlist: results});
		   //console.log(results);
	   });
   
   })
   router.get('/editAccount', (req, res)=>{
	   AdminModel.getByIdAdmin(req.cookies['uname'],function(results){
		   res.render('Adminhome/EditAd', {userlist: results});
	   });
   
   })
   router.post('/editAccount', (req, res)=>{
	   admin={
		   adminid: req.body.username,
		   name:req.body.name,
		   email: req.body.email,
		   gender:req.body.gender,
		   dob: req.body.dob,
		   address:req.body.address,
	   }
	AdminModel.updateAdmin(admin,function(results){
		res.redirect('/Adminhome/Adminprofile');
	});

})
    
/////Account Controller
router.get('/AccountControllerList', (req, res)=>{
	
	accContModel.getAllActiveAccCont(function(results){
		   res.render('Adminhome/AccContList', {userlist: results});
	   });
   
   })

  

   router.get('/BlockAccCont/:id', (req, res)=>{
	AC ={
		id: req.params.id	
	};

	accContModel.BlockAC( AC,function(results){
		if(results){
			userModel.BlockUser( AC,function(result){
			if(result){
				res.redirect('/Adminhome/AccountControllerList');
			}
			})
		}
		  
	   });
   
   })

   router.get('/deleteAccCont/:id', (req, res)=>{
	users ={
		id: req.params.id	
	};
	accContModel.DeleteAccCont(users ,function(results){
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
   

	router.get('/unBlockAccCont/:id', (req, res)=>{
		AC ={
			id: req.params.id	
		};
	
		accContModel.unBlockAC( AC,function(results){
			if(results){
				userModel.unBlockUser( AC,function(result){
				if(result){
					res.redirect('/Adminhome/Blocklist');
				}
				})
			}
		   });
	   
	   })
 
///////Content Controller 

   router.get('/ContentControllerList', (req, res)=>{
	//res.render('Adminhome/ContentContList');
	contentcontModel.getAllActiveContentCont(function(results){
		res.render('Adminhome/ContentContList', {userlist: results});
	});
   
   })

   router.get('/deleteContentCont/:id', (req, res)=>{
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

   router.get('/BlockContentCont/:id', (req, res)=>{
	CC ={
		id: req.params.id	
	};

	contentcontModel.BlockCC( CC,function(results){
		if(results){
			userModel.BlockUser( CC,function(result){
			if(result){
				res.redirect('/Adminhome/ContentControllerList');
			}
			})
		}
	   });
   
   })
   router.get('/unBlockAccCont/:id', (req, res)=>{
	CC ={
		id: req.params.id	
	};

	contentcontModel.unBlockCC( CC,function(results){
		if(results){
			userModel.unBlockUser( CC,function(result){
			if(result){
				res.redirect('/Adminhome/Blocklist');
			}
			})
		}
	   });
   
   })

   /////////////General User

   router.get('/deleteuser/:id', (req, res)=>{	
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
 
	router.get('/userlist', (req, res)=>{
 
		GuserModel.getAllActiveUser(function(results){
			res.render('Adminhome/UserList', {userlist: results});
		});
	
	});
	
	router.get('/Blockuser/:id', (req, res)=>{
		Guser ={
			id: req.params.id	
		};
	
		GuserModel.BlockGU( Guser,function(results){
			if(results){
				userModel.BlockUser( Guser,function(result){
				if(result){
					res.redirect('/Adminhome/userlist');
				}
				})
			}
		   });
	   
	   })

	   router.get('/unBlockuser/:id', (req, res)=>{
		GU ={
			id: req.params.id	
		};
	
		GuserModel.unBlockGU( GU,function(results){
			if(results){
				userModel.unBlockUser( GU,function(result){
				if(result){
					res.redirect('/Adminhome/Blocklist');
				}
				})
			}
		   });
	   
	   })
	

     //////Notification


	 router.post('/NotificationAd/:id', (req, res)=>{
		notify={
			id: req.params.id,
			userid: req.cookies['uname'],
			subject: req.body.subject,
			body: req.body.body
		}
		   AdminModel.AddNotification(notify,function(status){
			   if(status){
				res.redirect('/Adminhome');
			   }else {
				res.redirect('/Adminhome');
			   }
			   
		   });
	   
	   })
	
	   router.get('/NotificationAd/:id', (req, res)=>{
		users ={
		   id: req.params.id,
		   userid: req.cookies['uname']
	   };
	   
			  res.render('Adminhome/NotificationAd', users);
	  
	  })

	  router.get('/Notification', (req, res)=>{
		//res.render('Adminhome/Mynotification');
		
		   AdminModel.MyNotification(req.cookies['uname'],function(results){
			   res.render('Adminhome/Mynotification', {userlist: results});
		   });
	   
	   })


 ///////pending Post Request

   router.get('/PendingPost', (req, res)=>{
	//res.render('Adminhome/PendingPostAd');
	postreqModel.getAllpostreq(function(results){
		   res.render('Adminhome/PendingPostAd', {userlist: results});
	   });
   
   })
   router.get('/ApprovePostreq/:id', (req, res)=>{
	posts={
		id: req.params.id,	
	}
	
	postreqModel.getpostreqbyID(posts,function(results){
		if (results.length>0){
			//console.log(results[0]);
			post.insertpost(results[0],req.cookies['uname'],function(status){
				if(status){
					postreqModel.deletePost(posts,function(status){
						if(status){
							res.redirect('/Adminhome/PendingPost'); 	
						}
						
					})
					
				}
			})
		}
		  
	   });
   
   })

   router.get('/RemovePostreq/:id', (req, res)=>{
	posts={
		id: req.params.id,	
	}
	postreqModel.deletePost(posts,function(status){
		if(status){
			res.redirect('/Adminhome/PendingPost'); 	
		}
		
	})
})


//////pending Signup Request


   router.get('/PendingSignup', (req, res)=>{
	   regreqModel.getAllregreq(function(results){
		   res.render('Adminhome/PendingSignUpAd', {userlist: results});
	   });
   
   })

   router.get('/approvegureq/:id', (req, res)=>{
	Guser={
		id: req.params.id,	
	}
	
	regreqModel.getregreqbyID(Guser,function(results){
		if (results.length>0){
			//console.log(results[0]);
			GuserModel.insertGU(results[0],function(status){
				if(status){
					regreqModel.RemoveregReq(Guser,function(status){
						if(status){
							res.redirect('/Adminhome/PendingSignup'); 	
						}
						
					})
					
				}
			})
		}
		  
	   });
   
   })   

   router.get('/removegureq/:id', (req, res)=>{
	Guser={
		id: req.params.id,	
	}
	regreqModel.RemoveregReq(Guser,function(status){
		if(status){
			res.redirect('/Adminhome/PendingSignup'); 	
		}
		
	})
})
   

   router.get('/post', (req, res)=>{
	//res.render('Adminhome/Mynotification');
	
	   post.getAllpostAd(function(results){
		post.getAllpost(function(result){
		   
			res.render('Adminhome/post',{post:results, gpost:result });
		});
	
	   });
   
   })
   router.post('/post', (req, res)=>{
	pst={
		adid:req.cookies['uname'],
		text:req.body.post	

	}
	console.log(req.cookies['uname'])
	   post.postadmin(pst,function(results){
		if(results){
			res.redirect('/Adminhome/post');
		}
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
			});
	   }
   })
   router.get('/Insert', (req, res)=>{

		   res.render('Adminhome/Insert');
	  
   })
   
   router.get('/Blocklist', (req, res)=>{
	
	GuserModel.GetAllblockGU(function(results){
		accContModel.GetAllblockAC(function(result){
			contentcontModel.GetAllblockCC(function(resul){
				//console.log (results,result,resul);
				res.render('Adminhome/Blocklist',{Gusr:results,AC: result,CC:resul});
			})
		})
	})
	
	
	//console.log (GU);
	//
	

})

module.exports = router;