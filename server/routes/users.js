const express= require('express');
const router =express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/',(req,res)=>{
    if(!res.body){
        res.status(400).send({error:"Email and Password not Provided"});
        return;
    }
    const {email,password}=req.body;
    if(!email){
        res.status(400).send({error:"Email not provided"});
        return;
    }
    if(!password){
        res.status(400).send({error:"Password not provided"});
        return;
    }
    UserCredential.findOne({email}).then(user=>{
        if(user){
            res.status(400).send({error:"User already Signed up"});
            return;
        }
        const hash=bcrypt.hashSync(password);
        const userCredential=new UserCredential({ email, password: hash});
        userCredential.save().then(()=>{
            const user =new User({_id:userCredential.id, email});
            user.save().then(()=>{
                res.status(201).send({id: userCredential.id});
            });
        });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/me', auth.authenticate, (req, res) => {
    User.findOne({ _id: req.session.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId }).then(user => {
        res.send(user);
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});

router.put('/me', auth.authenticate, (req, res) => {
    if (!req.session.userId) {
        res.send(401).send({ error: "Not logged in"});
    }

    const { firstName, lastName } = req.body;

    const updateQuery = {};
    (firstName !== undefined) && (updateQuery.firstName = firstName);
    (lastName !== undefined) && (updateQuery.lastName = lastName);

    User.updateOne({ _id: req.session.userId }, updateQuery).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
});
module.exports=router;