import React from "react";
import axios from "axios";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
      genreId: 14,
    };
    this.selected = this.selected.bind(this);
    this.getGenres = this.getGenres.bind(this);
  }
  componentDidMount() {
    this.getGenres();
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get("/genres").then(({ data }) => {
      this.setState({ genres: data.genres });
    });
  }
  selected(e) {
    this.setState({ genreId: e.target.value }, () => {
      console.log(this.state.genreId);
    });
  }

  render() {
    return (
      <div className="search">
        <button
          onClick={() => {
            this.props.swapFavorites();
          }}
        >
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.selected}>
          {this.state.genres.map((genre) => (
            <option value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br />
        <br />

        <button
          onClick={()=>{
            return this.props.getMovies(this.state.genreId)
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
