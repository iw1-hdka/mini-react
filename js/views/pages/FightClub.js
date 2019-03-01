import { createElement as h } from "../../miniDOM.js";
import { Component } from "../../component.js";

class Fighter {
    constructor(name, life, damage = 0) {
        this.name = name;
        this.life = life;
        this.damage = damage;
    }

    onHit(damage) {
        this.damage += damage;
        if (this.currentLife() < 0) {
            console.log(`${this.name} is dead!`);
        }

        return this;
    }

    currentLife() {
        return this.life - this.damage;
    }
}

class Player extends Component {
    constructor(props) {
        super(props);
    }

    punch() {
        this.props.onHit(Math.floor(Math.random() * 10) + 1);
    }

    kick() {
        this.props.onHit(Math.floor(Math.random() * 20) + 1);
    }

    render() {
        const { fighter } = this.props;
        return h(
            'div',
            null,
            h('progress', {max: fighter.life, value: fighter.currentLife()}),
            h('div', null, fighter.name),
            h(
                'div',
                null,
                h('button', {onClick: this.punch.bind(this)}, 'Punch it! {{ props.fighter.name }}'.interpolate(this)),
                h('button', {onClick: this.kick.bind(this)}, 'Kick it!')
            )
        )
    }
}

export class FightClub extends Component {
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
