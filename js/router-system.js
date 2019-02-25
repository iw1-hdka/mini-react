"use strict";

import { Component } from "./component.js";
import { createElement as h, render } from "./miniDOM.js";

import Router from "./router.js";
import { routes } from "./routes.js";

var router = new Router(routes);
class App extends Component {
  render() {
    return h(router.load());
  }
}

// App entry point
let app = () => {
  render(App, document.getElementById("root"));
};

// Listen on hash change:
window.addEventListener("hashchange", app);

// Listen on page load:
window.addEventListener("load", app);
