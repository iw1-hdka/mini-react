import { parseRequestURL } from "./../../services/utils.js";

import { Component } from "./../../component.js";
import { createElement as h } from "./../../miniDOM.js";
import MovieItem from "../components/MovieItem.js";

class MovieItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getMovieDetail();
  }

  getMovieDetail() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    const url =
      "https://api.themoviedb.org/3/movie/" +
      parseRequestURL().id +
      "?api_key=802b2c4b88ea1183e50e6b285a27696e";
    try {
      fetch(url, options).then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(result => {
            this.setState({ movie: result.data });
          })
      );
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  render() {
    if (!this.state.movie) return h("div"); // quick fix async render
    let movie = this.state.movie;
    console.log(movie)
    return h("div", null, h(MovieItem, { movie: movie, hasDetail: true }));
  }
}

export default MovieItemDetail;
