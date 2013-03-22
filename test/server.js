'use strict';

var request = require('request');
var sequelize = require('../lib/sequelize');
require('../server');

var fixture = {
    'csp-report': {
        'document-uri': 'http://example.org/page.html',
        'referrer': 'http://evil.example.com/',
        'blocked-uri': 'http://evil.example.com/evil.js',
        'effective-directive': 'script-src',
        'violated-directive': 'script-src \'self\' https://apis.google.com',
        'original-policy': 'script-src \'self\' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser',
        'source-file': 'evil.js',
        'line-number': '56',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.172 Safari/537.22'
    }
};


describe('server', function () {
    it('store report', function (done) {
        request({
            url: 'http://localhost:8000',
            method: 'post',
            headers: {
                'User-Agent': fixture['csp-report']['user-agent']
            },
            json: fixture
        }, function (error) {
            if (error) {
                done(error);
                return;
            }

            sequelize.Report.all().success(function (reports) {
                reports.should.have.length(1);

                var values = reports[0].values;
                delete values.id;
                delete values.createdAt;
                delete values.updatedAt;
                values.should.eql(fixture['csp-report']);

                done();
            }).error(function (error) {
                done(error);
            });
        });
    });
});
