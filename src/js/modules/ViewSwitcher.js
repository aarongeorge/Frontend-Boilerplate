// Imports
import View from './View';

// Constructor: ViewSwitcher
const ViewSwitcher = function (options = {}) {

    // Defaults
    this.animationType = 'transitionDuration';
    this.transitionInDuration = 300;
    this.transitionOutDuration = 300;
    this.visibleClass = '-modal-visible';

    // Override defaults
    if (Object.keys(options).length) {
        for (const i in options) {
            if (Object.prototype.hasOwnProperty.call(options, i)) {
                this[i] = options[i];
            }
        }
    }

    // Other settings
    // State = ['closed', 'closing', 'open', 'opening']
    this.state = 'closed';
    this.views = {};

    // Call `createParentView`
    this.createParentView();
};

// Method: createParentView
ViewSwitcher.prototype.createParentView = () => {

    this.container = new View({
        'animationType': this.animationType,
        'element': this.element,
        'transitionInDuration': this.transitionInDuration,
        'transitionOutDuration': this.transitionOutDuration
    });
};

// Method: add
ViewSwitcher.prototype.add = (name, view) => {

    // Make sure `views[name]` doesn't already exist
    if (this.views[name] === undefined) {

        // Make sure `view` is an instance of `View`
        if (view instanceof View) {

            // Add `views[name]` to `views`
            this.views[name] = view;
        }

        // `view` is not an instance of `View`
        else {

            // Log error
            console.log(`${view} is not an instance of \`View\``);
        }
    }

    // `views[name]` already exists
    else {

        // Log error
        console.log(`${name} already exists`);
    }
};

// Method: remove
ViewSwitcher.prototype.remove = (name) => {

    // `views[name]` doesn't exist
    if (typeof this.views[name] === 'undefined') {

        // Log error
        console.log(`${name} doesn't exist`);
    }

    // Make sure `views[name]` exists
    else {
        // Remove `views[name]`
        delete this.views[name];
    }
};

// Method: open
ViewSwitcher.prototype.open = (name, cb = () => {}) => {

    // Make sure `views[name]` exists
    if (this.views[name] !== undefined) {

        // Store reference to `this`
        const _this = this;

        // Switch over `state`
        switch (this.state) {

            // Closed
            case 'closed': {

                // Set `state` to `opening`
                this.state = 'opening';

                // Add `visibleClass` class to `body`
                document.querySelector('body').classList.add(this.visibleClass);

                // Call `open` on `container`
                this.container.open(() => {

                    // Call `open` on `view[name]`
                    _this.views[name].open(() => {

                        // After `view[name]` has opened
                        // Set `state` to `open`
                        _this.state = 'open';

                        // Set `currentView` to `name`
                        _this.currentView = name;

                        // Set `data-view` to `name`
                        _this.container.element.setAttribute('data-current-view', name);

                        // Update `animationType`
                        _this.container.element.style[_this.animationType] = `${_this.transitionOutDuration}ms`;

                        // Call `cb`
                        cb();
                    });
                });

                break;
            }

            // Closing
            case 'closing': {

                break;
            }

            // Open
            case 'open': {

                // `name` is different to the `currentView`
                if (this.currentView !== name) {

                    // Set `state` to `closing`
                    this.state = 'closing';

                    // Call `close` on `view[currentView]`
                    this.views[this.currentView].close(() => {

                        // After `view[currentView]` has closed
                        // Set `state` to `closed`
                        _this.state = 'closed';

                        // Call `open` on `name`
                        _this.open(name, cb);
                    });
                }

                // `name` is the same as `currentView`
                else {

                    console.log('Open was called on the view already open');

                    // Do nothing

                }

                break;
            }

            // Opening
            case 'opening': {

                break;
            }
        }
    }

    // `views[name]` doesn't exist
    else {

        // Log error
        console.log(`${name} doesn't exist`);
    }
};

// Method: close
ViewSwitcher.prototype.close = function (name, cb) {


    // Check `cb` is a function
    cb = typeof cb === 'function' ? cb : function () {};

    // Store reference to `this`
    const _this = this;

    // Switch over `state`
    switch (this.state) {

        // Closed
        case 'closed': {

            // `state` is already `closed`
            console.log('`state` is already `closed`');

            // Call `cb`
            cb();

            break;
        }

        // Closing
        case 'closing': {

            break;
        }

        // Open
        case 'open': {

            // Check `name` was passed
            if (name !== undefined) {

                // Make sure `views[name]` exists
                if (this.views[name] !== undefined) {

                    // Make sure `views[name].state` is `open`
                    if (this.views[name].state === 'open') {

                        // Set `state` to `closing`
                        this.state = 'closing';

                        // Call `close` on `view[name]`
                        this.views[name].close(() => {

                            // Call `close` on `container`
                            _this.container.close(() => {

                                // Set `state` to `closed`
                                _this.state = 'closed';

                                // Set `currentView` to `undefined`
                                _this.currentView = undefined;

                                // Remove `visibleClass` class from `body`
                                document.querySelector('body').classList.remove(_this.visibleClass);

                                // Remove `data-view`
                                _this.container.element.removeAttribute('data-current-view');

                                // Update `animationType`
                                _this.container.element.style[_this.animationType] = `${_this.transitionInDuration}ms`;

                                // Call `cb`
                                cb();
                            });
                        });
                    }

                    // `views[name].state` isn't open
                    else {
                        console.log(`${this.views[name]} is not open`);
                    }
                }

                // `views[name]` doesn't exist
                else {

                    // Log error
                    console.log(`${name} doesn't exist`);
                }

            }

            // `name` wasn't passed
            else {

                // Set `state` to `closing`
                this.state = 'closing';

                // Call `close` on `views[currentView]`
                this.views[_this.currentView].close(() => {

                    // Call `close` on `container`
                    _this.container.close(() => {

                        // Set `state` to `closed`
                        _this.state = 'closed';

                        // Set `currentView` to `undefined`
                        _this.currentView = undefined;

                        // Remove `visibleClass` class from `body`
                        document.querySelector('body').classList.remove(_this.visibleClass);

                        // Remove `data-view`
                        _this.container.element.removeAttribute('data-current-view');

                        // Update `animationType`
                        _this.container.element.style[_this.animationType] = `${_this.transitionInDuration}ms`;

                        // Call `cb`
                        cb();
                    });
                });
            }

            break;
        }

        // Opening
        case 'opening': {

            break;
        }
    }
};

// Exports
module.exports = ViewSwitcher;
