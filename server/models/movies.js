const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
    "imdb_id":{
        type: String,
        required: true,
        unique: true
    },
    "story":{
        type: String,
        required: true,
        unique: true
    },
    "summary":{
        type: String,
        required: true,
        unique: true
    },
    "tagline":{
        type: String,
        required: true,
        unique: true
    },
    "actors":{
        type: String,
        required: true,
        unique: true
    },
    "wins_nominations":{
        type: String,
        required: true,
        unique: true
    },
    "release_date":{
        type: String,
        required: true,
        unique: true
    },
    "ratings":{
        type:Number,
        default:0
    },      
    "numberofRatings":{
        type:Number,
        default:0
    },
    "geners":{
        type: String,
        required: true,
        unique: true
    },
    "title":{
        type: String,
        required: true,
        unique: true
    },
    "poster_path":{
        type: String,
        required: true,
        unique: true
    },
    "wiki_link":{
        type: String,
        required: true,
        unique: true
    }
},{ collection: 'MovieData' });

module.exports = mongoose.model('MovieData',movieSchema);