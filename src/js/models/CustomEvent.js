/**
 * Models: Custom Event
 */

// Dependencies
var PropertyValidator = require('../modules/PropertyValidator');

// Constructor: CustomEvent
var CustomEvent = new PropertyValidator({

    // Name
    'name': {
        'type': 'string',
        'required': true
    },

    // Element
    'element': {
        'type': 'element',
        'required': true
    },

    // Type
    'type': {
        'type': 'string',
        'required': true
    },

    // Function
    'function': {
        'type': 'function',
        'required': true
    }
});

// Export `CustomEvent`
module.exports = CustomEvent;
