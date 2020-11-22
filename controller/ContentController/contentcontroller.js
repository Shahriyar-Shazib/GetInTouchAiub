const express = require('express');
const fs = require('fs');
const JSDOM = require('jsdom').JSDOM;
const httpMsgs = require('http-msgs');
const downloadsFolder = require('downloads-folder');
const { body, check, validationResult } = require('express-validator');
const generalUserModel = require('../../models/ContentController/generalUserModel');
const { BADNAME } = require('dns');
const userModel = require.main.require('./models/ContentController/userModel');
const postModel = require.main.require('./models/ContentController/postModel');
const postRequestModel = require.main.require('./models/ContentController/postRequestModel');
const contentControllerNoticeModel = require.main.require('./models/ContentController/contentControllerNoticeModel');
const contributionModel = require.main.require('./models/ContentController/contributionModel');
const warningUserModel = require.main.require('./models/ContentController/warningUserModel');
const announcementModel = require.main.require('./models/ContentController/announcementModel');
const contentControllerModel = require.main.require('./models/ContentController/contentControllerModel');
const ccRequestForActionModel = require.main.require('./models/ContentController/ccRequestForActionModel');
const router = express.Router();

function clicker(serial){
	var clicked = new Array(8);
	for (var i = 0; i < clicked.length; i++) { clicked[i] = ""; }
	clicked[serial] = "active";

	return clicked;
}

function chartPDF(values,type,dn,callback){
	// Require JSDOM Class.
	var JSDOM = require('jsdom').JSDOM;
	// Create instance of JSDOM.
	var jsdom = new JSDOM('<body><div id="container"></div></body>', {runScripts: 'dangerously'});
	// Get window
	var window = jsdom.window;
	// require anychart and anychart export modules
	var anychart = require('anychart')(window);
	var anychartExport = require('anychart-nodejs')(anychart);

	var chart;

	if(type == "ContentReport"){
		var data = [
			{x: "Active Posts", value: values[0]},
			{x: "Approved Posts", value: values[1]},
			{x: "Declined Posts", value: values[2]}
		];
		chart = anychart.column(data);
		chart.title('All Content Report');
	}else{
		chart = anychart.column();
		chart.data({header: ["#", "Total", "My"],
			rows: [
			{x: "Approved Posts", Total: values[0], My: values[1]},
			{x: "Declined Posts", Total: values[2], My: values[3]},
			{x: "Announcements", Total: values[4] , My: values[5]}
		]});
	}
	chart.bounds(0, 0, 800, 600);
	chart.container('container');
	chart.draw();

	var status = false;

	// generate JPG image and save it to a file
	anychartExport.exportTo(chart, 'pdf').then(function(image) {
		fs.writeFile(downloadsFolder()+'/'+type+'_'+dn+'.pdf', image, function(fsWriteError) {
		if (fsWriteError) {
			console.log(fsWriteError);
			callback(status);
		} else {
			console.log('Complete');
			status = true;
			callback(status);
		}
		});
	}, function(generationError) {
		console.log(generationError);
		callback(status);
	});
}

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){	
		postRequestModel.getAll(function(results){
			//get content controller name
			res.render('ContentController/index', {clicked: clicker(0), posts: results});
		});	
	}else{
		res.redirect('/login');
	}
})

router.post('/', (req, res)=>{

})

