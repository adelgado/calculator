console.log('Initializing...')

require('../node_modules/normalize.css/normalize.css')
require('./calculator.styl')

/* TODO

- Break up into different files

*/

class View {
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
      this[elementName] = document.querySelector(elements[elementName])
    }
  }

  setupEvents () {
    const events = this.events()

    for (let eventString in events) {
      const parts = eventString.split(' ')

      const eventName = parts[0]
      const elementName = parts[1]

      const element = this[elementName]
      const methodHandle = this[events[eventString]]

      debugger

      element.addEventListener(eventName, methodHandle)
    }
  }
}


class CalculatorView extends View {

  constructor ($element) {
    super($element)

    this.$clear.addEventListener('click', this.clear.bind(this))
  }

  elements () {
    return {
      '$clear'   : '[data-function="clear"]',
      '$display' : '.calculator__display'
    }
  }

  events () {
    return {
      'click $clear': 'clear'
    }
  }

  clear () {
    this.$display.value = ''
  }

}

view = new CalculatorView(document.querySelector('.calculator'))
