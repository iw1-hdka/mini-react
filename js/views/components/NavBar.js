import { createElement as h, render, Component } from "../../component.js";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return h(
      "div",
      {
        className:
          "d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
      },
      h(
        "h5",
        { className: "my-0 mr-md-auto font-weight-normal" },
        h("a", { href: "/#/" }, "Projet JS")
      ),
      h(
        "a",
        { className: "btn btn-outline-primary", href: "/#/register" },
        "S'enregistrer"
      )
    );
  }
}

export default Navbar;
