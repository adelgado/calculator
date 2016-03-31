export default class CalculatorView extends View {

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
