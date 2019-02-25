// Here import all components you want to load in specified routes
import Home from "./views/pages/Home.js";
import PostShow from "./views/pages/PostShow.js";

// List of supported routes. Any url other than these routes will throw a 404 error
export const routes = {
  "/": Home,
  "/post/:id": PostShow
};
