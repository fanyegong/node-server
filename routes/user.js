var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time:', Date.now());
    next();
});

// define the user  page route
router.get('/', function (req, res) {
    res.send('User Page!');
});
// define the /user/list route
router.get('/list', function (req, res) {
    res.send('User list  Page!');
});

module.exports = router;

