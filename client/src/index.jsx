import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.swapFavorites=this.swapFavorites.bind(this);
    this.getMovies=this.getMovies.bind(this);
    this.alterState=this.alterState.bind(this);
  }
  componentDidMount(){
    axios.get('/movies')
    .then(({data})=>{
      this.setState({'favorites':data})
    })
  }

  alterState(key,value){
    let oldFaves=this.state.favorites;
    this.setState({"favorites":value},console.log(this.state))
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    axios.get('/search',{params:{
      genreId:genreId
    }})
    .then(({data})=>{
   
    this.setState({movies:[...data]},()=>console.log(this.state.movies))
    })
    
  }
  

  saveMovie() {
    // same as above but do something diff
    
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search getMovies ={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies alterState={this.alterState} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));