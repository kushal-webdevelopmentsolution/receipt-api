var db = require("../database");
var imagemodel = require("../models/images");

exports.createImages = function(req,res){
	imagemodel.createImage(req.body,function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}

exports.getImages = function(req,res){
	console.log("Request Body ",req.body);
	imagemodel.getImages(req.body,function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}
