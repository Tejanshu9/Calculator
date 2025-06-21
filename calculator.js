// Arithmetic operations
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

function div(a, b) {
  return b !== 0 ? a / b : "Error";
}

function operator(op, a, b) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return sub(a, b);
    case "*":
      return mul(a, b);
    case "/":
      return div(a, b);
    case "%":
      return a % b;
    default:
      return "Error";
  }
}

let displayValue = "";
let expressionDisplayValue = "";
let firstNumber = null;
let currentOperator = null;
let resultDisplayed = false;

// Handle number buttons
document.querySelectorAll(".num-btn").forEach((button) => {
  button.addEventListener("click", () => {

    if (resultDisplayed) {
      displayValue = "";
      expressionDisplayValue = "";
      resultDisplayed = false;
    }

    displayValue += button.textContent;
    expressionDisplayValue += button.textContent;
    display.value = expressionDisplayValue;
  });
});

// Handle operator buttons
document.querySelectorAll(".op-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const op = btn.textContent;

    if (op === "=") {
      if (firstNumber !== null && currentOperator !== null && displayValue !== "") {
        const secondNumber = parseFloat(displayValue);
        const result = operator(currentOperator, firstNumber, secondNumber);

        displayValue = result.toString();
        expressionDisplayValue = displayValue;  // overwrite with result
        display.value = expressionDisplayValue;

        firstNumber = null;
        currentOperator = null;

        resultDisplayed = true;
      }

    } else {
      if (firstNumber !== null && currentOperator !== null && displayValue !== "") {
        const secondNumber = parseFloat(displayValue);
        let result = operator(currentOperator, firstNumber, secondNumber);
        if (typeof result === "number") result = parseFloat(result.toFixed(6)); // Round
        firstNumber = result;
        currentOperator = op;
        displayValue = "";
        expressionDisplayValue = firstNumber + op;
        display.value = expressionDisplayValue;
      } else if (displayValue !== "") {
        firstNumber = parseFloat(displayValue);
        currentOperator = op;
        expressionDisplayValue += op;
        displayValue = "";
        display.value = expressionDisplayValue;
      }
    }



  });
});

// Handle function buttons
document.querySelectorAll(".func-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const func = btn.textContent;

    if (func === ".") {
      // Prevent multiple dots in the same number
      if (!displayValue.includes(".")) {
        displayValue += ".";
        expressionDisplayValue += ".";
        display.value = expressionDisplayValue;
      }
    } else if (func === "C") {
      // Clear all
      displayValue = "";
      expressionDisplayValue = "";
      firstNumber = null;
      currentOperator = null;
      display.value = "";
    } else if (func === "<----") {
      // Backspace (delete last character)
      if (displayValue.length > 0) {
        displayValue = displayValue.slice(0, -1);
      }
      if (expressionDisplayValue.length > 0) {
        expressionDisplayValue = expressionDisplayValue.slice(0, -1);
      }
      display.value = expressionDisplayValue;
    }
  });
});
