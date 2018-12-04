/**
 * Main
 */

// Dependencies
import modalPage from './ModalPage';

window.addEventListener('DOMContentLoaded', () => {
    console.log('Loaded');

    switch (document.location.pathname) {

        // Modal page
        case '/modal.html': {

            // Call `ModalPage`
            modalPage();
            break;
        }

        // Any other page
        default: {
            console.log('Hello world :)');
            break;
        }
    }
});
