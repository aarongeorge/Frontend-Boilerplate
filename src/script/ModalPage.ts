/**
 * Modal Page
 */

// Dependencies
import ViewSwitcher from './modules/ViewSwitcher'
import View from './modules/View'

const modalPage = function () {

    // Create viewSwitcher
    const viewSwitcher = new ViewSwitcher({
        element: document.querySelector('#global-overlay'),
        transitionInDuration: 0,
        transitionOutDuration: 0
    })

    // Create views
    const testViewOne = new View({
        element: document.querySelector('.testViewOne'),
        transitionInDuration: 300,
        transitionOutDuration: 300
    })
    const testViewTwo = new View({
        element: document.querySelector('.testViewTwo'),
        transitionInDuration: 300,
        transitionOutDuration: 300
    })

    // Add views to viewSwitcher
    viewSwitcher.add('testViewOne', testViewOne)
    viewSwitcher.add('testViewTwo', testViewTwo)

    // Click event handler
    const clickHandler = function (e: any) {

        // Prevent default
        e.preventDefault()

        // Get the params
        const params = e.currentTarget.getAttribute('data-action').split('|')

        // Call `viewSwitcher` with `params`
        viewSwitcher[params[0]](params[1])
    }

    document.addEventListener('click', e => {
        if (viewSwitcher.state !== 'closed' && viewSwitcher.state !== 'closing') {
            if (!(e.target as HTMLElement).closest('#global-overlay .modal')) {
                viewSwitcher.close()
            }
        }
    })

    // Get all buttons
    const buttons = document.querySelectorAll('[data-action]')

    // Loop over all the buttons
    for (let i = 0, j = buttons.length; i < j; i++) {
        buttons[i].addEventListener('click', clickHandler)
    }
}

export default modalPage
