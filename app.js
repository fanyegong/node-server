var express = require('express');
var app = express();

// use routes
var indexRoute = require('./routes/index.js');
var userRoute = require('./routes/user.js');
app.use('/', indexRoute); 
app.use('/user', userRoute);

//app.get('/', function (req, res) {
//    res.send('Hello World!');
//});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
