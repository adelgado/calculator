console.log('Initializing...')

require('../node_modules/normalize.css/normalize.css')
require('./calculator.styl')

/* TODO

- Break up into different files
- Implement operation stack
x Make number buttons work
- Lmit input to numbers
- Implement floating points

*/

class Calculator {

  constructor () {
    this._stack = []

    // // FIXME: Use bound functions
    this.number = this.number.bind(this)
    this.addition = this.addition.bind(this)
    this.equals = this.equals.bind(this)
  }


  number (number) {
    this._stack.push(parseInt(number, 10))
  }

  addition (value) {
    let numberValue = parseInt(value, 10)
    debugger

    let stackTop = this._peekStack()

    if (this._hasNumberOnTopOfStack()) {
      let number = this._popStack()

      let result = number + numberValue

      this.number(result)

      return result
    } else {
      this.number(numberValue)

      return null
    }
  }

  equals () {
    debugger
  }

  _hasNumberOnTopOfStack () {
    return typeof this._stack[this._stack.length - 1] === "number"
  }

  _popStack () {
    return this._stack.pop()
  }

  _peekStack () {
    return this._stack[this._stack.length - 1]
  }

}

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

  constructor ($element, calculator) {
    super($element)

    this._calculator = calculator
  }

  elements () {
    return {
      '$clear'      : '[data-function="clear"]',
      '$number'     : '[data-function="number"]',
      '$display'    : '.calculator__display',
      '$operation'  : '[data-function="operation"]'
    }
  }

  events () {
    return {
      'click $clear'        : 'clear',
      'click $number'       : 'inputNumber',
      'click $operation'    : 'performOperation'
    }
  }

  clear () {
    this.$display[0].value = ''
  }

  getDisplay () {
    return this.$display[0].innerHTML
  }

  setDisplay (value) {
    this.$display[0].innerHTML = value
  }

  inputNumber (event) {
    const value = event.target.getAttribute('data-value')
    this.setDisplay(`${this.getDisplay()}${value}`)
  }

  performOperation (event) {
    // const value = event.target.getAttribute('data-operation')
    const value = '+' //FIXME

    let method

    switch (value) {
      case '+':
        method = this._calculator.addition
        break

      case '-':
        method = this._calculator.subtraction
        break

      case '/':
        method = this._calculator.division
        break

      case 'x':
        method = this._calculator.multiplication
        break

      case '=':
        method = this._calculator.equals
        break
    }

    let currentValue = this.getDisplay()
    let nextValue = method(currentValue)

    this.setDisplay(nextValue)
  }

}

view = new CalculatorView(
  document.querySelector('.calculator'),
  new Calculator()
)
