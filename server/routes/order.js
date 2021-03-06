var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');
let multer = require('multer');
let upload = multer({storage: multer.memoryStorage()});

/* GET home page. */

router.post('/:type', upload.single('model'), function (req, res, next) {
    switch (req.params.type) {
        case '1': {
            sendEmail(req.body, res);
            break;
        }
        case 'phone': {
            sendEmailPhone(req.body, res);
        }
        case 'crm': {
            sendCRMRequest(req, res);
        }
        case 'noteFeedback': {
            sendFeedback(req, res);
        }
    }
});

function sendEmail(req1, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'iqlex1',
            pass: process.env.PASS
        }
    });
    let html = req1.body.html;

    var mailOptions = {
        from: '"Фабрика блокнотов" <iqlex1@yandex.ru>',
        to: 'info@fabrikabloknotov.ru',
        subject: 'Заказ расчета с сайта ФабрикаБлокнотов',
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

function sendEmailPhone(req1, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'iqlex1',
            pass: process.env.PASS
        }
    });

    let html = req1.body.html;

    var mailOptions = {
        from: '"Фабрика блокнотов" <iqlex1@yandex.ru>',
        to: 'info@fabrikabloknotov.ru',
        subject: 'Заказ звонка с сайта ФабрикаБлокнотов',
        html: html + '<div><h3>Заказ</h3> <h4> <span><b>Пользователь просит перезвонить ему.</b></span> ' +
            '</h4></div><br><br><br><br><br><div><h4><span><i>Это письмо было создано автоматически.</i>' +
            '</span> <span><i>Не нужно отвечать на него.</i></span></h4></div>'
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

function sendCRMRequest(req, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'iqlex1',
            pass: process.env.PASS
        }
    });

    let html = `<div class="response">
                <h1>Заявка на подключение к системе ОРБИТА</h1>
                <h3>Имя:</h3>
                <p>${req.body.name} ${req.body.surname}</p>
                <h3>Телефон:</h3>
                <p>${req.body.phone}</p>
                <h3>Почта</h3>
                <p>${req.body.email}</p>
                <h3>Организация:</h3>
                <p>${req.body.company}</p>
                <h3>ИНН:</h3>
                <p>${req.body.inn}</p>
                </div>`;

    let mailRecipients = ['', '']
    var mailOptions = {
        from: '"Система ОРБИТА" <iqlex1@yandex.ru>',
        to: 'vk@zzpost.ru',
        subject: 'Заявка на подключение к системе ОРБИТА',
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

    let secondaryMailOptions = {
        from: '"Система ОРБИТА" <iqlex1@yandex.ru>',
        to: 'miss.gnom@gmail.com',
        subject: 'Заявка на подключение к системе ОРБИТА',
        html: html
    }

    transporter.sendMail(secondaryMailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}

function sendFeedback(req, res) {
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: 'iqlex1',
            pass: process.env.PASS
        }
    });

    let html = `<div class="response">
                <h1>Заявка на расчет тиража</h1>
                <h3>Имя:</h3>
                <p>${req.body.name}</p>
                <h3>Телефон:</h3>
                <p>${req.body.phone}</p>
                <h3>Почта:</h3>
                <p>${req.body.email}</p>
                <h3>Дополнительная информация:</h3>
                <p>${req.body.options}</p>
                ${req.file ? '<h3>Макет:</h3>' +
        '<p>Прикреплен к письму</p>' : ''}
                </div>`;

    var mailOptions = {
        from: '"ФабрикаБлокнотов" <iqlex1@yandex.ru>',
        to: 'info@fabrikabloknotov.ru',
        subject: 'Заявка на расчет тиража',
        html: html
    };
    if (req.file) {
        mailOptions.attachments = [
            {
                filename: "Макет - " + req.file.originalname,
                content: req.file.buffer
            }
        ]
    }

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
