// Variables correspondants aux paquets installés
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

var api = require('./api-route.js');
app.use(api);

/* 
    Just use nodemon server.js instead of node to run your code, 
    and now your process will automatically restart 
    when your code changes.
*/
app.listen(8080);
console.log("on utilise le port: 8080");