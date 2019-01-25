import {createElement as h, render, Component} from './component.js';

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
        return h('div', null,
            h(Title, null, 'Super compteur !'),
            h(Counter)
        )
    }
}

render(App, document.getElementById('root'));
