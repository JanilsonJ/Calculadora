const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    calculate(){
        let result;

        const previusOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previusOperandFloat) || isNaN(currentOperandFloat))
            return;
        
        result = eval(`${previusOperandFloat} ${this.operation} ${currentOperandFloat}`);
        
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperand == "" && this.previousOperand == "")
            return;

        if (this.currentOperand == "" && this.previousOperand != ""){
            this.operation = operation;
            this.previousOperand = `${this.previousOperand.split(' ')[0]}`;

            return;
        }

        if (this.previousOperand != "")
            this.calculate();

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    appendNumber(number){
        this.currentOperand = `${this.currentOperand}${number.toString()}`
    }

    formatDisplayNumber(number){
        const stringNumber = number.toString();

        const intergerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if(isNaN(intergerDigits))
            integerDisplay = "";
        else
            integerDisplay = intergerDigits.toLocaleString("en", {maximumFractionDigits: 0})

        if(decimalDigits != null)
            return `${integerDisplay}.${decimalDigits}`
        else
            return integerDisplay
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(
    previousOperandTextElement, 
    currentOperandTextElement
);

for (const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay()
    })
}

for (const operationButton of operationButtons){
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    })
}

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})