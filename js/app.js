"use strict";

import { createElement as h, render, Component } from "./component.js";

import Header from "./views/components/Header.js";
import Page from "./router.js";
import Footer from "./views/components/Footer.js";

class App extends Component {
  render() {
    return h("div", null, h(Header), h(Page), h(Footer));
  }
}
let app = render(App, document.getElementById("root"));
// Listen on hash change:
window.addEventListener("hashchange", app);

// Listen on page load:
window.addEventListener("load", app);
