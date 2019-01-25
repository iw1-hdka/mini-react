import {isStateLessComponent, isClass} from './utils.js';
import { handleClass, createDOM, renderReactElement } from './miniDOM.js';

let vDOM;

function reRender(element) {
    const key = element.props.key;
    const domEl = document.getElementById(key);
    const parent = domEl.parentNode;

    parent.removeChild(domEl)
    vDOM = renderReactElement(element);
    
    createDOM(vDOM, parent);
}

export const createElement = (element, props = null, ...children) => {
    if (isClass(element)) {
        return handleClass(element, props, children);
    }
    if (isStateLessComponent(element)) {
        return element({...props, children});
    }
    
    return {type: element, props, children};
};

export const render = (element, domElement) => {
    vDOM = createElement(element);
    createDOM(vDOM, domElement);
};

export class Component {
    constructor(props) {
        this.props = {
            key: Math.random().toString(36).substr(2, 9),
            ...props
        };
    }

    setState(state) {
        this.state = Object.assign({}, this.state, state);
        reRender(this);
    }
}
