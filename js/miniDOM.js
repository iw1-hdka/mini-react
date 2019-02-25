import { isStateLessComponent, isClass } from './utils.js';

let vDOM;

function appendProp(domElement, key, value) {
    const allowedDOMAttributes = ['checked', 'value', 'className', 'max', 'href', 'dataSrc', 'alt', 'style', 'src'];
    // Handle DOM events
    if (typeof value === 'function' && key.startsWith('on')) {
        domElement.addEventListener(key.substring(2).toLowerCase(), value);
    }
    // Add DOM Attributes
    else if (allowedDOMAttributes.includes(key)) {
        domElement[key] = value;
    }
    // Add `style` attribute of the DOM Element
    else if (key === 'style' && typeof value === 'object') {
        Object.assign(domElement.style, value);
    }
    // Set unique key of element as id
    else if (key === 'key') {
        domElement.id = value;
    }
}

function createDOM(vDOM, root) {
    if (Array.isArray(vDOM)) {
        vDOM.forEach(child => createDOM(child, root));
    } else if (typeof vDOM === 'object') {
        const element = document.createElement(vDOM.type);
        root.appendChild(element);

        if (vDOM.children) {
            vDOM.children.forEach(child => createDOM(child, element));
        }

        if (vDOM.props) {
            Object.entries(vDOM.props).forEach(([key, value]) => appendProp(element, key, value));
        }
    } else {
        root.appendChild(document.createTextNode(vDOM));
    }
}

function renderReactElement(element) {
    const domEl = element.render();
    domEl.props = {
        key: element.props.key,
        ...domEl.props
    };

    return domEl;
}

export const createElement = (element, props = null, ...children) => {
    if (isClass(element)) {
        const reactElement = new (element)(props);
        reactElement.children = children;

        return renderReactElement(reactElement);
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

export function reRender(element) {
    const key = element.props.key;
    const domEl = document.getElementById(key);
    const parent = domEl.parentNode;

    parent.removeChild(domEl);
    vDOM = renderReactElement(element);

    createDOM(vDOM, parent);
}
