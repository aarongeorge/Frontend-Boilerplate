/**
 * Modules: View
 */
const View = class {
	[x: string]: any

	constructor (options = {} as any) {
		this.animationType = 'transitionDuration'
		this.classes = {
			closed: '-closed',
			closing: '-closing',
			open: '-open',
			opening: '-opening'
		}
		this.transitionInDuration = 100
		this.transitionOutDuration = 100
		this.openingCallback = () => {}
		this.openCallback = () => {}
		this.closingCallback = () => {}
		this.closedCallback = () => {}

		for (const i in options) if (Object.prototype.hasOwnProperty.call(options, i)) this[i] = options[i]

		this.lastInteraction = 0
		this.state = 'closed'
		this.timeFromZero = 0
		this.viewElement = this.element

		this.viewElement.classList.add(this.classes.closed)

		this.viewElement.style[this.animationType] = `${this.transitionInDuration}ms`
	}

	open (cb = () => {}) {
		const _this = this

		switch (this.state) {
			case 'closed': {
				this.state = 'opening'
				this.timeFromZero = 0
				this.lastInteraction = window.performance.now()

				this.openingCallback()

				this.viewElement.style[this.animationType] = `${this.transitionInDuration}ms`

				this.viewElement.classList.remove(this.classes.closed)
				this.viewElement.classList.add(this.classes.opening)

				this.timeout = window.setTimeout(() => {
					_this.timeFromZero = _this.transitionOutDuration
					_this.state = 'open'

					_this.openCallback()
					_this.viewElement.classList.remove(_this.classes.opening)
					_this.viewElement.classList.add(_this.classes.open)

					return cb()

				}, this.transitionInDuration)

				break
			}

			case 'closing': {
				this.state = 'opening'

				window.clearTimeout(this.timeout)

				this.timeFromZero -= window.performance.now() - this.lastInteraction
				this.lastInteraction = window.performance.now()
				this.viewElement.style[this.animationType] = `${this.transitionDuration - this.timeFromZero}ms`

				this.viewElement.classList.remove(this.classes.closing)
				this.viewElement.classList.add(this.classes.opening)

				this.timeout = window.setTimeout(() => {
					_this.timeFromZero = _this.transitionDuration
					_this.state = 'open'

					_this.openCallback()
					_this.viewElement.classList.remove(_this.classes.opening)
					_this.viewElement.classList.add(_this.classes.open)

					return cb()

				}, this.transitionDuration - this.timeFromZero)

				break
			}

			case 'open': { return cb() }

			case 'opening': { break }

			default: { break }
		}
	}

	close (cb = () => {}) {
		const _this = this

		switch (this.state) {

			case 'closed': { return cb() }

			case 'closing': { break }

			case 'open': {
				this.state = 'closing'
				this.timeFromZero = this.transitionInDuration
				this.lastInteraction = window.performance.now()

				this.closingCallback()

				this.viewElement.style[this.animationType] = `${this.transitionOutDuration}ms`

				this.viewElement.classList.remove(this.classes.open)
				this.viewElement.classList.add(this.classes.closing)

				this.timeout = window.setTimeout(() => {
					_this.timeFromZero = 0
					_this.state = 'closed'

					_this.closedCallback()

					_this.viewElement.classList.remove(_this.classes.closing)
					_this.viewElement.classList.add(_this.classes.closed)

					return cb()

				}, this.transitionOutDuration)

				break
			}

			case 'opening': {
				this.state = 'closing'

				window.clearTimeout(this.timeout)

				this.timeFromZero += window.performance.now() - this.lastInteraction
				this.lastInteraction = window.performance.now()
				this.viewElement.style[this.animationType] = `${this.timeFromZero}ms`

				this.viewElement.classList.remove(this.classes.opening)
				this.viewElement.classList.add(this.classes.closing)

				this.timeout = window.setTimeout(() => {
					_this.timeFromZero = 0
					_this.state = 'closed'

					_this.closedCallback()

					_this.viewElement.classList.remove(_this.classes.closing)
					_this.viewElement.classList.add(_this.classes.closed)

					return cb()

				}, this.timeFromZero)

				break
			}

			default: { break }
		}
	}
}

export default View
