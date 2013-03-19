'use strict';

var express = require('express');
var sequelize = require('./lib/sequelize');

var PORT = process.env.PORT || 8000;
var app = express();


app.use(express.bodyParser());

app.post('/', function (req, res) {
    console.log(req.body);
    sequelize.Report.create(req.body['csp-report']).done(function () {
        res.end();
    });
});

app.listen(PORT);
