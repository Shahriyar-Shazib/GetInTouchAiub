const express 	= require('express');
const fs 			= require('fs');
const JSDOM 		= require('jsdom').JSDOM;
const generalUserModel = require('../../models/ContentController/generalUserModel');
const userModel = require.main.require('./models/ContentController/userModel');
const postModel = require.main.require('./models/ContentController/postModel');
const postRequestModel = require.main.require('./models/ContentController/postRequestModel');
const contentControllerNoticeModel = require.main.require('./models/ContentController/contentControllerNoticeModel');
const contributionModel = require.main.require('./models/ContentController/contributionModel');
const warningUserModel = require.main.require('./models/ContentController/warningUserModel');
const announcementModel = require.main.require('./models/ContentController/announcementModel');
const contentControllerModel = require.main.require('./models/ContentController/contentControllerModel');
const router 	= express.Router();

function clicker(serial){
	var clicked = new Array(8);
	for (var i = 0; i < clicked.length; i++) { clicked[i] = ""; }
	clicked[serial] = "active";

	return clicked;
}

function chart(callback){
	// Require JSDOM Class.
	var JSDOM = require('jsdom').JSDOM;
	// Create instance of JSDOM.
	var jsdom = new JSDOM('<body><div id="container"></div></body>', {runScripts: 'dangerously'});
	// Get window
	var window = jsdom.window;
	// require anychart and anychart export modules
	var anychart = require('anychart')(window);
	var anychartExport = require('anychart-nodejs')(anychart);

	var data = [
		{x: "A", value: 637166},
		{x: "B", value: 721630},
		{x: "C", value: 148662},
		{x: "D", value: 78662},
		{x: "E", value: 90000}
	  ];	  
	var chart = anychart.pie(data);
	chart.bounds(0, 0, 800, 600);
	chart.container('container');
	chart.draw();

	var status = false;

	// generate JPG image and save it to a file
	anychartExport.exportTo(chart, 'jpg').then(function(image) {
		fs.writeFile('assets/charts/anychart.jpg', image, function(fsWriteError) {
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

router.post('/announcement/create', (req, res)=>{
	var announcement = {
		ccid: req.cookies['uname'],
		subject: req.body.subject,
		body: req.body.body
	}
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

router.post('/announcement/update/:id', (req, res)=>{
	var announcement = {
		id: req.params.id,
		subject: req.body.subject,
		body: req.body.body
	}
	announcementModel.update(announcement, function(status){
		res.redirect('/contentcontroller/announcement');
	});
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

module.exports = router;