function toAdd(a, b) {
    total = parseFloat(a) + parseFloat(b);
    return firstDigit.innerHTML = total;
}

function toSubtract(a, b) {
    total = parseFloat(a) - parseFloat(b);
    return firstDigit.innerHTML = total;
}

function toMultiply(a, b) {
    total = parseFloat(a) * parseFloat(b);
    return firstDigit.innerHTML = total;
}

function toDivide(a, b) {
    total = parseFloat(a) / parseFloat(b);
    return firstDigit.innerHTML = total;
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

        if ((isNaN(parseFloat(button.innerHTML)) === false || button.innerHTML == ".") && opButton.innerHTML === "") {
            if (firstDigit.innerHTML.includes(".") === true && button.innerHTML == ".") {
                firstDigit.innerHTML += "";
            } else {
                firstDigit.innerHTML += button.innerHTML;
            }
            firstNum = firstDigit.innerHTML;
        }

        else if ((isNaN(parseFloat(button.innerHTML)) === true && button.innerHTML != "." && button.innerHTML != "=") && button.innerHTML != "C") {
            if (operator === undefined) {
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

        else if ((isNaN(parseFloat(button.innerHTML)) === false || button.innerHTML == ".") && opButton.innerHTML != "") {
            if (secondDiv.innerHTML.includes(".") === true && button.innerHTML == ".") {
                firstDigit.innerHTML += "";
            } else { secondDigit.innerHTML += button.innerHTML; }
            secondNum = secondDiv.innerHTML;
        }

        else if (button.innerHTML == "C") {
            firstDigit.innerHTML = "";
            secondDiv.innerHTML = "";
            operatorDiv.innerHTML = "";
            operator = undefined;
            firstNum = 0;
            secondNum = 0;
            total = undefined;
        }


        if (button.innerHTML == "=" && total === undefined) {
            firstDigit.innerHTML = "";
            secondDiv.innerHTML = "";
            operatorDiv.innerHTML = "";
            operate(firstNum, operator, secondNum);
            operator = undefined;
            firstNum = total;
            secondNum = 0;
        } else if (button.innerHTML == "=" && total != undefined) {
            firstDigit.innerHTML = "";
            secondDiv.innerHTML = "";
            operatorDiv.innerHTML = "";
            operate(total, operator, secondNum);
            operator = undefined;
            firstNum = total;
            secondNum = 0;
        }
    });
});