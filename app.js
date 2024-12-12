
const OPERATORS = ['+', '-', '*', '/'];

/-------------------------------- Variables --------------------------------/

let currentOperand = ''; 
let previousOperand = ''; 
let operation = null; 

/------------------------ Cached Element References ------------------------/

const display = document.querySelector('.display'); 
const buttons = document.querySelectorAll('.button'); 

/----------------------------- Event Listeners -----------------------------/

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.innerText;
    handleButtonClick(value);
  });
});

/-------------------------------- Functions --------------------------------/


function updateDisplay() {
  display.innerText = currentOperand || '0'; 
}

function handleButtonClick(value) {
  if (!isNaN(value)) {
    currentOperand += value;
    updateDisplay();
  } else if (OPERATORS.includes(value)) {
    if (currentOperand === '') return; 
    if (previousOperand !== '') {
      calculate(); 
    }
    operation = value;
    previousOperand = currentOperand;
    currentOperand = ''; 
  } else if (value === '=') {
    calculate();
  } else if (value === 'C') {
    
    clear();
  }
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return; 

  let computation;
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = current !== 0 ? prev / current : 'Error'; 
      break;
    default:
      return;
  }

  currentOperand = computation.toString();
  operation = null;
  previousOperand = '';
  updateDisplay();
}


function clear() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

updateDisplay();