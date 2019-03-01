export function isStateLessComponent(element) {
    return !isClass(element) && type_check_v2(element, {type: 'function'});
}

export function isClass(func) {
    return type_check_v2(func, {type: 'function'})
        && /^class\s/.test(Function.prototype.toString.call(func));
}

const type_check_v1 = (val, type) => {
    switch (type.toLowerCase()) {
        case 'array':
            return Array.isArray(val);
        case 'null':
            return val === null;
        case 'object':
            return !Array.isArray(val) && val !== null && typeof val === 'object';
        default:
            return typeof val === type;
    }
};

export const type_check_v2 = (val, check) => {
    let ok = false;
    if (check.hasOwnProperty('type')) {
        ok = type_check_v1(val, check.type);
        if (!ok) return false;
    }
    if (check.hasOwnProperty('value')) {
        ok = typeof val === 'object' ? compare_objects(check.value, val) : check.value === val;
        if (!ok) return false;
    }
    if (check.hasOwnProperty('enum')) {
        ok = check.enum
            .find(enumVal => typeof enumVal === 'object' ?
                compare_objects(enumVal, val) :
                Object.is(enumVal, val)
            ) !== undefined;
        if (!ok) return false;
    }
    return ok;
};

export const compareObjects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
