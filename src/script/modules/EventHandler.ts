/**
 * Modules: Event Handler
 */
class EventHandler {
	events: {[x: string]: any}

	constructor () { this.events = {} }

	addEvent (name: string, type: any, el: any, fn: any) {
		let evt: any = void 0

		if (arguments.length > 1) evt = {name, element: el, type, function: fn}
		else evt = name

		const customEvent = Object.assign({}, evt)

		if (Object.prototype.hasOwnProperty.call(this.events, customEvent.name)) throw new Error(`\`name\` of \`${customEvent.name}\` is already in use`)

		customEvent.element.addEventListener(customEvent.type, customEvent.function)

		this.events[customEvent.name] = customEvent
	}

	removeEvent (eventName: string) {
		if (typeof this.events[eventName] === 'undefined') throw new Error(`There is no event named \`${eventName}\``)
		else {
			const customEvent = this.events[eventName]

			customEvent.element.removeEventListener(customEvent.type, customEvent.function)

			delete this.events[customEvent.name]
		}
	}

	removeEvents () {
		const eventNames = Object.keys(this.events)

		eventNames.forEach(eventName => { this.removeEvent(this.events[eventName].name) })
	}
}

export default EventHandler
