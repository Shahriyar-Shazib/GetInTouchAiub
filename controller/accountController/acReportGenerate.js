const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		res.render('accountControlManager/ReportGenerate', {uname : req.cookies['uname']});
	}else{
		res.redirect('/login');
	}
})


//GET /acReportGenerate/GenerateUserInfo
module.exports = router;