'use strict';
const Score = require('../models/score.model');

exports.add = (req, res, next) => {
    let score = new Score(
        {
            name: req.body.name,
            score: req.body.score
        }
    );

    score.save((err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Score Created successfully')
    })
};

exports.getAll = (req, res, next) => {

    let query = Score.find({}).sort({ score: -1, name: 1 });
    query.exec((err, scores) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send(scores);
    });
};

exports.submit = async (req, res, next) => {
    const score = new Score(
        {
            name: req.body.name,
            score: req.body.score
        }
    );

    try{
        const saveResponse = await score.save();
        //succesfully saved

        const allScores = await Score.find({}).sort({ score: -1, name: 1 }).limit(10);
        res.send(allScores);
    }catch(err){
        return res.status(500).send(err);
    }


}