var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

/* GET home page. */
router.post('/:type', function (req, res, next) {
    const contactEmail = req.body.email;
    switch (req.params.type) {
        case '1':{
            sendEmail(req.body, res);
            break;
        }
        case 'phone':{
            sendEmailPhone(req.body, res);
        }
    }

    res.json('Email send');
});

function sendEmail(req1, res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'notebook.factory.service@gmail.com',
            pass: 'pvitkov.ru'
        }
    });
   let html = req1.body.html;

    var mailOptions = {
        from: 'notebook.factory.service@gmail.com',
        to: 'vkstrfrt@gmail.com',
        subject: 'Заказ расчета с сайта ФабрикаБлокнотов',
        text: 'Новый заказ!',
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}
function sendEmailPhone(req1, res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'notebook.factory.service@gmail.com',
            pass: 'pvitkov.ru'
        }
    });
    let html = req1.body.html;

    var mailOptions = {
        from: 'Фабрика Блокнотов',
        to: 'vkstrfrt@gmail.com',
        subject: 'Заказ звонка с сайта ФабрикаБлокнотов',
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}

module.exports = router;
