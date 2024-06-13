function toAdd(a, b) {
    total = parseFloat(a) + parseFloat(b);
    getTotal();
}

function toSubtract(a, b) {
    total = parseFloat(a) - parseFloat(b);
    getTotal();
}

function toMultiply(a, b) {
    total = parseFloat(a) * parseFloat(b);
    getTotal();
}

function toDivide(a, b) {
    total = parseFloat(a) / parseFloat(b);
    getTotal();
}

function toPercent(a) {
    return (total = Math.floor(a * 0.01 * 100) / 100);
}

function getTotal() {
    if (total > 999999999999 || total < -999999999999) {
        return (firstDigit.innerHTML = total.toExponential(7));
    } else {
        return (firstDigit.innerHTML = parseFloat(total.toFixed(2)));
    }
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
const secondDigit = document.createElement("div");
secondDigit.classList.add("second-num");
const operatorDiv = document.createElement("div");
operatorDiv.classList.add("operator");
const resultDiv = document.querySelector(".result");
resultDiv.appendChild(operatorDiv);
resultDiv.appendChild(secondDigit);

function getFirstDigit(event) {
    if (firstDigit.innerHTML.includes(".") === true && event == ".") {
        firstDigit.innerHTML += "";
    } else if (event == "." && firstDigit.innerHTML === "") {
        firstDigit.innerHTML = 0 + event;
    } else if (operatorDiv.innerHTML === "" && total === undefined) {
        if (firstDigit.innerHTML.replace(".", "").length > 13) {
            firstDigit.innerHTML += "";
        } else {
            firstDigit.innerHTML += event;
        }
    }

    if (firstDigit.innerHTML == "") {
        firstNum = 0;
    } else {
        firstNum = firstDigit.innerHTML;
    }
}

function getSecondDigit(event) {
    if (secondDigit.innerHTML.includes(".") === true && event == ".") {
        secondDigit.innerHTML += "";
    } else if (event == "." && secondDigit.innerHTML === "") {
        secondDigit.innerHTML = 0 + event;
    } else {
        if (secondDigit.innerHTML.replace(".", "").length > 13) {
            secondDigit.innerHTML += "";
        } else {
            secondDigit.innerHTML += event;
        }
    }
    secondNum = secondDigit.innerHTML;
}

function getOperator(event) {
    if (secondDigit.innerHTML == "") {
        if (firstNum === "0.") {
            firstDigit.innerHTML = 0;
        }
        if (event == "*") {
            operatorDiv.innerHTML = "x";
        } else if (event == "/") {
            operatorDiv.innerHTML = "÷";
        } else {
            operatorDiv.innerHTML = event;
        }
        operator = operatorDiv.innerHTML;
    } else if (operator != undefined) {
        firstDigit.innerHTML = "";
        secondDigit.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(firstNum, operator, secondNum);
        if (event == "*") {
            operatorDiv.innerHTML = "x";
        } else if (event == "/") {
            operatorDiv.innerHTML = "÷";
        } else {
            operatorDiv.innerHTML = event;
        }
        operator = operatorDiv.innerHTML;
        firstNum = total;
        secondNum = 0;
    }
}

function getReset() {
    firstDigit.innerHTML = "";
    secondDigit.innerHTML = "";
    operatorDiv.innerHTML = "";
    operator = undefined;
    firstNum = 0;
    secondNum = 0;
    total = undefined;
    document.querySelectorAll(".ops").forEach((operatorDisabled) => {
        operatorDisabled.disabled = false;
    });
}

function getEqual() {
    firstDigit.style.fontSize = "50px";
    if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        total == undefined
    ) {
        firstDigit.innerHTML = parseFloat(firstNum);
    } else if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML != "" &&
        secondDigit.innerHTML == ""
    ) {
        operatorDiv.innerHTML = "";
    } else if (operatorDiv.innerHTML == "" && secondDigit.innerHTML == "") {
        secondDigit.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(total, operator, secondNum);
    } else {
        secondDigit.innerHTML = "";
        operatorDiv.innerHTML = "";
        operate(firstNum, operator, secondNum);
    }
}

