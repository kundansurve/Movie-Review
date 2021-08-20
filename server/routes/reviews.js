const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const reviewdb = require('../models/reviews');
const bcrypt = require('bcryptjs');



router.get('/:movieid', (req, res) => {
    reiview.findOne({ movieid: req.params.movieid }).then(reviews => {
        res.send(reviews);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ email: req.params.userId }).then(reviews => {
        res.send(reviews);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


module.exports=router;