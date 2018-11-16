var db = require("../database");	
exports.createUploads =  function(req,res){
	var table;
	console.log("imageData ",req.body.image);
	var imageData = JSON.parse(req.body.image);
	if(imageData.imgGroup === "Slider"){
		table = "uploads.Slider";
	}else if(imageData.imgGroup === "Gallery"){
		table = "uploads.Gallery";
	}else if(imageData.imgGroup === "Staff"){
		table = "uploads.Staff";
	}else if(imageData.imgGroup === "Services"){
		table = "uploads.Services";
	}
		
	db.insertData(table,imageData,function(){
		try{
			var data = db.dbObj.get(table).value();
			res.status(200).jsonp(data);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}

exports.getImages = function(req,res){
	var group = req.params.group;
	var table;
	if(group === "Slider"){
		table="uploads.Slider";
	}else if(group === "Gallery"){
		table="uploads.Gallery";
	}else if(group === "Staff"){
		table="uploads.Staff";
	}else if(group === "Services"){
		table="uploads.Services";
	}else{
		table="uploads";
	}
	try{
		var data = db.dbObj.get(table).value();
		res.status(200).jsonp(data)
	}catch(err){
		res.status(500).jsonp(err)
	}
}

exports.updateImage = function(req,res){
	var group = req.body.image.imgGroup;
	var table;
	if(group === "Slider"){
		table="uploads.Slider";
	}else if(group === "Gallery"){
		table="uploads.Gallery";
	}else if(group === "Staff"){
		table="uploads.Staff";
	}else if(group === "Services"){
		table="uploads.Services";
	}
	try{
		var query = {id:req.body.image.id};
		var data = db.dbObj.get(table).value();
		db.dbObj.get(table)
				.find(query)
				.assign(req.body.image)
				.write()
				.then(data => res.status(200).jsonp(data));
		
	}catch(err){
		res.status(500).jsonp(err)
	}
	
}


exports.deleteImage = function(req,res){
	var group = req.params.group
	var table;
	if(group === "Slider"){
		table="uploads.Slider";
	}else if(group === "Gallery"){
		table="uploads.Gallery";
	}else if(group === "Staff"){
		table="uploads.Staff";
	}else if(group === "Services"){
		table="uploads.Services";
	}
	var query = {id:req.params.id};  
	db.deleteData(table,query,function(response){
		try{
			res.status(200).jsonp({"message":"upload table deleted successfully"})
		}catch(err){
			res.status(500).jsonp(err)
		}
	});
}

