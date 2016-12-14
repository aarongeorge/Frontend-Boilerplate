/**
 * Property Validator
 *
 * @desc A property validator for JS
 *
 * @usage:
 *
 * new PropertyValidator({
 *     'propertyName': {
 *         'type': array|boolean|custom|date|element|function|number|object|string|undefined,
 *         'required': true|false,
 *         'default': default value for property,
 *         'validateFn': a function that takes one param and returns true or false. Only works if `type` is `custom`
 *     }
 * });
 *
 * @notes:
 *
 * Any property passed to an instance of PropertyValidator that wasn't initially passed will be ignored
 */

// Constructor: PropertyValidator
var PropertyValidator = function (propertiesObj) {
    'use strict';

    // `propertiesObj` is undefined
    if (this.isUndefined(propertiesObj)) {

        // Throw error
        throw new Error('`propertiesObj` was not passed');
    }

    // `propertiesObj` is not an object
    if (!this.isObject(propertiesObj)) {

        // Throw error
        throw new Error('`propertiesObj` was not an object');
    }

    // Store reference to `this`
    var _this = this;

    // Return function that accepts `props` which should be an object
    return function (props) {

        // Pass `props` and `propertiesObj` to `validateProperties` and return the output
        return _this.validateProperties(props, propertiesObj);
    };
};

// Method: validateProperties
PropertyValidator.prototype.validateProperties = function (passedProps, propRules) {
    'use strict';

    // `passedProps` is not an object
    if (!this.isObject(passedProps)) {

        // Throw error
        throw new Error('`passedProps` was not an object');
    }

    // Object to hold validated properties
    var validatedProperties = {};

    // Store keys for `propRules`
    var propRulesKeys = Object.keys(propRules);

    // Iterate over `propRulesKeys`
    for (var i = 0; i < propRulesKeys.length; i++) {

        // Store current prop rules, name and value
        var currentPropRules = propRules[propRulesKeys[i]];
        var currentPropName = propRulesKeys[i];
        var currentPropValue = passedProps[currentPropName];

        // Required properties weren't passed
        if (typeof currentPropRules.required !== 'undefined' && this.isUndefined(currentPropValue)) {

            // Throw error
            throw new Error('`' + currentPropName + '` is required');
        }

        // Property has a default, but hasn't been set
        if (typeof currentPropRules.default !== 'undefined' && this.isUndefined(currentPropValue)) {

            // Set the default
            currentPropValue = currentPropRules.default;
        }

        // `type` is `custom`
        if (currentPropRules.type === 'custom') {

            // `validateFn` was not passed
            if (this.isUndefined(currentPropRules.validateFn)) {

                // Throw error
                throw new Error('`' + currentPropName + '` has a `type` of `custom` but `validateFn` was not passed');
            }

            // `validateFn` is not a function
            else if (!this.isFunction(currentPropRules.validateFn)) {

                // Throw error
                throw new Error('`' + currentPropName + '`\'s `validateFn` is not a function');
            }

            // `currentPropValue` didn't pass the custom validation
            else if (!currentPropRules.validateFn(currentPropValue)) {

                // Throw error
                throw new Error('`' + currentPropName + '` of ' + currentPropValue + ' did not pass custom validation');
            }
        }

        // `type` is not `any`
        else if (currentPropRules.type !== 'any') {

            // Property is not the correct type
            if (!this['is' + this.titleCase(currentPropRules.type)](currentPropValue)) {

                // Throw error
                throw new Error('`' + currentPropName + '` of ' + currentPropValue + ' is not ' + currentPropRules.type);
            }
        }

        // Add `currentPropName` and `currentPropValue` to `validatedProperties`
        validatedProperties[currentPropName] = currentPropValue;
    }

    // Return `validatedProperties`
    return validatedProperties;
};

// Method: isArray
PropertyValidator.prototype.isArray = function (arr) {
    'use strict';

    return Object.prototype.toString.call(arr) === '[object Array]';
};

// Method: isBoolean
PropertyValidator.prototype.isBoolean = function (bool) {
    'use strict';

    return typeof bool === 'boolean';
};

// Method: isDate
PropertyValidator.prototype.isDate = function (date) {
    'use strict';

    return Object.prototype.toString.call(date) === '[object Date]';
};

// Method: isElement
PropertyValidator.prototype.isElement = function (el) {
    'use strict';

    return el instanceof HTMLElement;
};

// Method: isFunction
PropertyValidator.prototype.isFunction = function (fn) {
    'use strict';

    return typeof fn === 'function';
};

// Method: isNumber
PropertyValidator.prototype.isNumber = function (num) {
    'use strict';

    return typeof num === 'number';
};

// Method: isObject
PropertyValidator.prototype.isObject = function (obj) {
    'use strict';

    return Object.prototype.toString.call(obj) === '[object Object]';
};

// Method: isString
PropertyValidator.prototype.isString = function (str) {
    'use strict';

    return typeof str === 'string';
};

// Method: isUndefined
PropertyValidator.prototype.isUndefined = function (prop) {
    'use strict';

    return typeof prop === 'undefined';
};

// Method: titleCase
PropertyValidator.prototype.titleCase = function (str) {
    'use strict';

    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Export `PropertyValidator`
module.exports = PropertyValidator;
