const express = require('express');
const router = express.Router();
const Base = require('../model/base');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//get all
router.get('/', function (req, res, next) {
    Base.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//get one
router.get('/:baseId', function (req, res, next) {
    const id = req.params.baseId;
    Base.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ 'result': 'No valid object found for given ID' });
            }

        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//save
router.post('/', function (req, res, next) {
    const base = new Base({
        _id: mongoose.Types.ObjectId(),
    });
    base.save()
        .then(result => {
            res.status(201).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//update
router.patch('/:baseId', function (req, res, next) {
    const id = req.params.baseId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Base.update({_id : id},updateOps)
    .exec()
    .then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    });
});

//delete
router.delete('/:baseId', function (req, res, next) {
    const id = req.params.baseId;
    Base.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Object seems already deleted" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;
