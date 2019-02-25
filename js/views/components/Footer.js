import { createElement as h, render, Component } from "../../component.js";

class Footer extends Component {
  render() {
    return h(
      "footer",
      {
        className: "footer"
      },
      h(
        "div",
        { className: "container" },
        h(
          "p",
          { className: "text-muted" },
          "Copyright " + new Date().getFullYear()
        )
      )
    );
  }
}

export default Footer;
