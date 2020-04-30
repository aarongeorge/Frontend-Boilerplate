// Imports
import View from './View'

// Constructor: ViewSwitcher
const ViewSwitcher = class {
    animationType: string
    transitionInDuration: number
    transitionOutDuration: number
    visibleClass: string
    state: 'closed' | 'closing' | 'open' | 'opening'
    views: any
    [x: string]: any

    constructor (options = {} as any) {

        // Defaults
        this.animationType = 'transitionDuration'
        this.transitionInDuration = 300
        this.transitionOutDuration = 300
        this.visibleClass = '-modal-visible'

        // Override defaults
        if (Object.keys(options).length) {
            for (const i in options) {
                if (Object.prototype.hasOwnProperty.call(options, i)) {
                    this[i] = options[i]
                }
            }
        }

        // Other settings
        // State = ['closed', 'closing', 'open', 'opening']
        this.state = 'closed'
        this.views = {}

        // Call `createParentView`
        this.createParentView()
    }

    // Method: createParentView
    createParentView () {
        this.container = new View({
            animationType: this.animationType,
            element: this.element,
            transitionInDuration: this.transitionInDuration,
            transitionOutDuration: this.transitionOutDuration
        })
    }

    // Method: add
    add (name: string, view: any) {
        if (this.views[name] === void 0) {
            if (view instanceof View) {
                this.views[name] = view
            }
            else {
                console.error(`${view} is not an instance of \`View\``)
            }
        }
        else {
            console.error(`${name} already exists`)
        }
    }

    // Method: remove
    remove (name: string) {
        if (typeof this.views[name] === 'undefined') {
            console.error(`${name} doesn't exist`)
        }
        else {
            delete this.views[name]
        }
    }

    // Method: open
    open (name: string, cb = () => {}) {
        if (this.views[name] === void 0) {
            console.error(`${name} doesn't exist`)
        }

        else {
            const _this = this

            switch (this.state) {
                case 'closed': {
                    this.state = 'opening'
                    document.querySelector('body').classList.add(this.visibleClass)
                    this.container.open(() => {
                        _this.views[name].open(() => {
                            _this.state = 'open'
                            _this.currentView = name
                            _this.container.element.setAttribute('data-current-view', name)
                            _this.container.element.style[_this.animationType] = `${_this.transitionOutDuration}ms`
                            return cb()
                        })
                    })
                    break
                }
                case 'open': {
                    if (this.currentView === name) {
                        console.log('Open was called on the view already open')
                    }
                    else {
                        this.state = 'closing'
                        this.views[this.currentView].close(() => {
                            _this.state = 'closed'
                            _this.open(name, cb)
                        })
                    }
                    break
                }
            }
        }
    }
    close (name?: string, cb = () => {}) {
        const _this = this

        switch (this.state) {
            case 'closed': {
                console.log('`state` is already `closed`')
                return cb()
            }
            case 'open': {
                if (name === void 0) {
                    this.state = 'closing'
                    this.views[_this.currentView].close(() => {
                        _this.container.close(() => {
                            _this.state = 'closed'
                            _this.currentView = void 0
                            document.querySelector('body').classList.remove(_this.visibleClass)
                            _this.container.element.removeAttribute('data-current-view')
                            _this.container.element.style[_this.animationType] = `${_this.transitionInDuration}ms`
                            return cb()
                        })
                    })
                }
                else if (this.views[name] === void 0) {
                    console.log(`${name} doesn't exist`)
                }
                else if (this.views[name].state === 'open') {
                    this.state = 'closing'
                    this.views[name].close(() => {
                        _this.container.close(() => {
                            _this.state = 'closed'
                            _this.currentView = void 0
                            document.querySelector('body').classList.remove(_this.visibleClass)
                            _this.container.element.removeAttribute('data-current-view')
                            _this.container.element.style[_this.animationType] = `${_this.transitionInDuration}ms`
                            return cb()
                        })
                    })
                }
                else {
                    console.log(`${this.views[name]} is not open`)
                }
                break
            }
        }
    }
}

// Export `ViewSwitcher`
export default ViewSwitcher
