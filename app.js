//declaration
const express 		= require('express');
const bodyParser 	= require('body-parser');
const flash = require('express-flash-notification');
const flush = require('connect-flash');
const exSession 	= require('express-session');
const cookieParser 	= require('cookie-parser');
const login			= require('./controller/login');
const home			= require('./controller/Adminhome');

const contentcontroller			= require('./controller/ContentController/contentcontroller');
const acHome 					= require('./controller/accountController/acHome');
const acAdminController			= require('./controller/accountController/acAdminController');
const acCCController 			= require('./controller/accountController/acCCController');
const acGUController 			= require('./controller/accountController/acGUController');
const acNotice 					= require('./controller/accountController/acNotice');
const acText 					= require('./controller/accountController/acText');

const logout		= require('./controller/logout');
//const user			= require('./controller/user');
const guHome = require('./controller/userController/guHome')

const app 			= express();

//config
app.set('view engine', 'ejs');

//middleware
app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false }));
app.use(cookieParser());
app.use(flash(app));
app.use(flush());

app.use('/login', login);
app.use('/Adminhome', home);
app.use('/logout', logout);
app.use('/contentcontroller', contentcontroller);

app.use('/achome', acHome);
app.use('/acadmincontroller',acAdminController);
app.use('/acCCController', acCCController);
app.use('/acGUController', acGUController);
app.use('/acNotice', acNotice);
app.use('/acText', acText);

app.use('/userController', guHome);

//app.use('/user', user);

//route
app.get('/', (req, res)=>{
	if(req.cookies['uname'] != null && req.session.type=="Admin"){
		res.redirect('/Adminhome');
	}else if(req.cookies['uname'] != null && req.session.type=="Content Controll Manager"){
		res.redirect('/contentcontroller');
	}else if(req.cookies['uname'] != null && req.session.type=="Account Control Manager"){
		res.redirect('/achome');
	}else if(req.cookies['uname'] != null && req.session.type=="General User"){
		res.redirect('/userController');
	}
	else{
		res.redirect('/login');
	}		
});

//server startup
app.listen(3000, (error)=>{
	console.log('express server started at 3000...');
});