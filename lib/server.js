'use strict';

var express = require('express');
var db = require('./db');


function Server() {
    this.app = express();

    this.app.use(express.bodyParser());

    this.app.post('/', function (req, res) {
        db.Report.create(req.body['csp-report'])
            .done(function () {
                res.end();
            });
    });
}

Server.prototype.start = function () {
    this.server = this.app.listen(8000);
};

Server.prototype.stop = function () {
    this.server.close();
    this.server = null;
};

module.exports = Server;
