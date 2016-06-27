var multer  = require('multer');
var User = require('../app/models/user');
var fs = require('fs');
var path = require("path");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'frontend/public/vesta_files/');
	},
	filename: function (req, file, cb) {
    //not necessary here, just in case files would be required to rename, this function would be useful then  
		//var extension = file.originalname.split(/[. ]+/).pop();
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage });

module.exports = function(app, passport) {

	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		res.redirect('/profile.html');
	});

	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.redirect('/profile.html');
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.json({
			user: req.user
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.json({
			error: "User not logged in"
		});
	}
    
	app.get('/user', isLoggedIn, function(req, res) {
		User.findById(req['user']._id, function(err, user) {
			if (err) {
				res.status(500).json({message: 'Error happened!', data: err});
			}
			else if (user == "" || user == null || user == undefined) {
				res.status(404).json({message: 'No data found!'});
			}
			else {
				res.status(200).json({message: 'Data found!', data: user});
			}
		});
	});    
    
  app.get('/filesinfo',function(req,res){
		//get all the files infomation we need to dynamically generate grid layout in project.html
		
		fs.readdir('frontend/public/vesta_files', function (err, files) {
			if (err) {
					throw err;
				res.status(500).json({message: 'Error happened!', data: err});
			}
			//splice to get rid of .DS_Store
			files = files.splice(1);
			//filter out one name 
			var filenames = [];
			files.forEach(function(file,index,array){
				if(index % 2 == 0){
					filenames.push(file.replace(/\.[a-z0-9]*/i,""));
				}	
			});

			res.status(200).json({message: 'Data found!', data: filenames});
		});
			
	});  
    
	app.post('/fs/upload',isLoggedIn,function (req, res) {

		var file_receiver = upload.array('dataFiles', 2);
		file_receiver(req, res, function (err) {
			if (err) {
				// An error occurred when uploading
				console.log("error in /fs/upload : " + err );
				return;
			}
			// Everything went fine
			res.status(200).json({message:"Image uploaded successfully"});
      res.redirect('/Project.html');  
		})
	});  
	
	
	

};