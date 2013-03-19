'use strict';

var url = require('url');
var Sequelize = require('sequelize');
var sequelize;

console.log(process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
    var uri = url.parse(process.env.DATABASE_URL);
    var auth = uri.auth.split(':');

    sequelize = new Sequelize('database', auth[0], auth[1], {
        dialect: 'postgres',
        protocol: uri.protocol,
        host: uri.host,
        port: uri.port
    });
} else {
    sequelize = new Sequelize('database', 'username', 'password', {
        dialect: 'sqlite',
        storage: 'database.sqlite',
        logging: false
    });
}

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
