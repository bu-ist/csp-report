CSP Report
==========
Simple Content Security Policy report logger. Stores the reports in a Postgres database (SQLite on dev) with some other useful info.


Usage
-----
Environment variables:

 * PORT - Server port. Default: 8000
 * DATABASE_URL - Postgres database connection URI. Default: use SQLite

Start the server with `node server.js`.

In a production setup you should set the DATABASE_URL environment variable and set the CSP `report-uri` to the server's location. For example:
```
content-security-policy: default-src 'self'; style-src 'self' 'unsafe-inline'; report-uri /csp-report;
```

**Note:** The CSP report server should be on the same origin as the website, otherwise some browsers won't send the report. This can easily be achieved with a proxy. Here's an Nginx example:
```
location /csp-report {
    rewrite ^(.*)$ / break; # Rewrite everything to just /
    proxy_pass http://csp-report.herokuapp.com;
}
```


Stored data
-----------
 * blocked-uri
 * document-uri
 * effective-directive
 * original-policy
 * referrer
 * violated-directive
 * source-file
 * line-number
 * column-number
 * user-agent


License
-------
CSP Report is released under the MIT license.

Copyright © 2013 Roland Warmerdam.
