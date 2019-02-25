import { Component } from './component.js';
import { createElement as h} from './miniDOM.js';

export class Fighter {
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

export class Player extends Component {
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
        console.log(fighter);
        return h(
            'div',
            null,
            h('progress', {max: fighter.life, value: fighter.currentLife()}),
            h('div', null, fighter.name),
            h(
                'div',
                null,
                h('button', {onClick: this.punch.bind(this)}, 'Punch it!'),
                h('button', {onClick: this.kick.bind(this)}, 'Kick it!')
            )
        )
    }
}