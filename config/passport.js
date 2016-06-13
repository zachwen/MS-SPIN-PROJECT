var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
	},
	function(email, password, done) {
		User.findOne({'local.email' : email}, function(err, user) {
			console.log("local-signup reached");
			if(err){
				console.log("local-signup first err");
				return done(err);
			}
			if(user) {
				console.log("local-signup user existed");
				return done(null, false);
			} else {
				console.log("local-signup create new user");
				var newUser = new User();
				
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				newUser.save(function(err) {
					if(err){
						console.log("local-signup save err");
						throw err;
					}
					console.log("local-signup user create sucessfully");
					return done(null, newUser);
				});
			}
			
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {
		User.findOne({'local.email': email}, function(err, user) {
			if(err)
				return done(err);
			if(!user)
				return done(null, false);
			if(!user.validPassword(password))
				return done(null, false);
			return done(null, user);

		});
	}));

};
