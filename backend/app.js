var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql2')

var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var officesRouter = require('./routes/offices');

var app = express();

app.use(cors())

app.locals.con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "classicmodels",
  password: "classicmodels",
  database: "classicmodels"
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/offices', officesRouter);

module.exports = app;
