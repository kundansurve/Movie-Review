const express = require('express');
const router = express.Router();
const axios = require("axios");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

var movies=[];
var options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: {q: 'A'},
    headers: {
      'x-rapidapi-key': '8b5a4281d4msh11e64a7a4babdd3p1e1166jsna5506f5cb3a4',
      'x-rapidapi-host': 'imdb8.p.rapidapi.com'
    }
};
      
axios.request(options).then(function (response) {
    for(let i=0;i<response.data["d"].length;i++){  
        movie={
            "Name":response.data["d"][i]["l"],
            "imageUrl":response.data["d"][i]["i"]["imageUrl"],
            "cast":response.data["d"][i]["s"],
            "releaseDate": response.data["d"][i]["y"]
        };
        movies.push(movie);
    }
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
});

router.get('/', (req, res) => {
    res.status(200).send(movies);
});
module.exports = router;