router.get('/post/request', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		postRequestModel.getAll(function(results){
			if(results.length>0){
				generalUserModel.getByGIdGeneralUser(results[0].guid, function(guser){
					res.render('ContentController/post/request', {clicked: clicker(1), posts: results, guser: guser});
				});
				
			}else{
				res.render('ContentController/post/request-zero', {clicked: clicker(1)});
			}
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/post/request', (req, res)=>{

})

router.get('/approvepost/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.id != null){
			postRequestModel.getByIdPostReq(req.params.id, function(results){
				results[0].approvedBy = req.cookies['uname'];
				postModel.insertPost(results[0], function(status){
					postRequestModel.deletePostReq(req.params.id, function(status){
						var notice = {
							ccid: req.cookies['uname'],
							guid: results[0].guid,
							subject: 'Approved!',
							body: 'Your post has been approved.'
						}
						contentControllerNoticeModel.insertNotice(notice, function(status){
							contributionModel.getByCId(req.cookies.uname, function(result){
								approved = parseInt(result[0].postapproved);
								approved = approved + 1;
								result[0].postapproved = approved;
								contributionModel.update(result[0], function(status){
									res.redirect('/contentcontroller/post/request');
								});
							});
						});			
					});					
				});
			});
		}
	}else{
		res.redirect('/login');
	}
})

router.post('/approvepost/:id', (req, res)=>{

})

router.get('/declinepost/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.id != null){
			var generalUserId = 0;
			postRequestModel.getByIdPostReq(req.params.id, function(results){
				generalUserId = results[0].guid;
				postRequestModel.deletePostReq(req.params.id, function(status){
					var notice = {
						ccid: req.cookies['uname'],
						guid: generalUserId,
						subject: 'Declined.',
						body: 'Your post has been declined.'
					}
					contentControllerNoticeModel.insertNotice(notice, function(status){
						contributionModel.getByCId(req.cookies.uname, function(result){
							declined = parseInt(result[0].postdeclined);
							declined = declined + 1;
							result[0].postdeclined = declined;
							contributionModel.update(result[0], function(status){
								warning = {
									ccid: req.cookies['uname'],
									guid: generalUserId,
									warningtext: ""
								}
								warningUserModel.insert(warning, function(status){
									res.redirect('/contentcontroller/post/request');
								});
							});
						});
					});			
				});					
			});
		}
	}else{
		res.redirect('/login');
	}
})

router.post('/declinepost/:id', (req, res)=>{

})

router.get('/analyzeposter/:pid/:guid', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		var data = new Array(3);
		postModel.getPostByGId(req.params.guid, function(results){
			data[0] = results.length;
			warningUserModel.getByGId(req.params.guid, function(results){
				var declined = results.filter(function(result){
					return result.warningtext == "";
				});
				data[1] = declined.length;
				var warned = results.filter(function(result){
					return result.warningtext.length > 0;
				});
				data[2] = warned.length;
				generalUserModel.getByGIdGeneralUser(req.params.guid, function(result){
					res.render('ContentController/post/analyzePoster', {clicked: clicker(1), data: data, pid: req.params.pid, user: result[0]});
				});
			});
		});
		
	}else{
		res.redirect('/login');
	}
})

