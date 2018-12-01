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

var tempResponse = [
    {
        "_id": "5bfdae274ea507074910a3f8",
        "name": "mee",
        "score": 50,
        "__v": 0
    },
    {
        "_id": "5bfdaee44ea507074910a3f9",
        "name": "bro",
        "score": 20,
        "__v": 0
    },
    {
        "_id": "5bfeccfc2d77920863dbdf39",
        "name": "asd",
        "score": 12,
        "__v": 0
    },
    {
        "_id": "5bfecea62d77920863dbdf3d",
        "name": "asd",
        "score": 12,
        "__v": 0
    },
    {
        "_id": "5bfea321dbe32b07dc63fb8d",
        "name": "atm",
        "score": 10,
        "__v": 0
    },
    {
        "_id": "5bfea66abe1630083d6bb113",
        "name": "atm",
        "score": 10,
        "__v": 0
    },
    {
        "_id": "5bfea67bbe1630083d6bb114",
        "name": "tem",
        "score": 10,
        "__v": 0
    },
    {
        "_id": "5bfec9dc2d77920863dbdf37",
        "name": "tem",
        "score": 10,
        "__v": 0
    },
    {
        "_id": "5bfeca612d77920863dbdf38",
        "name": "tem",
        "score": 10,
        "__v": 0
    },
    {
        "_id": "5bfed0a2704e06088a68d8dd",
        "name": "tem",
        "score": 10,
        "__v": 0
    }
]