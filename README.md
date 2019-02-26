# mini-react

Subject [here](https://github.com/kmarques/esgi-cours/blob/master/javascript/project-subject.md)

# Use Router

1. Create an object like this tp specify all your routes and corresponding components

```
let routes = {
  "/": Home,
  "/post/:id": PostShow
}
```

2. Initiate route system

```
var router = new Router(routes); // instantiate router here
class App extends Component {
  render() {
    return h(router.load()); // load component for "/"
  }
}

// Listen app
router.listen(() => {
  render(App, document.getElementById("root")); // render your applicatio here
});
```

Do not forget class import
```
import Router from "./router.js";
```
