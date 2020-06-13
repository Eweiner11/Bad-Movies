import React from "react";

import axios from 'axios'

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.saveOrDeleteMovie=this.saveOrDeleteMovie.bind(this)
  }
  

  // Make an onClick for each list item. If the movies shown is the search results,
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  saveOrDeleteMovie(movieObj){
    if(!this.props.showFaves){
      axios.post('/save',{
      image:movieObj.image,
      rating:movieObj.rating,
      release_date:movieObj.release_date,
      title:movieObj.title
      })
      .then(()=>{
         axios.get('/movies')
         .then((data)=>{this.props.alterState('favorites',data.data)})
      })
      
    }else{
      axios.post('/delete',{
        title:movieObj.title
      })
      .then(()=>{
        axios.get('/movies')
        .then((data)=>{this.props.alterState('favorites',data.data)})
    })
  }
}

  render() {
    return (
      <ul className="movies">
        {this.props.movies.map((movieObj) => {
          return (
            <li className="movie_item" onClick={()=>{this.saveOrDeleteMovie(movieObj)}}>
              
              <div className="movie_description">
                <h2>{movieObj.title}</h2>
                <img src={`${movieObj.image}`}alt="no image" />
                <section className="movie_details">
                  <div className="released: ">
                    <span className="title">year: </span>
                    <span>{movieObj.release_date}</span>
                  </div>
                  <div className="movie votes">
                    <span className="title">rating: </span>
                    <span>{movieObj.rating}</span>
                  </div>
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}



export default Movies;


