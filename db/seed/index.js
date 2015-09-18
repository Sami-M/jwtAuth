var pg = require('pg');
delete pg.native;
var configDB = require('../../config/database.js');
var Sequelize = require('sequelize');
var pg = require('pg').native;
var pghstore = require('pg-hstore');
var configDB = require('../../config/database.js');
var sequelize = new Sequelize(configDB.url);

var roles = require('./role');
roles.seed();