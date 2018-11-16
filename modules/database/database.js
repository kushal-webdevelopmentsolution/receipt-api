const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require("shortid");
// Set some defaults
db.defaults({Images:[],Transactions:[]}).write() 
			
//.find(query.where) where query
//.size()  return number of rows
//.sortBy(query.sortBy);  filter records
//.take(query.limit) limit records
					
var insertData = function(table,data,callback){
	try{
		console.log("Data ",JSON.stringify(data));
		//data.id = shortid.generate();
		db.get(table)
			.push(data)
			.write()
			.then(data => callback(data))
	}catch(error){
		callback(error);		
	}
}

var setData = function(query,data,callback){
	try{
		db.set(query,data)
			.write()
			.then(data => callback(data));
		
	}catch(err){
		callback(err);
	}
}

var bulkInsertData = function(table,data,callback){
	try{
		console.log("data ",JSON.stringify(data));
		data.forEach(function(item){
			console.log("Item ",JSON.stringify(item));
			item.id = shortid.generate();
			db.get(table)
			.push(JSON.stringify(item))
			.write()
			.then(item => callback(item));
		});
	}catch(error){
		callback(error);		
	}
}

var updateData = function(table,query,data,callback){
	try
	{
		data.id = shortid.generate();
		db.get(table)
			.find(query)
			.assign(data)
			.write()
			.then(data => callback(data));
	}catch(error){
		callback(error);	
	}	
}

var deleteData = function(table,query,callback){
	try{
		db.get(table)
			.remove(query)
			.write();
			callback({"message":"data removed!"})
	}catch(error){
		callback(error);
	}
}

module.exports = {
	dbObj:db,
	insertData:insertData,
	bulkInsertData:bulkInsertData,
	setData:setData,
	updateData:updateData,
	deleteData:deleteData
}