router.post('/analyzeposter/:pid/:guid', [
	check('banDays', 'Banning days must be at least 1 day.')
	.isFloat({min: 1})
	.optional({nullable: true, checkFalsy: true})
	,
	check('blockDays', 'Blocking days must be at least 1 day.')
	.isFloat({min: 1})
	.optional({nullable: true, checkFalsy: true})
], (req, res)=>{
	var ban = req.body.banDays;
	var block = req.body.blockDays;
	var warn = req.body.warning;

	var status = false;

	var action = {
		ccid : req.cookies['uname']
	};

	const errors = validationResult(req);
	if(errors.isEmpty()){

		if(ban.length > 0){
			if(block.length > 0){
				action.actiontype = "Block & Ban";
				action.text = "Block general user: "+req.params.guid+" for "+block+" days from posting and ban for "+ban+" days.";
			}else{
				action.actiontype = "Ban";
				action.text = "Ban general user: "+req.params.guid+" for "+ban+" days."; 
			}
			status = true;
		}else if(block.length > 0){
			action.actiontype = "Block";
			action.text = "Block general user: "+req.params.guid+" for "+ban+" days from posting.";
			status = true;
		}

		if(status){
			ccRequestForActionModel.insert(action, function(status){
				if(warn.length > 0){
					var warning = {
						ccid : req.cookies['uname'],
						guid : req.params.guid,
						warningtext : warn
					}
					warningUserModel.insert(warning, function(status){
						res.redirect('/contentcontroller/declinepost/'+req.params.pid);
					});				
				}else{
					res.redirect('/contentcontroller/declinepost/'+req.params.pid);
				}			
			});
		}else if(warn.length > 0){
			var warning = {
				ccid : req.cookies['uname'],
				guid : req.params.guid,
				warningtext : warn
			}
			warningUserModel.insert(warning, function(status){
				res.redirect('/contentcontroller/declinepost/'+req.params.pid);
			});	
		}else{
			var alertOne = "Must ban, block or warn to proceed.";
			var data = new Array(3);
			postModel.getPostByGId(req.params.guid, function(results){
				data[0] = results.length;
				warningUserModel.getByGId(req.params.guid, function(results){
					var declined = results.filter(function(result){
						return result.warningtext == "";
					});
					data[1] = declined.length;
					var warned = results.filter(function(result){
						return result.warningtext.length > 0;
					});
					data[2] = warned.length;
					generalUserModel.getByGIdGeneralUser(req.params.guid, function(result){
						res.render('ContentController/post/analyzePoster', {clicked: clicker(1), data: data, pid: req.params.pid, user: result[0], alertOne: alertOne});
					});
				});
			});
		}
	}else{
		const alert = errors.array();
		var data = new Array(3);
		postModel.getPostByGId(req.params.guid, function(results){
			data[0] = results.length;
			warningUserModel.getByGId(req.params.guid, function(results){
				var declined = results.filter(function(result){
					return result.warningtext == "";
				});
				data[1] = declined.length;
				var warned = results.filter(function(result){
					return result.warningtext.length > 0;
				});
				data[2] = warned.length;
				generalUserModel.getByGIdGeneralUser(req.params.guid, function(result){
					res.render('ContentController/post/analyzePoster', {clicked: clicker(1), data: data, pid: req.params.pid, user: result[0], alert: alert});
				});
			});
		});
	}
})

router.get('/banforever/:id/:guid', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.id != null){
			var action = {
				ccid : req.cookies['uname'],
				actiontype: "Ban",
				text: "Ban general user: "+req.params.guid+" forever."
			};
			ccRequestForActionModel.insert(action, function(status){
				res.redirect('/contentcontroller/declinepost/'+req.params.id);
			});
		}
	}else{
		res.redirect('/login');
	}
})

router.post('/banforever/:id/:guid', (req,res)=>{

})

router.get('/announcement', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){	
		announcementModel.getByCId(req.cookies['uname'], function(results){
			if(results.length > 0){
				contentControllerModel.getByCId(req.cookies['uname'], function(result){
					res.render('ContentController/announcement/announcement', {clicked: clicker(2), announcements: results, cc: result[0]});
				});
			}else{
				res.render('ContentController/announcement/announcement-zero', {clicked: clicker(2)});
			}
		});	
	}else{
		res.redirect('/login');
	}
})

router.post('/announcement', (req, res)=>{

})

router.get('/announcement/create', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){	
		res.render('ContentController/announcement/create', {clicked: clicker(2)});
	}else{
		res.redirect('/login');
	}
})

router.post('/announcement/create', [
	check('subject', 'Insert the announcement subject')
	.notEmpty()
	.withMessage('Announcement must have a subject')
	,
	check('body', 'Insert the announcement body')
	.notEmpty()
	.withMessage('Announcement must have a body')
], (req, res)=>{
	var announcement = {
		ccid: req.cookies['uname'],
		subject: req.body.subject,
		body: req.body.body
	}
	const errors = validationResult(req);
	if(errors.isEmpty()){
		announcementModel.insert(announcement, function(status){
			contributionModel.getByCId(req.cookies['uname'], function(result){
				announcements = parseInt(result[0].announcements);
				announcements = announcements + 1;
				result[0].announcements = announcements;
				contributionModel.update(result[0],function(status){
					res.redirect('/contentcontroller/announcement');
				});
			});
		});
	}else{
		const alert = errors.array();
		res.render('ContentController/announcement/create', {clicked: clicker(2), alert: alert, announcement: announcement});
	}
	
})

