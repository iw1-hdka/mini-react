import Utils from "./../../services/Utils.js";
import { Component } from "./../../component.js";
import { createElement as h } from "./../../miniDOM.js";
class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
    this.getPost();
  }

  getPost() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    const url =
      "https://jsonplaceholder.typicode.com/posts/" +
      Utils.parseRequestURL().id;
    try {
      fetch(url, options).then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(result => {
            this.setState({ post: result.data });
          })
      );
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  render() {
    if (!this.state.post) return h("div"); // quick fix async render
    let post = this.state.post;
    return h(
      "div",
      { className: "container" },
      h(
        "div",
        { className: "row" },
        h(
          "div",
          { className: "col-12" },
          h(
            "article",
            {
              className: "article"
            },
            h("h1", null, post.title),
            h("p", null, post.body)
          ),
          h(
            "a",
            {
              href: "/#/"
            },
            "Retour aux articles"
          )
        )
      )
    );
  }
}

export default PostShow;
