import * as Protos from "./prototypes.js";
import { Player, Fighter } from "./mario.js";
import { createElement as h, render } from "./miniDOM.js";
import { Component } from "./component.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mario: new Fighter("Mario", 50),
      luigi: new Fighter("Luigi", 50)
    };

    this.onHit.bind(this);
  }

  onHit(target, damage) {
    const oldEnemy = this.state[target];
    const enemy = new Fighter(oldEnemy.name, oldEnemy.life, oldEnemy.damage);
    this.setState({
      ...this.state,
      [target]: enemy.onHit(damage)
    });
  }

  render() {
    const { mario, luigi } = this.state;
    return h(
      "div",
      null,
      h(Player, {
        fighter: mario,
        onHit: damage => this.onHit("luigi", damage)
      }),
      h("hr"),
      h(Player, {
        fighter: luigi,
        onHit: damage => this.onHit("mario", damage)
      })
    );
  }
}
