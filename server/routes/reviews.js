const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const reviewdb = require('../models/reviews');
const Movies = require('../models/movies');
const bcrypt = require('bcryptjs');
const { response } = require('express');



router.get('/:movieid', (req, res) => {
    reviewdb.find({ movieid: req.params.movieid }).then(reviews => {
        res.send(reviews);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});


router.post('/review/create/:movieid',auth.authenticate,(req,res)=>{
    const _id = req.session.userId;
    const {email,review,ratings} =  req.body;
    const movieid = req.params.movieid; 
    if(ratings>10 && ratings<0){
        res.status(400).send("Minimum and Maximum rating is 0 and 10 respectively.");
        return;
    }
    reviewdb.findOne({reviewedBy:_id,movieid})
    .then((REVIEW)=>{
        if(REVIEW){
            res.status(400).send("You have already reviewed this");
            return;
        }else{
            
            Movies.findOne({"imdb_id":movieid})
            .then((MOVIES)=>{
                
                const Review = new reviewdb({reviewedBy:_id,email,movieid,review,ratings});
                Review.save()
                .then(()=>{
                    reviewdb.aggregate([
                        {$match:{movieid:movieid}},
                        {$group: {
                            _id: "",
                            average: {
                              $avg: "$ratings"
                            }
                          }}
                    ]).then((data)=>{
                        Movies.updateOne({"imdb_id":movieid},{$set:{"ratings":data[0].average},$inc:{"numberofRatings":1}})
                        .then(()=>res.status(200).send("Successfull"))
                        .catch(err=>{res.status(400).send({err})})
                    }).catch(err=>{res.status(400).send({err})})
                }).catch(err=>{res.status(400).send({err})})
            }).catch(err=>{res.status(400).send({err})})
        }
    }).catch(err=>res.status(400).send({err}));
});


router.delete('/review/delete/:reviewId',auth.authenticate,(req,res)=>{
    const _id = req.session.userId;
    const reviewId = req.params.reviewId;
    reviewdb.findOne({_id:reviewId,reviewedBy:_id})
    .then((REVIEW)=>{
        if(!REVIEW){
            res.status(400).send("No such type of review");
            return;
        }else{
            if(_id!=REVIEW.reviewedBy){
                res.status(400).send("You are not allowed to delete this review");
                return;
            }
            Movies.findOne({"imdb_id":REVIEW.movieid})
            .then((MOVIES)=>{
                if(MOVIES.numberofRatings<=0){
                    res.status(400).send("No one reviewed this movie yet");
                    return;
                }
                
                
                reviewdb.deleteOne({_id:reviewId})
                .then(()=>{
                    reviewdb.aggregate([
                        {$match:{movieid:MOVIES["imdb_id"]}},
                        {$group: {
                            _id: "$movieid",
                            average: {
                              $avg: "$ratings"
                            }
                          }}
                    ]).then((data)=>{
                        const avg=(data.length>0)?data[0].average:null;
                        Movies.updateOne({"imdb_id":MOVIES["imdb_id"]},{$set:{"ratings":avg},$inc:{"numberofRatings":-1}})
                        .then(()=>res.status(200).send("Successfull"))
                        .catch(err=>{res.status(400).send({err})})
                    }).catch(err=>{res.status(400).send({err})})
                }).catch(err=>{res.status(400).send({err})})
            }).catch(err=>{res.status(400).send({err})})
        }
    }).catch(err=>res.status(400).send({err}))
});


module.exports=router;