class Calculator {
    constructor(prevOperandText, currentOperandText) {
        this.prevOperandText = prevOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand).toPrecision(5);

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
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
                computation = prev / current;
                break;
            case '%':
                computation = (current / prev) * 100;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('fr', { maximumFractionDigits: 0 });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.prevOperandText.innerText =
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandText.innerText = '';
        }
    }
}

const nbButton = document.querySelectorAll('.nb_btn');
const opButton = document.querySelectorAll('.op_btn');
const equalButton = document.querySelector('#equal');
const delButton = document.querySelector('#C');
const clearButton = document.querySelector('#AC');
const previousOp = document.querySelector('.prev_calcul');
const currentOp = document.querySelector('.calcul');

const calculer = new Calculator(previousOp, currentOp);

nbButton.forEach(nb => {
    nb.addEventListener('click', () => {
        calculer.appendNumber(nb.innerText)
        calculer.updateDisplay();
    })
})

opButton.forEach(button => {
    button.addEventListener('click', () => {
        calculer.chooseOperation(button.innerText)
        calculer.updateDisplay();
    })
})

equalButton.addEventListener('click', button => {
    calculer.compute();
    calculer.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculer.clear();
    calculer.updateDisplay();
})

delButton.addEventListener('click', button => {
    calculer.delete();
    calculer.updateDisplay();
})