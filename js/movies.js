import * as Protos from "./prototypes.js";
import { Component } from "./component.js";
import { createElement as h, render } from "./miniDOM.js";
import Router from "./router.js";

// App2 imports
import MovieItemList from "./movies/pages/MovieItemList.js";
import MovieItemDetail from "./movies/pages/MovieItemDetail.js";

let router = new Router({
  "/": MovieItemList,
  "/movie/:id": MovieItemDetail
});

class App extends Component {
  render() {
    return h(router.load());
  }
}

router.listen(() => {
  render(App, document.getElementById("root"));
});
