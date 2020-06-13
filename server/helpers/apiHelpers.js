const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and requir

module.exports.getGenreList=(callback)=>{
axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
.then((data)=>{
    callback(null,data)
})
.catch(err=>{
    callback(err)
})

}
module.exports.getMovieList=(genreId,callback)=>{

    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=6854712d4d1e8a05ed62ce1857be4859&language=en-US&sort_by=popularity.asc&page=1&with_genres=${genreId}`)
    .then((data)=>{
        callback(null,data)
    })
    .catch(err=>{
        callback(err)
    })




}