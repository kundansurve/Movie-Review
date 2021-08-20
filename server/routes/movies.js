const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const Movies = require('../models/movies');
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    Movies.find().then(movies => {
        res.send(movies);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

router.get('/:title', (req, res) => {
    Movies.find({ title: req.params.title }).then(movies => {
        res.send(movies);
    }).catch(() => {
        res.status(500).send({ error: "Not Found any movie" });
    });
});

router.get('/:movieid', (req, res) => {
    Movies.findOne({ movieid:req.params.movieid }).then(movies => {
        res.send(movies);
    }).catch(() => {
        res.status(500).send({ error: "Not Found any movie" });
    });
});

module.exports=router;