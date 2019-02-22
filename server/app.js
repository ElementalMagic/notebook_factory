var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var orderRouter = require('./routes/order');
var usersRouter = require('./routes/users');

var app = express();


app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('D:','node.js project','FB_PRODUCTION','fb')));
//app.use(express.static('D:\\node.js project\\FB_PRODUCTION\\fb\\index.html'));

app.use('/api/order', orderRouter);
app.use('/users', usersRouter);
app.use('*', (req,res) => res.status(400).sendFile('D:\\node.js project\\FB_PRODUCTION\\fb\\index.html'));
module.exports = app;
