
const pg = require('pg');
const connection = require('./connection.js');
const {logger} = require('./../../../config/logger');

var createImage = function(image,callback){
	
	try{
		var pool = new pg.Pool(connection.config)
		pool.connect(function(err, client, done){
    		// Handle connection errors
    		if(err) {
      			done();
      			logger.debug("Connection Error "+JSON.stringify(err));
      			return res.status(500).json({success: false, data: err});
    		}
    		// SQL Query > Insert Data
      		const query =	client.query('INSERT into receipt.images (userid, image, pdf_url, imagetext, companyname, totalamount) VALUES($1, $2, $3, $4, $5, $6) RETURNING id', 
            [image.userId, image.image, image.pdf_url, image.imageText,image.companyName,image.totalAmount],
            function(err,response){
      			if(!err){
              logger.info("Image created Successfully");
      				return callback(response);
      			}
      			else{
      				logger.debug("Error in creation of image record "+JSON.stringify(err));
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
            logger.debug("Connection Error "+JSON.stringify(err));
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
          const query = client.query('SELECT * From receipt.images where userid=$1', 
            [image.userId],
            function(err,response){
            if(!err){
              //logger.info("Retrive Images Successfully");
              return callback(response);
            }
            else{
              logger.debug("Error in retriving images "+JSON.stringify(err));
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

var deleteImage = function(image,callback){
  
  try{
    var pool = new pg.Pool(connection.config)
    pool.connect(function(err, client, done){
        // Handle connection errors
        if(err) {
            done();
            logger.debug("Connection Error "+JSON.stringify(err));
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
          const query = client.query('delete From receipt.images where id=$1', 
            [image.id],
            function(err,response){
            if(!err){
              logger.info("Image Deleted Successfully "+image.id);
              return callback(response);
            }
            else{
              logger.debug("Error in deleting an images "+JSON.stringify(err));
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
  getImages:getImages,
  deleteImage:deleteImage
}