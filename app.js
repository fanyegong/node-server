var express = require('express');
var app = express();

// Routing
var indexRoute = require('./routes/index.js');
var userRoute = require('./routes/user.js');
app.use('/', indexRoute); 
app.use('/user', userRoute);

// Serving static files
app.use(express.static('public'));

// Starting server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

