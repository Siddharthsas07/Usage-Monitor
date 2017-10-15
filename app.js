var express = require('express');
var app = express();

var apiController = require('./controllers/apiController');
app.use('/', express.static(__dirname + '/public'));


// setting up the port
var port = process.env.PORT || 3000;

// setting up the static files folder
app.use('/assets', express.static(__dirname + '/public'));

// template helper
app.set('view engine', 'ejs');

// making api endpoint visible to app.js
apiController(app);
app.listen(port);
