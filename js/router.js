"use strict";

import Home from "./views/pages/Home.js";
import PostShow from "./views/pages/PostShow.js";
import Error404 from "./views/pages/Error404.js";
import Utils from "./services/Utils.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/post/:id": PostShow,
};

let Page = null;

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
function getCurrentPage() {

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

export default Page = getCurrentPage()
