/**
 * Main
 */

// Dependencies
import modal from './pages/modal';

window.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded');

    switch (document.location.pathname) {

        // Modal page
        case '/modal.html': {

            // Call `ModalPage`
            modal();
            break;
        }

        // Any other page
        default: {
            console.log('Hello world :)');
            break;
        }
    }
});
