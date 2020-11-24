//requir express to use route
const express 	= require('express');
const router 	= express.Router();
//requir general user models
const guAdminModel = require.main.require('./models/userModel/guAdminModel');
const guACModel = require.main.require('./models/userModel/guACModel');
const guCCModel = require.main.require('./models/userModel/guCCModel');
const guTextModel = require.main.require('./models/userModel/guTextModel');
const guRegistrationModel = require.main.require('./models/userModel/guRegistrationModel');
const guProfileModel = require.main.require('./models/userModel/guProfileModel');
const guPostModel = require.main.require('./models/userModel/guPostModel');
const guModel = require.main.require('./models/userModel/guModel');
//for PDF report generate
const PDFDocument	= require('pdfkit');
const fs 			= require('fs');
//for validation
const bodyParser 	= require('body-parser');
const{ check , validationResult } = require('express-validator');
//file upload
var exSession 	= require('express-session');
var exUpload 	= require('express-fileupload');
//Home

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/guHome', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})

//Notice

router.get('/Notifications', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/Notifications');
	}else{
		res.redirect('/login');
	}
})

router.get('/NotificationAdmin', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guAdminModel.getAllNotificationOfAdmin(function(results){
			res.render('userController/NotificationAdmin',{notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/NotificationCC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guCCModel.getAllNotificationOfCC(function(results){
			res.render('userController/NotificationCC', {notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/NotificationAC', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		guACModel.getAllNotificationOfAC(function(results){
			res.render('userController/NotificationAC', {notification:results});
		});

	}else{
		res.redirect('/login');
	}

})

//Text

router.get('/received', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guTextModel.getAllTextForMe(data , function(results){
			res.render('userController/ReceivedText',{text:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/SendText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/SendText');
	}else{
		res.redirect('/login');
	}
})

router.post('/SendText', [
		
		check('receiverid')
			.notEmpty().withMessage('ReceiverId field can not be empty')
			.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
		,
		check('text')
			.notEmpty().withMessage('Text field can not be empty')
		
	] , (req, res)=>{

	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			var data = {
				receiverid : req.body.receiverid,
				text : req.body.text,
				guid : req.cookies['uname']
			};
			guTextModel.sendtext(data , function(status){
				if(status) 
				{
					res.status(200).send({ result : 'Message Sent Successfully!' });
				}
				else
				{
					res.status(200).send({ result : 'Failed To Sent Message!' });
				}
			});
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : errorstrign });
		}

	}else{
		res.redirect('/login');
	}
})

//Post New Content

router.get('/PostNewContent', (req, res)=>{
	var data = {
		guid : req.cookies['uname']
	};
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/PostNewContent' , {myid:data});
	}else{
		res.redirect('/login');
	}
})

router.post('/PostNewContent', [

		check('text')
			.notEmpty().withMessage('Text field can not be empty')
	] , (req, res)=>{

	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			if(req.files != null)
			{
				file = req.files.myfile;
				console.log(file);
				date = new Date();
				file.mv('./assets/generalUser/post/'+date.getTime()+file.name, function(error){

					if(error == null){
						var data = {
							guid : req.cookies['uname'],
							text : req.body.text,
							file : "./assets/generalUser/post/"+date.getTime()+file.name
						};
						console.log(data);
						guPostModel.postNewContent(data , function(status){
							if(status) 
							{
								res.status(200).send({ result : 'Post request send Successfully!' });
							}
							else
							{
								res.status(200).send({ result : 'Failed To Sent post request!' });
							}
						});
					}else{
						res.status(200).send({ result : 'error!' });
					}
				});
			}
			else
			{
				var data = {
					guid : req.cookies['uname'],
					text : req.body.text,
					file : null
				};
				console.log(data);
				guPostModel.postNewContent(data , function(status){
					if(status) 
					{
						res.status(200).send({ result : 'Post request send Successfully!' });
					}
					else
					{
						res.status(200).send({ result : 'Failed To Sent post request!' });
					}
				});
			}
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : errorstrign });
		}

	}else{
		res.redirect('/login');
	}
})

router.get('/MyPost', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/MyPost');
	}else{
		res.redirect('/login');
	}
})

router.get('/PendingPostList', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guPostModel.pendingPostList(data, function(results){
			res.render('userController/PendingPostList', {value : results});
		});
		
	}else{
		res.redirect('/login');
	}
})

//Request To Approve Post

router.get('/RequestToApprove', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/RequestToApprove');
	}else{
		res.redirect('/login');
	}
})

