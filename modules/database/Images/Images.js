var db = require("../database");
var tesseract_wrapper = require('tesseract-wrapper');

var table = "Images";

exports.createImages =  function(req,res){
	db.insertData(table,req.body,function(response){
		try{
			return res.send(response);
		}catch(err){
			return res.send(err);
		}
	});
}

exports.getImages =  function(req,res){
	try{
		var data = db.dbObj.get(table).value();
		return res.send(data);
	}catch(err){
		return res.send(err);
	}
	
}

exports.detectTextFromImage = function(req,res){
	try{
			var options = {
  				data: req.body.image,
  				lang: 'eng'
			}
 
			tesseract_wrapper
  				.execTesseract(options)
  				.then(result => {
  					return res.send(response);
  					console.log("Result ",result)
  				})
  				.catch(err =>{ console.log(err) })
			
		}catch(err){
			return res.send(err);
		}
}

