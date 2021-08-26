const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const reviewdb = require('../models/reviews');
const Movies = require('../models/movies');
const bcrypt = require('bcryptjs');



router.get('/:movieid', (req, res) => {
    reviewdb.find({ movieid: req.params.movieid }).then(reviews => {
        res.send(reviews);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.post('/review', (req, res) => {
    const {email,movieid,rating,review} =req.body;
    reviewdb.estimatedDocumentCount({ movieid: req.params.movieid })
    .then((count)=>{
        console.log({count});
        Movies.findOne({"imdb_id":movieid})
        .then((prevdata)=>{
            console.log(prevdata);
        const newRating=( ((count*parseFloat(prevdata.rating))+ parseFloat(rating))/(count+1));
        Movies.findOneAndUpdate({"imdb_id":movieid},{"rating":parseFloat(newRating).toFixed(2)},(error,data)=>{
            if(error)console.log(error);
            else console.log(data);
        }
        )})
    }).catch((err)=>{console.log(err)});
    const Review=new reviewdb({ email, movieid, rating, review });
    Review.save().then(reviewdb.findOne({ email, movieid, rating, review })).then((rev)=>res.status(201).send(rev))
    .catch((error) => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.delete('/review/:id',(req,res)=>{
    reviewdb.findOne({_id: req.params.id})
    .then((review)=>{
        console.log(review);
        reviewdb.estimatedDocumentCount({ movieid: review.movieid})
        .then((count)=>{;
            Movies.findOne({"imdb_id":review.movieid})
            .then((prevdata)=>{
                const newRating=( (((count+1)*parseFloat(prevdata.rating))-parseFloat(review.rating))/(count));
                console.log({count,newRating});
                Movies.findOneAndUpdate({"imdb_id":review.movieid},{"rating":parseFloat(newRating).toFixed(2)})
                .catch((err)=>{res.status(500).send({err})})
            })
            .then(reviewdb.findOneAndDelete({_id: req.params.id})
        .then(res.status(204).send()).catch(() => {
            res.status(500).send({ error: "Internal Server Error" });
        }))
    })}).catch((err)=>{console.log(err)})
});


module.exports=router;