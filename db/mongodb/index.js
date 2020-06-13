// 

const mongoose = require('mongoose');
if(process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI)
} else{
  mongoose.connect('mongodb://localhost/badMovies', { useNewUrlParser: true });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to badmovies...');
})

const badMoviesSchema = new mongoose.Schema({
  image:String,
  rating:Number,
  release_date:String,
  title:String
})

let Movies = mongoose.model("Movies",badMoviesSchema);

let save =(movieObj,callback)=>{
  var badMovie = new Movies(movieObj)
  badMovie.save()
  .then((data)=>callback(null,data))
  .catch((err)=>callback(err))

}
let find=(callback)=>{
    Movies.find()
  .then((data)=>{
    callback(null,data)
  })
  .catch(err=>{
    callback(err);
  })
}


module.exports.Movies= Movies;
module.exports.save=save;
module.exports.find=find;

