let currentNum = '';
let previousNum = '';
let operator = '';

const currentDisplayNum = document.querySelector('.currentNum');
const previousDisplayNum = document.querySelector('.previousNum');

const equal = document.querySelector('.equal');
const decimal = document.querySelector('.decimal');
const clear = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

// Event Listeners
window.addEventListener('keydown', handleKeyPress);

equal.addEventListener('click', () => {
    if (currentNum !== '' && previousNum !== ""){
        calculate();
    }
});


decimal.addEventListener('click', () => {
    addDecimal();
});

clear.addEventListener('click', clearCalc);

deleteBtn.addEventListener('click', handleDelete);


// forEach - buttons
numberBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleNumber(e.target.textContent)
    });
});


operatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        handleOperator(e.target.textContent);
    });
});


/* Functions */

// Numbers
function handleNumber(number) {
    if(previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = '';
        currentDisplayNum.textContent = currentNum;
    }
    if (currentNum.length <= 12) {
        currentNum += number;
        currentDisplayNum.textContent = currentNum;
    } 
}

// Operators
function handleOperator(op) {
    if (previousNum === ''){
    previousNum = currentNum;
    checkOperator(op);
    } else if (currentNum === ""){
        checkOperator(op);
    } else {
        calculate();
        operator = op;
        currentDisplayNum.textContent = "0";
        previousDisplayNum.textContent = previousNum + " " + operator;
    }
    
}

function checkOperator(text) {
    operator = text;
    previousDisplayNum.textContent = previousNum + " " + operator;
    currentDisplayNum.textContent = "0";
    currentNum = "";
}

// Calculations
function calculate() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if(operator === "+") {
        previousNum += currentNum;
    } else if(operator === '-') {
        previousNum -= currentNum;
    } else if (operator === '*'){
        previousNum *= currentNum;
    } else if (operator === "/") {
        if (currentNum <= 0) {
            previousNum = 'Error';
            displayResults();
            return;
        }
        previousNum /= currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResults();

}

// Rounding a number
function roundNumber(num) {
    return Math.round(num *  100000) /  100000;
}

// Display results
function displayResults() {
    if (previousNum. length <= 12) {
        currentDisplayNum.textContent = previousNum;
    } else {
        currentDisplayNum.textContent = previousNum.slice(0, 12) + "...";
    }
    previousDisplayNum.textContent = '';
    operator = '';
    currentNum = '';
}

// Clear calculator
function clearCalc(){
    currentNum = '';
    previousNum = '';
    operator = '';
    currentDisplayNum.textContent = '0';
    previousDisplayNum.textContent = '';
}

// Adding decimal
function addDecimal(){
    if(!currentNum.includes('.')) {
        currentNum += '.';
        currentDisplayNum.textContent = currentNum;
    }
}

// Keyboard support
function handleKeyPress(e) {
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9) {
      handleNumber(e.key);
    }
    if (
      e.key === "Enter" ||
      (e.key === "=" && currentNum != "" && previousNum != "")
    ) {
      calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
      handleOperator(e.key);
    }
    if (e.key === "*") {
      handleOperator(e.key);
    }
    if (e.key === ".") {
      addDecimal();
    }
    if (e.key === "Backspace") {
      handleDelete();
    }
  }


  // Delete function
function handleDelete(){
    if (currentNum !== "") {
        currentNum = currentNum.slice(0, -1);
        currentDisplayNum.textContent = currentNum;
        if(currentNum === ""){
            currentDisplayNum.textContent = "0";
        }
     
    }

    if(currentNum === "" && previousNum !== "" && operator === ""){
        previousNum = previousNum.slice(0, -1);
        currentDisplayNum.textContent = previousNum;
    }  

    
}