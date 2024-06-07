function toAdd(a, b) {
  total = parseFloat(a) + parseFloat(b);
  return (firstDigit.innerHTML = parseFloat(total.toFixed(2)));
}

function toSubtract(a, b) {
  total = parseFloat(a) - parseFloat(b);
  return (firstDigit.innerHTML = parseFloat(total.toFixed(2)));
}

function toMultiply(a, b) {
  total = parseFloat(a) * parseFloat(b);
  return (firstDigit.innerHTML = parseFloat(total.toFixed(2)));
}

function toDivide(a, b) {
  total = parseFloat(a) / parseFloat(b);
  return (firstDigit.innerHTML = parseFloat(total.toFixed(2)));
}

function mouseToEnter(hover) {
  hover.target.style.backgroundColor = "#577b8d";
}

function mouseToLeave(hover) {
  hover.target.style.backgroundColor = "#344c64";
}

let firstNum = 0;
let operator;
let secondNum = 0;
let total;

function operate(numOne, opSign, numTwo) {
  if (opSign == "+") {
    return toAdd(numOne, numTwo);
  } else if (opSign == "-") {
    return toSubtract(numOne, numTwo);
  } else if (opSign == "x") {
    return toMultiply(numOne, numTwo);
  } else if (opSign == "÷") {
    return toDivide(numOne, numTwo);
  }
}

const firstDigit = document.querySelector(".first-num");
const secondDiv = document.createElement("div");
secondDiv.classList.add("second-num");
const operatorDiv = document.createElement("div");
operatorDiv.classList.add("operator");
const resultDiv = document.querySelector(".result");
resultDiv.appendChild(operatorDiv);
resultDiv.appendChild(secondDiv);

const divButtons = document.querySelectorAll(".buttons");
divButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const opButton = document.querySelector(".operator");
    const secondDigit = document.querySelector(".second-num");

    // getFirstDigit

    if (
      isNaN(parseFloat(button.innerHTML)) === false ||
      button.innerHTML == "."
    ) {
      if (
        firstDigit.innerHTML.includes(".") === true &&
        button.innerHTML == "."
      ) {
        firstDigit.innerHTML += "";
      } else if (button.innerHTML == "." && firstDigit.innerHTML === "") {
        firstDigit.innerHTML = 0 + button.innerHTML;
      } else if (opButton.innerHTML === "" && total === undefined) {
        if (firstDigit.innerHTML.replace(".", "").length > 14) {
          firstDigit.innerHTML += "";
        } else {
          firstDigit.innerHTML += button.innerHTML;
        }
      }
      if (firstDigit.innerHTML == "") {
        firstNum = 0;
      } else {
        firstNum = firstDigit.innerHTML;
      }
    }

    // getOperator

    if (
      isNaN(parseFloat(button.innerHTML)) === true &&
      button.innerHTML != "." &&
      button.innerHTML != "=" &&
      button.innerHTML != "CE" &&
      button.innerHTML != "C"
    ) {
      if (secondDigit.innerHTML == "") {
        if (firstNum === "0.") {
          firstDigit.innerHTML = 0;
        }
        opButton.innerHTML = button.innerHTML;
        operator = opButton.innerHTML;
      } else if (operator != undefined) {
        firstDigit.innerHTML = "";
        secondDiv.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(firstNum, operator, secondNum);
        opButton.innerHTML = button.innerHTML;
        operator = opButton.innerHTML;
        firstNum = total;
        secondNum = 0;
      }
    }

    // getSecondDigit

    if (
      (isNaN(parseFloat(button.innerHTML)) === false ||
        button.innerHTML == ".") &&
      opButton.innerHTML != ""
    ) {
      if (
        secondDiv.innerHTML.includes(".") === true &&
        button.innerHTML == "."
      ) {
        secondDigit.innerHTML += "";
      } else if (button.innerHTML == "." && secondDigit.innerHTML === "") {
        secondDigit.innerHTML = 0 + button.innerHTML;
      } else {
        if (secondDigit.innerHTML.replace(".", "").length > 14) {
          secondDigit.innerHTML += "";
        } else {
          secondDigit.innerHTML += button.innerHTML;
        }
      }
      secondNum = secondDiv.innerHTML;
    }

    // getReset

    if (button.innerHTML == "C") {
      firstDigit.innerHTML = "";
      secondDiv.innerHTML = "";
      operatorDiv.innerHTML = "";
      operator = undefined;
      firstNum = 0;
      secondNum = 0;
      total = undefined;
      document.querySelectorAll(".ops").forEach((operatorDisabled) => {
        operatorDisabled.disabled = false;
      });
    }

    // getEqual

    if (button.innerHTML == "=") {
      if (
        firstDigit.innerHTML != "" &&
        opButton.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        total == undefined
      ) {
        firstDigit.innerHTML = firstNum;
      } else if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML != "" &&
        secondDigit.innerHTML == ""
      ) {
        operatorDiv.innerHTML = "";
      } else if (opButton.innerHTML == "" && secondDigit.innerHTML == "") {
        secondDiv.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(total, operator, secondNum);
      } else {
        secondDiv.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(firstNum, operator, secondNum);
      }
    }

    // toDelete

    if (button.innerHTML == "CE") {
      if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        isNaN(firstDigit.innerHTML) == false &&
        firstDigit.innerHTML != Infinity &&
        total == undefined
      ) {
        firstDigit.innerHTML = firstDigit.innerHTML.slice(0, -1);
      } else if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML != "" &&
        secondDigit.innerHTML == ""
      ) {
        operatorDiv.innerHTML = operatorDiv.innerHTML.slice(0, -1);
      } else if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML != "" &&
        secondDigit.innerHTML != ""
      ) {
        secondDigit.innerHTML = secondDigit.innerHTML.slice(0, -1);
      }
    }

    // if Infinity or NaN

    if (firstDigit.innerHTML == Infinity || firstDigit.innerHTML == "NaN") {
      document.querySelectorAll(".ops").forEach((operatorDisabled) => {
        operatorDisabled.disabled = true;
      });
    }
  });
});
