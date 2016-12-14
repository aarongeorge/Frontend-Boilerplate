/**
 * Modules: Event Handler
 */

// Dependencies
var CustomEvent = require('../models/CustomEvent');

// Constructor: EventHandler
var EventHandler = function () {
    'use strict';

    this.events = {};
};

// Method: addEvent
EventHandler.prototype.addEvent = function (name, type, el, fn) {
    'use strict';

    // `evt` will hold the final object
    var evt;

    // Passed individual params and not an object
    if (arguments.length > 1) {

        // Create the object
        evt = {
            'name': name,
            'element': el,
            'type': type,
            'function': fn
        };
    }

    // Passed object as first param
    else {

        // Set `evt` to `name`
        evt = name;
    }

    // Create new `CustomEvent`
    var customEvent = new CustomEvent(evt);

    // `name` already exists
    if (this.events.hasOwnProperty(customEvent.name)) {

        // Throw error
        throw new Error('`name` of `' + customEvent.name + '` is already in use');
    }

    // Add the listener to the element
    customEvent.element.addEventListener(customEvent.type, customEvent.function);

    // Add `customEvent` to `events`
    this.events[customEvent.name] = customEvent;
};

// Method: removeEvent
EventHandler.prototype.removeEvent = function (eventName) {
    'use strict';

    // `eventName` is undefined
    if (typeof this.events[eventName] === 'undefined') {

        // Throw error
        throw new Error('There is no event named `' + eventName + '`');
    }

    // `eventName` is defined
    else {

        // Store reference to `customEvent`
        var customEvent = this.events[eventName];

        // Remove the listener from the element
        customEvent.element.removeEventListener(customEvent.type, customEvent.function);

        // Remove `customEvent` from `events`
        delete this.events[customEvent.name];
    }
};

// Method: removeEvents
EventHandler.prototype.removeEvents = function () {
    'use strict';

    // Store reference to `this`
    var _this = this;

    // Get all event names from `events`
    var eventNames = Object.keys(this.events);

    // Iterate over `eventNames`
    eventNames.forEach(function (eventName) {

        // Store reference to `currentEvent`
        var customEvent = _this.events[eventName];

        // Remove `customEvent` from `events`
        _this.removeEvent(customEvent.name);
    });
};

// Export `EventHandler`
module.exports = EventHandler;
