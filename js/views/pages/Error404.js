import { Component } from "./../../component.js";
import { createElement as h } from "./../../miniDOM.js";
class Error404 extends Component {
  render() {
    return h(
      "section",
      {
        className: "section"
      },
      h("h1", null, "Cette page n'existe pas")
    );
  }
}

export default Error404;
