const express 	= require('express');
const userModel = require.main.require('./models/ContentController/userModel');
const router 	= express.Router();

function clicker(serial){
	var clicked = new Array(8);
	for (var i = 0; i < clicked.length; ++i) { clicked[i] = ""; }
	clicked[serial] = "active";

	return clicked;
}

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){		
		res.render('ContentController/index', {clicked: clicker(0)});
		console.log('uname');
	}else{
		res.redirect('/login');
	}
})

router.post('/', (req, res)=>{

})

router.get('/post/request', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Content Control Manager"){
		res.render('ContentController/post/request', {clicked: clicker(1)});
		console.log('uname');
	}else{
		res.redirect('/login');
	}
})

module.exports = router;