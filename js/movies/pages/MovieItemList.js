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
      "https://api.themoviedb.org/3/discover/movie?api_key=802b2c4b88ea1183e50e6b285a27696e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2019";
    try {
      fetch(url, options).then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(result => {
            this.setState({
              movies: result.data.results,
              searchData: result.data.results,
              searchValue: ""
            });
          })
      );
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  filterList(q, list) {
    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    const words = q
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s);
    const hasTrailingSpace = q.endsWith(" ");
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            // The last word - ok with the word being "startswith"-like
            return `(?=.*\\b${escapeRegExp(word)})`;
          } else {
            // Not the last word - expect the whole word exactly
            return `(?=.*\\b${escapeRegExp(word)}\\b)`;
          }
        })
        .join("") + ".+",
      "gi"
    );
    return list.filter(item => {
      return searchRegex.test(item.title || item.tagline);
    });
  }

  search(e) {
    setTimeout(() => {
      let formValue = e.target.value;
      let results = this.filterList(formValue, this.state.searchData);

      this.setState({
        movies: results,
        searchValue: formValue
      });
    }, 500);
  }

  showSearchForm() {
    return h(
      "form",
      { className: "search-bar" },
      h("input", {
        type: "text",
        name: "search",
        placeholder: "Quel film populaire cherchez-vous ?",
        onKeyup: this.search.bind(this),
        value: this.state.searchValue != undefined ? this.state.searchValue : ""
      })
    );
  }

  render() {
    if (!this.state.movies) return h("div"); // quick fix async render
    let movies = this.state.movies;

    return h(
      "div",
      { className: "container" },
      h("div", { className: "search" }, this.showSearchForm()),
      movies.length > 0
        ? h(
            "div",
            { className: "movies" },
            ...movies.map(movie =>
              h(MovieItem, { movie: movie, hasDetail: false })
            )
          )
        : h("p", { className: "no-result" }, "No popular movie(s) found")
    );
  }
}

export default MovieItemList;
