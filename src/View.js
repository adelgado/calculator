export default class View {

  constructor ($element) {
    this.$element = $element

    this.setupElements()
    this.setupEvents()
  }

  elements () { return {} }
  events   () { return {} }

  setupElements () {
    const elements = this.elements()

    for (let elementName in elements) {
      this[elementName] = document.querySelectorAll(elements[elementName])
    }
  }

  setupEvents () {
    const events = this.events()

    for (let eventString in events) {
      const parts = eventString.split(' ')

      const eventName = parts[0]
      const elementName = parts[1]

      const nodeList = this[elementName]
      const methodHandle = this[events[eventString]]

      for (let i = 0; i < nodeList.length; ++i) {
        let node = nodeList[i]
        node.addEventListener(eventName, methodHandle.bind(this))
      }
    }
  }

}
