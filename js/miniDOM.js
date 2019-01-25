export function handleClass(clazz, props, children) {
    const reactElement = new (clazz)(props);
    reactElement.children = children;

    return renderReactElement(reactElement);
}

function appendProp(domElement, key, value) {
    if (typeof value === 'function' && key.startsWith('on')) {
        domElement.addEventListener(key.substring(2).toLowerCase(), value);
    } else if (key === 'checked' || key === 'value' || key === 'className') {
        domElement[key] = value;
    } else if (key === 'style' && typeof value === 'object') {
        Object.assign(domElement.style, value);
    } else if (key === 'key') {
        domElement.id = value
    } else if (typeof value !== 'object' && typeof value !== 'function') {
        domElement.setAttribute(key, value);
    }
}

export function createDOM(vDOM, root) {
    if (Array.isArray(vDOM)) {
        vDOM.forEach(child => root.appendChild(document.createTextNode(child)))
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

export function renderReactElement(element) {
    const domEl = element.render();
    domEl.props = {
        key: element.props.key,
        ...domEl.props
    };

    return domEl;
}