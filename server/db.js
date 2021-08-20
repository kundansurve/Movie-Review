var express = require('express');
//var app = express();
const mongoose = require("mongoose");

const connect = () => {
    try {
        const host="Kdsurve", username="Kdsurve", password="Kdsurve", database="reviewdb";

        let absoluteHostName = host;
        

        const mongoUri = `mongodb+srv://Kdsurve:KDSreview@moviereview.0kpdc.mongodb.net/reviewdb?retryWrites=true&w=majority`;

        return mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true,'useFindAndModify':false,'useCreateIndex': true });
    } catch (err) {
        console.log(`Error connecting to MongoDB: ${err}`);
        throw err;
    }
    
};

const getClient = () => {
    return mongoose.connection.getClient();
}

module.exports = {
    connect,
    getClient
};