// Dependencies
// ===============================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

// (is this a typo? should it be multipart?)
var mutilpart = require('connect-multiparty');
// ()

var uploader = require('express-fileuploader');
var mysql = require('mysql');

// Load stylesheets, imgs, etc. from static folder
// ===============================================
app.use(express.static(process.cwd() + '/static'));

// Parse incoming responses into body
// ===============================================
app.use(bodyParser.urlencoded({
	extended: false
}));

// Method Override allows for deleting/updating info from the db
// ===============================================
app.use(methodOverride('_method'));

// sets the 'main.handlebars' file to be the default
// ===============================================
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Route to the controller
// ===============================================
var routes = require('./controllers/classify-controller.js');
app.use('/', routes);


// set up the Express Server (app) to listen using the 'process.env.PORT' value (aka, the one Heroku assigns, I assume) or PORT 8000
// ===============================================
app.listen(3000, function() {
    console.log("server listening on port: " + 3000);
});
