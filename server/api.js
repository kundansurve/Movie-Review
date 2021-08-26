const express = require('express');
const router = express.Router();

const users = require('./routes/users');
const sessions = require('./routes/sessions');
const MovieData = require('./routes/movies');
const reviews = require('./routes/reviews');

// Add json and urlencoded middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use('/users', users);

router.use('/sessions', sessions);

router.use('/movies', MovieData);

router.use('/reviews', reviews);

module.exports = router;