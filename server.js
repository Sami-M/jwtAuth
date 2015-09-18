var pg = require('pg');
var fs = require('fs');
delete pg.native;
var express = require('express');
var app = express();
var port = process.env.PORT || 9090;
var env       = process.env.NODE_ENV || "development";

// var passport = require('passport');
// var flash = require('connect-flash'); //store retrieve messages in session store
var morgan = require('morgan'); //logger
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var models = require('./app/models');

// require('./config/passport')(passport);

// load up the user model
var config    = JSON.parse(fs.readFileSync(__dirname +"/config/config.json", "utf8"))[env];
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

require('./app/routes')(app);

models.sequelize.sync().then(function () {
	app.listen(port);
	console.log('Magic happens at http://localhost:' + port);
});
