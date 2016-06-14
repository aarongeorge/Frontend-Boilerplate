/**
 * Main
 */

window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    console.log('Loaded');

    switch (document.location.pathname) {

        // Modal page
        case '/modal.html': {

            // Call `ModalPage`
            require('./ModalPage.js')();
            break;
        }

        // Any other page
        default: {
            console.log('Hello world :)');

            break;
        }
    }
});
