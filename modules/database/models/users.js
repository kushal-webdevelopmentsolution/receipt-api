
const pg = require('pg');
const connection = require('./connection.js');

var createUserTable = function(callback){
	
	try{
		var pool = new pg.Pool(connection.config)
		pool.connect(function(err, client, done){
    		// Handle connection errors
    		if(err) {
      			done();
      			console.log("Connection Error "+JSON.stringify(err));
      			return res.status(500).json({success: false, data: err});
    		}
    		// SQL Query > Insert Data
      		const query =	client.query('CREATE TABLE receipt.users(id serial PRIMARY KEY, email VARCHAR(255) UNIQUE, first_name VARCHAR(40) not null,last_name VARCHAR(40) not null,password VARCHAR(40) not null)',function(err,response){
      			if(!err){
      				console.log('User table created successfully');
      				return callback(response);
      			}
      			else{
      				console.log("Error in createUserTable: "+JSON.stringify(err));
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

var createUser = function(user,callback){
	
	try{
		var pool = new pg.Pool(connection.config)
		pool.connect(function(err, client, done){
    		// Handle connection errors
    		if(err) {
      			done();
      			console.log("Connection Error: "+JSON.stringify(err));
      			return res.status(500).json({success: false, data: err});
    		}
    		// SQL Query > Insert Data
      		const query =	client.query('INSERT into receipt.users (email, first_name, last_name, password) VALUES($1, $2, $3, $4) RETURNING email', 
            [user.email, user.fname, user.lname, user.password],
            function(err,response){
      			if(!err){
      				console.log("User created ");
      				return callback(response);
      			}
      			else{
      				console.log("Error in creating user: "+JSON.stringify(err));
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


var authenticateUser = function(user,callback){
  
  try{
    var pool = new pg.Pool(connection.config)
    pool.connect(function(err, client, done){
        // Handle connection errors
        if(err) {
            done();
            console.log("Connection Error: "+JSON.stringify(err));
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
          const query = client.query("SELECT * FROM receipt.users where email=($1) and password=($2)", 
            [user.email, user.password],
            function(err,response){
              if(!err){
                console.log("User authenticated Successfully ", user.email);
                return callback(response);
            }
            else{
                console.log("Auth Error "+JSON.stringify(err));
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
	createUser:createUserTable,
	createUser:createUser,
  authenticateUser:authenticateUser
}