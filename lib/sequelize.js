'use strict';

var url = require('url');
var Sequelize = require('sequelize');
var sequelize;


if (process.env.DATABASE_URL) {
    var uri = url.parse(process.env.DATABASE_URL);
    var auth = uri.auth.split(':');
    var connection = {
        database: uri.path.substring(1),
        username: auth[0],
        password: auth[1],
        protocol: uri.protocol,
        host: uri.host,
        port: uri.port
    };
    console.log(connection);

    sequelize = new Sequelize(connection.database, connection.username, connection.password, {
        dialect: 'postgres',
        protocol: connection.protocol,
        host: connection.host,
        port: connection.port
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
