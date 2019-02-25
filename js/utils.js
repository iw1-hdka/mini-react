export function isStateLessComponent(element) {
    return !isClass(element) && typeof element === 'function'
}

export function isClass(func) {
    return typeof func === 'function'
        && /^class\s/.test(Function.prototype.toString.call(func));
}

export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
