import {parseRequestURL} from "./services/utils.js";
import Error404 from "./views/pages/Error404.js";

export default class Router {
  constructor(routes) {
    this.routes = routes;
  }

  load() {
    const root = document.getElementById("root");
    while (root.hasChildNodes()) {
      root.removeChild(root.lastChild);
    }

    return this.getCurrentComponent();
  }

  // The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
  getCurrentComponent() {
    // Get the parsed URl from the addressbar
    let request = parseRequestURL(location.hash.slice(1));

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL =
      (request.resource ? "/" + request.resource : "/") +
      (request.id ? "/:id" : "") +
      (request.verb ? "/" + request.verb : "");

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    return this.routes[parsedURL] ? this.routes[parsedURL] : Error404;
  }

  listen(app) {
    // Listen on hash change:
    window.addEventListener("hashchange", app);

    // Listen on page load:
    window.addEventListener("load", app);
  }
}
