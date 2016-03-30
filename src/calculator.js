console.log('Initializing...')

require('../node_modules/normalize.css/normalize.css')
require('./calculator.styl')

/* TODO

- Break up into different files
- Implement operation stack
x Make number buttons work
- Lmit input to numbers

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


class CalculatorView extends View {

  constructor ($element) {
    super($element)
  }

  elements () {
    return {
      '$clear'   : '[data-function="clear"]',
      '$number'  : '[data-function="number"]',
      '$display' : '.calculator__display'
    }
  }

  events () {
    return {
      'click $clear'  : 'clear',
      'click $number' : 'inputNumber'
    }
  }

  clear () {
    this.$display.value = ''
  }

  inputNumber (event) {
    const value = event.target.getAttribute('data-value')

    this.$display[0].innerHTML = `${this.$display[0].innerHTML}${value}`
  }

}

view = new CalculatorView(document.querySelector('.calculator'))
