var express = require('express');
var app = express();
const path = require('path');

var genuuid = require('uuid').v4;
const session = require('express-session');
const MongoStore = require('connect-mongo');

const port = process.env.PORT || 4000;
//const movies = require('./src/movies');
const api = require('./server/api');
const db = require('./server/db');


db.connect().then(() => {
    //Handle /api with the api middleware
    app.use('/api', session({
        genid() {
            return genuuid() // use UUIDs for session IDs
        },
        store: new MongoStore({ client: db.getClient() }),
        secret: 'hellokundan',
        resave: false,
        saveUninitialized: true,
    }), api);

    //Handle non-api routes with static build folder
    app.use(express.static(path.join(__dirname, 'build')));

    //Return index.html for routes not handled by build folder
    app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    //Start listening on port
    app.listen(port, () => {
        console.log(`Server listening at port: ${port}`);
    });
});