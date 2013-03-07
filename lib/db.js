'use strict';

var Sequelize = require('sequelize');


var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false
});

var Report = sequelize.define('Report', {
    'document-uri': Sequelize.TEXT,
    'referrer': Sequelize.TEXT,
    'blocked-uri': Sequelize.TEXT,
    'violated-directive': Sequelize.TEXT,
    'original-policy': Sequelize.TEXT
});
sequelize.Report = Report;

sequelize.sync();


module.exports = sequelize;
