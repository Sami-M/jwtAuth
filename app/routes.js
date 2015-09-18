var models = require('./models')
var jwt = require('jsonwebtoken');

module.exports = function(app) {

	// create user
	app.post('/api/user', function(req, res) {
		console.log(req.body.email);
		console.log(req.body.password);

		models.user.findOrCreate({where: {email:req.body.email}, defaults: {
			password: req.body.password,
			name_last: req.body.name_last,
			name_first: req.body.name_first,
			role: 1
		}})
		.spread(function(user, created){
			if(!created){
				res.json({ success: false, message: 'This email already exists'});
			} else{
				res.json({ success: true, message: 'User Created'});
			}	
		})
	});

	app.post('/api/authenticate', function(req, res) {
		console.log(req.body.email);
		models.user.findOne({
			where: {email: req.body.email}
		}).then(function(user) {
			if(user) {
				if (user.password != req.body.password){
					res.json({ success: false, message: 'Authentication failed'});
				}
				else {
					var token = jwt.sign(user, app.get('superSecret'), {
						expiresInMinutes: 1
					});
					res.json({
						success: true,
						message: 'Enjoy your token!',
						token: token
					});
				}
			}
			else{
				res.json({ success: false, message: 'Authentication failed'});
			}
		});
	});

	// route middleware to verify a token
	app.use(function(req, res, next) {
    // check header, url params, or post params for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
    	// verify secret and check exp
    	jwt.verify(token, app.get('superSecret'), function(err, decoded) {
    		if (err) {
    			return res.json({ success: false, message: 'Failed to authenticate token.'});
    		} else {
    			// save to request for use in other routes
    			req.decoded = decoded;
    			next();
    		}
    	});
    } else {
    	// no token, error
    	return res.status(403).send({
    		success: false,
    		message: 'No token provided.'
    	});
    }
	});

	app.get('/api', function(req, res) {
		res.send('Hello! The API is at http://localhost:9090/api');
	});

	app.get('/api/users', function(req, res) {
		models.user.findAll({

		}).then(function(users) {
			res.json(users);
		});
	});

};