"use strict";

import {createElement as h, render, Component} from './component.js';
import Home from "./views/pages/Home.js";
import About from "./views/pages/About.js";
import Error404 from "./views/pages/Error404.js";
import PostShow from "./views/pages/PostShow.js";
import Register from "./views/pages/Register.js";

import Navbar from "./views/components/Navbar.js";
import Bottombar from "./views/components/Bottombar.js";

import Utils from "./services/Utils.js";

const Title = (props) => h('h2', props, props.children);

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 0};
    }

    onPlusClick() {
        this.setState({value: this.state.value + 1});
    }

    render() {
        return h('div', null,
            h('div', null, `${this.state.value}`),
            h('button', {onClick: this.onPlusClick.bind(this)}, '+'),
        );
    }
}

class App extends Component {
    render() {
        return h(Navbar)// h('div', null,
            // h(Title, null, 'Super compteur !'),
            // h(Counter))
    }
}

render(App, document.getElementById('root'));

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/about": About,
  "/p/:id": PostShow,
  "/register": Register
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById("header_container");
  const content = null || document.getElementById("page_container");
  const footer = null || document.getElementById("footer_container");

  // Render the Header and footer of the page
  //header.innerHTML = await Navbar.render();
  //await Navbar.after_render();
  //footer.innerHTML = await Bottombar.render();
  //await Bottombar.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
