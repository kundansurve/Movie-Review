var express = require('express');
//var app = express();
const mongoose = require("mongoose");

const connect = () => {
    try {
        const host="Kdsurve", username="Kdsurve", password="Kdsurve", database="reviewdb";

        let absoluteHostName = host;
        

        const mongoUri = `mongodb://Kdsurve:KDSreview@moviereview-shard-00-00.0kpdc.mongodb.net:27017,moviereview-shard-00-01.0kpdc.mongodb.net:27017,moviereview-shard-00-02.0kpdc.mongodb.net:27017/reviewdb?ssl=true&replicaSet=atlas-fd3yfb-shard-0&authSource=admin&retryWrites=true&w=majority`;

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