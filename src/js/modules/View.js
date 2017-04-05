// Constructor: View
var View = function (options) {
    'use strict';

    // Defaults
    this.animationType = 'transitionDuration';
    this.classes = {
        'closed': '-closed',
        'closing': '-closing',
        'open': '-open',
        'opening': '-opening'
    };
    this.transitionInDuration = 100;
    this.transitionOutDuration = 100;
    this.openingCallback = function () {};
    this.openCallback = function () {};
    this.closingCallback = function () {};
    this.closedCallback = function () {};

    // Set options
    options = typeof options === 'undefined' ? {} : options;

    // Override defaults
    if (Object.keys(options).length) {
        for (var i in options) {
            if (options.hasOwnProperty(i)) {
                this[i] = options[i];
            }
        }
    }

    // Other settings
    this.lastInteraction = 0;
    this.state = 'closed';
    this.timeFromZero = 0;
    this.timeout = undefined;
    this.viewElement = this.element;

    // Add `classes.closed` to `viewElement`
    this.viewElement.classList.add(this.classes.closed);

    // Update `animationType`
    this.viewElement.style[this.animationType] = this.transitionInDuration + 'ms';
};

// Method: open
View.prototype.open = function (cb) {
    'use strict';

    // Store reference to `this`
    var _this = this;

    // Check `cb` is a function
    cb = typeof cb === 'function' ? cb : function () {};

    // Switch over `state`
    switch (this.state) {

        // Closed
        case 'closed': {

            // Update `state`
            this.state = 'opening';

            // Update `timeFromZero`
            this.timeFromZero = 0;

            // Update `lastInteraction`
            this.lastInteraction = window.performance.now();

            // Call `openingCallback`
            this.openingCallback();

            // Update `animationType`
            this.viewElement.style[this.animationType] = this.transitionInDuration + 'ms';

            // Remove `classes.closed` class
            this.viewElement.classList.remove(this.classes.closed);

            // Add `classes.opening` class
            this.viewElement.classList.add(this.classes.opening);

            // Set a timeout for `transitionDuration`
            this.timeout = window.setTimeout(function () {

                // Update `timeFromZero`
                _this.timeFromZero = _this.transitionOutDuration;

                // Set `state` to `open`
                _this.state = 'open';

                // Call `openCallback`
                _this.openCallback();

                // Remove `classes.opening` class
                _this.viewElement.classList.remove(_this.classes.opening);

                // Add `classes.open` class
                _this.viewElement.classList.add(_this.classes.open);

                // Call `cb`
                cb();

            }, this.transitionInDuration);

            break;
        }

        // Closing
        case 'closing': {

            // Update `state`
            this.state = 'opening';

            // Clear timeout for `close`
            window.clearTimeout(this.timeout);

            // Update `timeFromZero`
            this.timeFromZero -= (window.performance.now() - this.lastInteraction);

            // Update `lastInteraction`
            this.lastInteraction = window.performance.now();

            // Update `animationType`
            this.viewElement.style[this.animationType] = this.transitionDuration - this.timeFromZero + 'ms';

            // Remove `classes.closing` class
            this.viewElement.classList.remove(this.classes.closing);

            // Add `classes.opening` class
            this.viewElement.classList.add(this.classes.opening);

            // Set a timeout for `transitionDuration`
            this.timeout = window.setTimeout(function () {

                // Update `timeFromZero`
                _this.timeFromZero = _this.transitionDuration;

                // Set `state` to `open`
                _this.state = 'open';

                // Call `openallback`
                _this.openCallback();

                // Remove `classes.opening` class
                _this.viewElement.classList.remove(_this.classes.opening);

                // Add `classes.open` class
                _this.viewElement.classList.add(_this.classes.open);

                // Call `cb`
                cb();

            }, this.transitionDuration - this.timeFromZero);

            break;
        }

        // Open
        case 'open': {

            // Already open so call `cb`
            cb();

            break;
        }

        // Opening
        case 'opening': {

            // Already opening so do nothing
            break;
        }
    }
};

// Method: close
View.prototype.close = function (cb) {
    'use strict';

    // Store reference to `this`
    var _this = this;

    // Check `cb` is a function
    cb = typeof cb === 'function' ? cb : function () {};

    // Switch over `state`
    switch (this.state) {

        // Closed
        case 'closed': {

            // Already closed so call `cb`
            cb();

            break;
        }

        // Closing
        case 'closing': {

            // Already closing so do nothing
            break;
        }

        // Open
        case 'open': {

            // Update `state`
            this.state = 'closing';

            // Update `timeFromZero`
            this.timeFromZero = this.transitionInDuration;

            // Update `lastInteraction`
            this.lastInteraction = window.performance.now();

            // Call `closingCallback`
            this.closingCallback();

            // Update `animationType`
            this.viewElement.style[this.animationType] = this.transitionOutDuration + 'ms';

            // Remove `classes.opening` class
            this.viewElement.classList.remove(this.classes.open);

            // Add `classes.closed` class
            this.viewElement.classList.add(this.classes.closing);

            // Set a timeout for `transitionDuration`
            this.timeout = window.setTimeout(function () {

                // Update `timeFromZero`
                _this.timeFromZero = 0;

                // Set `state` to `closed`
                _this.state = 'closed';

                // Call `closedCallback`
                _this.closedCallback();

                // Remove `classes.closing` class
                _this.viewElement.classList.remove(_this.classes.closing);

                // Add `classes.closed` class
                _this.viewElement.classList.add(_this.classes.closed);

                // Call `cb`
                cb();

            }, this.transitionOutDuration);

            break;
        }

        // Opening
        case 'opening': {

            // Update `state`
            this.state = 'closing';

            // Clear timeout for `open`
            window.clearTimeout(this.timeout);

            // Update `timeFromZero`
            this.timeFromZero += (window.performance.now() - this.lastInteraction);

            // Update `lastInteraction`
            this.lastInteraction = window.performance.now();

            // Update `animationType`
            this.viewElement.style[this.animationType] = this.timeFromZero + 'ms';

            // Remove `classes.opening` class
            this.viewElement.classList.remove(this.classes.opening);

            // Add `classes.closing` class
            this.viewElement.classList.add(this.classes.closing);

            // Set a timeout for `transitionDuration`
            this.timeout = window.setTimeout(function () {

                // Update `timeFromZero`
                _this.timeFromZero = 0;

                // Set `state` to `closed`
                _this.state = 'closed';

                // Call `closedCallback`
                _this.closedCallback();

                // Remove `classes.closing` class
                _this.viewElement.classList.remove(_this.classes.closing);

                // Add `classes.closed` class
                _this.viewElement.classList.add(_this.classes.closed);

                // Call `cb`
                cb();

            }, this.timeFromZero);

            break;
        }
    }
};

// Exports
module.exports = View;
