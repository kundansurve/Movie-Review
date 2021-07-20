const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const movies = require('./movies');
//const users=require('')
app.use('/api/movies/', movies);


app.listen(port, () => {
    console.log(`Server listening at port: ${port}`)
});