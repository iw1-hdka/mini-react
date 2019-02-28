import { Component } from "./../../component.js";
import { createElement as h } from "./../../miniDOM.js";
import MovieItem from "./../components/MovieItem.js";

class MovieItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMoviesList();
  }

  getMoviesList() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const url =
      "https://api.themoviedb.org/3/movie/popular?api_key=802b2c4b88ea1183e50e6b285a27696e";
    try {
      fetch(url, options).then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(result => {
            this.setState({ movies: result.data.results });
          })
      );
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  render() {
    if (!this.state.movies) return h("div"); // quick fix async render
    let movies = this.state.movies;

    return h(
      "div",
      { className: "movies" },
      ...movies.map(movie => h(MovieItem, { movie: movie, hasDetail: false }))
    );
  }
}

export default MovieItemList;
