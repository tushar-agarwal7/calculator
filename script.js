const numbers = document.querySelectorAll(".number");
const clear = document.querySelector(".clearall");
const answer = document.querySelector(".answer");
const equal = document.querySelector(".equal");
const back = document.querySelector(".back");
let clickText = [];

numbers.forEach((number) => {
    number.addEventListener("click", (e) => updateDisplay(e.target.textContent));
})
equal.addEventListener("click", () => updateDisplay("="));
clear.addEventListener("click", clearanswer);
back.addEventListener("click", backspace);

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
    return a / b;
}

function calculate(equation) {
    let inputString = equation.join('');
    let numberList = inputString.split(/[-+*/]/);
    let operands = getOperands(equation);
    let a = Number(numberList.shift());

    for (let operand of operands) {
        let b = Number(numberList.shift());

        switch (operand) {
            case '+':
                a = add(a, b);
                break;
            case '-':
                a = sub(a, b);
                break;
            case '*':
                a = mul(a, b);
                break;
            case '/':
                if (b === 0) {
                    alert("You cannot divide by zero");
                    return 'error';
                }
                a = div(a, b);
                break;
            default:
                return 'error';
        }
    }

    if (isNaN(a)) return 'error';
    return (Math.round(a * 100000000) / 100000000);
}

function updateDisplay(char) {
    if (char === "=") {
        answer.textContent = calculate(clickText);
        clickText = [answer.textContent];
        return;
    }

    const lastChar = clickText[clickText.length - 1];

    if (isOperator(lastChar) && isOperator(char)) {
        clickText[clickText.length - 1] = char;
    } else {
        clickText.push(char);
    }

    let displayText = answer.textContent;
    displayText += char;
    answer.textContent = displayText;
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function getOperands(equation) {
    let operands = [];
    for (let item of equation) {
if (!(0 <= item && item <= 9 || item === '.')) {
            operands.push(item);
        }
    }
    return operands;
}

function clearanswer() {
    answer.textContent = '';
    clickText = [];
}

function backspace() {
    clickText.pop();
    answer.textContent = clickText.join('');
}


