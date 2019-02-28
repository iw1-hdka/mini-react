import { Component } from "./../../component.js";
import { createElement as h } from "./../../miniDOM.js";

class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: props.movie,
      hasDetail: props.hasDetail ? props.hasDetail : false
    };
  }

  showThumbnail() {
    const { movie, hasDetail } = this.state;

    return h(
      "div",
      { className: hasDetail ? "movie" : "movie has-detail" },
      h(
        "a",
        { href: !hasDetail ? `/#/movie/${movie.id}` : "", title: movie.title },
        h("img", {
          alt: movie.title,
          src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
      )
    );
  }

  showDescription() {
    const { movie } = this.state;
    return h(
      "div",
      null,
      h(
        "p",
        null,
        h("span", { className: "title" }, "Release date : "),
        h("span", { className: "data-information" }, movie.release_date)
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Original title : "),
        h("span", { className: "data-information" }, movie.original_title)
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Rating : "),
        h(
          "span",
          { className: "data-information" },
          movie.vote_average + "/10 for " + movie.vote_count + " votes"
        )
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Original language : "),
        h(
          "span",
          { className: "data-information" },
          movie.original_language == "en" ? "English" : movie.original_language
        )
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Languages : "),
        h(
          "span",
          { className: "data-information" },
          ...movie.spoken_languages.map(spoken_language =>
            h(
              "span",
              { className: "movie-spoken-language" },
              spoken_language.name
            )
          )
        )
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Production country : "),
        h(
          "span",
          { className: "data-information" },
          ...movie.production_countries.map(production_country =>
            h(
              "span",
              { className: "movie-production-country" },
              production_country.name
            )
          )
        )
      ),
      h(
        "p",
        null,
        h("span", { className: "title" }, "Revenue : "),
        h("span", { className: "data-information" }, "$" + movie.revenue)
      ),
      h(
        "p",
        { className: "title-genre" },
        h("span", { className: "title" }, "Genres : "),
        h(
          "span",
          { className: "data-information" },
          ...movie.genres.map(genre =>
            h("span", { className: "movie-genre" }, genre.name)
          )
        )
      )
    );
  }

  otherDetail() {
    const { movie } = this.state;
    return h(
      "div",
      null,
      h(
        "div",
        { className: "synopsis" },
        h("h2", null, "Synopsis"),
        h("p", null, movie.overview)
      ),
      h(
        "div",
        { className: "production-companies" },
        h("h2", null, "Production Companies"),
        h(
          "p",
          { className: "wrapper" },
          ...movie.production_companies.map(production_company =>
            production_company.logo_path
              ? h(
                  "span",
                  { className: "movie-production-company" },
                  h(
                    "div",
                    { className: "company-logo" },
                    h("img", {
                      alt: production_company.name,
                      title: production_company.name,
                      src: `https://image.tmdb.org/t/p/w500${
                        production_company.logo_path
                      }`
                    })
                  )
                )
              : h("div")
          )
        )
      )
    );
  }

  showDetail() {
    return h(
      "div",
      { className: "container movie-detail" },
      h(
        "div",
        { className: "row entry-information" },
        h("div", { className: "thumbnail" }, this.showThumbnail()),
        h("div", { className: "details" }, this.showDescription())
      ),
      h("div", { className: "overview" }, this.otherDetail())
    );
  }

  render() {
    const { movie, hasDetail } = this.state;

    return hasDetail ? this.showDetail() : this.showThumbnail();
  }
}

export default MovieItem;
