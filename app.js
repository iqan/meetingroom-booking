var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');


var database = require('./config/database');
var bookings = require('./routes/bookings');
var users = require('./routes/users');

// mongo db
mongoose.connect(database.connection);

mongoose.connection.on('connected', () => {
    console.log('connected to mongodb at ' + database.connection);
});

mongoose.connection.on('error', (err) => {
    console.log('error while connecting to mongodb at ' + database.connection + '\r\n'+ err);
});

// app setup
var app = express();

// port
var port = process.env.PORT || 3000;

// CORS middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// static files
app.use(express.static(path.join( __dirname, 'public')));

/// routes
app.use('/users', users);
app.use('/bookings', bookings);

app.get('*', (req, res, next) => {
    res.sendFile(path.join( __dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log('server running on port ' + port);
});