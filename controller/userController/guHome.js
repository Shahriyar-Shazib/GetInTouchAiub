const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "General User"){
		res.render('userController/guHome', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})

module.exports = router;