router.post('/RequestToApprove', [
		
		check('text')
			.notEmpty().withMessage('Text field can not be empty')
		
	] , (req, res)=>{

	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			var data = {
				guid : req.cookies['uname'],
				towhom : "Content Control Manager",
				actiontype :"Post Apporve",
				text : req.body.text
				
			};
			guPostModel.requestToApprove(data , function(status){
				if(status) 
				{
					res.status(200).send({ result : 'Request Sent Successfully!' });
				}
				else
				{
					res.status(200).send({ result : 'Failed To Sent Request!' });
				}
			});
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : errorstrign });
		}

	}else{
		res.redirect('/login');
	}
})

//Request To Unblock

router.get('/RequestToCheckIdProblem', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		res.render('userController/RequestToCheckIdProblem');
	}else{
		res.redirect('/login');
	}
})

router.post('/RequestToCheckIdProblem', [
		
		check('text')
			.notEmpty().withMessage('Text field can not be empty')
		
	] , (req, res)=>{

	if(req.cookies['uname'] != null){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			var data = {
				guid : req.cookies['uname'],
				towhom : "Acount Control Manager",
				actiontype :"Check Id Problem",
				text : req.body.text
				
			};
			guPostModel.requestToApprove(data , function(status){
				if(status) 
				{
					res.status(200).send({ result : 'Request Sent Successfully!' });
				}
				else
				{
					res.status(200).send({ result : 'Failed To Sent Request!' });
				}
			});
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : errorstrign });
		}

	}else{
		res.redirect('/login');
	}
})


router.get('/MyPostList', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guPostModel.myPostList(data, function(results){
			res.render('userController/MyPostList', {value : results});
		});

	}else{
		res.redirect('/login');
	}
})

//registration

router.get('/registrationform' , (req, res)=>{
	res.render('userController/registrationForm');
})

router.post('/registrationrequest' , [
		check('guid')
			.notEmpty().withMessage('Name field can not be empty')
			.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
		,
		check('name')
			.notEmpty().withMessage('Name field can not be empty')
			.isLength({ min: 7 }).withMessage('Minimumm length must need to be 7')
		,
		check('email')
			.notEmpty().withMessage('Email field can not be empty')
			.isEmail().withMessage('Must need to be a valid email example@example.com')
		,
		check('gender')
			.notEmpty().withMessage('Gender must need to be selected')
		,
		check('dob')
			.notEmpty().withMessage('DOB field can not be empty')
			.isDate().withMessage('Must need to be YYYY-MM-DD')
		,
		check('address')
			.notEmpty().withMessage('Address field can not be empty')
			.isLength({ min: 7 }).withMessage('Minimumm length must need to be 7')
		,
		check('userstatus')
			.notEmpty().withMessage('UserStatus must need to be selected')

	] , (req, res)=>{
	const errors = validationResult(req);
	if(errors.isEmpty())
	{

		var data = {
			guid : req.body.guid,
			name : req.body.name,
			email : req.body.email,
			gender: req.body.gender,
			dob : req.body.dob,
			address : req.body.address,
			userstatus : req.body.userstatus
		};
		console.log(data);
		guRegistrationModel.registrationRequest(data , function(status){
			if(status)
			{
				res.status(200).send({ result : 'Registration request submited Successfully!' });
			}
			else
			{
				res.status(200).send({ result : 'Failed to submit registration request!' });	
			}
		})
	}
	else
	{
		console.log(errors.array());
		var earray = errors.array();
		var errorstrign = ``;

		for(i=0 ; i<earray.length ; i++)
		{
			errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
		}

		res.status(200).send({ result : errorstrign });
	}

})

//profile

