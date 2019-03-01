var express = require('express');
var router = express.Router();
var keys = require('../config/keys');
var upload = require('../../middleware/upload');
var Article = require('../models/Article');
var moment = require('moment');

function checkSign(req, res) {
    if (req.body.key === keys.secretKey) {
        return true;
    } else {
        res.status(401).json({message: 'У вас нет прав доступа'});
        return false;
    }
}

router.post('/uploadImage', upload.single('image'), async (req,res)=>{
    try{
        if(checkSign(req,res))
        {
            const rightPath = req.file.path;
            const path = rightPath.replace('images\\', 'images/');
            res.status(200).json(path);
        }
    } catch(e){
        console.log(e);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.post('/firstArticle', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            const rightPath = req.file.path;
            const path = rightPath.replace('images\\', 'images/');
            let article = req.body;
            const candidate = new Article({
                name: article.name,
                htmlCode: article.htmlCode,
                category: article.category,
                number: 1,
                image: req.file ? path : '',
                title: req.body.title,
                date: moment().format('LL'),
            });
            await candidate.save();
            res.status(200).json(`Статья #1 добавлена`);
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.post('/new', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            let lastNumber = 0;
            let lastArcticle = await Article
                .findOne({})
                .sort({number: -1});
            console.log(lastArcticle);
            let articles = await Article.find({});
            if (articles.length < 1) {
                lastNumber = 1;
            } else {
                if (lastArcticle.number) {
                    lastNumber = lastArcticle.number + 1;
                }
            }
            moment.locale('ru');
            const rightPath = req.file.path;
            const path = rightPath.replace('images\\', 'images/');
            let article = req.body;
            const candidate = new Article({
                name: article.name,
                htmlCode: article.htmlCode,
                category: article.category,
                number: lastNumber,
                image: req.file ? path : '',
                date: moment().format('LL'),
                title: req.body.title
            });
            await candidate.save();
            res.status(200).json(`Статья #${lastNumber} добавлена`);
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.delete('/all', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            await Article.deleteMany({}, (err) => console.log(err));
            res.status(200).json('Deleted');
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.delete('/deleteOne', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            await Article.findOneAndDelete({number: req.body.number}, (err) => console.log(err));
            res.status(200).json('Deleted');
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

router.get('/all', async (req, res) => {
    try {
        let articles = await Article.find({}).sort({number: -1});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.get('/category', async (req, res) => {
    try {
        let articles = await Article
            .find({category: req.body.category})
            .sort({number: -1});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.post('/number', async (req, res) => {
    try {
        let articles = await Article
            .findOne({number: req.body.number});
        await Article.findOneAndUpdate({number: req.body.number}, {$set: {clicks: articles.clicks + 1}});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.get('/popular', async (req, res) => {
    try {
        let articles = await Article.find({}).sort({clicks: -1});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.patch('/edit', upload.single('image'), async (req, res) => {
    try {
        if (checkSign(req, res)) {
            let updated = {
                name: req.body.name,
                htmlCode: req.body.htmlCode,
                category: req.body.category,
                number: req.body.number,
                title: req.body.title
            };

            console.log(req.file);
            if (req.file) {
                const rightPath = req.file.path;
                const path = rightPath.replace('images\\', 'images/');
                updated.image = path;
            }
            //

            await Article.findOneAndUpdate(
                {
                    number: req.body.number
                },
                {
                    $set: updated
                },
                {new: true});
            res.status(200).json(updated);
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.');
    }
});

module.exports = router;

