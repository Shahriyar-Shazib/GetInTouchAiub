const express 	= require('express');
const acAdminModel = require.main.require('./models/accountControlManeger/acAdminModel');
const router 	= express.Router();

router.get('/adminlist', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		console.log('check1');
		acAdminModel.getAllAdmin(function(results){
			console.log('results');
			res.render('accountControlManager/acAdminList', {userlist: results});
		});
	}else{
		res.redirect('/login');
	}

})

router.get('/searchadmin', (req, res)=>{
	if(req.cookies['uname'] != null && req.cookies['usertype'] == "Account Control Manager"){
		var data = {
			key : req.query.key
		};
		console.log(data.key);
		acAdminModel.adminSearch(data, function(results){
			var strign=`<table id="view">
						<tr>
							<td>Admin ID</td>
							<td>Name</td>
							<td>Email</td>
							<td>Gender</td>
							<td>Date Of Birth</td>
							<td>Address</td>
							<td>Profile Picture</td>
						</tr>`;
			for(i=0; i<results.length ; i++)
			{
				strign=strign+"<tr>";
				strign=strign+"<td>"+results[i].adminid+"</td>";
				strign=strign+"<td>"+results[i].name+"</td>";
				strign=strign+"<td>"+results[i].email+"</td>";
				strign=strign+"<td>"+results[i].gender+"</td>";
				strign=strign+"<td>"+results[i].dob+"</td>";
				strign=strign+"<td>"+results[i].address+"</td>";
				strign=strign+"</tr>";
			}
			strign=strign+`</table>`;
			console.log(strign);
			res.status(200).send({ status : strign });
		});
	}else{
		res.redirect('/login');
	}

})

module.exports = router;