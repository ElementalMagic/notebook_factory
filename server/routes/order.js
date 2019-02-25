var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

/* GET home page. */
router.post('/:type', function (req, res, next) {
    const contactEmail = req.body.email;
    console.log(req.body);
    switch (req.params.type) {
        case '1':{
            sendEmail(req.body, res);
            break;
        }
        case 'phone':{
            sendEmailPhone(req.body, res);
        }
    }
});

function sendEmail(req1, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        // dkim:{
        //     keySelector:'mail',
        //     domainName: 'fabrikabloknotov.ru',
        //     privateKey: 'v=DKIM1; k=rsa; t=s; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHBPAEu5qfJxymsxcgXg3Bu/JQkq3MRqB8c81VL3bnO/D/UfkWJwR9OE7lGrEnzka07Dl7SveWuJgii1qTYog65O9xAj/cWJ+vvJPo4Mn5PmqKFcvv+mLZciRlMqe8NwE8dbDvTWYekGAmzMT3rIwLH5ERJW90ZE9oeFIw3k8apQIDAQAB'
        // },
        auth: {
            user:'iqlex1',
            pass: process.env.PASS
        }
    });
   let html = req1.body.html;

    var mailOptions = {
        from: '"Фабрика блокнотов" <iqlex1@yandex.ru>',
        to: 'vkstrfrt@gmail.com',
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
function sendEmailPhone(req1, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        // dkim:{
        //     keySelector:'mail',
        //     domainName: 'fabrikabloknotov.ru',
        //     privateKey: 'v=DKIM1; k=rsa; t=s; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDHBPAEu5qfJxymsxcgXg3Bu/JQkq3MRqB8c81VL3bnO/D/UfkWJwR9OE7lGrEnzka07Dl7SveWuJgii1qTYog65O9xAj/cWJ+vvJPo4Mn5PmqKFcvv+mLZciRlMqe8NwE8dbDvTWYekGAmzMT3rIwLH5ERJW90ZE9oeFIw3k8apQIDAQAB'
        // },
        auth: {
            user:'info@fabrikabloknotov.ru',
            pass: process.env.PASS
        }
    });

    let html = req1.body.html;

    var mailOptions = {
        from: '"Фабрика блокнотов" <iqlex1@yandex.ru>',
        to: 'vkstrfrt@gmail.com',
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

module.exports = router;
