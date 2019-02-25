import { createElement as h, render, Component } from "../../component.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
    this.getPostsList();
  }

  getPostsList() {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
      fetch(url, options).then(response =>
        response
          .json()
          .then(data => ({
            data: data,
            status: response.status
          }))
          .then(result => {
            this.setState({ posts: result.data });
          })
      );
    } catch (err) {
      console.log("Error getting documents", err);
    }
  }

  render() {
    if (!this.state.posts[0]) return h("div"); // quick fix async render
    let posts = this.state.posts;
    return h(
      "div",
      null,
      h(
        "section",
        null,
        h(
          "div",
          { className: "container" },
          h("h1", null, "Les derniers articles"),
          h(
            "div",
            { className: "articles" },
            ...posts.slice(0, 1).map(post =>
              h(
                "div",
                { className: "article" },
                h(
                  "div",
                  { className: "card flex-md-row mb-4 box-shadow h-md-250" },
                  h(
                    "div",
                    {
                      className:
                        "card-body d-flex flex-column align-items-start"
                    },
                    h(
                      "strong",
                      { className: "d-inline-block mb-2 text-primary" },
                      "World"
                    ),
                    h(
                      "h3",
                      { className: "mb-0" },
                      h(
                        "a",
                        {
                          className: "text-dark",
                          href: `/#/post/${post.id}`
                        },
                        `${post.title}`
                      )
                    )
                  ),
                  h("img", {
                    className: "card-img-right flex-auto d-none d-md-block",
                    dataSrc: "holder.js/200x250?theme=thumb",
                    alt: "Image [200x250]",
                    style: "width: 200px; height: 250px;",
                    src:
                      "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_168cc535e63%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_168cc535e63%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22130.7%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
                    dataHolderRendered: true
                  })
                )
              )
            )
          )
        )
      )
    );
  }
}

export default Home;
