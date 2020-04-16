var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var mongoose = require('mongoose');
var orderRouter = require('./routes/order');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var articleRouter = require('./routes/article');
var portfolioRouter = require('./routes/zzpostPortfolio');
var multer = require('multer');
var keys = require('./config/keys.js');
var app = express();

mongoose
    .connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected."))
    .catch(error => console.log(error));

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('*', function (req,res,next) {
    if(req.hostname === 'fabrikabloknotov.ru' || !process.env.CHECKDOMAIN){
        next();
    } else {
        res.status(301).redirect('https://fabrikabloknotov.ru');
    }
});
app.get('/orbit', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/form.html'))
});
app.get('/products', (req,res) => {
   res.status(200).sendFile(path.resolve('../../client/fb/products.html'))
});
app.get('/bloknot-na-pruzhine', (req,res) => {
   res.status(200).sendFile(path.resolve('../../client/fb/bloknot-na-pruzhine.html'))
});
app.get('/kalendari', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/kalendari.html'))
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
app.get('/bloknot-na-skrepke', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/bloknot-na-skrepke.html'))
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
app.get('/article', (req,res,next) => {
    res.status(200).sendFile(path.resolve('../../client/fb/news-post.html'))
});

app.get('/login', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/login.html'))
});
app.get('/editPage', function (req,res) {
    console.log(req.query);

    if(req.query.key === keys.secretKey){
        res.status(200).sendFile(path.resolve('../../client/fb/admin.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('/nav.html', (req,res) =>{
    res.status(200).sendFile(path.resolve('../../client/fb/nav.html'))
});

app.get('/footer.html', (req,res) =>{
    res.status(200).sendFile(path.resolve('../../client/fb/footer.html'))

});

app.get('/product-container.html', (req,res) =>{
    res.status(200).sendFile(path.resolve('../../client/fb/product-container.html'))
});


app.get('*', function (req,res,next) {
    if(req.path.endsWith('.html')){
        res.sendFile(path.resolve('../../client/fb/NotFound.html'))
    } else {
        next();
    }
});
app.use(express.static(path.resolve('../../client/fb')));
app.use("/images", express.static("images"));

app.use('/api/order', orderRouter);
app.use('/api/login', loginRouter);
app.use('/api/article', articleRouter);
app.use('/api/portfolio', portfolioRouter);

app.use('*', (req,res) => res.status(200).sendFile(path.resolve('../../client/fb/index.html')));
module.exports = app;
