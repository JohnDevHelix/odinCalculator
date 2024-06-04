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