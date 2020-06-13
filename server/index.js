var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var {getGenreList,getMovieList}=require('./helpers/apiHelpers.js')
var app = express();
var{Movies,save,find}=require('../db/mongodb/index.js')

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));



app.get("/genres", function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
getGenreList((err,{data})=>{
  if(err){
    res.status(201);
    res.end()
  }else{
    res.status(201).send(data)
  }
})

});

app.get("/search", function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page
 
  getMovieList(req.query.genreId,(err,data)=>{
    if(err){
      res.status(404)
    }else{
      let movieData = data.data.results.map((movie)=>{
        console.log(movie)
        var movieObj={
          title:movie.title,
          overview:movie.overview,
          rating:movie.vote_average,
          release_date:movie.release_date.slice(0,4),
          image:`http://image.tmdb.org/t/p/w185/${movie.poster_path}`,
          description:movie.overview

        }
        return movieObj
      })
    res.json(movieData)
     
    }
  })

})
  

  



app.post("/save", function(req, res) {
  //save movie as favorite into the database
  save(req.body,(err,data)=>{
    if(err){
      console.log(err)
      res.end()
    }
    else{
      res.status(201).send(req.body)
    }
  })
  
});

app.post("/delete", function(req, res) {
  
  Movies.remove(req.body)
  .then(()=>res.send('worked'))
});

app.get('/movies',function(req,res){
  Movies.find()
  .then((data)=>{
    res.send(data)
  })
 
})


app.listen(3000, function() {
  console.log("listening on port 3000!");
});
