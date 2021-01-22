const   express = require('express'),
        bodyParser = require("body-parser"),
        session = require("express-session"),
        createError = require('http-errors'),
        cors = require("cors"),
        dbconnect = require('./config/database.js');

// const { check, oneOf, validationResult } = require('express-validator');
        
const app = express();

require('dotenv').config();

const PORT = process.env.APP_PORT || 3000;

var corsOptions = {
    origin: "http://127.0.0.1:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
}));


app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align:center; color:red;"> implementation E-Commerce project by React NodeJS MongoDB (MERN stack) </h1>');
});

// load routes file
require('./routes/users')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('APP_ENV') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send('error');
});


module.exports = app;