function toDelete() {
    if (
        firstDigit.innerHTML != "" &&
        operatorDiv.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        isNaN(firstDigit.innerHTML) == false &&
        firstDigit.innerHTML != Infinity &&
        total == undefined
    ) {
        firstDigit.innerHTML = firstDigit.innerHTML.slice(0, -1);
        firstNum = firstDigit.innerHTML;
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

function getPercent() {
    if (
        operatorDiv.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        total == undefined
    ) {
        firstDigit.innerHTML = toPercent(firstNum);
        firstNum = firstDigit.innerHTML;
    } else if (
        operatorDiv.innerHTML == "" &&
        secondDigit.innerHTML == "" &&
        total != undefined
    ) {
        firstDigit.innerHTML = toPercent(total);
        total = firstDigit.innerHTML;
    } else if (operatorDiv.innerHTML != "" && secondDigit.innerHTML != "") {
        secondDigit.innerHTML = toPercent(secondNum);
        secondNum = secondDigit.innerHTML;
    }
}

function getNan(event) {
    if (isNaN(event) == true && event != "Escape") {
        operatorDiv.innerHTML = "";
    }
    document.querySelectorAll(".ops").forEach((operatorDisabled) => {
        operatorDisabled.disabled = true;
    });
}

const divButtons = document.querySelectorAll(".buttons");
divButtons.forEach((button) => {
    button.addEventListener("click", () => {

        button.blur();

        let buttonResult = button.innerHTML;

        // getFirstDigit

        if (isNaN(parseFloat(buttonResult)) === false || buttonResult == ".") {
            getFirstDigit(buttonResult);
        }

        // getOperator

        if (
            (isNaN(parseFloat(buttonResult)) === true && buttonResult == "+") ||
            buttonResult == "-" ||
            buttonResult == "x" ||
            buttonResult == "÷"
        ) {
            getOperator(buttonResult);
        }

        // getSecondDigit

        if (
            (isNaN(parseFloat(buttonResult)) === false || buttonResult == ".") &&
            operatorDiv.innerHTML != ""
        ) {
            getSecondDigit(buttonResult);
        }

        // getReset

        if (buttonResult == "C") {
            getReset();
        }

        // getEqual

        if (buttonResult == "=") {
            getEqual();
        }

        // toDelete

        if (buttonResult == "CE") {
            toDelete();
        }

        // toPercent

        if (buttonResult == "%") {
            getPercent();
        }

        // getNaN or Inifinity

        if (firstDigit.innerHTML == Infinity || firstDigit.innerHTML == "NaN") {
            getNan();
        }

        // make firstDigit size larger

        if (secondDigit.innerHTML.length > 0) {
            firstDigit.style.fontSize = "35px";
            operatorDiv.style.fontSize = "30px";
        } else {
            firstDigit.style.fontSize = "50px";
            operatorDiv.style.fontSize = "40px";
        }
    });
});

document.addEventListener(
    "keydown",
    (keyboard = (press) => {
        let keyPress = press.key;

        if (
            secondDigit.innerHTML <= 0 &&
            operatorDiv.innerHTML.length > 0 &&
            (isNaN(keyPress) == false || keyPress == ".")
        ) {
            firstDigit.style.fontSize = "35px";
            operatorDiv.style.fontSize = "30px";
        } else if (
            (keyPress == "+" ||
                keyPress == "-" ||
                keyPress == "*" ||
                keyPress == "/") &&
            firstDigit.innerHTML.length >= 0 &&
            operatorDiv.innerHTML.length >= 0 &&
            secondDigit.innerHTML.length >= 0
        ) {
            firstDigit.style.fontSize = "50px";
            operatorDiv.style.fontSize = "40px";
        }

        // getFirstDigit
        if (isNaN(parseFloat(keyPress)) === false || keyPress == ".") {
            getFirstDigit(keyPress);
        }

        // getOperator
        if (
            (isNaN(parseFloat(keyPress)) === true && keyPress == "*") ||
            keyPress == "+" ||
            keyPress == "-" ||
            keyPress == "/"
        ) {
            getOperator(keyPress);
        }

        // getSecondDigit

        if (
            (isNaN(parseFloat(keyPress)) === false || keyPress == ".") &&
            operatorDiv.innerHTML != ""
        ) {
            getSecondDigit(keyPress);
        }

        // getReset

        if (keyPress === "Escape") {
            getReset();
        }

        // getEqual

        if (keyPress === "Enter") {
            getEqual();
        }

        // toDelete

        if (keyPress === "Backspace") {
            toDelete();
        }

        // toPercent

        if (keyPress == "%") {
            getPercent();
        }

        // getNaN or Inifinity

        if (firstDigit.innerHTML == Infinity || firstDigit.innerHTML == "NaN") {
            getNan(keyPress);
        }
    })
);
