module.exports = function(app){
	var path = require("path");
	var logger = require('../config/logger');
	var morgan = require('morgan');
	var bodyParser = require('body-parser'); 
	var Images = require("../modules/database/Images");
	var Users = require("../modules/database/users");
	var basicAuth = require('basic-auth');
	
	var auth = function (req, res, next) {
		res.setHeader("Content-Type", "application/json");
		res.setHeader('Cache-Control','no-cache,no-store,max-age=0,must-revalidate');
		res.setHeader('Pragma','no-cache');
		res.setHeader('Expires','-1');
		function unauthorized(res) {
			res.set('WWW-Authenticate', 'x-Basic realm=Authorization Required');
			return res.send(401);
		};
		var user = basicAuth(req);
		
		if (!user || !user.name || !user.pass) {
			return unauthorized(res);
		};

		if (user.name === 'kristi' && user.pass === 'kushal2209') {
			return next();
		} else {
			return unauthorized(res);
		};
	};
	
	app.use(bodyParser.json({limit:'100mb'})); 
	app.use(bodyParser.urlencoded({limit:'100mb', extended: true}));
	//app.use(morgan('combined', { stream: logger.stream }));

	app.use(function(err, req, res, next){
		res.status(err.status || 500);
		res.send({
			message: err.message,
			error: err
		});
		return;
	});

	/*app.use(function(err, req, res, next) {
  		// set locals, only providing error in development
  		res.locals.message = err.message;
  		//res.locals.error = req.app.get('env') === 'development' ? err : {};
  		res.locals.error = err;

  		// add this line to include winston logging
  		logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  		// render the error page
  		res.status(err.status || 500);
  		res.render('error');
	});*/
	
	app.get('/common/*',auth,function(req,res,next){
	 next();
	})

	app.get('/api/*',auth,function(req,res,next){
	 next();
	})
	
	app.get('/',function(req,res,next){
		console.log("Api working file");
	})

	app.get('/common/receipt/createusertable',Users.createUserTable);

	app.post('/common/receipt/createuser',Users.createUser);

	app.post('/common/receipt/auth',Users.authUser);

	app.post('/api/receipt/createimages',Images.createImages);

	app.post('/api/receipt/getimages',Images.getImages);

	app.post('/api/receipt/deleteimage',Images.deleteImage);
}
