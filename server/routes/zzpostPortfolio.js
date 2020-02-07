var express = require('express');
var router = express.Router();
var keys = require('../config/keys');
var upload = require('../../middleware/upload');
var Article = require('../models/Portfolio');
var moment = require('moment');

function checkSign(req, res) {
    // if (req.body.key === keys.secretKey) {
    //     return true;
    // } else {
    //     res.status(401).json({message: 'У вас нет прав доступа'});
    //     return false;
    // }
    return true;
}


router.post('/newWork', upload.single('image'), async (req, res) => {
    if (checkSign(req, res)) {
        try {
            const rightPath = req.file.path;
            const path = rightPath.replace('images\\', 'images/');
            let article = req.body;
            const candidate = new Article({
                title: article.title,
                specs: article.specs,
                tags: article.tags,
                portfolioNumber: article.portfolioNumber,
                image: req.file ? path : '',
                date: moment().format('LL'),
            });
            await candidate.save();
            res.status(200).json(`Портфолио добавлено`);
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});

/*router.post('/new', upload.single('image'), async (req, res) => {
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
});*/

router.get('/all', async (req, res) => {
    try {
        let articles = await Article.find({}).sort({portfolioNumber: -1});
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

/*router.post('/number', async (req, res) => {
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

router.get('/drafts', async (req, res) => {
    try {
        let articles = await Draft.find({}).sort({draftNumber: -1});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.post('/save-draft', upload.single('image'), async (req, res) => {
    try {
        if (checkSign(req, res)) {
            if (req.body.draftNumber == undefined) {
                let lastNumber = 0;
                let lastArcticle = await Draft
                    .findOne({})
                    .sort({draftNumber: -1});
                let articles = await Draft.find({});
                if (articles.length < 1) {
                    lastNumber = 1;
                } else {
                    if (lastArcticle.draftNumber) {
                        lastNumber = lastArcticle.draftNumber + 1;
                    }
                }
                moment.locale('ru');
                let rightPath, path;
                if (req.file) {
                    rightPath = req.file.path;
                    path = rightPath.replace('images\\', 'images/');
                }
                let article = req.body;
                const candidate = new Draft({
                    name: article.name,
                    htmlCode: article.htmlCode,
                    category: article.category,
                    draftNumber: lastNumber,
                    image: req.file ? path : '',
                    date: moment().format('LL'),
                    title: req.body.title
                });
                await candidate.save();
                res.status(200).json(candidate);
            } else {
                let updated = {
                    name: req.body.name,
                    htmlCode: req.body.htmlCode,
                    category: req.body.category,
                    draftNumber: req.body.draftNumber,
                    title: req.body.title
                };

                if (req.file) {
                    const rightPath = req.file.path;
                    const path = rightPath.replace('images\\', 'images/');
                    updated.image = path;
                }

                await Draft.findOneAndUpdate(
                    {
                        draftNumber: req.body.draftNumber
                    },
                    {
                        $set: updated
                    },
                    {new: true});
                res.status(200).json(updated);
            }
        }
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.post('/draft-number', async (req, res) => {
    try {
        let articles = await Draft
            .findOne({draftNumber: req.body.draftNumber});
        await Article.findOneAndUpdate({draftNumber: req.body.draftNumber}, {$set: {clicks: articles.clicks + 1}});
        res.status(200).json(articles);
    } catch (e) {
        console.log(e.message);
        res.status(400).json('Что-то пошло не так. Попробуйте позже.')
    }
});

router.delete('/draft', async (req, res) => {
    if (checkSign(req, res)) {
        try {
            await Draft.findOneAndDelete({draftNumber: req.body.draftNumber}, (err) => console.log(err));
            res.status(200).json('Deleted');
        } catch (e) {
            console.log(e.message);
            res.status(400).json('Что-то пошло не так. Попробуйте позже.')
        }
    }
});*/

module.exports = router;

