/**
 * Modal Page
 */

// Dependencies
var ViewSwitcher = require('./modules/ViewSwitcher');
var View = require('./modules/View');

var ModalPage = function () {
    'use strict';

    // Create viewSwitcher
    var viewSwitcher = new ViewSwitcher({
        'element': document.querySelector('#global-overlay'),
        'transitionInDuration': 0,
        'transitionOutDuration': 0
    });

    // Create views
    var testViewOne = new View({
        'element': document.querySelector('.testViewOne'),
        'transitionInDuration': 300,
        'transitionOutDuration': 300
    });
    var testViewTwo = new View({
        'element': document.querySelector('.testViewTwo'),
        'transitionInDuration': 300,
        'transitionOutDuration': 300
    });

    // Add views to viewSwitcher
    viewSwitcher.add('testViewOne', testViewOne);
    viewSwitcher.add('testViewTwo', testViewTwo);

    // Click event handler
    var clickHandler = function (e) {

        // Prevent default
        e.preventDefault();

        // Get the params
        var params = e.currentTarget.getAttribute('data-action').split('|');

        // Call `viewSwitcher` with `params`
        viewSwitcher[params[0]](params[1]);
    };

    // Get all buttons
    var buttons = document.querySelectorAll('[data-action]');

    // Loop over all the buttons
    for (var i = 0, j = buttons.length; i < j; i++) {

        buttons[i].addEventListener('click', clickHandler.bind(this));
    }
};

module.exports = ModalPage;
