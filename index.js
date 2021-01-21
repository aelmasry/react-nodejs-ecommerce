const   express = require('express'),
        bodyParser = require("body-parser"),
        cors = require("cors"),
        dbconnect = require('./config/database.js');

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

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center; color:red;"> This Example Ecommerce by React and NodeJS </h1>');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;