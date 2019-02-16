import { reRender } from './miniDOM.js';
import { compareObjects } from './utils.js';

export class Component {
    constructor(props) {
        this.state = null;
        this.props = props ? {
            key: Math.random().toString(36).substr(2, 9),
            ...props
        } : {};
    }

    shouldUpdate(nextProps, nextState) {
        return !compareObjects(nextProps, this.props) || !compareObjects(nextState, this.state);
    }

    setState(state) {
        const nextState = {...this.state, ...state};
        if (this.shouldUpdate(this.props, nextState)) {
            this.state = nextState;
            reRender(this);
        }
    }
}
