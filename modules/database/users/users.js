var db = require("../database");
var usermodel = require("../models/users");

exports.createUserTable = function(req,res){
	usermodel.createUser(function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}

exports.createUser = function(req,res){
	usermodel.createUser(req.body,function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}

exports.authUser = function(req,res){
	usermodel.authenticateUser(req.body,function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			console.log(err);
			res.status(500).jsonp(err);
		}
	});
}


