var calculator = document.querySelector('.calculator');
var display = calculator.querySelector('.calculator-screen');
var keys = calculator.querySelector('.calculator-keys');

keys.addEventListener('click', function (e) {
  if (!e.target.matches('button')) return;
  var key = e.target;
  var displayedNum = display.textContent;
  var resultString = getResultString(key, displayedNum, calculator.dataset);

  display.textContent = resultString;
  updateCalculatorState(key, calculator, resultString, displayedNum);
  updateVisualState(key, calculator);
});

//Method to calculate operands with operator
function calculate(num1, operator, num2) {
  var firstNumber = parseFloat(num1);
  var secondNumber = parseFloat(num2);
  switch(operator) {
    case 'add':
      return firstNumber + secondNumber;
    case 'subtract':
      return firstNumber - secondNumber;
    case 'multiply':
      return firstNumber * secondNumber;
    case 'divide':
      return firstNumber / secondNumber;
    default:
      break;
  }
}

//Method to get key type
function getKeyType(key) {
  var action = key.dataset.action;
  if (!action) {
    return 'number';
  }
  switch(action) {
  case 'add':
  case 'subtract':
  case 'multiply':
  case 'divide':
    return 'operator';
  default:
    return action;
  } 
}

//Method to perform operation and get the result string
function getResultString(key, displayedNum, state) {
  var keyContent = key.textContent;
  var keyType = getKeyType(key);

  var firstValue = state.firstValue;
  var operator = state.operator;
  var modValue = state.modValue;
  var previousKeyType = state.previousKeyType;

  if (keyType === 'number') {
    return displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate' ?
      keyContent :
      displayedNum + keyContent;
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) return displayedNum + '.';
    if (previousKeyType === 'operator' || previousKeyType === 'calculate') return '0.';
    return displayedNum;
  }

  if (keyType === 'operator') {
    return firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate' ?
      calculate(firstValue, operator, displayedNum) :
      displayedNum;
  }

  if (keyType === 'clear') {
    return 0;
  }

  if (keyType === 'calculate') {
    return firstValue ?
      previousKeyType === 'calculate' ?
        calculate(displayedNum, operator, modValue) :
        calculate(firstValue, operator, displayedNum) :
      displayedNum;
  }
}

function updateCalculatorState(key, calculator, calculatedValue, displayedNum) {
  var keyType = getKeyType(key);
  var _calculator$dataset = calculator.dataset;
  var firstValue = _calculator$dataset.firstValue;
  var operator = _calculator$dataset.operator;
  var modValue = _calculator$dataset.modValue;
  var previousKeyType = _calculator$dataset.previousKeyType;
  calculator.dataset.previousKeyType = keyType;

  if (keyType === 'operator') {
    calculator.dataset.operator = key.dataset.action;
    calculator.dataset.firstValue = firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate' ?
      calculatedValue :
      displayedNum;
  }

  if (keyType === 'calculate') {
    calculator.dataset.modValue = firstValue && previousKeyType === 'calculate' ?
      modValue :
      displayedNum;
  }

  if (keyType === 'clear' && key.textContent === 'AC') {
    calculator.dataset.firstValue = '';
    calculator.dataset.modValue = '';
    calculator.dataset.operator = '';
    calculator.dataset.previousKeyType = '';
  }
}

function updateVisualState(key, calculator) {
  var keyType = getKeyType(key);
  Array.from(key.parentNode.children).forEach(function (k) {
    return k.classList.remove('is-depressed');
  });

  if (keyType === 'operator') {
    key.classList.add('is-depressed');
  }
  if (keyType === 'clear' && key.textContent !== 'AC') {
    key.textContent = 'AC';
  }
  if (keyType !== 'clear') {
    var clearButton = calculator.querySelector('[data-action=clear]');
    clearButton.textContent = 'CE';
  }
}