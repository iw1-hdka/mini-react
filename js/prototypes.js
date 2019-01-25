export default (function() {
    Object.prototype.prop_access = function(propertyPath = '') {
        if (propertyPath === '' || propertyPath === null) {
            return this;
        }
        if (this === null) {
            console.error(this + ' not exist');
            return;
        }

        let newObj = this;
        let path = '';
        for (let prop of propertyPath.split('.')) {
            path += '.' + prop;
            if (newObj.hasOwnProperty(prop)) {
                newObj = newObj[prop];
            } else {
                console.log(path.slice(1) + ' not exist');
                return;
            }
        }

        return newObj;
    };

    String.prototype.interpolate = function(params) {
        let interpolatedString = this;
        let match;
        const regex = /[{]{2}(.+?(?=[}]{2}))[}]{2}/gm;

        while (match = regex.exec(this)) {
            interpolatedString = interpolatedString.replace(match[0], params.prop_access(match[1].trim()));
        }

        return interpolatedString;
    }
})()
