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
app.get('/products', (req,res) => {
   res.status(200).sendFile(path.resolve('../../client/fb/products.html'))
});
app.get('/bloknot-na-pruzhine', (req,res) => {
   res.status(200).sendFile(path.resolve('../../client/fb/bloknot-na-pruzhine.html'))
});
app.get('/bloknot-na-kleyu', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/bloknot-na-kleyu.html'))
});
app.get('/bloknot-s-obtyazhkoy', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/bloknot-s-obtyazhkoy.html'))
});
app.get('/bloknot-s-ruchkoy', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/bloknot-s-ruchkoy.html'))
});
app.get('/kubariki-s-logotipom', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/kubariki-s-logotipom.html'))
});
app.get('/bloknot-s-magnitom', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/bloknot-s-magnitom.html'))
});
app.get('/trebovanya', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/trebovanya.html'))
});
app.get('/oplata-i-dostavka', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/oplata-i-dostavka.html'))
});
app.get('/contacts', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/contacts.html'))
});
app.get('/news', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/news.html'))
});
app.get('/news-post', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/news-post.html'))
});

app.use(express.static(path.resolve('../../client/fb')));
//app.use(express.static(path.join('D:','node.js project','FB_PRODUCTION','fb')));
//app.use(express.static('D:\\node.js project\\FB_PRODUCTION\\fb\\index.html'));

app.use('/api/order', orderRouter);
app.use('/users', usersRouter);
//app.use('*', (req,res) => res.status(400).sendFile('D:\\node.js project\\FB_PRODUCTION\\fb\\index.html'));

app.use('*', (req,res) => res.status(200).sendFile(path.resolve('../../client/fb/index.html')));
module.exports = app;
