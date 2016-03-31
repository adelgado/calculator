export default class Calculator {

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