router.get('/getmyprofile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.getMyProfile(data, function(results){
			res.render('userController/Profile', {value:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.get('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.getMyProfile(data, function(results){
			res.render('userController/UpdateProfile', {value:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.post('/UpdateProfile', [
		check('name')
			.notEmpty().withMessage('Name field can not be empty')
			.isLength({ min: 4 }).withMessage('Minimumm length must need to be 4')
		,
		check('email')
			.notEmpty().withMessage('Email field can not be empty')
			.isEmail().withMessage('Must need to be a valid email example@example.com')
		,
		check('dob')
			.notEmpty().withMessage('Email field can not be empty')
			.isDate().withMessage('Must need to be YYYY-MM-DD')
		,
		check('address')
			.notEmpty().withMessage('Can not be empty')
			.isLength({ min: 7 }).withMessage('Minimumm length must need to be 7')

	] , (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		const errors = validationResult(req);
		if(errors.isEmpty())
		{
			var data = {
				guid : req.cookies['uname'],
				name : req.body.name,
				email : req.body.email,
				dob : req.body.dob,
				address : req.body.address
			};
			guProfileModel.updateMyProfile(data, function(status){
				if(status)
				{
					res.status(200).send({ result : 'Profile updated Successfully!' });
				}
				else
				{
					res.status(200).send({ result : 'Failed to update profile!' });
				}
			});
		}
		else
		{
			console.log(errors.array());
			var earray = errors.array();
			var errorstrign = ``;

			for(i=0 ; i<earray.length ; i++)
			{
				errorstrign=errorstrign+ earray[i].param + " : " + earray[i].msg +"<br/>"
			}

			res.status(200).send({ result : errorstrign });
		}

	}else{
		res.redirect('/login');
	}

})

router.get('/DeleteProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.getMyProfile(data, function(results){
			res.render('userController/DeleteProfile', {value:results});
		});

	}else{
		res.redirect('/login');
	}

})

router.post('/DeleteProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			guid : req.cookies['uname']
		};
		guProfileModel.deleteFromGU(data, function(status){
			if(status)
			{
				guProfileModel.deleteFromUser(data, function(status){
					if(status)
					{
						res.redirect('/login');
					}
					else
					{
						res.redirect('/userController/DeleteProfile');
					}
				});
			}
		});

	}else{
		res.redirect('/login');
	}

})

//Post search

router.get('/SearchPost', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/SearchPost');
	}else{
		res.redirect('/login');
	}
})

router.get('/AjaxSearchPost', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			text : req.query.text
		};
		console.log(data.text);
		guPostModel.ajaxSearchPost(data, function(results){
			var strign=`<table id="view">
						<tr>
							<td>GU ID</td>
							<td>Text</td>
						</tr>`;
			for(i=0; i<results.length ; i++)
			{
				strign=strign+"<tr>";
				strign=strign+"<td>"+results[i].guid+"</td>";
				strign=strign+"<td>"+results[i].text+"</td>";
				strign=strign+"</tr>";
			}
			strign=strign+`</table>`;
			console.log(strign);
			res.status(200).send({ result : strign });
		});
	}else{
		res.redirect('/login');
	}

})

//Other general user search

router.get('/SearchGU', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/SearchGU');
	}else{
		res.redirect('/login');
	}
})

router.get('/AjaxSearchGU', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		var data = {
			text : req.query.text
		};
		console.log(data.text);
		guModel.ajaxSearchGU(data, function(results){
			var strign=`<table id="view">
						<tr>
							<td>GU ID</td>
							<td>Name</td>
							<td>Email</td>
							<td>Gender</td>
							<td>DOB</td>
							<td>Address</td>
							<td>User Status</td>
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
				strign=strign+"<td>"+results[i].userstatus+"</td>";
				strign=strign+"</tr>";
			}
			strign=strign+`</table>`;
			console.log(strign);
			res.status(200).send({ result : strign });
		});
	}else{
		res.redirect('/login');
	}

})

//report

router.get('/Report', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/Report', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})

router.post('/Report', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		// Create a document
		const doc = new PDFDocument();
		 
		var date = new Date();	//date object
		month = date.getMonth()+1;
		doc.pipe(fs.createWriteStream("assets/generalUser/reports/"+date.getTime()+"[report].pdf"));
		doc.fontSize(45);	//set the font size
		doc.text("Repost : " + date.getDate() + "-" +month+ "-" + date.getFullYear(), 20, 20);
		doc.text("for - " + req.cookies['uname'] +"[General User]",   20, 80);
		guTextModel.getAllText(function(results){
			if(results.length > -1)
			{
				totalsendtext = 0;
				totalreceivetext = 0;
				total = 0;

				for(i=0 ; i<results.length ; i++)
				{
					if(results[i].guid == req.cookies['uname'])
					{
						totalsendtext=totalsendtext+1;
						total=total+1;
					}
					if(results[i].receiverid == req.cookies['uname'])
					{
						totalreceivetext=totalreceivetext+1;
						total=total+1;	
					}
				}
				
				doc.fontSize(15);
				doc.text("Number of send text to other users = " + totalsendtext , 40, 180);
				doc.text("Number of received text from other users = " + totalreceivetext , 40, 220);
				doc.fontSize(30);
				doc.text("Total number of send and received text = " + total , 20 , 260);
				doc.end();
				res.redirect('/userController/Report');
			}
			else
			{
				res.redirect('/userController/Report');
			}

	});
	}else{
		res.redirect('/login');
	}
})

module.exports = router;