router.get('/announcement/update/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.id != null){
			announcementModel.getById(req.params.id, function(result){
				res.render('ContentController/announcement/update', {clicked: clicker(2), announcement: result[0]});
			});
		}	
	}else{
		res.redirect('/login');
	}
})

router.post('/announcement/update/:id', [
	check('subject', 'Insert the announcement subject')
	.notEmpty()
	.withMessage('Announcement must have a subject')
	,
	check('body', 'Insert the announcement body')
	.notEmpty()
	.withMessage('Announcement must have a body')
], (req, res)=>{
	var announcement = {
		id: req.params.id,
		subject: req.body.subject,
		body: req.body.body
	}
	const errors = validationResult(req);
	if(errors.isEmpty()){
		announcementModel.update(announcement, function(status){
			res.redirect('/contentcontroller/announcement');
		});
	}else{
		const alert = errors.array();
		res.render('ContentController/announcement/update', {clicked: clicker(2), announcement: announcement, alert: alert});
	}
})

router.get('/announcement/delete/:id', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.id != null){
			announcementModel.delete(req.params.id, function(result){
				res.redirect('/contentcontroller/announcement');
			});
		}	
	}else{
		res.redirect('/login');
	}
})

router.post('/announcement/delete/:id', (req, res)=>{
	
})

router.get('/searchannouncement/:data', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.data != null){
			var data = JSON.parse(req.params.data);
			if(data.query.length == 0){
				announcementModel.getAll(function(results){
					contentControllerModel.getByCId(req.cookies['uname'], function(result){
						res.json({announcement: results, ccname: result});
					});
				});
			}else{
				announcementModel.getBySubjectPattern(data.query, function(results){
					contentControllerModel.getByCId(req.cookies['uname'], function(result){
						res.json({announcement: results, ccname: result});
					});
				});
			}
		}
	}else{
		res.redirect('/login');
	}
})
router.post('/searchannouncement/:data', (req, res)=>{

})

router.get('/users',(req,res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		generalUserModel.getAll(function(results){
			res.render('ContentController/users/usersList', {clicked: clicker(3), userlist: results});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/users', (req,res)=>{

})

router.get('/searchusers/:data', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		if(req.params.data != null){
			var data = JSON.parse(req.params.data);
			console.log(data);
			if(data.query.length == 0){
				generalUserModel.getAll(function(results){
					res.json({userlist: results});
				});
			}else{
				generalUserModel.getByNamePattern(data.query, function(results){
					res.json({userlist: results});
				});
			}
		}
	}else{
		res.redirect('/login');
	}
})

router.post('/searchusers/:data', (req, res)=>{
	
})

router.get('/users/report/:guid', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		var data = new Array(3);
		postModel.getPostByGId(req.params.guid, function(results){
			data[0] = results.length;
			warningUserModel.getByGId(req.params.guid, function(results){
				var declined = results.filter(function(result){
					return result.warningtext == "";
				});
				data[1] = declined.length;
				var warned = results.filter(function(result){
					return result.warningtext.length > 0;
				});
				data[2] = warned.length;
				generalUserModel.getByGIdGeneralUser(req.params.guid, function(result){
					res.render('ContentController/users/individualReport', {clicked: clicker(3), data: data, user: result[0]});
				});
			});
		});
		
	}else{
		res.redirect('/login');
	}
})

router.post('/users/report/:guid', (req, res)=>{

})

