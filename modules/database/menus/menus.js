var db = require("../database");

var table = "menus";

exports.createMenus =  function(req,res){
	db.setData(table,req.body,function(response){
		try{
			res.status(200).jsonp(response);
		}catch(err){
			res.status(500).jsonp(err);
		}
	});
}

exports.getMenus =  function(req,res){
	try{
		var data = db.dbObj.get(table).value();
		res.status(200).jsonp(data)
	}catch(err){
		console.log(err);
		res.status(500).jsonp(err)
	}
	
}

