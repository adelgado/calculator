console.log('Initializing...')

require('../node_modules/normalize.css/normalize.css')
require('./calculator.styl')

import Calculator from './Calculator'
import View from './View'
import CalculatorView from './CalculatorView'

/* TODO
- Break up into different files
- Implement operation stack
x Make number buttons work
- Lmit input to numbers
- Implement floating points
*/

new CalculatorView(
  document.querySelector('.calculator'),
  new Calculator()
)
