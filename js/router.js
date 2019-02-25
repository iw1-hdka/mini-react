"use strict";
import Utils from "./services/Utils.js";
import Error404 from "./views/pages/Error404.js";
import { routes } from "./routes.js";

export default class Router {
  constructor(routes) {
    this.routes = routes;
  }

  load() {
    document.getElementById("root").innerHTML = "";
    return this.getCurrentComponent();
  }

  // The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
  getCurrentComponent() {
    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL =
      (request.resource ? "/" + request.resource : "/") +
      (request.id ? "/:id" : "") +
      (request.verb ? "/" + request.verb : "");

    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    return routes[parsedURL] ? routes[parsedURL] : Error404;
  }
}
