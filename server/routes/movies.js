const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const Movies = require('../models/movies');
const bcrypt = require('bcryptjs');
const reviewdb = require('../models/reviews');

router.get('/', (req, res) => {
    console.log("Okk")
    Movies.find().then(movies => {
        res.status(200).send(movies);
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
router.get('/id/:movieid', (req, res) => {
    Movies.findOne({ imdb_id: req.params.movieid }).then(movies => {
        res.send(movies);
    }).catch(() => {
        res.status(500).send({ error: "Not Found any movie" });
    });
});


module.exports=router;