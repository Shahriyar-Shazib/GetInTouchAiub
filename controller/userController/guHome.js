const express 	= require('express');
const guAdminModel = require.main.require('./models/userModel/guAdminModel');
const guACModel = require.main.require('./models/userModel/guACModel');
const guCCModel = require.main.require('./models/userModel/guCCModel');
const guTextModel = require.main.require('./models/userModel/guTextModel');
const guRegistrationModel = require.main.require('./models/userModel/guRegistrationModel');
const guProfileModel = require.main.require('./models/userModel/guProfileModel');
const guPostModel = require.main.require('./models/userModel/guPostModel');
const router 	= express.Router();
const PDFDocument	= require('pdfkit');
const fs 			= require('fs');
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

router.post('/SendText', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
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

	}else{
		res.redirect('/login');
	}
})

//registration

router.get('/registrationform' , (req, res)=>{
	res.render('userController/registrationForm');
})

router.post('/registrationrequest' , (req, res)=>{
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

router.post('/UpdateProfile', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
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

//search
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