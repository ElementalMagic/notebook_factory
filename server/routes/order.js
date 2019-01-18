var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

/* GET home page. */
router.post('/:type', function (req, res, next) {
    const contactEmail = req.body.email;
   sendEmail(req, res);
    switch (req.params.type) {
        case 1: {

            break;
        }
    }
});

function sendEmail(req, res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'notebook.factory.service@gmail.com',
            pass: 'pvitkov.ru'
        }
    });

    var mailOptions = {
        from: 'notebook.factory.service@gmail.com',
        to: 'vkstrfrt@gmail.com',
        subject: '',
        text: 'That was easy!'
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