router.get('/users/profile/:gid', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		generalUserModel.getByGIdGeneralUser(req.params.gid, function(result){
			res.render('ContentController/users/profile', {clicked: clicker(3), user: result[0]});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/user/profile/:gid', (req,res)=>{

})

router.get('/profile', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		contentControllerModel.getByCId(req.cookies['uname'] , function(result){
			res.render('ContentController/profile/profile', {clicked: clicker(4), user: result[0]});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/profile', (req, res)=>{

})

router.get('/profile/update', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		contentControllerModel.getByCId(req.cookies['uname'] , function(result){
			res.render('ContentController/profile/update', {clicked: clicker(4), user: result[0]});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/profile/update', [
	check('name')
	.notEmpty()
	.withMessage("Please provide your name"),
	check('email')
	.notEmpty()
	.withMessage("Please provide your email")
	.trim()
	.isEmail()
	.withMessage('Please provide a valid email'),
	check('dob')
	.notEmpty()
	.withMessage("Please provide your date of birth"),
	check('address')
	.notEmpty()
	.withMessage("Please provide your address")
], (req, res)=>{

	var userUpdate = {
		name: req.body.name,
		email: req.body.email,
		gender: req.body.gender,
		dob: req.body.dob,
		address: req.body.address
	};

	const errors = validationResult(req);
	if(errors.isEmpty()){
		contentControllerModel.getByCId(req.cookies['uname'], function(user){
			user[0].name = userUpdate.name;
			user[0].email = userUpdate.email;
			user[0].gender = userUpdate.gender;
			user[0].dob = userUpdate.dob;
			user[0].address = userUpdate.address;
			contentControllerModel.update(user[0], function(status){
				var alertOne = "Profile Updated successfully.";
				res.render('ContentController/profile/update', {clicked: clicker(4), user: user[0], alertOne: alertOne});
			});
		});
	}else{
		const alert = errors.array();
		res.render('ContentController/profile/update', {clicked: clicker(4), user: userUpdate, alert: alert});
	}
})

router.get('/account', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		res.render('ContentController/profile/account', {clicked: clicker(4)});
	}else{
		res.redirect('/login');
	}
})

router.post('/account', [
	check('pass')
	.notEmpty()
	.withMessage('Please input new password')
	.isLength({min: 6})
	.withMessage('Password must be at least 6 character long'),
	check('confirmpass')
	.notEmpty()
	.withMessage('Please re-type the new password'),
	check('currentpass')
	.notEmpty()
	.withMessage('Please input the current password'),
	body('confirmpass').custom((value, { req }) => {
		if (value !== req.body.pass) {
			throw new Error('Password confirmation does not match password');
		}else{
			return true;
		}
	})
], (req, res) => {
	const errors = validationResult(req);
	if(errors.isEmpty()){
		userModel.getByUId(req.cookies['uname'], function(result){
			if(result[0].password == req.body.currentpass){
				result[0].password = req.body.pass;
				userModel.updateUser(result[0], function(status){
					var alertOne = "Password Updated Successfully.";
					res.render('ContentController/profile/account', {clicked: clicker(4), alertOne: alertOne});
				});
			}else{
				var alertTwo = "Incorrect Password."
				res.render('ContentController/profile/account', {clicked: clicker(4), alertTwo: alertTwo});
			}
		});
	}else{
		const alert = errors.array();
		res.render('ContentController/profile/account', {clicked: clicker(4), alert: alert});
	}
	
});

router.get('/reports', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		res.render('ContentController/reports/reports', {clicked: clicker(5)});
	}else{
		res.redirect('/login');
	}
})

router.post('/reports', (req, res)=>{
	
})

