
const pg = require('pg');
const connection = require('./connection.js');

var createImage = function(image,callback){
	
	try{
		var pool = new pg.Pool(connection.config)
		pool.connect(function(err, client, done){
    		// Handle connection errors
    		if(err) {
      			done();
      			console.log("Error ",err);
      			return res.status(500).json({success: false, data: err});
    		}
        console.log("image ", image);
    		// SQL Query > Insert Data
      		const query =	client.query('INSERT into receipt.images (userid, image, pdf_url, imagetext) VALUES($1, $2, $3, $4) RETURNING id', 
            [image.userId, image.image, image.pdf_url, image.imageText],
            function(err,response){
      			if(!err){
      				console.log("Response ", response);
      				return callback(response);
      			}
      			else{
      				console.log("Error ",err);
      				return callback(err);
      			}
      		});
    		
  		});
  		pool.on('end', () => {
      		done();
      	});
	}catch(error){
		callback(error);		
	}
}


var getImages = function(image,callback){
  
  try{
    var pool = new pg.Pool(connection.config)
    pool.connect(function(err, client, done){
        // Handle connection errors
        if(err) {
            done();
            console.log("Error ",err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
          const query = client.query('SELECT * From receipt.images where userid=$1', 
            [image.userId],
            function(err,response){
            if(!err){
              console.log("Response ", response);
              return callback(response);
            }
            else{
              console.log("Error ",err);
              return callback(err);
            }
          });
        
      });
      pool.on('end', () => {
          done();
        });
  }catch(error){
    callback(error);    
  }
}


module.exports = {
	createImage:createImage,
  getImages:getImages
}