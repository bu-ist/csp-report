'use strict';

var express = require('express');
var sequelize = require('./lib/sequelize');

var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.bodyParser());

app.post('/', function (req, res) {
    var report = req.body['csp-report'];

    if (report) {
        report['user-agent'] = req.headers['user-agent'];

        sequelize.Report.create(report).done(function () {
            res.end();
        });
    } else {
        res.end();
    }
});

app.listen(PORT);