router.get('/reports/usersreports', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		var data = new Array(3);
		generalUserModel.getAll(function(results){
			var active = results.filter(function(result){
				return result.accountstatus == "Active";
			});
			var blocked = results.filter(function(result){
				return result.accountstatus == "Blocked";
			});
			data[0] = active.length;
			data[1] = blocked.length;
			warningUserModel.countAllDistinctGId(function(result){
				var warned = result[0].counter;
				console.log(warned);
				data[2] = warned;
				res.render('ContentController/reports/usersReports', {clicked: clicker(5), data: data});
			});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/reports/usersreports', (req, res)=>{

})

router.get('/reports/contentsreports', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		var data = new Array(3);
		postModel.countAllPosts(function(results){
			var active = results[0].counter;
			data[0] = active;
			contributionModel.countAllApprovedPosts(function(result){
				var approved = result[0].counter;
				data[1] = approved;
				contributionModel.countAllDeclinedPosts(function(result){
					var declined = result[0].counter;
					data[2] = declined;
					res.render('ContentController/reports/contentsReports', {clicked: clicker(5), data: data});
				});
			});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/reports/contentsreports', (req, res)=>{
	var data = new Array(3);
	postModel.countAllPosts(function(results){
		var active = results[0].counter;
		data[0] = active;
		contributionModel.countAllApprovedPosts(function(result){
			var approved = result[0].counter;
			data[1] = approved;
			contributionModel.countAllDeclinedPosts(function(result){
				var declined = result[0].counter;
				data[2] = declined;
				var dn = Date.now();
				chartPDF(data,"ContentReport", dn, function(status){
					if(status){
						//req.flash("Success", "PDF of report has been downloded to your Downloads folder.");
						var alertOne = "PDF of content report has been downloded to your "+downloadsFolder()+" folder.";
						res.render('ContentController/reports/contentsReports', {clicked: clicker(5), data: data, alertOne: alertOne});
					}else{
						//req.flash("Error", "Failed to save report");
						var alertTwo = "Failed to save content report";
						res.render('ContentController/reports/contentsReports', {clicked: clicker(5), data: data, alertTwo: alertTwo});
					}
				});
			});
		});
	});
})

router.get('/contribution', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		var data = new Array(6);
		contributionModel.countAllApprovedPosts(function(results){
			data[0] = results[0].counter;
			contributionModel.countAllDeclinedPosts(function(results){
				data[2] = results[0].counter;
				contributionModel.countAllAnnouncements(function(results){
					data[4] = results[0].counter;
						contributionModel.getByCId(req.cookies['uname'], function(results){
							data[1] = results[0].postapproved;
							data[3] = results[0].postdeclined;
							data[5] = results[0].announcements;
							res.render('ContentController/contribution/contribution', {clicked: clicker(6), data: data, cid: req.cookies['uname']});
						});
				});
			});
		});
	}else{
		res.redirect('/login');
	}
})

router.post('/contribution', (req, res)=>{
	var data = new Array(6);
	contributionModel.countAllApprovedPosts(function(results){
		data[0] = results[0].counter;
		contributionModel.countAllDeclinedPosts(function(results){
			data[2] = results[0].counter;
			contributionModel.countAllAnnouncements(function(results){
				data[4] = results[0].counter;
				contributionModel.getByCId(req.cookies['uname'], function(results){
					data[1] = results[0].postapproved;
					data[3] = results[0].postdeclined;
					data[5] = results[0].announcements;
					var dn = Date.now();
					chartPDF(data,"Contribution", dn, function(status){
						var alert= "";
						if(status){
							//req.flash("Success", "PDF of report has been downloded to your Downloads folder.");
							var alertOne = "PDF of contribution report has been downloded to your "+downloadsFolder()+" folder.";
							res.render('ContentController/contribution/contribution', {clicked: clicker(6), data: data, cid: req.cookies['uname'], alert: alert});
						}else{
							//req.flash("Error", "Failed to save report");
							var alertTwo = "Failed to save contribution report.";
							res.render('ContentController/contribution/contribution', {clicked: clicker(6), data: data, cid: req.cookies['uname'], alert: alert});
						}
					});
				});
			});
		});
	});
})

module.exports = router;