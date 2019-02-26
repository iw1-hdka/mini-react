import * as Protos from "./prototypes.js";
import { Component } from "./component.js";
import { FightClub } from "./views/pages/FightClub.js";
import { createElement as h, render } from "./miniDOM.js";
import Router from "./router.js";

let router = new Router({
  "/": FightClub,
});

class App extends Component {
  render() {
    return h(router.load());
  }
}

router.listen(() => {
  render(App, document.getElementById("root"));
});
