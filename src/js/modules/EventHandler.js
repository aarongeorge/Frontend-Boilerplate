/**
 * Modules: Event Handler
 */

// Constructor: EventHandler
class EventHandler {

    // Constructor
    constructor () {

        // Object to store `events`
        this.events = {};
    }

    // Method: addEvent
    addEvent (name, type, el, fn) {

        // `evt` will hold the final object
        let evt = void 0;

        // Passed individual params and not an object
        if (arguments.length > 1) {

            // Create the object
            evt = {
                name,
                'element': el,
                type,
                'function': fn
            };
        }

        // Passed object as first param
        else {

            // Set `evt` to `name`
            evt = name;
        }

        // Create new `CustomEvent`
        const customEvent = Object.assign({}, evt);

        // `name` already exists
        if (Object.prototype.hasOwnProperty.call(this.events, customEvent.name)) {

            // Throw error
            throw new Error(`\`name\` of \`${customEvent.name}\` is already in use`);
        }

        // Add the listener to the element
        customEvent.element.addEventListener(customEvent.type, customEvent.function);

        // Add `customEvent` to `events`
        this.events[customEvent.name] = customEvent;
    }

    // Method: removeEvent
    removeEvent (eventName) {

        // `eventName` is undefined
        if (typeof this.events[eventName] === 'undefined') {

            // Throw error
            throw new Error(`There is no event named \`${eventName}\``);
        }

        // `eventName` is defined
        else {

            // Store reference to `customEvent`
            const customEvent = this.events[eventName];

            // Remove the listener from the element
            customEvent.element.removeEventListener(customEvent.type, customEvent.function);

            // Remove `customEvent` from `events`
            delete this.events[customEvent.name];
        }
    }

    // Method: removeEvents
    removeEvents () {

        // Get all event names from `events`
        const eventNames = Object.keys(this.events);

        // Iterate over `eventNames`
        eventNames.forEach((eventName) => {

            // Store reference to `currentEvent`
            const customEvent = this.events[eventName];

            // Remove `customEvent` from `events`
            this.removeEvent(customEvent.name);
        });
    }
}

// Export `EventHandler`
export default EventHandler;
