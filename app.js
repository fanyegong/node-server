var fs = require('fs');
var http2 = require('http2');
var privateKey = fs.readFileSync('sslcert/2_www.cpcwe.com.key', 'utf8');
var certificate = fs.readFileSync('sslcert/1_www.cpcwe.com_bundle.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var express = require('express');
// refer: https://github.com/expressjs/express/issues/2761 tunniclm's idea
express.request.__proto__ = http2.IncomingMessage.prototype;
express.response.__proto__ = http2.ServerResponse.prototype;
var app = express();

// MongoDB
require('./models/db.js');

// Routing
var indexRoute = require('./routes/index.js');
var userRoute = require('./routes/user.js');
app.use('/', indexRoute); 
app.use('/user', userRoute);

// Serving static files
var options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['js', 'css'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
};
app.use(express.static('public', options));

// Starting server
//app.listen(3000, function () {
//    console.log('Example app listening on port 3000!');
//});

var http2Server = http2.createServer(credentials, app);
http2Server.listen(443);

